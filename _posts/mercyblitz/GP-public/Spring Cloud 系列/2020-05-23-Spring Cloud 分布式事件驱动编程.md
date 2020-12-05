# Spring Cloud 分布式事件驱动编程



## TOC

[TOC]





## 课件

## 本期议题 

* Java 标准事件
* Spring 标准事件
* Spring Cloud 分布式事件



### 架构图

#### 本地事件

![1590443751124](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590443751124.png)

#### 远程事件

![1590443772146](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590443772146.png) 



#### 本次事件

![1590443799252](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/1590443799252.png)



## Java 标准事件 

* 标准事件
  * `java.util.EventObject` 
* 标准监听器
  * `java.util.EventListener` 

----

> Java 的 MourseEvent 事件， Java 标准的方式

在 MQ 中，事件的载体运用了消息。

HTTP，是 同步的事件，Request，Response







## Spring 标准事件 

* 标准事件
  * `org.springframework.context.ApplicationEvent` 
* 标准监听器
  * `org.springframework.context.ApplicationListener` 
* 事件发布器
  * `org.springframework.context.ApplicationEventPublisher` 



---

- `ApplicationFailEvent` 

本地的事件



> - `ApplicationEvent` 
>   - `ApplicationContextEvent` 
>     - `ContextRefreshedEvent` 

```java
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/***
 * XML 形式的 Application Demo
 *
 * @author <a href="mailto:1934849492@qq.com">Darian</a> 
 * @date 2020/5/26  3:14
 */
public class XmlApplicationContextDemo {

    public static void main(String[] args) {
        ClassPathXmlApplicationContext xmlApplicationContext = new ClassPathXmlApplicationContext();

        xmlApplicationContext.addApplicationListener(event -> {
            if (event instanceof PayloadApplicationEvent) {
                PayloadApplicationEvent payloadApplicationEvent = PayloadApplicationEvent.class.cast(event);
                System.err.println(payloadApplicationEvent.getPayload());
            } else {
                System.err.println(event);
            }
        });

        xmlApplicationContext.refresh();
        // Spring 萨汗国那下文是一个 事件发布器，非 ApplicationEvent, 是 PayLoadApplicationEvent
        xmlApplicationContext.publishEvent("Hello, World!");
        xmlApplicationContext.publishEvent(156456);

    }
}

```

```bash
org.springframework.context.event.ContextRefreshedEvent[source=org.springframework.context.support.ClassPathXmlApplicationContext@52525845: startup date [Tue May 26 03:31:09 CST 2020]; root of context hierarchy]
03:31:09.370 [main] DEBUG org.springframework.core.env.PropertySourcesPropertyResolver - Could not find key 'spring.liveBeansView.mbeanDomain' in any property source
Hello, World!
156456
```



## Spring Cloud 分布式事件 

* 分布式事件
  * `org.springframework.cloud.bus.event.RemoteApplicationEvent` 实现类
    * `org.springframework.cloud.bus.event.EnvironmentChangeRemoteApplicationEvent` 
    * `org.springframework.cloud.bus.event.**RefreshRemoteApplicationEvent` 



从谁发给谁？，是同步还是异步？

```java
public abstract class RemoteApplicationEvent extends ApplicationEvent {
    private static final Object TRANSIENT_SOURCE = new Object();
    private final String originService;
    private final String destinationService;
    private final String id;
```







# Spring Cloud Bus

> Spring Cloud Bus links the nodes of a distributed system with a lightweight message broker. This broker can then be used to broadcast state changes (such as configuration changes) or other management instructions. A key idea is that the bus is like a distributed actuator for a Spring Boot application that is scaled out. However, it can also be used as a communication channel between apps. This project provides starters for either an AMQP broker or Kafka as the transport.
>
> ...
>
> ...
>
> ...
>
> The bus currently supports sending messages to all nodes listening or all nodes for a particular service (as defined by Eureka). The `/bus/*` actuator namespace has some HTTP endpoints. Currently, two are implemented. The first, `/bus/env`, sends key/value pairs to update each node’s Spring Environment. The second, `/bus/refresh`, reloads each application’s configuration, as though they had all been pinged on their `/refresh` endpoint.



Spring Cloud Bus 通过 轻量级的 message broker ，来进行实现应用之间的通信。

Bus 只是告诉了你一个端口，没有告诉你往哪里走，

> "/bus/refresh?destination=customers.**" 
>
> 

提供者的发送端口，事件源在哪里，没有告诉你 IP，所以必须进行依赖于服务发现



```bash

+------------------------+         +-------+        +------------------------+
|                        |  JSON   |       |  JSON  |                        |
| RemoteApplicationEvent | ------> | Kafka |  ----> | RemoteApplicationEvent |
|            A           |         |       |        |          B             |
+------------------------+         +-------+        +------------------------+

```

---

`EventObject` （JDK）

- `ApplicationEvent` （Spring） 
  - `RemoteApplicationEvent` （Spring-cloud） 
    - `MessageRemoteApplicationEvent` （Customized） 



Kafka 和 zookeeper 版本最好对应

`http://localhost:8080/send/sync/event?message=ss&destinationService=localhost:8081` 

curl 

