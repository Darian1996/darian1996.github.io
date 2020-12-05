---
catalog: true
tags:
- Spring Boot
- 渲染引擎
- 设计
- Thymeleaf
- Velocity
- JSP
- Spring Web MVC
---



## 对比表格

| \            | Thymeleaf              | Velocity               | JSP                              |
| ------------ | ---------------------- | ---------------------- | -------------------------------- |
| **学习曲线** | 最简单                 | 中等                   | 中等偏上                         |
| **友好性**   | HTML 、XML 友好        | HTML 不太友好          | HTML（多种格式约束）、XML 友好   |
| **扩展性**   | 提供标签和属性方式扩展 | 非标签或属性方式扩展   | 扩展能力最强，自定义标签等       |
| **移植性**   | 移植性强，Spring 生态  | 移植性强，缺少周边生态 | 必须是 Servlet  或  JSP 容器     |
| **性能**     | 解释执行，性能较差     | 解释执行，性能良好     | 翻译成源码，再编译执行，性能优秀 |

## 使用场景

| \          | JSP                          | Velocity                       | Thymeleaf             |
| ---------- | ---------------------------- | ------------------------------ | --------------------- |
| **适合**   | 高性能、Servlet / JSP 天然性 | 性能良好、移植性强、大多数场景 | 后台系统、HTML 5 应用 |
| **不适合** | 非 Servlet/JSP 环境          | HTML 5 应用                    | 访问量大，性能敏感    |







### 本期议题

- 模板引擎 360 对比
- 模板引擎使用场景
- 问答互动



### 模板引擎 360 对比 

#### 360 对比

- 学习曲线
- 友好性
- 扩展性
- 移植性
- 性能



##### 学习曲线

- Thymeleaf：最简单
- Velocity：中等
- JSP：中等偏上

##### 友好性

- JSP：HTML（多种格式约束）、XML 友好
- Thymeleaf：HTML 、XML 友好
- Velocity：HTML 不太友好

##### 扩展性

- JSP：扩展能力最强，自定义标签等
- Thymeleaf：提供标签和属性方式扩展
- Velocity：非标签或属性方式扩展

##### 移植性

- Thymeleaf：移植性强，Spring 生态
- Velocity：移植性强，缺少周边生态
- JSP：必须是 Servlet 或 JSP 容器

##### 性能

- JSP：翻译成源码，再编译执行，性能优秀

- Velocity：解释执行，性能良好

- Thymeleaf：解释执行，性能较差

### 模板引擎使用场景 

##### JSP

- 适合：高性能、Servlet/JSP 天然性
- 不适合：非 Servlet/JSP 环境

##### Velocity

- 适合：性能良好、移植性强、大多数场景
- 不适合：HTML 5 应用

##### Thymeleaf

- 适合：后台系统、HTML 5 应用
- 不适合：访问量大，性能敏感



​	当有一个技术出来的时候，大家都想当然，

​	 新技术出来以后，老技术是不是就不适应了呢？



## JSP

​	为什么 Spring 、 Spring Boot 不用 JSP，

> ### [28.4.5 JSP Limitations](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#boot-features-jsp-limitations)
>
> When running a Spring Boot application that uses an embedded servlet container (and is packaged as an executable archive), there are some limitations in the JSP support.
>
> - With Jetty and Tomcat, it should work if you use war packaging. An executable war will work when launched with `java -jar`, and will also be deployable to any standard container. JSPs are not supported when using an executable jar.
> - Undertow does not support JSPs.
> - Creating a custom `error.jsp` page does not override the default view for [error handling](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#boot-features-error-handling). [Custom error pages](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#boot-features-error-handling-custom-error-pages) should be used instead.
>
> There is a [JSP sample](https://github.com/spring-projects/spring-boot/tree/v2.1.1.RELEASE/spring-boot-samples/spring-boot-sample-web-jsp) so that you can see how to set things up.****

当我用 Spring Boot 使用嵌入式容器的时候，servlet jetty  tomcat  undertow  限制：

- war 包的时候，才可以执行，Spring Loader 标准的 jar 来执行。JSP 在 Spring Boot 只有 war 包才可以执行。
- war 
- Undertow 不支持 JSP
-  JSP 不能够修改默认的错误处理。 Tomcat 里边是有一个 猫的页面， Spring Boot 就不支持





​	嵌入式容器，你看不到 tomcat 的存在，是通过 Spring 的生命周期去驱动的。



`Spring-boot-0.0.1.SNAPSHOT.war` 可以直接执行

`Spring-boot-0.0.1.SNAPSHOT.war.original` 可以放到 Tomcat 包里边

META-INF ，里边有 main-class 有 start-class 



### Spring MVC 有那种专门的处理

​	 `spring-boot-jsp` 有错误，idea 中需要把 `<scope>provider</scope>` 给去掉。JSP 需要编译，它是需要一定的编译的空间的。编译空间：需要一个目录来执行，你在 Docker 的时候，就会有问题。必须有外挂的空间。Docker 是不变的。当你需要渲染的时候，就需要一个空间去存储文件。

###### 默认的 Temp 目录。



#### 学习

Thymeleaf 直接 H5 就行了。



##### Set

##### 逻辑处理

##### 循环语句



###### JSP 设计上很先进。

```jsp
<foreeach>
    <   var="" begin="1", end="3"></var>
</foreeach>
```



可见性不包括原子性，

JSP 需要学习

- JSTL  (java standard tag langurage)



Servlet 比较灵活但是比较难以掌握。

# 0041