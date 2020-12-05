---
catalog: true
tags:
- Spring
- JSP
- 前端总控制器
---



我们需要从 JSP 中理解 Spring MVC 如何进行视图渲染的逻辑。

##### 性能 JSP 最好

### 议题

- JSP 介绍
- 前端控制器模式（ J2EE 的核心模式 ）
- Spring 运用

 

> ​	技术，抽象变成思想，最后由框架来进行包装。

### JSP 介绍

- JavaServer Pages

  JavaServer™ Pages (JSP) is the Java™ Platform, Enterprise Edition (Java EE)

  technology for building applications for generating dynamic web content, such as HTML, DHTML, XHTML, and XML. JSP technology enables the easy authoring of web pages that create dynamic content with maximum power and flexibility.



### 前端控制器模式 



![1543837734812](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543837819617.png)

### Spring 运用



![1543837779664](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543837779664.png)



## JSP 介绍：

​	JSP 是标准，是模板，

​	frammake、`thymeleaf`

​	都有相应的

EL : Expression Language 表达式语言，有强有弱，实际上是内省的应用。

JSP 有 ， Spring 有

JSP 的 EL 中只能调用 `get` 方法。

​	前后端分离：vue.js 就是抄袭后端的，叫 `数据和模板分离` 模板定义好之后，去更新我的数据，就是解耦。

​	JSP 2.1 Servlet 3.1 是 Spring Boot 的支持的版本，规范非常多。

- 渲染模板
  - 表达是语言非常简单，Hibernate 有一个 volitate 去 BeanVolitaion 去验证框架，也会用到 EL 的表达方式，EL 主要去解释文本。主要的功能特点去迭代。
  - \<forEach> 一部分是他自己内建的一些标签。它还用了 JSTL 这种方式，`（JavaServer Pages Standard Tag Library，JSP标准标签库)`  `thymeleaf`  如果用的多的话，\<div> 里有 扩展属性，还有一种 ADC  叫做扩展空间
- 



JSP

- html ， html ，xml  ，syntax ，  JSP 2.0

有些说 `thymeleaf` 是标准的 H5 ，H5 严格意义上来说还没有 XML 严格。

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
```

JSP 的声明方式，

`<jsp:directive.page>` 这个元素。



完完全全的 XML 的方式

```xml
<jsp:directive.page contentType="text/html;charset=UTF-8" language="java" >
```

JSP 就是 Servlet

Tomcat 的 `web.xml` 中

JSP 是页面的编译器和执行的Servlet。

```xml
<!-- The JSP page compiler and execution servlet, which is the mechanism used by tomcat to support JSP pages -->
```

Tomcat 会去自动把 JSP 给做起来

Servlet 是：

```xml
<!--....-->
<servlet>
    <servlet-name>jsp</servlet-name>
    <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>
    <!--....-->
</servlet>
<!--....-->

<servlet-mapping>
    <servlet-name>jsp</servlet-name>
	<url-pattern>*.jsp</url-pattern>
    <!-- .jspx 都可以 -->
    <url-pattern>*.jspx</url-pattern>
</servlet-mapping>
```



​	 `JspServlet` 在 Spring Boot 中，被 Spring Boot 加载起来，它有一个开关，决定是不是能够开 `JspServlet` 

JSP 第一次访问比较慢，有一个预编译的参数，

 	 `development` 线上使用 JSP 的话，可以用 Maven 的插件，提前编译一下。



## 前端控制器模式：

http://www.corej2eepatterns.com/FrontController.htm

前端总控制器只有一个 Controller 有多个，

命令command 主要是封装，

![1543853365138](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543853365138.png)

- ServletFront
- JSPFront



Spring MVC 的分发类，

delegates : 委派

操作，结果计算结果，渲染到页面，

JspServlet

- `service()`uri 
  - `getServletPath()` 文件路径
  - `preCompile()`  预编译
    - `ServiceJspFile()`
    - `getWrapper` 

再输出出去。

JSPServlet 委派了，

编译以后，有一个文件目录，然后

Tomcat 中有一个 `.class` 和 `.jsp` 带啊没，

```java
public final class index_jsp extends org.apache.jasper.runtimie.HttpJspBase implements org.apache.jasper.runtim.JspSourceDependent{
    //....
}
```

自动生成的，不存在的时候，再生成一遍。

你把预编译的文件删除后，打开一下页面，就会重新生成一遍。



这就是 JSP 中的前端控制器模式。

JAVAEE 的设计模式



​	Spring 很优秀 >> Spring Boot >>  Spring Cloud

![1543837779664](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543837779664.png)



#### Struts 

中 ApplicatoinController 叫 Action

View 再 Spring MVC 里边比较抽象， 可能是 JSP , Thyemplf  , html



​	会把请求委派到 Controller 上来，会处理这个请求，再创建模型，模型主要是数据传输，模型也可能是业务逻辑， MVC 的架构模式，Model 是最可变的，有可能你的 `Controller` 就是你的 model  , 也可能是 一个 `POJO` , Controller 处理你的业务逻辑，`POJO` 可能由其它的东西去进行处理，

​	很多时候，我们用 `Model` (`Map`) ，去渲染，去读里边的上下文，那么这个模型是一个贫血模型，

​	EJB 有状态的模型，叫 充血，你可能在页面中放置一个可以远程调用的对象，放大里边进行执行，一般来说不会这么处理，会造成页面逻辑过于复杂，

​	

```java
//	前端这种东西，不是那么固定，angurajs 前两千，现在 vue，reactor 

