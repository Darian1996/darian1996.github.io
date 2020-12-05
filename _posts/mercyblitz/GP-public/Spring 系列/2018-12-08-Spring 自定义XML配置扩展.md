---
catalog: true
tags:
- Spring
- XML拓展
- XML
---



为什么 JAVA 为什么离不开 Spring？

因为很大的原因是因为开源，JAVA 很多东西都不开源 weblogic 等，

有人说 Spring 的 jar 包会很大，是因为它的功能比较全面，Spring 已经分的很清楚了，`Spring-core` 核心包，`Spring-Context` 、 `Spring-AOP` 

- 版本 
  - 特性（版本跟着特性）
- 模块
  - 功能（模块决定一些功能）

`Spring-jdbc` 

`spring-orm` 

`spring-jms` 

`spring-ws` 



因为熟悉 JavaEE 所以才熟悉 Spring .

### 议题：

- Spring XML 配置拓展机制
- Spring Framework 内建实现
- 自定义 XML 配置拓展



​	我们在学习的过程中，不应该只学习 JAVA ，JAVA 以外的东西也很重要。XML 其实非常的复杂。

Spring Framework 2.x -> 5.0

Spring Boot 1.x -> 2.0

​	纪传体，编年体。

​	设计的理念比较重要。

​	关于 注解的 `派生性` 

​	Spring MVC 的源码分析。

