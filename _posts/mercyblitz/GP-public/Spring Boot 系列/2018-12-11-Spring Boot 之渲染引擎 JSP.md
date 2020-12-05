---
catalog: true
tags:
- Spring Boot
- JSP
- 渲染引擎
- Spring Web MVC
---



​	官方不推荐 JSP ，但是其实 JSP 还是不错的。

### 议题

- JSP On Spring Web MVC
- 手动装配
- Spring Boot 运用



​	Spring Boot 是自动装配的。

​	

### JSP On Spring MVC

- DispatcherServlet
- InternalResourceViewResolver
- JstlView

### 手动装配 

- DispatcherServlet
- InternalResourceViewResolver
- `@Controller` 

### Spring Boot 运用 

- 自动装配
  - DispatcherServlet
  - InternalResourceViewResolver
  - WebMvcAutoConfiguration



# JSP On Spring MVC

> # Spring Framework Documentation
>
> Version 5.1.3.RELEASE
>
> *What’s New*, *Upgrade Notes*, *Supported Versions*, and other topics, independent of release cadence, are maintained externaly on the project’s [**Github Wiki**](https://github.com/spring-projects/spring-framework/wiki).
>
> | [Overview](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/overview.html#overview) | history, design philosophy,feedback, getting started.        |
> | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | [Core](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/core.html#spring-core) | IoC container, Events, Resources, i18n, Validation, Data Binding, Type Conversion, SpEL, AOP. |
> | [Testing](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/testing.html#testing) | Mock objects, TestContext framework, Spring MVC Test, WebTestClient. |
> | [Data Access](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/data-access.html#spring-data-tier) | Transactions, DAO support, JDBC, ORM, Marshalling XML.       |
> | [Web Servlet](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#spring-web) | Spring MVC, WebSocket, SockJS, STOMP messaging.              |
> | [Web Reactive](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web-reactive.html#spring-webflux) | Spring WebFlux, WebClient, WebSocket.                        |
> | [Integration](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/integration.html#spring-integration) | Remoting, JMS, JCA, JMX, Email, Tasks, Scheduling, Cache.    |
> | [Languages](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/languages.html#languages) | Kotlin, Groovy, Dynamic languages.                           |

**Spring Framework** 

[DispatcherServlet](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/web.html#mvc-servlet) 

`same in Spring MVC`  有一些都是可以通用的。



##### 架构图：

![1544543394328](/img/mercyblitz/GP-public/Spring%20Boot%20%E7%B3%BB%E5%88%97/assets/1544543394328.png)

`javax.servlet.http.HttpServlet ` 里边是 get 方法 和 post 方法都有。









`org.springframework.web.servlet.DispatcherServlet#doDispatch`  Spring Web MVC 的核心。



#### 最早时期的 MVC

`org.springframework.web.servlet.ModelAndView`   最早的 Spring Web MVC

```java
@SpringBootApplication
public class SpringBootJspApplication implements WebMvcConfigurer {

   public static void main(String[] args) {
      SpringApplication.run(SpringBootJspApplication.class, args);
   }

   @Override
   public void addViewControllers(ViewControllerRegistry registry) {

   }
}
```



```java
public class IndexController implements Controller {

    @Override
    public ModelAndView handleRequest(HttpServletRequest httpServletRequest,
                                      HttpServletResponse httpServletResponse) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        // 封装模型“
        Map<String, Object> model = modelAndView.getModel();
        model.put("1", "aaa");
        // 设置页面
        modelAndView.setViewName("index");
        return modelAndView;
    }
}
```



Spring Boot 会自动化的装配 Spring 。

> - An `InternalResourceViewResolver` named ‘defaultViewResolver’. This one locates physical resources that can be rendered by using the `DefaultServlet` (including static resources and JSP pages, if you use those). It applies a prefix and a suffix to the view name and then looks for a physical resource with that path in the servlet context (the defaults are both empty but are accessible for external configuration through `spring.mvc.view.prefix` and `spring.mvc.view.suffix`). You can override it by providing a bean of the same type.



##### `org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter#defaultViewResolver`

```java
@Bean
@ConditionalOnMissingBean
public InternalResourceViewResolver defaultViewResolver() {
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
    resolver.setPrefix(this.mvcProperties.getView().getPrefix());
    resolver.setSuffix(this.mvcProperties.getView().getSuffix());
    return resolver;
}
```



### 外部化配置

`META-INF/spring-configuration-metadata.json` 

要经得起推敲。



#### 手动装配

```java
@SpringBootApplication
public class SpringBootJspApplication   {

   public static void main(String[] args) {
      SpringApplication.run(SpringBootJspApplication.class, args);
   }

   @Bean
   public InternalResourceViewResolver defaultViewResolver() {
      InternalResourceViewResolver resolver = new InternalResourceViewResolver();
      resolver.setPrefix("/WEB-INF/jsp/");
      resolver.setSuffix(".jsp");
      // path = prefix + @RequestMapping method return value + suffix
      // path = "WEB-INF/jsp/" + "index" + ".jsp"
      return resolver;
   }
}
```



![1544592340361](/img/mercyblitz/GP-public/Spring%20Boot%20%E7%B3%BB%E5%88%97/assets/1544592340361.png)



##### `org.springframework.web.servlet.view.InternalResourceView#renderMergedOutputModel` 

```java
protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
    this.exposeModelAsRequestAttributes(model, request);
    this.exposeHelpers(request);
    // 准备渲染了
    String dispatcherPath = this.prepareForRendering(request, response);
    RequestDispatcher rd = this.getRequestDispatcher(request, dispatcherPath);
    if (rd == null) {
        throw new ServletException("Could not get RequestDispatcher for [" + this.getUrl() + "]: Check that the corresponding file exists within your web application archive!");
    } else {
        if (this.useInclude(request, response)) {
            response.setContentType(this.getContentType());
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Including [" + this.getUrl() + "]");
            }

            rd.include(request, response);
        } else {
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Forwarding to [" + this.getUrl() + "]");
            }
            // forword
            rd.forward(request, response);
        }

    }
}
```



View 并不是每一次都去渲染，



Thymleaf volacity 都是渲染。



##### `org.springframework.web.servlet.View#render` 

```java
void render(@Nullable Map<String, ?> var1, HttpServletRequest var2, HttpServletResponse var3) throws Exception;
```



###### 简便写法

```java
@GetMapping("index2")
public String excute(Model model) {
    model.addAttribute("11", "aaa");
    return "index";
}
```