//	这个东西不是关键，主要看你业务场景是不是适合。像 VUE.js  也有问题，如果你响应比较慢，渲染的时候是有问题的。
```

​	

```java
@GetMapping("")
public String index(Model model){
    
    return "index";
}
```

Spring MVC 的设计还是有缺陷的。



Spring MVC 非常大。

[Spring MVC 官方文档](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc) 

#### DispatcherServlet

> #### [1.1.2. Special Bean Types](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-servlet-special-bean-types) 
>
> | Bean type                                                    | Explanation                                                  |
> | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | `HandlerMapping`                                             | Map a request to a handler along with a list of [interceptors](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-handlermapping-interceptor) for pre- and post-processing. The mapping is based on some criteria, the details of which vary by `HandlerMapping` implementation.The two main `HandlerMapping`implementations are `RequestMappingHandlerMapping`( which supports `@RequestMapping` annotated methods) and `SimpleUrlHandlerMapping`(which maintains explicit registrations of URI path patterns to handlers). |
> | `HandlerAdapter`                                             | Help the `DispatcherServlet` to invoke a handler mapped to a request, regardless of how the handler is actually invoked. For example, invoking an annotated controller requires resolving annotations. The main purpose of a `HandlerAdapter` is to shield the `DispatcherServlet` from such details. |
> | [`HandlerExceptionResolver`](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-exceptionhandlers) | Strategy to resolve exceptions, possibly mapping them to handlers, to HTML error views, or other targets. See [Exceptions](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-exceptionhandlers). |
> | [`ViewResolver`](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-viewresolver) | Resolve logical `String`-based view names returned from a handler to an actual `View` with which to render to the response. See [View Resolution](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-viewresolver) and [View Technologies](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-view). |
> | [`LocaleResolver`](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-localeresolver), [LocaleContextResolver](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-timezone) | Resolve the `Locale` a client is using and possibly their time zone, in order to be able to offer internationalized views. See [Locale](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-localeresolver). |
> | [`ThemeResolver`](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-themeresolver) | Resolve themes your web application can use — for example, to offer personalized layouts. See [Themes](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-themeresolver). |
> | [`MultipartResolver`](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-multipart) | Abstraction for parsing a multi-part request (for example, browser form file upload) with the help of some multipart parsing library. See [Multipart Resolver](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-multipart). |
> | [`FlashMapManager`](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-flash-attributes) | Store and retrieve the “input” and the “output” `FlashMap` that can be used to pass attributes from one request to another, usually across a redirect. See [Flash Attributes](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-flash-attributes). |

##### HandlerMapping

​	Handler 请注意，不是 `Controller` ， 是 `Controller` 里的某个方法。如果你非常理解源码的时候，有另外的理解：

```java
@RequestMapping(method = RequestMethod.GET)
public @interface GetMapping {
```

​	 `@GetMapping` 就是 `@RequestMapping`  的 `method` 属性是 `GET` 

​	这不能叫做拓展，只能叫做 `子集`，不能叫做重载，应该叫做 `派生` 

​	因为 `@interface` 是不能继承的，只能派生。

##### HandlerAdapter

​	除了我的 Anotation 的， `@ReponseBody` 应该是处理 `REST` 可能是：

​	HTML，XML，JSON

##### HanderExceptionResolver

​	统一处理我们的异常

##### ViewResolver

​	视图解析器，`ApplicationController` 到 `View` 的 `dispatches` 的过程就是视图解析的过程，这里少了 `FrontController` 也就是 `DispatcherServlet` 版我们来做这个事情，

##### LocalResolver

​	国际化的问题：country ，language

##### ThemeResolver

​	主题，你要做一些个性化的东西。 

##### MultipartResolver 

​	控制上传文件的，在 `Spring 3.0` 之后呢，Multipart element 单独处理这个东西。

##### FlashMapManager

​	主要用于 Session 管理吧

##### InternalResorceViewResolver

​	内部资源的管理，重点

##### FreeMarkerViewResolver

​	 `Velocity` 已经被淘汰掉了。像 Thymelef 也是这种东西。都是 `ViewResolver` 这种东西来结尾的。



#### InternalResourceViewResolver

```java
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```

​	主要用来处理 JSP ，和 JSTL 的，

​	ViewResolver 必然有一个联系， 在我的上下文里边必然要配置一个 viewResolver，来进行相应的处理，Controller 返回了，

​	这里有一个问题，这里应该返回 `org.springframework.web.servlet.ModelAndView` ，JAVA 没有双返回值的方式，没有返回两个对象，只能返回一个对象，要把 `视图` 和 `Model` 都返回给  `FrontController` 它才能进行处理。大家写的有点分离了，

##### `org.springframework.web.servlet.mvc.Controller`

```java
@FunctionalInterface
public interface Controller {
    @Nullable
    ModelAndView handleRequest(HttpServletRequest var1, HttpServletResponse var2) throws Exception;
}
```

​	 既要返回 `模型`，也要返回 `视图` 

​	到最后变成 `Model` 管 `Model` ，`路径` 管 `路径` ；

​	

在 Spring 中都是一个高度的封装。

ViewResolver

- `org.springframework.web.servlet.ViewResolver`
  - `org.springframework.web.servlet.view.AbstractCachingViewResolver`
    - `org.springframework.web.servlet.view.UrlBasedViewResolver`
      - `org.springframework.web.servlet.view.InternalResourceViewResolver`



```java
public interface ViewResolver {
    @Nullable
    View resolveViewName(String var1, Locale var2) throws Exception;
}
```

```java
public interface View {
    String RESPONSE_STATUS_ATTRIBUTE = View.class.getName() + ".responseStatus";
    String PATH_VARIABLES = View.class.getName() + ".pathVariables";
    String SELECTED_CONTENT_TYPE = View.class.getName() + ".selectedContentType";

