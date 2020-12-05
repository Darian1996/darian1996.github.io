---
catalog: true
tags:
- Spring
- JAVA
- 资源管理
- URL 扩展
---



# Java 资源管理以及在Spring中的应用

### 议题

- Java 资源管理
- Java URL 协议扩展
- Spring 资源管理



## Java 资源管理

- 文件资源
  - XML 文件
  - Properties 文件
- 网络资源
  - HTTP
  - FTP
- 类路径资源



> ​	 源码怎么学习,打个比方，关于语文，大多数文章都来自于《古文观止》， 它都是比较优秀的文章，你如果没有看到不优秀的，你看《二十四史》、《二十五史》，它们里边的话不一定都是那么的经典，你看的多了，就会对业界的基本用法，套路有一个相应的掌握，你看 `Spring Boot` 、`Spring Cloud` 源码的时候，不能只看 A，你要看 B、C、D，你要有很多的时间去 **`拾捡`** 。

##### `java.io.File` 

首先是一个文件的 **`I/O`** , `JDk1.0` 就有了  ，

 `java.nio.file.Path` 是 `since 1.7` 才有，主要是处理一些资源，

Spring Boot 是打成了一个 **`Jar`**  包，那么 **`jar`** 包里边的资源是如何访问的呢？



```java
public class PropertiesDemo {
    public static void main(String[] args) throws Exception {
      // 这个文件的路径在什么地方
        File file = new File("");
        System.out.println(file.getAbsolutePath());

        File propertiesFile = new File("D:\\GuPao_IDEA_xiaomage_workspace\\GP-public\\java-resource\\src\\main\\resources\\application.properties");
        Properties properties = new Properties();
        properties.load(new FileReader(propertiesFile));
        String appName = properties.getProperty("spring.application.name");
        System.out.println(appName);

    }
}
```

```verilog
// 工程的路径
D:\GuPao_IDEA_xiaomage_workspace\GP-public\java-resource
```



##### `java.lang.System`

```java
/**
     * System properties. The following properties are guaranteed to be defined:
     * <dl>
     * <dt>java.version         <dd>Java version number
     * <dt>java.version.date    <dd>Java version date
     * <dt>java.vendor          <dd>Java vendor specific string
     * <dt>java.vendor.url      <dd>Java vendor URL
     * <dt>java.vendor.version  <dd>Java vendor version
     * <dt>java.home            <dd>Java installation directory
     * <dt>java.class.version   <dd>Java class version number
     * <dt>java.class.path      <dd>Java classpath
     * <dt>os.name              <dd>Operating System Name
     * <dt>os.arch              <dd>Operating System Architecture
     * <dt>os.version           <dd>Operating System Version
     * <dt>file.separator       <dd>File separator ("/" on Unix)
     * <dt>path.separator       <dd>Path separator (":" on Unix)
     * <dt>line.separator       <dd>Line separator ("\n" on Unix)
     * <dt>user.name            <dd>User account name
     * <dt>user.home            <dd>User home directory
     * <dt>user.dir             <dd>User's current working directory
     * </dl>
     */
```

`java.class.parth` 类路径

`user.dir` 当前的工作路径

`user.home` 用户路径，就是 **Linux** 系统中，的用户路径下边。



##### `java.io.FileSystem`

```java
class WinNTFileSystem extends FileSystem {
```



```xml
<resources>
   <resource>
      <includes>${basedir}</includes>
   </resource>
</resources>
```

```xml
<resources>
   <resource>
      <includes>${user.dir}</includes>
   </resource>
</resources>
```

都可以。替换符，就是你系统设置的一种方式。

当 maven 去打包的时候，他怎么知道当前的路径呢？Java 运行的时候，有一个所谓的工作路径，`user.dir` ，`user.dir` 是放到 `Sysetm.properties` 里边，然后，你在写单元测试的时候，需要考虑移植性，你要考虑它的一致性，有没有人会因为你的这段代码有问题，线上打包的时候，外部化配置，给替换掉也是一种方式，



