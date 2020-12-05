# 丰富 Spring Cloud Stream 生态

## TOC

[TOC]

## Spring Cloud

> spring Cloud Stream
>
> 轻量级的通信，没有说一定要用消息，内部的实现用的消息。





![1590423639264](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590423639264.png)





#### 事件驱动编程

![1590423874295](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590423874295.png)



## 预备条件

- 消息中间件：
  - RabbitMQ  (  Message Broker )
  - RocketMQ (  自定义 )
- 注册中心：
  - Zookeeper (  注册中心   2181)
- 客户端应用：
  - spring-cloud-client-application (   8888 )
- 服务端应用： 
  - spring-cloud-server-application ( 9090 )

- Stream Cloud Stream Binder : 
  - RabbitMQ
  - RocketMQ
  - HTTP Binder

---



我们通过 Spring Cloud Stream 来进行通信



---

可以一个发送，然后多个可以监听到。

## Binder 实现步骤

A typical binder implementation consists of the following:

- A class that implements the `Binder` interface; （实现 `Binder` 接口）
- A Spring `@Configuration` class that creates a bean of type `Binder` along with the middleware connection infrastructure.（`Binder` 实现类上标注 `@Configuration` 注解）
- A `META-INF/spring.binders` file found on the classpath containing one or more binder definitions, as shown in the following example:（`META-INF/spring.binders` 配置 `Binder` 名称和 `Binder` 实现自动装配类映射）



### HTTP Binder 的实现架构图

![1590432175802](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590432175802.png)



---

![1590432206555](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590432206555.png)



---

![1590432295719](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590432295719.png)





### 细节

- RabbitMQ 和 Kafka 都是根据 `ExtendedBindingProperties` 来进行扩展的。
- `public class RabbitExtendedBindingProperties implements ExtendedBindingProperties<RabbitConsumerProperties, RabbitProducerProperties> {` 

### 步骤

- 利用 `DiscoveryClient`  获取实例列表，可以拿到一堆列表。`discoveryClient.getInstances(serviceName);` 
  - 随机负载均衡算法，然后再去，拿到队以ing的 URL
- `Target URL = rootURL + Endpoint URI  -> http://localhost:9090/mesage/receive` 
  - `String targetURI = rootURL + MessageReceiverController.ENDPOINT_URI;` 
- 我的 HTTP Binder 既有 RestTemplate HTTP 请求，还有 `@Controller` HTTP 消费端。
- REST 发送消息
  - ` byte[] messageBody = (byte[]) message.getPayload();`  请求内容
  - `RestTemplate.exchange`   发送请求
- 接受消息
  - `MessageReceiverController` 包含 `InputChannel` 
    - `inputChannel.send(new GenericMessage(requestBody))` 

- 绑定 `InputChannel` 

  - `HttpMessageChannelBinder#bindConsumer` 内部调用 `MessageReceiverController#setInputChannel` 给 controller 注入 `MessageChannel` 

- 自动装配 `MessageReceiverController` 、 `HttpMessageChannelBinder` 

- `META-INF/spring.binders` 

  - `http:\xxxxx.xxx.xxx.http.HttpMessageChannelBinderConfiguration` 

- `application.properties` 客户端和服务端都需要配置

  - `spring.cloud.stream.bindings.test-http.binder = http` 配置 channel 名称

- `@StreamListener("test-http")` 添加监听的 channel 

- `@Input("test-http")` 配置 输入的 channel 

- `spring.factories` 自动装配

  - 

    ```properties
    org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
    com.gupao.micro.services.spring.cloud.stream.binder.http.HttpMessageChannelWebAutoConfiguration
    ```

    



> 小技巧
>
> - ```java
>   @RestController
>   public class MessageReceiverController implements Controller {
>   ```
>
>   自动装配
>
>   
>
>   

---



### 相关代码

#### `HttpMessageChannelBinder`