[Spring 官网 XML 的链接：](https://docs.spring.io/spring/docs/5.1.3.RELEASE/spring-framework-reference/core.html#xsd-schemas)



​	从 2.0 版本开始，

[W3chools](http://www.w3school.com.cn/x.asp) 

- DOM 技术： Document Object Model 文档对象模型 - Tree 属性
  - 属性结构、好理解、性能最差
- SAX     simple API for XML  （Event） 事件
  - 文本处理，性能好
- XML Stream   BEA   （Stream）  数据流
  - 事件处理，性能良好，相对好理解
- JAXB      Java API XML Binding 
  - 面向对象，容易 OOP ，性能良好



​	基础知识扎实才能看源码不晕。Java 里边的技术一个一个关联。

##### `org.w3c.dom.Document` 

```java
public interface Document extends Node {
}
```

​	

Document 主要指整个网页

`org.w3c.dom.Node#getChildNodes`  dom

`javax.xml.stream.XMLStreamReader`  xmlStream



Spring 5 之后，文档发生了变化，

> Data Access 里有 Marshalling XML 这个东西

​	他有很多 ORM 映射，用到 DOM、SAX 的东西，研究源码，没有技术，你根本理解不透。

##### DTD

> ​	DTD （文档类型定义）的作用是定义 XML 文档的合法构建模块，他使用一系列的合法元素来定义文档就结构。
>
> - Spring 2.0 前是 DTD
>   - log4j.dtd
>   - spring.dtd
> - Spring 2.0 之后,    Schema
>   - spring-beans.xsd
>   - Spring-context.xsd
>
> 分的很细了，DTD 约束比较小，Schema 约束比较大。



> ```xml
> <?xml version="1.0" encoding="UTF-8"?>
> <beans xmlns="http://www.springframework.org/schema/beans"
>     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>     xmlns:jee="http://www.springframework.org/schema/jee"
>     xsi:schemaLocation="
>         http://www.springframework.org/schema/beans
>         http://www.springframework.org/schema/beans/spring-beans.xsd
>         http://www.springframework.org/schema/jee
>         http://www.springframework.org/schema/jee/spring-jee.xsd">
> 
>     <jee:jndi-lookup id="dataSource" jndi-name="jdbc/jpetstore"/>
> 
>     <bean id="txManager" class="org.springframework.transaction.jta.JtaTransactionManager" />
> 
>     <!-- other <bean/> definitions here -->
> 
> </beans> 
> ```

 >```dtd
 >>>>><xsd:element name="component-scan">
 >>>>>		<xsd:annotation>
 >>>>>			<xsd:documentation>
 >>>>>			</xsd:documentation>
 >>>>>		</xsd:annotation>
 >>>>>		<xsd:complexType>
 >>>>>			<xsd:sequence>
 >>>>>				<xsd:element name="include-filter" type="filterType"
 >>>>>					minOccurs="0" maxOccurs="unbounded">
 >>>>>					<xsd:annotation>
 >>>>>						<xsd:documentation>
 >>>>>```
 >>>>```
 >>>```
 >>```
 >```

对应的 Spring 的 context 的属性可以配置。

```xml
<context:component-scan base-package="">
    <context:include-filter type="annotation" expression=""/>
</context:component-scan>
```

嵌套式的 element 

![1544304522048](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1544304522048.png)

![1544304564425](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1544304564425.png)

在 XSD 中的 

sequence 决定了它的一些配置的顺序。

有时候，你只知道怎么取配置，但是东西你不知道。



Schema -> Java API XML Binding  (JAXB)

SOAP -> (Simple Object Access Protocol)   -> WSDL



Spring 的实现并不是最好的实现，

站在一个更高的层次去看 Spring ，然后去拓展它。



###### Schema 里边可以约定类型。

>```java
><xsd:attribute name="resource-pattern" type="xsd:string">
>   <xsd:annotation>
>      <xsd:documentation>
>```

Schema 的类型和  Java 的类型相互对应起来了

了解 Java 在了解一下 java 之外的东西，GRPC 是遵顼相应的规范。



我们配置，然后有相应的东西去帮我们处理

```xml
<bean id="" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="locations">
        <value>application.properties</value>
    </property>
</bean>
```



- `org.springframework.beans.factory.config.PlaceholderConfigurerSupport`
  - `org.springframework.beans.factory.config.PropertyPlaceholderConfigurer` 
  - `org.springframework.context.support.PropertySourcesPlaceholderConfigurer` 

```xml
<!-- context:property-placeholder = PropertyPlaceHolderCongigurer -->
    <context:property-placeholder location="application.properties" file-encoding="UTF-8"/>
```

​	Spring 的  property-placeholder 配置的是 context.support 里的，和我们配的 factory.config 里的父类是一样的。是一个类似的机制

###### 通过  XML Schema 拓展替代 Bean 的配置

```xml
<context:property-placeholder location="application.properties" file-encoding="UTF-8"/>

<!-- 假如你写成了下边，就会报错，类型检查比较强烈 -->
<!-- 报错 -->
<context:property-placeholder1 location="application.properties" file-encoding="UTF-8"/>
```

下边  bean 的 class 配错了，启动不起来，但是类型检查比较弱，可以过去。

```xml
<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="locations">
        <value>application.properties</value>
    </property>
    <property name="fileEncoding" value="UTF-8"/>
</bean>
```

我们可以基于这种实现自己的类型检查。

```xml
 http://www.springframework.org/schema/beans/spring-beans.xsd
```

不加版本好更好，它会自己去找。

spring 3

spring 4

spring 5



#### Spring XML 扩展

- schema 配置

  - `META-INF/spring.schemas` 

    - schema 绝对路径 = schema 的相对路径

      - `Properties`  

        ```
        key:value
        ```

        所以有转移字符  http\://www.springframwork.org/schema/context/spring-context.xsd=org/springframwwork/context/config/spring-context.xsd

        

- NameSpace Handler 配置

  - `MATA-INF/spring.handlers`  



###### schema 定义我的 namepache  ->  处理类是谁？？？？

- schema

  ```
  http://www.springframework.org/schema/context/spring-context.xsd
  ```

- namespace

  ```
  http://www.springframework.org/schema/context
  ```

相当于一个别名，命名空间一样的东西。

```xml
<dubbo:refrence />
<!-- dubbo 也是自定义拓展的 -->
```



- Schema 绝对路径

  ```
  http://www.springframework.org/schema/context/spring-context.xsd
  ```

- Schema 相对路径

  ```
  org/springframework/context/config/spring-context.xsd
  ```

  spring-context.xsd 定义了命名空间  `targetNamespace="http://www.springframework.org/schema/context`

- Schema 的命名空间

  ````
  http://www.springframework.org/schema/context
  ````

- Handler 类

  ```
  org.springframework.context.config.ContextNamespaceHandler
  ```



相互的映射

`org.springframework.context.config.ContextNamespaceHandler`

```java
public class ContextNamespaceHandler extends NamespaceHandlerSupport {

   @Override
   public void init() {
      registerBeanDefinitionParser("property-placeholder", new PropertyPlaceholderBeanDefinitionParser());
    //.....
   }
```



对应了一个解析类

`org.springframework.context.config.PropertyPlaceholderBeanDefinitionParser`

Spring 帮你做了这个事情，读取本地路径。

这个没有什么规定，是 Spring 的约定。





通过命名空间找，寻找 Handler 类，handler 类之后，有注册很多东西

Local Elemt name 映射所谓的实现  `BeanDefinitionParser` 

> ```
> "property-placeholder"  =>  PropertyPlaceholderBeanDefinitionParser
> ```



- Bean 的定义： `BeanDefinitioin` 
- Bean 定义解析器：`BeanDefinitionParser` 



#### Spring 

- spring XML schema
  - 自定义元素
    - 解析 Bean 的定义

(了解什么是 schema)



# 扩展操作步骤

- 定义 Schema    `- darian.xsd` 
  - 定义元素 User  - `User` 
  - 定义 `targetNamespace=http://darian.com/schema/darian` 

- 建立 schema 绝对路径和相对路径的映射。 `META-INF/spring.schemas` 

  - 绝对的 XSD  =  相对的 XSD

  - ```
    http\://darian.com/schema/darian.xsd=darian.xsd
    ```

- 添加 `darian.xsd` 到 `context.xml`

  - 引入 namespace 

    - ```
      xmlns:darian="http://darian.com/schema/darian"
      ```

  - 配置 namespace Schema 路径

    - ```
      http://darian.com/schema/darian
      http://darian.com/schema/darian.xsd
      ```

  - 引入 `<darian:user id="1" name="${name}"/>` 

- 建立  Schema namespace 与 Handler 映射 - `META-INF/spring.handlers` 

  - 实现 `org.springframework.beans.factory.xml.NamespaceHandler` 或者拓展 `org.springframework.beans.factory.xml.NamespaceHandlerSupport`  

    - `com.darian.springxmlextension.config.DarianNamespaceHandler`  

  - 通过 实现 `BeanDefinitionParser` 接口 创建  “User” 元素的 `BeanDefintionParser` 实现

  - 建立 `locale-element-name` 与 `BeanDefintionParser`  映射

    - ```
      http\://darian.com/schema/darian=com.darian.springxmlextension.config.DarianNamespaceHandler
      ```







​	很多很多技术，不止 Spring 在里边，我问你，你不会，你说架构师有什么意义。

​	你的宽度不够，你的选型也不行。知识面很狭窄，你只能在 1 和 2 之间选择，你都没有看到 5、6、7、8、9、10 ，有很多的技术方案，根据不同的场景进行不同的选择，Spring 选择用 DOM 的方式。

​	Spring 源码还是要看的，怎么看是一个方法。

> 面试别人的时候，问别人，不用 Spring 你怎么办？ 10 个有 9 个哑口无言。

