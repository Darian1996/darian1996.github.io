---
catalog: true
tags:
- Spring Boot
- JAVA
- log
- logback
- slf4j
---



### 议题

- 新一代日志框架 **`logback`**
- 统一日志 API - **`slf4j`**
- Spring Boot 日志



### 日志框架- logback

- 核心API
  - 日志对象（`ch.qos.logback.classic.Logger`）
  - 日志级别（`ch.qos.logback.classic.Level`）
  - 日志管理上下文（`ch.qos.logback.classic.LoggerContext`）
  - 日志附加器（`ch.qos.logback.core.Appender`）
  - 日志过滤器（`ch.qos.logback.core.filter.Filter`）
  - 日志格式布局（`ch.qos.logback.core.Layout`）
  - 日志事件（`ch.qos.logback.classic.spi.LoggingEvent`）
  - 日志配置器（`ch.qos.logback.classic.spi.Configurator`）
  - 日志诊断上下文（`org.slf4j.MDC`）

  

### 统一日志 API 

- 背景

  - 日志框架无论 Log4j 还是 Logback，虽然它们功能完备，但是各自API 相互独立，并且各自为政。当应用系统在团队协作开发时，由于工程人员可能有所偏好，因此，可能导致一套系统可能同时出现多套日志框架。

    其次，最流行的日志框架基本上基于实现类编程，而非接口编程。因此，暴露一些无关紧要的细节给用户，这种耦合性是没有必要的。

    诸如此类的原因，开源社区提供统一日志的API框架，最为流行的是：

- Apache commons-logging

  - 适配 log4j 和 Java Logging

- slf4j

  - 适配 Log4j、Java Logging 和 Logback



##### slf4j-api

##### log4j-over-slf4j

##### jcl-over-slf4j

##### jul-to-slf4j



log4Jj

javalogging

logback

log4j2



`ch.qos.logback.classic.LoggerContext`

```java
private Map<String, Logger> loggerCache;
public final Logger getLogger(final Class<?> clazz) {
    return getLogger(clazz.getName());
}
```



##### `ch.qos.logback.classic.Logger` 

```java
transient private AppenderAttachableImpl<ILoggingEvent> aai;
public synchronized void addAppender(Appender<ILoggingEvent> newAppender) {
    if (aai == null) {
        aai = new AppenderAttachableImpl<ILoggingEvent>();
    }
    aai.addAppender(newAppender);
}
```



logback 官网 https://logback.qos.ch/

 布局结构：https://logback.qos.ch/manual/index.html

https://logback.qos.ch/manual/appenders.html



```java
package ch.qos.logback.core;
  
import ch.qos.logback.core.spi.ContextAware;
import ch.qos.logback.core.spi.FilterAttachable;
import ch.qos.logback.core.spi.LifeCycle;
  

public interface Appender<E> extends LifeCycle, ContextAware, FilterAttachable {

  public String getName();
  public void setName(String name);
  void doAppend(E event);
  
}
```

`void doAppend(E event)` : 日志对于我们来说是一段文本，对于它来说是一个事件。



##### `ch.qos.logback.classic.spi.LoggingEvent` 

```java
public interface LoggingEvent {

    Level getLevel();

    Marker getMarker();

    String getLoggerName();

    String getMessage();

    String getThreadName();

    Object[] getArgumentArray();

    long getTimeStamp();

    Throwable getThrowable();

}
```





```java
private void buildLoggingEventAndAppend(final String localFQCN, final Marker marker, final Level level, final String msg, final Object[] params,
                                        final Throwable t) {
    LoggingEvent le = new LoggingEvent(localFQCN, this, level, msg, t, params);
    le.setMarker(marker);
    callAppenders(le);
}
```

我们 的 `log.info（msg）` 通过层层的包装成一个日志的事件对象输出到我这个 Appender 里边来，

我们一个日志里边可以包含多个 Appender。那么自然而然是 `CallAppenders（le）` 的时候会进行相应的迭代：