你读取 `Properties` ，Properties 通过某种方式去读取。

万能的重启解决问题。



`resources` 下边的最终会生成在 `target/classes` 下边。这个时候怎么做，

```java
        System.err.println(System.getProperty("java.class.path"));
```

```verilog

D:\GuPao_IDEA_xiaomage_workspace\GP-public\java-resource\target\classes;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot-starter-web\2.0.7.RELEASE\spring-boot-starter-web-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot-starter\2.0.7.RELEASE\spring-boot-starter-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot\2.0.7.RELEASE\spring-boot-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot-autoconfigure\2.0.7.RELEASE\spring-boot-autoconfigure-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot-starter-logging\2.0.7.RELEASE\spring-boot-starter-logging-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar;D:\anzhuang\DevInstall\repository\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar;D:\anzhuang\DevInstall\repository\org\apache\logging\log4j\log4j-to-slf4j\2.10.0\log4j-to-slf4j-2.10.0.jar;D:\anzhuang\DevInstall\repository\org\apache\logging\log4j\log4j-api\2.10.0\log4j-api-2.10.0.jar;D:\anzhuang\DevInstall\repository\org\slf4j\jul-to-slf4j\1.7.25\jul-to-slf4j-1.7.25.jar;D:\anzhuang\DevInstall\repository\javax\annotation\javax.annotation-api\1.3.2\javax.annotation-api-1.3.2.jar;D:\anzhuang\DevInstall\repository\org\yaml\snakeyaml\1.19\snakeyaml-1.19.jar;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot-starter-json\2.0.7.RELEASE\spring-boot-starter-json-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\jackson\core\jackson-databind\2.9.7\jackson-databind-2.9.7.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\jackson\core\jackson-annotations\2.9.0\jackson-annotations-2.9.0.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\jackson\core\jackson-core\2.9.7\jackson-core-2.9.7.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.9.7\jackson-datatype-jdk8-2.9.7.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.9.7\jackson-datatype-jsr310-2.9.7.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\jackson\module\jackson-module-parameter-names\2.9.7\jackson-module-parameter-names-2.9.7.jar;D:\anzhuang\DevInstall\repository\org\springframework\boot\spring-boot-starter-tomcat\2.0.7.RELEASE\spring-boot-starter-tomcat-2.0.7.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\apache\tomcat\embed\tomcat-embed-core\8.5.35\tomcat-embed-core-8.5.35.jar;D:\anzhuang\DevInstall\repository\org\apache\tomcat\embed\tomcat-embed-el\8.5.35\tomcat-embed-el-8.5.35.jar;D:\anzhuang\DevInstall\repository\org\apache\tomcat\embed\tomcat-embed-websocket\8.5.35\tomcat-embed-websocket-8.5.35.jar;D:\anzhuang\DevInstall\repository\org\hibernate\validator\hibernate-validator\6.0.13.Final\hibernate-validator-6.0.13.Final.jar;D:\anzhuang\DevInstall\repository\javax\validation\validation-api\2.0.1.Final\validation-api-2.0.1.Final.jar;D:\anzhuang\DevInstall\repository\org\jboss\logging\jboss-logging\3.3.2.Final\jboss-logging-3.3.2.Final.jar;D:\anzhuang\DevInstall\repository\com\fasterxml\classmate\1.3.4\classmate-1.3.4.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-web\5.0.11.RELEASE\spring-web-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-beans\5.0.11.RELEASE\spring-beans-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-webmvc\5.0.11.RELEASE\spring-webmvc-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-aop\5.0.11.RELEASE\spring-aop-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-context\5.0.11.RELEASE\spring-context-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-expression\5.0.11.RELEASE\spring-expression-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\slf4j\slf4j-api\1.7.25\slf4j-api-1.7.25.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-core\5.0.11.RELEASE\spring-core-5.0.11.RELEASE.jar;D:\anzhuang\DevInstall\repository\org\springframework\spring-jcl\5.0.11.RELEASE\spring-jcl-5.0.11.RELEASE.jar;D:\anzhuang\IntelliJ IDEA 2018.1.4\lib\idea_rt.jar
java-resource-demo

Process finished with exit code 0

```





