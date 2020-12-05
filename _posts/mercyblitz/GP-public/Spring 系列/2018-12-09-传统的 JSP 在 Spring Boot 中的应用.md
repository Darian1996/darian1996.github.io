---
catalog: true
tags:
- Spring
- JSP
- Spring Boot
- Servlet
---



苹果修复了 Inter 的一个指令的漏洞导致了问题。环境全部都不可以用了。

微软做的还不错。



### 本期议题

- 回顾 JSP In Spring
- 手动装配
- Spring Boot 运用



​	热加载很难懂，《深入 JVM 》了解底层字节码的一些东西才行，热加载不要说的太具体，Spring Boot 不建议用热加载 ，因为他的 DevOps 很多是不成熟的。Java9 之前都有的。

​	了解 Spring Framework ，才能用好 Sping Boot。



### 回顾 JSP In Spring

- DispatcherServlet
- InternalResourceViewResolver
- JstlView



​	我们为什么要用三方库？Apache 的 common 库，StringUtils ，DataFormatter 帮助我们做了很多的封装，严格意义上来说，都可以可以实现，但是开发的时候，要保证开发效率，而是呢，要简约，它的正确性，可以让你站在巨人的肩膀上。开源，有相应的问题，问题出现在哪里，怎么去解决？比如 `SimpleDateFormter` 为什么是线程不安全的，`FastDateFormter` 为什么是线程安全的。说起来，一个是原生型，一个是单例类型，无状态呢是线程安全的，有状态呢，就有线程安全的风险。

​	 `org.springframework.web.context.ContextLoaderListener` 

[JSP In Spring 前端总控制器。](http://www.corej2eepatterns.com/FrontController.htm)



![1544368066869](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1544368066869.png)



##### 用 XML 的方式去配置 Spring MVC 

###### Spring Boot 是不是以 Annotation 驱动？

​	Spring 以 3.0 开始，就开始以注解的方式启动了。只不过大家用的比较少，创业团队用的多，大多数时候，你接手的时候，已经配置好了。你不会关注这个，就不会去关注注解的驱动的方式的改变了。

#### IOC

​	Spring 自称是 IOC 容器， **控制反转** ，不在需要外部的管理，而是通过外部的方式去组装这个东西，IOC 其实是一个思想，不是一门技术，真正的技术是 **`DI`** ，DI 是 IOC 的一个落地，一种实现，IOC 实现 DI 的里边分为两块，一个是依赖注入，一个是依赖查询，你就会看多很多种方式，不管怎么样，它的逻辑就是我用 XML 的配置，取代了一部分代码来做这个事情，那么问题就来了，JAVA Annotation 的方式，以前组装的这部分代码，有同样的通过代码的方式来组装了，只不过你把这部分代码迁移到其它地方了。

- - 

    ```java
    @Bean 
    public String xxx(){   
    }
    public String index(MOdel model){
    	model.addAttribute(xxx());
    	return "index";
    }
    ```

  区别没有很大， **IOC** 的方式  

  	XML 和 Annotation 没有所谓的好坏，大致上面都差不多的，IOC 、 DI 呢，被夸大了，很多时候，你还是需要去关注的，只不过是你编程的一个习惯而已。好比说，你要去显示的去 `get()` 、 `set()` 一样的，既然 XML 是一个 `配置` ，那么 JAVA 也是一个 `配置` 。


  ​	

#### InternalResourceViewResolver 

​	解释了，前缀和后缀，

我们不用 Spring Boot 用 Spring 来把这个事情做掉。

```verilog
...jsp-in-spring>mvn -Dmaven.test.skip -U clean package
```

Spring 没有什么发明。只是一个整合。



`@EnableWebMvc` 引用这个东西不代表可以启动。



## 不用 Spring Boot 实现自动装配

​	包下边的东西都会把所有扫描进来，Spring 处理的时候会把重复的给去掉。



### Servlet 3.0 规范中

> #### 4.4.2 Programmatically adding and configuring Filters
>
> ##### 4.4.2.1 addFilter(String filterName, String className)
>
> ​	This method allows the application to declare a filter programmatically. It adds the filter with the given name, and class name to the web application.
>
> ##### 4.4.2.2 addFilter(String filterName, Filter filter)
>
> This method allows the application to declare a filter programmaticall



className 需要反射。



​	Spring 的接口设计的比较好。根据框架做一些响应的调整。

tomcat 可以实现内置容器，Spring Annotation 实现所有 XML 的配置

```java
/***
 * Web 自动装配
 */
@EnableWebMvc
@ComponentScan("com.darian.jsp.in.spring.web.controller")
@Configuration
public class WebAutoConfiguration extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    /***
     * 等价于 {@link org.springframework.web.context.ContextLoaderListener }
     * @return
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    /***
     * 相当于 DispatcherServlet 加载 WEB-INF/darian.xml 文件
     * @return
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebAutoConfiguration.class};
    }

    /***
     *      <servlet-mapping>
     *            <servlet-name>app</servlet-name>
     *            <url-pattern>/</url-pattern>
     *      </servlet-mapping>
     * @return
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /***
     *     <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
     *         <property name="viewClass" value="org.springframework.web.servlet.view.JstlView" />
     *         <property name="prefix" value="/WEB-INF/jsp/"/>
     *         <property name="suffix" value=".jsp"/>
     *     </bean>
     */
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/jsp/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }


    /***
     *      <filter>
     *         <filter-name>CharacterEncodingFilter</filter-name>
     *         <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
     *         <init-param>
     *             <param-name>encoding</param-name>
     *             <param-value>UTF-8</param-value>
     *         </init-param>
     *         <init-param>
     *             <param-name>forceRequestEncoding</param-name>
     *             <param-value>true</param-value>
     *         </init-param>
     *         <init-param>
     *             <param-name>forceResponseEncoding</param-name>
     *             <param-value>true</param-value>
     *         </init-param>
     *     </filter>
     *
     *         <filter-mapping>
     *              <filter-name>CharacterEncodingFilter</filter-name>
     *              <servlet-name>app</servlet-name>
     *         </filter-mapping>
     */
    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{characterEncodingFilter()};
    }

    private Filter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceRequestEncoding(true);
        filter.setForceResponseEncoding(true);
        return filter;
    }

    /***
     *
     * @return
     */
    @Override
    protected String getServletName() {
        return "app";
    }
}
```

### 为什么要用 Spring Boot ?

​	我的前缀、后缀，能不能帮我去配置，我的 Filter 能不能自动的去帮我进行装载。

## 手动装配：

- DispatcherServlet
- InternalResourceViewResolver
- `@Controller` 



我不用 Spring Boot 也可以自动装配

# Spring Boot 运用

- 自动装配
  - DispatcherServlet
  - InternalResourceViewResolver
  - `@Controller` 



​	JSP 是如何在 Spring Boot 中装载起来的。

​	

​	了解装配的原理。



##### `org.springframework.web.servlet.view.InternalResourceViewResolver` 

```java
protected AbstractUrlBasedView buildView(String viewName) throws Exception {
    InternalResourceView view = (InternalResourceView)super.buildView(viewName);
    if (this.alwaysInclude != null) {
        view.setAlwaysInclude(this.alwaysInclude);
    }

    view.setPreventDispatchLoop(true);
    return view;
}
```



ctrl + f12



`org.springframework.web.servlet.view.UrlBasedViewResolver#setPrefix` 



`org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration` 

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



​	所谓的自动装配，是因为 Spring Boot 帮我们做了这些逻辑。我们只需要配置就好了。

​	