```java
public void callAppenders(ILoggingEvent event) {
    int writes = 0;
    for (Logger l = this; l != null; l = l.parent) {
        writes += l.appendLoopOnAppenders(event);
        if (!l.additive) {
            break;
        }
    }
    // No appenders in hierarchy
    if (writes == 0) {
        loggerContext.noAppenderDefinedWarning(this);
    }
}
```

##### 一个日志关联了多个 Appenders， 一个 Appenders 每次会关联一个 ILoggingEvent 事件



​	当你文档看的不太明白的时候，可以利用反向的思维去理解。

通过配置的方式简化相关的操作。 	https://logback.qos.ch/manual/configuration.html

我们配置的时候，既没有 DTD ，也没有 Schema

DTD： 文档类型定义（Document Type Definition）

schema : 也称作 XML Schema Definition, XSD 基于 XML 的 DTD 的替代者。

> Example: Basic configuration file (logback-examples/src/main/resources/chapters/configuration/sample0.xml)
>
> ```
> <configuration>
> 
>   <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
>     <!-- encoders are assigned the type
>          ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
>     <encoder>
>       <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
>     </encoder>
>   </appender>
> 
>   <root level="debug">
>     <appender-ref ref="STDOUT" />
>   </root>
> </configuration>
> ```



##### `ch.qos.logback.classic.spi.Configurator`

```java
public interface Configurator extends ContextAware {
    public void configure(LoggerContext loggerContext);
}
```



##### `ch.qos.logback.classic.BasicConfigurator`

```java
public class BasicConfigurator extends ContextAwareBase implements Configurator {
    ... 
    public void configure(LoggerContext lc) {
        // 传一个上下文过来，配置一个默认的上下文。
    }
}
```



#### Demo

```java
public class logbackDemo {
    public static void main(String[] args) {
        LoggerContext loggerContext = new LoggerContext();
        // 去 Cache 里边去取，如果存在就返回，没有的话，实例化一个
        Logger logger = loggerContext.getLogger(logbackDemo.class);
        // 添加控制台的日志附加器
        logger.addAppender(new ConsoleAppender<>());
        BasicConfigurator basicConfigurator = new BasicConfigurator();
        basicConfigurator.configure(loggerContext);
        logger.info("hello, logback");
    }
}
```

我们所有的配置器是通过文件的方式是来进行加载的。

log4j 两种

logback 有两种 xml 和 groovy  两种方式配置。

> ### Automatic configuration with *logback-test.xml* or *logback.xml*

logback.xml 和 logback-test.xml 会自动加载这些东西。



## 统一API

`org.slf4j.Logger`

通过接口的编程比实现类耦合度更小一点。

Apache `Commons-logging`

SpringFramework 为了不绑定某一个框架，使用了 `commons-logging` 来进行适配，

现在很多人用 Logback 之后，

Slf4j 

当你依赖 slf4j 的时候,  `org.slf4j:log4j-over-slf4j:1.7.25` 这里边的代码，和 Log4j 的 api 的格式和 log4j 一摸一样的的，但是实现呢，不是 log4j 

也就是代码中，使用 log4j，的时候，可以通过这个 jar 包，适配或桥接到 slfj 上。

```java
{
    org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(logbackDemo.class);
}
```

你有这样一段代码，你的 jar 包中没有 log4j 的实现的。你没有办法改，它是在一个二方包里边的，可能输出到某个日志文件里边去，你需要将 log4j 转接到 slf4j 上去，

当有 `java.util.logger` 的日志呢，slf4j 也会帮你进行适配，适配到它的接口里边去。



​	大家在使用的时候，会发现很多问题，大家在使用 **Spring Boot** 的时候，会有很多问题，我们桥接包的问题，有可能你的二方包会依赖很重，一旦遇到 **Maven** ，就无法避免遇到间接的依赖，间接依赖，我们就必须关注我们依赖的 jar 包，