```java
public class PropertiesDemo {
    public static void main(String[] args) throws Exception {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream("application.properties");
        Properties properties = new Properties();
        properties.load(inputStream);
        String appName = properties.getProperty("spring.application.name");
        System.out.println(appName);

    }
}
```

它也是一个一个去找的，找到为止，

`-classpath` 一个一个找，

Maven 默认对应的 resources 目录，maven 的插件也可以去做， jar 包，war 包多了一个 `webapp` 的目录

排除某一个路径下的资源。很多情况下都是这样做的。

```xml
<build>
    <resources>
        <resource>
            <directory>${user.dir}/src/main/resources</directory>
            <excludes>
                <exclude>*.properties</exclude>
            </excludes>
        </resource>
    </resources>
</build>
```



​	 **`jar`** 包，打完之后是一个 jar 包，一般来说可以执行，比方说是一个二方库，**`war`** 包一般是 **`webapp`** ，是 `Web` 项目，

- `jar` 类库，
- `war` web应用
- `pom` 主要是管理依赖，你是 `父pom` ，可以去管理子项目的版本。



资源文件在上边，ClassPath 在下边

windows 是“/”

### HTTP

我们用Spring的话，可以 restTemplate



浏览器有响应头和响应体。

restTemplate 可以适配 HttpClient 和 OkHttp 都可以。

```java
public static void main(String[] args) throws IOException {
    // URL https://start.spring.io/

    RestTemplate restTemplate = new RestTemplate();
    InputStream inputStream = restTemplate.execute("https://start.spring.io/",
                                                   HttpMethod.GET,
                                                   request -> {
                                                   },
                                                   Response -> Response.getBody());
    // 正常来说应该从相应体里边拿出来
    InputStreamReader reader = new InputStreamReader(inputStream, "UTF-8");
    System.out.println(reader);
}
```



### Java URL 协议的拓展

- URL
- URLConnection
- URLStreamHandler
- URLStremHandlerFacotory

##### `java.net.URL`

```java
transient URLStreamHandler handler;
public final InputStream openStream() throws java.io.IOException {
    return openConnection().getInputStream();
}
public URLConnection openConnection() throws java.io.IOException {
    return handler.openConnection(this);
}
```

![1543624209047](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543624209047.png)



根据我不同的协议，构建不同的 handler ，是层层委派的关系。

比较多的实现方式都是它的拓展机制。



```java
public static void main(String[] args) throws MalformedURLException {
    File file = new File("src/main/resources/application.properties");
    URL url = file.toURI().toURL();
    System.out.println(url);
}
```

```verilog
file:/D:/GuPao_IDEA_xiaomage_workspace/GP-public/java-resource/src/main/resources/application.properties
```



Java 通过 URL 的方式可以用统一的编程模型来进行操作。



#### 我可以自定义一种 URL 协议

URLStreamHandler 是生成 URLContection 的，负责把我当前的 URL 读进来的时候，生成对应的链接，

URLConnection 负责把我的 Stream 转化过来。



我们通过 URL `http:` 、 `file:` 都读出来了

- URL
  - URLContection
    - URLStreamHandler
      - InputStream



```java
public static void main(String[] args) throws Exception {
    File file = new File("src/main/resources/application.properties");
    URL fileUrl = file.toURI().toURL();
    URLConnection urlConnection = fileUrl.openConnection();

    InputStream inputStreamFromURL = urlConnection.getInputStream();

    String context = StreamUtils.copyToString(inputStreamFromURL, Charset.forName("UTF-8"));
    System.out.println(context);
}
```



HttpURLConnection extends URLConection



- URLStreamhandler 
  - `sun.net.www.protocol.file.Handler` 文本协议的 Handler
  - `sun.net.www.protocol.http.Handler`  HTTP URl 的handler
  - `sun.net.www.protocol.https.Handler` https 的
  - `sun.net.www.protocol.war.Handler`  war URl 的handler
  - `sun.net.www.protocol.jar.Handler`  jar URl 的handler
  - `sun.net.www.protocol.ftp.Handler`  HTTP URl 的handler

