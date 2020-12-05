# 微服务网关新选择 Spring Cloud Gateway





## TOC

[TOC]



## 相关课题

- 《Java Reactive Web 设计与实现》
- 《微服务网关整合》
- 《微服务网关设计》
- 《响应式应用架构重构》
- 《Spring 5 新特性值 Web Flux》
- 《Vet.x 异步编程》



## 本次目标

### 项目总览

- `spring-cloud-zuul-demo` : <http://localhost:9090/rest-api/helloWorld>
- 路由：
- 熔断：100ms，增加等待时间，随机 0-199ms
  -  `rest-service-provider-demo` : <http://localhost:8080/helloWorld> 



- `spring-cloud-gateway-demo` 
  - <http://localhost:7070/rest-api/helloWorld>
  - http://localhost:7070/rest-service/helloWorld
    - 都可以调用到 <http://localhost:8080/helloWorld> 

------

zuul 的第一次会比较慢。

------



### 回顾 Spring Cloud Zuul



### 掌握 Spring Cloud Gateway 基本使用

> This project provides an API Gateway built on top of the Spring Ecosystem, including: Spring 5, Spring Boot 2 and Project Reactor. Spring Cloud Gateway aims to provide a simple, yet effective way to route to APIs and provide cross cutting concerns to them such as: security, monitoring/metrics, and resiliency.
>
> > Spring Cloud Gateway requires the Netty runtime provided by Spring Boot and Spring Webflux. It does not work in a traditional Servlet Container or when built as a WAR.
>
> ## [2. Glossary](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.2.RELEASE/reference/html/#glossary)
>
> - **Route**: The basic building block of the gateway. It is defined by an ID, a destination URI, a collection of predicates, and a collection of filters. A route is matched if the aggregate predicate is true.
> - **Predicate**: This is a [Java 8 Function Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html). The input type is a [Spring Framework `ServerWebExchange`](https://docs.spring.io/spring/docs/5.0.x/javadoc-api/org/springframework/web/server/ServerWebExchange.html). This lets you match on anything from the HTTP request, such as headers or parameters.
> - **Filter**: These are instances of [Spring Framework `GatewayFilter`](https://docs.spring.io/spring/docs/5.0.x/javadoc-api/org/springframework/web/server/GatewayFilter.html) that have been constructed with a specific factory. Here, you can modify requests and responses before or after sending the downstream request.
>
> ![Spring Cloud Gateway Diagram](/img/mercyblitz/GP-public/Spring%20Cloud%20%E7%B3%BB%E5%88%97/assets/spring_cloud_gateway_diagram.png)
>
> 

他以 Spring 5 ,Spring Boot 2.0 为基础，做的 API，快速的构建。

基于 Netty，然后不是在 Servlet 应用中。

#### 术语

- 路由
- 判断
- 过滤器









### 整合 Spring WebFlux



## 网关选型

### Spring Cloud Zuul

- Servlet API

### Spring Cloud GateWay

- Netty
- Reactor- > netty

### Netfliz Zuul2

- netty

### Sevlet 

### Nginx

### Kong

- c
- http proxy

### Envoy

- httpProxy



------

OpenResty 可以自己去链接数据库，自己去做，一些事情。重要的是转发。



## 技术支持

## Reactive Route 写法

### 函数式比声明式的优势在哪里？

- 在 Java 中，语言规范规定，注解里边的只能用常量，不能用非常量。这个值一旦定义好以后，就不能改了。

- 所以 Route 的写法弹性就很大，



```java
package com.darian.restserviceproviderdemo.reactive.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

/***
 *
 *
 * @author <a href="mailto:1934849492@qq.com">Darian</a>
 * @date 2020/5/27  10:13
 */
@Configuration
public class ReactiveWebEndpointConfiguration {

    @GetMapping("/helloWorld_1")
    @ResponseBody
    public String helloWorld() {
        return "hello, world!";
    }

    /**
     * Response
     * -- status = "200"
     * -- body = "hello, world";
     * HTTP Method = GET
     * HTTP URI = /helloWorld
     * Q: 这比传统 Controller 优势在哪里
     * --
     * return ServerResponse
     * Reactor
     * Publish -> Mono(0,1) | Flux(0,n)
     */
    @Bean
    public RouterFunction<ServerResponse> helloWorldRouteFunction() {
        return route(GET("/helloWorld"),
                request -> ServerResponse.ok() // 200
                        .body(Mono.just("Hello, world"), String.class));
    }

}
```





### Spring Cloud-Gateway 代码

```properties
server.port=7070
spring.cloud.gateway.routes[0].id=gateway
spring.cloud.gateway.routes[0].uri=http://127.0.0.1:8080
spring.cloud.gateway.routes[0].predicates[0]=Path=/rest-api/helloWorld
#spring.cloud.gateway.routes[0].predicates[0].args=
# 姐去掉一段， /rest-api/ 去掉
spring.cloud.gateway.routes[0].filters[0]=StripPrefix=1
spring.cloud.gateway.routes[0].filters[1].name=Hystrix
spring.cloud.gateway.routes[0].filters[1].args.name=rest
spring.cloud.gateway.routes[0].filters[1].args.fallbackUri=forward:/fallback

# 配置熔断, 100 ms
hystrix.command.rest.execution.isolation.thread.timeoutInMilliseconds=100
logging.level.root = debug
```

```java
package com.darian.springcloudgatewaydemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Optional;
import java.util.function.Function;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@SpringBootApplication
//@RestController
public class SpringCloudGatewayDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringCloudGatewayDemoApplication.class, args);
    }

    //@GetMapping("/fallback")
    //public String fallback() {
    //    return "fallback...";
    //}

    // webFlux: Function Endpoint
    @Bean
    public RouterFunction<ServerResponse> helloWorldRouteFunction() {
        return route(GET("/fallback"),
                request -> {
                    return ServerResponse.ok() // 200
                            .body(Mono.just("fallback...."), String.class);
                });
    }

    // Gateway Function Endpoint
    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {

        return builder.routes()
                .route("rest-api",// id
                        r -> r.path("/rest-service/helloWorld")
                                .uri("http://localhost:8080/helloWorld"))
                .build();  // 返回 RouteLocator
    }
}

```

#### 测试，两个链接，一个是 配置的，一个是手动的

```java
http://localhost:7070/rest-service/helloWorld
http://localhost:7070/rest-api/helloWorld
```