​	log4j 编程也没关系，因为会桥接，但是建议二方包做一个升级，有一个很不好的地方，

​	如果我的框架深度耦合了某一种框架的 API 我要做日志框架的升级，就会非常的不好做了，我现在用 logback ，以后用 log4j2 ，那就非常难做，所以我们就会很难做，必须依赖某一个 jar 包，所以我们要用 slf4j ，全部都用接口的方式来进行编程。

### slf4j

简单日志门面（Simple Logging Facade for Java）

门面模式，做了简单的适配。

```java
public class Slf4jDemo {
    public static void main(String[] args) {
        // 类会决定全路径名称，和 Slf4jDemo.class 和 Slf4jDemo.class.getName() 一摸一样的
        // 在重载方法一样都是一样的
        Logger logger = LoggerFactory.getLogger(Slf4jDemo.class);
        logger.info("Hello, slf4j");
    }
}
```



`org.slf4j.LoggerFactory`

```java
public static Logger getLogger(String name) {
    ILoggerFactory iLoggerFactory = getILoggerFactory();
    return iLoggerFactory.getLogger(name);
}
```



`org.slf4j.LoggerFactory`

```java
public static ILoggerFactory getILoggerFactory() {
    if (INITIALIZATION_STATE == UNINITIALIZED) {
        synchronized (LoggerFactory.class) {
            if (INITIALIZATION_STATE == UNINITIALIZED) {
                INITIALIZATION_STATE = ONGOING_INITIALIZATION;
                performInitialization();
            }
        }
    }
    switch (INITIALIZATION_STATE) {
    case SUCCESSFUL_INITIALIZATION:
        return StaticLoggerBinder.getSingleton().getLoggerFactory();
    case NOP_FALLBACK_INITIALIZATION:
        return NOP_FALLBACK_FACTORY;
    case FAILED_INITIALIZATION:
        throw new IllegalStateException(UNSUCCESSFUL_INIT_MSG);
    case ONGOING_INITIALIZATION:
        // support re-entrant behavior.
        // See also http://jira.qos.ch/browse/SLF4J-97
        return SUBST_FACTORY;
    }
    throw new IllegalStateException("Unreachable code");
}
```

相当于全局建了一个 `LoggerContext` 日志上下文。

`org.slf4j.impl.StaticLoggerBinder` 

```java
private static StaticLoggerBinder SINGLETON = new StaticLoggerBinder();
public static StaticLoggerBinder getSingleton() {
    return SINGLETON;
}
void init() {
        try {
            try {
                // 自动配置
                new ContextInitializer(defaultLoggerContext).autoConfig();
            } catch (JoranException je) {
                Util.report("Failed to auto configure default logger context", je);
            }
            // logback-292
            if (!StatusUtil.contextHasStatusListener(defaultLoggerContext)) {
                StatusPrinter.printInCaseOfErrorsOrWarnings(defaultLoggerContext);
            }
            contextSelectorBinder.init(defaultLoggerContext, KEY);
            initialized = true;
        } catch (Exception t) { // see LOGBACK-1159
            Util.report("Failed to instantiate [" + LoggerContext.class.getName() + "]", t);
        }
    }
```

是一个 static ，JVM 级别的对象，整个 JVM 只有这一个级别的对象，

`ch.qos.logback.classic.util.ContextInitializer`

会去绑定一些相应的实现类，及进行绑定。

```java
public void autoConfig() throws JoranException {
    StatusListenerConfigHelper.installIfAsked(loggerContext);
    URL url = findURLOfDefaultConfigurationFile(true);
    if (url != null) {
        configureByResource(url);
    } else {
        Configurator c = EnvUtil.loadFromServiceLoader(Configurator.class);
        if (c != null) {
            try {
                c.setContext(loggerContext);
                c.configure(loggerContext);
            } catch (Exception e) {
                throw new LogbackException(String.format("Failed to initialize Configurator: %s using ServiceLoader", c != null ? c.getClass()
                                .getCanonicalName() : "null"), e);
            }
        } else {
            BasicConfigurator basicConfigurator = new BasicConfigurator();
            basicConfigurator.setContext(loggerContext);
            basicConfigurator.configure(loggerContext);
        }
    }
}
```