    @Nullable
    String getContentType();
	// 会把我们的模型去渲染，最终去输出
    void render(@Nullable Map<String, ?> var1, HttpServletRequest var2, HttpServletResponse var3) throws Exception;
}
```

`InternalResourceViewResolver` 要怎么关联 `View`

```java
protected AbstractUrlBasedView buildView(String viewName) throws Exception {
    // 构建了一个视图，是一个封装
    InternalResourceView view = (InternalResourceView)super.buildView(viewName);
    if (this.alwaysInclude != null) {
        view.setAlwaysInclude(this.alwaysInclude);
    }

    view.setPreventDispatchLoop(true);
    return view;
}
```

##### `org.springframework.web.servlet.view.JstlView` 



​	Spring Boot 更好用，更简单，但是更难懂。

可以把后缀进行调整

##### `org.springframework.web.servlet.DispatcherServlet` 

​	

- `org.springframework.web.servlet.view.AbstractCachingViewResolver`
  - `org.springframework.web.servlet.view.UrlBasedViewResolver` 



他只是为了做一个同步，原子的获取，原子的同步，需要加 同步





```java
@Nullable
public View resolveViewName(String viewName, Locale locale) throws Exception {
    if (!this.isCache()) {
        return this.createView(viewName, locale);
    } else {
        Object cacheKey = this.getCacheKey(viewName, locale);
        View view = (View)this.viewAccessCache.get(cacheKey);
        if (view == null) {
            Map var5 = this.viewCreationCache;
            synchronized(this.viewCreationCache) {
                view = (View)this.viewCreationCache.get(cacheKey);
                if (view == null) {
                    view = this.createView(viewName, locale);
                    if (view == null && this.cacheUnresolved) {
                        view = UNRESOLVED_VIEW;
                    }

                    if (view != null) {
                        this.viewAccessCache.put(cacheKey, view);
                        this.viewCreationCache.put(cacheKey, view);
                        if (this.logger.isTraceEnabled()) {
                            this.logger.trace("Cached view [" + cacheKey + "]");
                        }
                    }
                }
            }
        }

        return view != UNRESOLVED_VIEW ? view : null;
    }
}
```



View 会把，前缀，后缀，全部拼接进去，



`DispatcherServlet`

- `ViewResolver`
  - `View#render()`
    - HTML



`DispatcherServlet`

- `ViewResolver`
  - `Controller`
    - `viewName`
      - `View#render()`
        - `forword()`
          - `JspServlet`
            - `index_jsp.class`



velocity、Freemarker 在我们的内存中渲染成为 `HTML` 

​	但是 **JSP** 不太一样，它会把它丢给 `JspServlet` 这个类，来进行相应的处理，编译，成 `.class` 然后进行相应的处理。



`RequestDispatcher` 是 Servlet API 里边的东西。

- forward()
- incloud()

```html
<div th:text="${message}">Hello,World</div>
```

thymlef 静态化做的更好一点。



编译时的肯定比解释型语言。



`路径里边不允许中文，必须是 Unicode`