```java
package com.gupao.micro.services.spring.cloud.stream.binder.http;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.stream.binder.Binder;
import org.springframework.cloud.stream.binder.Binding;
import org.springframework.cloud.stream.binder.ConsumerProperties;
import org.springframework.cloud.stream.binder.ProducerProperties;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Random;

/**
 * HTTP {@link MessageChannel} {@link Binder}
 */
public class HttpMessageChannelBinder implements
        Binder<MessageChannel, ConsumerProperties, ProducerProperties> {

    private static final String TARGET_APP_NAME = "spring-cloud-server-application";

    private final DiscoveryClient discoveryClient;

    private final MessageReceiverController controller;

    public HttpMessageChannelBinder(DiscoveryClient discoveryClient,
                                    MessageReceiverController controller) {
        this.discoveryClient = discoveryClient;
        this.controller = controller;
    }

    /**
     * 随机负载均衡算法
     * @param serviceName
     * @return
     */
    private ServiceInstance chooseServiceInstanceRandomly(String serviceName) {
        List<ServiceInstance> serviceInstances = discoveryClient.getInstances(serviceName);
        int size = serviceInstances.size();
        int index = new Random().nextInt(size);
        return serviceInstances.get(index);
    }

    private String getTargetRootURL(String serviceName) {
        ServiceInstance serviceInstance = chooseServiceInstanceRandomly(serviceName);
        return serviceInstance.isSecure() ?
                "https://" + serviceInstance.getHost() + ":" + serviceInstance.getPort() :
                "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort();
    }


    @Override
    public Binding<MessageChannel> bindConsumer(String name,
                                                String group, MessageChannel inputChannel,
                                                ConsumerProperties consumerProperties) {

        // 给 controller 注入 MessageChannel
        controller.setInputChannel(inputChannel);

        return null;
    }

    @Override
    public Binding<MessageChannel> bindProducer(String name,
                                                MessageChannel outputChannel,
                                                ProducerProperties producerProperties) {

        RestTemplate restTemplate = new RestTemplate();

        SubscribableChannel subscribableChannel = (SubscribableChannel) outputChannel;
        // 消息订阅回调
        subscribableChannel.subscribe(message -> { // 消息来源

            // POST 请求（写数据）
            // 消息体
            byte[] messageBody = (byte[]) message.getPayload();
            // HTTP 体

            // 对象的服务名称 -> IP:port 集合（列表）

            String rootURL = getTargetRootURL(TARGET_APP_NAME);
            // Endpoint URI : /message/receive
            // Target URL = rootURL + Endpoint URI  -> http://localhost:9090/mesage/receive
            String targetURI = rootURL + MessageReceiverController.ENDPOINT_URI;
//            // 消息头
//            MessageHeaders messageHeaders = message.getHeaders();
//            // HTTP 头

            // 请求实体 = POST 方法
            try {
                RequestEntity requestEntity = new RequestEntity(messageBody, HttpMethod.POST, new URI(targetURI));
                // 成功后，返回"OK"
                restTemplate.exchange(requestEntity, String.class);
            } catch (URISyntaxException e) {
            }

        });
        return null;
    }
}

```



#### `HttpMessageChannelBinderConfiguration`

```java
package com.gupao.micro.services.spring.cloud.stream.binder.http;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class HttpMessageChannelBinderConfiguration {

//    /**
//     * 自动装配 {@link MessageReceiverController} Bean
//     *
//     * @return
//     */
//    @Bean
//    public MessageReceiverController messageReceiverController() {
//        return new MessageReceiverController();
//    }

    @Bean
    public HttpMessageChannelBinder httpMessageChannelBinder(
            DiscoveryClient discoveryClient,
            MessageReceiverController controller) {
        return new HttpMessageChannelBinder(discoveryClient, controller);
    }
}

```



#### `HttpMessageChannelWebAutoConfiguration`

```java
package com.gupao.micro.services.spring.cloud.stream.binder.http;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class HttpMessageChannelWebAutoConfiguration {

    @Bean
    public MessageReceiverController controller() {
        return new MessageReceiverController();
    }
//
//    @Bean
//    public MessageReceiverHandlerInterceptor interceptor() {
//        return new MessageReceiverHandlerInterceptor();
//    }
//
//    @Autowired
//    private MessageReceiverHandlerInterceptor interceptor;

//    @Configuration
//    public class MyWebMvcConfigurer implements WebMvcConfigurer {
//        public void addInterceptors(InterceptorRegistry registry) {
//            registry.addInterceptor(interceptor);
//        }
//    }


}

```



#### `MessageReceiverController` 

```java
package com.gupao.micro.services.spring.cloud.stream.binder.http;

import org.springframework.lang.Nullable;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * 消息接受者 Controller
 */
@RestController
public class MessageReceiverController implements Controller {

    public static final String ENDPOINT_URI = "/message/receive";

    private MessageChannel inputChannel;

    @PostMapping(ENDPOINT_URI)
    public String receive(HttpServletRequest request) throws IOException {

        // 请求内容
        InputStream inputStream = request.getInputStream();
        // 接收到客户端发送的 HTTP 实体，需要 MessageChannel 回写
        byte[] requestBody = StreamUtils.copyToByteArray(inputStream);
        // 写入到 MessageChannel
        inputChannel.send(new GenericMessage(requestBody));

        return "OK";
    }

    public void setInputChannel(MessageChannel inputChannel) {
        this.inputChannel = inputChannel;
    }

    @Nullable
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return null;
    }
}

```



#### `MessageReceiverHandlerInterceptor` 

```java
package com.gupao.micro.services.spring.cloud.stream.binder.http;

import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.util.StreamUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;

public class MessageReceiverHandlerInterceptor implements HandlerInterceptor {

    public static final String ENDPOINT_URI = "/message/receive";

    private MessageChannel inputChannel;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        if (request.getRequestURI().equals(ENDPOINT_URI)) {
            processEndpoint(request, response);
            return false;
        }

        return true;
    }

    private void processEndpoint(HttpServletRequest request, HttpServletResponse response) throws Exception {

        // 请求内容
        InputStream inputStream = request.getInputStream();
        // 接收到客户端发送的 HTTP 实体，需要 MessageChannel 回写
        byte[] requestBody = StreamUtils.copyToByteArray(inputStream);
        // 写入到 MessageChannel
        inputChannel.send(new GenericMessage(requestBody));

        response.getWriter().write("OK");
    }

    public void setInputChannel(MessageChannel inputChannel) {
        this.inputChannel = inputChannel;
    }
}

```