​	当你把 logback.xml 放到 classpath 下边的时候，他就会去读取，`org.slf4j.impl.StaticLoggerBinder` 去读取，在 logback 的实现，

​	学技术要学会本质， Log4j 1996 年开始，到现在即使有了 logback 仍然有 log4j 的影子。

​	ILoggerFactory 里边进行相应的操作。

​	Slf4j 可以适配，logback, log4j 

```properties
management.security.enabled=false
```

http://localhost:8080/loggers 

管理

Loggger 中的 `callAppenders()` 会一次一次的找它的 parent 找到他自己本身，root 又引入了一次，所以会有两次。

properties 本质上就是调用我的 setLevel() 的 API。

##### `org.springframework.boot.logging.LoggingApplicationListener`

```java
public void onApplicationEvent(ApplicationEvent event) {
    if (event instanceof ApplicationStartingEvent) {
        this.onApplicationStartingEvent((ApplicationStartingEvent)event);
    } else if (event instanceof ApplicationEnvironmentPreparedEvent) {
        this.onApplicationEnvironmentPreparedEvent((ApplicationEnvironmentPreparedEvent)event);
    } else if (event instanceof ApplicationPreparedEvent) {
        this.onApplicationPreparedEvent((ApplicationPreparedEvent)event);
    } else if (event instanceof ContextClosedEvent && ((ContextClosedEvent)event).getApplicationContext().getParent() == null) {
        this.onContextClosedEvent();
    } else if (event instanceof ApplicationFailedEvent) {
        this.onApplicationFailedEvent();
    }

}

private void onApplicationStartingEvent(ApplicationStartingEvent event) {
    this.loggingSystem = LoggingSystem.get(event.getSpringApplication().getClassLoader());
    this.loggingSystem.beforeInitialize();
}
public abstract void beforeInitialize();
```

`LoggingApplicationListener`

- `#onApplicationStartingEvent(event)`
  - `#onApplicationStartingEvent(event)`
    - `#beforeInitialize()` 
      - 

		把事件丢过来， 

##### `org.springframework.boot.logging.LoggingSystem`

```java
static {
    Map<String, String> systems = new LinkedHashMap();
    systems.put("ch.qos.logback.core.Appender", "org.springframework.boot.logging.logback.LogbackLoggingSystem");
    systems.put("org.apache.logging.log4j.core.impl.Log4jContextFactory", "org.springframework.boot.logging.log4j2.Log4J2LoggingSystem");
    systems.put("java.util.logging.LogManager", "org.springframework.boot.logging.java.JavaLoggingSystem");
    SYSTEMS = Collections.unmodifiableMap(systems);
}
public static LoggingSystem get(ClassLoader classLoader) {
    String loggingSystem = System.getProperty(SYSTEM_PROPERTY);
    if (StringUtils.hasLength(loggingSystem)) {
        return (LoggingSystem)("none".equals(loggingSystem) ? new LoggingSystem.NoOpLoggingSystem() : get(classLoader, loggingSystem));
    } else {
        Iterator var2 = SYSTEMS.entrySet().iterator();

        Entry entry;
        do {
            if (!var2.hasNext()) {
                throw new IllegalStateException("No suitable logging system located");
            }

            entry = (Entry)var2.next();
        } while(!ClassUtils.isPresent((String)entry.getKey(), classLoader));

        return get(classLoader, (String)entry.getValue());
    }
}

private static LoggingSystem get(ClassLoader classLoader, String loggingSystemClass) {
    try {
        Class<?> systemClass = ClassUtils.forName(loggingSystemClass, classLoader);
        return (LoggingSystem)systemClass.getConstructor(ClassLoader.class).newInstance(classLoader);
    } catch (Exception var3) {
        throw new IllegalStateException(var3);
    }
}
```



