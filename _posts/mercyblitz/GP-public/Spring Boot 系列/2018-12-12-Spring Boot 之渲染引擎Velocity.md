---
catalog: true
tags:
- Spring Boot
- Velocity
- 渲染引擎
- Spring Web MVC
---



### 本期议题

- Velocity On Spring Web MVC
- 手动装配
- Spring Boot 运用 



### Velocity On Spring Web MVC 

- DispatcherServlet
- VelocityViewResolver
- VelocityEngineFactory



### 手动装配 

- DispatcherServlet
- VelocityViewResolver
- VelocityEngineFactory

### Spring Boot 运用 

- 自动装配
  - DispatcherServlet
  - VelocityViewResolver
  - VelocityAutoConfiguration



[velocity官网](http://velocity.apache.org/engine/2.0/)  

Spring Boot 1.5x 以后不再支持 velocity 了。

有些 JAVA 高级的 API ，没有底层的基础，是很难理解的。

​	过分的强调 JAVA 基础，网上的文章，抄录的，缺少证明的东西，双亲委派什么的很少用。

​	有了实际的应用场景，再去看源码。



​	模板语言会有一些语法。每种模板语言都有一种特色。



- JSP

- Velocity

- Thymeleaf

- Freemarker

...

逻辑处理  if else

迭代处理  for each

赋值   set    \<c:set  >

​			\<div  th:with = "${}"

​			#set(  $var = "abc" )



Velocity

- Web
- Non Web



Template(.vm)

- Writer  (IO流)
  - Content( String )



Velocity  Servlet

- Spring Framework
  - Spring Boot

Spring Boot 1.5 删除 Velocity

> 1.7 2010 年开始没有更新，最近 2017 更新到了 2.0

> As of Spring Framework 4.3, Velocity support has been deprecated due to six years without active maintenance of the Apache Velocity project. We recommend Spring’s FreeMarker support instead, or Thymeleaf which comes with Spring support itself. 



​	velocity 其实非常的稳定，究竟考验。

Spring 2.X  

- Spring Framework 5.0



1.3.x.  找最新的版本。

velocity 不支持布局的。

Spring Boot 

Spring 源码集成了很多的技术。



- JSP : 
  - InternalResourceViewResolver
- Velocity: 
  - VelocityViewResolver



好与不好，不要感性，要理性。

前后端分离不一定好，如果后台没有数据，前台的渲染是不完整的。



JAVA 7

- NIO
- Path



ResolvableType `since 4.0` 



##### Jsp

- `InternalResourceViewResolver` 
  - `UrlBasedViewResolver` 
    - `AbstractCachingViewResolver` 
      - `ViewResolver` 

##### Velocity

- `VelocityViewResolver` 
  - `AbstractTemplateViewResolver` 模板的缓存。
    - `UrlBasedViewResolver`
      - `AbstractCachingViewResolver` 
        - `ViewResolver` 

 

​	FactoryBean 当你这个类不能直接构造的时候，就需要间接构造。



##### `org.springframework.web.servlet.view.AbstractCachingViewResolver` 

```java
public abstract class AbstractCachingViewResolver extends WebApplicationObjectSupport implements ViewResolver {
   private final Map<Object, View> viewAccessCache = new ConcurrentHashMap<Object, View>(DEFAULT_CACHE_LIMIT);
```



​	前后端对后端反而复杂了。你数据区块越多，你数据请求的格式就会越大。相当于，你一个页面就需要有很多请求的渲染。

​	 `VUE.js` 跟 `JAVA` 好像啊。

​	

```java
public class VelocityProperties extends AbstractTemplateViewResolverProperties {
    public static final String DEFAULT_RESOURCE_LOADER_PATH = "classpath:/templates/";
    public static final String DEFAULT_PREFIX = "";
    public static final String DEFAULT_SUFFIX = ".vm";
```





![1544674761958](/img/mercyblitz/GP-public/Spring%20Boot%20%E7%B3%BB%E5%88%97/assets/1544674761958.png)



前端如何取到 Model 中的 key ，可以把 key 当成 model 中的一部分传给前台。

Spring 师太，我们还需要配置两个东西。

```xml
<bean id="velocityConfig" class="org.springframework.web.servlet.view.velocity.VelocityConfigurer">
    <property name="resourceLoaderPath" value="/WEB-INF/velocity/"/>
</bean>


<bean id="viewResolver" class="org.springframework.web.servlet.view.velocity.VelocityViewResolver">
    <property name="cache" value="true"/>
    <property name="prefix" value=""/>
    <property name="suffix" value=".vm"/>
</bean>
```

​	Spring Boot 是一个 jar ，没有 文件了 home/system/ .....

​	Spring Boot 的自动装配。

​	

```java
public class EmbeddedVelocityViewResolver extends VelocityViewResolver {
	// ....
}
```



`VelocityProperties` 

- `AbstractTemplateViewResolverProperties` 
  - `#setPrefix` 
  - `#setSuffix` 



- 不用 DebOps 
- 你需要 build 一下，就重新好了。
  - 使用场景
    - JSP
    - Velocity
    - FreeMarker
    - Thymeleaf



```java
public abstract class AbstractViewResolverProperties {

    private boolean cache;
}
```



```properties
# 开启缓存，之后，就会 build 就会不管用了
spring.velocity.cache=true
spring.velocity.prefix=/velocity/
```



![1544676280464](/img/mercyblitz/GP-public/Spring%20Boot%20%E7%B3%BB%E5%88%97/assets/1544676280464.png)



##### order

setOrder 用于排序，谁优先级高，就把谁往前边排。

数字越小越有限。