模式： `sun.net.www.protocol.${protocol}.Handler`



策略模式的实现，根据不同的策略生成不同的 URL

```java
public URL(String protocol, String host, int port, String file,
               URLStreamHandler handler) throws MalformedURLException {
```



```java
URL url = new URL("https://start.spring.io/");      // https
URL ftpurl = new URL("ftp://ftp.baidu.com");        // ftp
URL jarurl = new URL("jar://jar.baidu.com");        // jar 协议
URL wetchat = new URL("webchat://...");             // 微信协议
URL dubboURL = new URL("dubbo://...");              // dubbo 协议
URL classpathURL = new URL("classpath:/");          /// classpath
```

这个 ClassPathURl 怎么做到的。



`java.net.URL.DefaultFactory`

```java
private static class DefaultFactory implements URLStreamHandlerFactory {
        private static String PREFIX = "sun.net.www.protocol";

        public URLStreamHandler createURLStreamHandler(String protocol) {
            String name = PREFIX + "." + protocol + ".Handler";
            try {
                @SuppressWarnings("deprecation")
                Object o = Class.forName(name).newInstance();
                return (URLStreamHandler)o;
            } catch (ClassNotFoundException x) {
                // ignore
            } catch (Exception e) {
                // For compatibility, all Exceptions are ignored.
                // any number of exceptions can get thrown here
            }
            return null;
        }
    }
```

![1543635545046](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543635545046.png)



这里有 file、ftp、http、https、jar...协议



Spring Boot 到最后打的是一个 jar 包。

Spring Boot 怎么知道 `BOOT-INF\lib\` 下边有那些 **`jar`** 的呢？

##### `java.net.URLStreamHandlerFactory` 

![1543635894387](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543635894387.png)



Spring boot 扩展了 tomcat、jetty

Tomcat拓展了

```java
private static class DefaultFactory implements URLStreamHandlerFactory {
    private static String PREFIX = "sun.net.www.protocol";

    public URLStreamHandler createURLStreamHandler(String protocol) {
        String name = PREFIX + "." + protocol + ".Handler";
        try {
            @SuppressWarnings("deprecation")
            Object o = Class.forName(name).newInstance();
            return (URLStreamHandler)o;
        } catch (ClassNotFoundException x) {
            // ignore
        } catch (Exception e) {
            // For compatibility, all Exceptions are ignored.
            // any number of exceptions can get thrown here
        }
        return null;
    }
}
```

Java 中的默认的协议 `“sun.net.www.protocol”` + protocol + `".Handler"`;



​	我们为什么能够通过读一些资源的方式读到一些文件。我们可以了解一下 jar 协议。

### Spring boot 的 jar 的协议

```java
public static void main(String[] args) {
    // 装载这个类的文件
    ClassLoader classLoader = ApplicationContext.class.getClassLoader();
    URL url = classLoader.getResource("META-INF/license.txt");
    System.out.println(url);
}
```



```java
jar:file:/D:/anzhuang/DevInstall/repository/org/springframework/spring-web/5.0.11.RELEASE/spring-web-5.0.11.RELEASE.jar!/META-INF/license.txt
```

- url.handler.getClass()
  - `class sun.net.www.protocol.jar.Handler`

ClassPath 为什么可以读到这个文件？是因为传递的时候把 `URLStreamHandlerFacotory` 读进去了，jar 包里边的东西，在 ClassLoader 的阶段已经把这个东西 `URlStreamHandlerFactory` 给塞进去了。





```java
public class ClasspathDemo {
    public static void main(String[] args) throws IOException {
        // Spring Classpath protocol
        // classpath:/META-INF/license.txt
        URL url = new URL("classpath:/META-INF/license.txt");

        URLConnection urlConnection = url.openConnection();
        InputStream inputStream = urlConnection.getInputStream();
        String context = StreamUtils.copyToString(inputStream, Charset.forName("UTF-8"));
        System.out.println(context);
    }
}
```

```c
Exception in thread "main" java.net.MalformedURLException: unknown protocol: classpath
```





```java
classLoader.getResource("META-INF/license.txt");
```

我们通过 ClassLoader 可以访问到，

```java
 URL url = new URL("classpath:/META-INF/license.txt");