`org.springframework.boot.logging.LoggingSystem#get(java.lang.ClassLoader)`

- `org.springframework.boot.logging.LoggingSystem#get(java.lang.ClassLoader, java.lang.String)`



> | Logging System          | Customization                                                |
> | ----------------------- | ------------------------------------------------------------ |
> | Logback                 | `logback-spring.xml`, `logback-spring.groovy`, `logback.xml`, or `logback.groovy` |
> | Log4j2                  | `log4j2-spring.xml` or `log4j2.xml`                          |
> | JDK (Java Util Logging) | `logging.properties`                                         |
>
> 

可以通过日志的跟踪，找到错误



API 方式修改日志级别，通过 Slf4j 的方式去打印日志

`application.properties` 去动态调整

`org.springframework.boot.logging.LoggingSystem` LinkedHashMap logback > log4j



`logback.xml` 优先于 `logback-spring.xml` 



```xml
<appender name="STDOUT" class="ch.qos.logback.core.FileAppender">
    <fileName>${path}</fileName>
</appender>
```

```java
System.setProperty("path","....");
```

或者 -D 的方式传进来



Spring 对其进行了相应的扩展。

```xml
<springProperty scope="context" name="fluentHost" source="myapp.fluentd.host"
		defaultValue="localhost"/>
<appender name="FLUENT" class="ch.qos.logback.more.appenders.DataFluentAppender">
	<remoteHost>${fluentHost}</remoteHost>
	...
</appender>
```



日志接口替换的时候，原来日志的 jar 包尽量删除，



Logger static 好，还是



```java
public abstract class BaseController  {
    protected final Logger logger = LoggerFactory.getLogger(BaseController.class);

}
```

```java
@RestController
public class LoggerController extends BaseController{

    @GetMapping("/log")
    public void log(@RequestParam String message) {
        System.setProperty("path","....");

        if( logger instanceof ch.qos.logback.classic.Logger){
            ch.qos.logback.classic.Logger.class.cast(logger).setLevel(Level.DEBUG);
        }
        logger.debug(message);
    }
}
```

抽象类可以继承，其实它的实现里边有缓存的。不用担心开销。

《The Complete log4j Manual》



#### 看不懂英文文档怎么解?

>[56. Loggers](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#production-ready-loggers)
>
>- [56.1. Configure a Logger](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#production-ready-logger-configuration)
>
>- [56.1. Configure a Logger](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#production-ready-logger-configuration)
>
>  ## 56.1 Configure a Logger
>
>  To configure a given logger, `POST` a partial entity to the resource’s URI, as shown in the following example:
>
>  ```
>  {
>  	"configuredLevel": "DEBUG"
>  }
>  ```
>
>  | ![[Tip]](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/tip-1543769127901.png) |
>  | ------------------------------------------------------------ |
>  | To “reset” the specific level of the logger (and use the default configuration instead), you can pass a value of `null` as the `configuredLevel`. |
>
>  可以动态的调整



`jdk.internal.reflect.Reflection` 

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = Thread.currentThread();
        Map<Thread, StackTraceElement[]> threadMap = Thread.getAllStackTraces();
        StackTraceElement[] stackTraceElements = threadMap.get(thread);
        Stream.of(stackTraceElements).forEach( System.out::println);
    }
}
```

值好拿到，但是 名称很难得到，

需要编译时得时候，打印得时候，在 打印的时候，把重载方法，很麻烦。



```java
public void method(String s){
    log.info("messages");
    // 能否把 "s" 给打印出来 s = message
    // info -> appender
}
```

堆栈是一个数据结构，我通过 Appender 取到上一栈的方法参数，会至少有两栈的调用。