```

我们只需要将 `classpath:/` 去掉就可以了，偷懒一下。

​	classpath 相同的资源可以在不同的 jar 包里边去，因为他并不是唯一鉴定的。Spring 也会有这个问题。

​	

## Spring 资源管理

- Resource
- ResourceLoader
- PortocolResolver(Since 4.3)



##### `org.springframework.core.io.Resource`

```java
public interface Resource extends InputStreamSource {
    boolean exists();

    default boolean isReadable() {
        return true;
    }

    default boolean isOpen() {
        return false;
    }

    default boolean isFile() {
        return false;
    }

    URL getURL() throws IOException;

    URI getURI() throws IOException;

    File getFile() throws IOException;

    default ReadableByteChannel readableChannel() throws IOException {
        return Channels.newChannel(this.getInputStream());
    }

    long contentLength() throws IOException;

    long lastModified() throws IOException;

    Resource createRelative(String var1) throws IOException;

    @Nullable
    String getFilename();

    String getDescription();
}
```

他和 URL 非常像，也就是封装的比较好而已。它的父类

##### `org.springframework.core.io.InputStreamSource`

```java
public interface InputStreamSource {
    InputStream getInputStream() throws IOException;
}
```

它的父类有一个方法： `#getInputStream()`

```java
public class ResourceDemo {
    public static void main(String[] args) throws IOException {
        // Resource
        // FileSystemResource
        // ClassPathResource
        ResourceLoader resourceLoader = new DefaultResourceLoader();
        Resource resource = resourceLoader
                .getResource("classpath:/application.properties");

        InputStream inputStream = resource.getInputStream();
        String content = StreamUtils.copyToString(inputStream, Charset.forName("UTF-8"));
        System.out.println(content);
    }
}
```

Spring 的实现，



`"/"` 的话，直接用 `classpathLoader` 来做， `classpath:` 开头的时候，前缀截掉。  

```java
public Resource getResource(String location) {
    Assert.notNull(location, "Location must not be null");
    Iterator var2 = this.protocolResolvers.iterator();

    Resource resource;
    do {
        if (!var2.hasNext()) {
            if (location.startsWith("/")) {
                return this.getResourceByPath(location);
            }

            if (location.startsWith("classpath:")) {
                return new ClassPathResource(location.substring("classpath:".length()), this.getClassLoader());
            }

            try {
                URL url = new URL(location);
                return (Resource)(ResourceUtils.isFileURL(url) ? new FileUrlResource(url) : new UrlResource(url));
            } catch (MalformedURLException var5) {
                return this.getResourceByPath(location);
            }
        }

        ProtocolResolver protocolResolver = (ProtocolResolver)var2.next();
        resource = protocolResolver.resolve(location, this);
    } while(resource == null);

    return resource;
}

protected Resource getResourceByPath(String path) {
    return new DefaultResourceLoader.ClassPathContextResource(path, this.getClassLoader());
}
```

​	这种方式提供了统一的 API，当他不是 ClassPath 的时候，委派给 `URL` URL.`#getInputStream()` 资源的管理。



​	Spring 4.3 之后，有一个扩展，

​	

### Java URL 协议拓展：

- URL
- URLConnection
- URLStreamHandler
- URLStreamHandlerFactory



利用这个可以更改 Tomcat 的协议。



1. `URLStreamHandlerFactory` 工厂模式生成 `URLStreamHandler` 的工厂
2. `UrlStreamHandler` 对 URL 进行一个开发，对于这个 URL 的 `#openConection()` 的开和闭是一个相应的模板模式，针对你这个协议做了一个模板，
3. 最终还是 URL 做了一个委派。



Spring 是 Resouce

