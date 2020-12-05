---
catalog: true
tags:
- Spring
- JAVA
- 内省
---



Struts 的历史，

不用 Spring Boot ，

EJB 规范，

RPC 基于 RMI 

- Bean
  - 无状态
  - 有状态
    - JPS
    - JMS



SUN 公司引领了一个时代。

Spring 、Spring Boot 是最牛逼的重复发明轮子。

EJB 3.0 以后就可以嵌入式容器开发了。

互联网不能涵盖企业级开发。



### 议题：

- 理解 JAVA Beans 内省机制
- 内省机制在 Spring 中的应用
- 重新认识 JAVA Beans



贫血模型，充血模型，

#### martin Flow

技术的理论学家，工程化经验很大的不足



JAVA Bean 里边的 贫血模型，是只有 get 、set 没有其它的方法，

充血模型：除了 get、set 还有相应的状态，还有一些操作。

#### EJB

- JSF 
  - 除了页面上的渲染一外，需要管理用户的 session。用户的所有状态和操作都需要在我服务端进行操作。就会有一个 sessionBean 的操作，++ 登陆次数加1，EJB 里边叫做状态 Bean，状态Bean ，会在某一个 属性 ++1. 其中一个属性 ++ ，然后，这个 Bean 里边就会有一个状态。



JAVA Bean 需要了解 反射，事件监听

### Java Beans 内省机制

- Bean 信息（BeanInfo）
  - Bean 描述符 （BeanDescriptor）
  - 属性描述符（PropertyDescriptor）
  - 方法描述符（MethodDescriptor）



```properties
server.port=8080
```

Spring Boot 中通过前缀和属性名字就可以对一些配置项的属性进行赋值。

内省，就是自我反省。

有字段有方法。

有人给你一个 JAVA 类，

内省时把类的源信息全部给你，但是你并不知道它到底有什么东西。

![1543411627973](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543411627973.png)

我们可以通过反射

`java.lang.reflect.Method`

- `getName()`
- `getTypeParameters()`



#### 反射 

##### Java Bean

- class 信息
  - 构造器（Contructor）
  - 方法（Method）
  - 字段（Field）

#### 内省

##### Java BeanInfo

- Bean描述符（BeanDecriptor）
- 方法描述符（MethodDescriptor）
- 属性描述符（PropertyDescriptor）



反射，当我们对对方的 Class 未知的时候，可以知道对方有哪些方法，哪些属性，哪些构造器。

IDEA 会告诉我们类有哪些方法，哪些参数，

`hashCode()`  继承自 Object 的，所以也可以得到。

这利用的就是内省机制。



![1543412199735](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543412199735.png)

​	打个比方，我要调整字体，我改字体的时候，下边也变化了。

说明，我上边改变的有两件事情，1， 17-18          2： 下边字体变化了。

我穿进去的东西是文本，我穿进去 A 也行，文本转换为相应的数字。



1. 传递了一个字符串（Text）类型
2. 传递至转化成对应的数据类型，并且赋值
3. 对应事件发生（不同的属性对应的事件的处理可能不同）



`java.beans.BeanDescriptor`

```java
public class BeanDescriptor extends FeatureDescriptor {

    private Reference<? extends Class<?>> beanClassRef;
    private Reference<? extends Class<?>> customizerClassRef;
```



`java.beans.MethodDescriptor`

```java
public class MethodDescriptor extends FeatureDescriptor {

    private final MethodRef methodRef = new MethodRef();

    private String[] paramNames;

    private List<WeakReference<Class<?>>> params;

    private ParameterDescriptor parameterDescriptors[];
```



`java.beans.MethodRef`

```java
final class MethodRef {
    private String signature;
    private SoftReference<Method> methodRef;
    private WeakReference<Class<?>> typeRef;
```

methodRef 是软引用。



`class`

```java
@CallerSensitive
public Method[] getDeclaredMethods() throws SecurityException {
    checkMemberAccess(Member.DECLARED, Reflection.getCallerClass(), true);
    return copyMethods(privateGetDeclaredMethods(false));
}
```

加载类的时候，加载过了，就不会再加载了。



`java.lang.ClassLoader`

```java
protected final Class<?> findLoadedClass(String name) {
    if (!checkName(name))
        return null;
    return findLoadedClass0(name);
}

private native final Class<?> findLoadedClass0(String name);
```

native 是 JVM 来的，这个 Java 类在我们 JVM 中式单例，但是我们的 BeanInfo 是多例。一个 Bean 有多个 BeanInfo，如果我声明了一个 BeanInfo ，然后，GC 的时候，最好都回收一下。



```verilog
java.beans.PropertyDescriptor[name=id; propertyType=long; readMethod=public long com.darian.javabeans.User.getId(); writeMethod=public void com.darian.javabeans.User.setId(long)]
java.beans.PropertyDescriptor[name=name; propertyType=class java.lang.String; readMethod=public java.lang.String com.darian.javabeans.User.getName(); writeMethod=public void com.darian.javabeans.User.setName(java.lang.String)]

    
java.beans.PropertyDescriptor[name=class; propertyType=class java.lang.Class; readMethod=public final native java.lang.Class java.lang.Object.getClass()]
java.beans.PropertyDescriptor[name=id; propertyType=long; readMethod=public long com.darian.javabeans.User.getId(); writeMethod=public void com.darian.javabeans.User.setId(long)]
java.beans.PropertyDescriptor[name=name; propertyType=class java.lang.String; readMethod=public java.lang.String com.darian.javabeans.User.getName(); writeMethod=public void com.darian.javabeans.User.setName(java.lang.String)]

```



读方法可以为空，但不会都为空，

```java
public class PropertyDescriptor extends FeatureDescriptor {

    private Reference<? extends Class<?>> propertyTypeRef;
    private final MethodRef readMethodRef = new MethodRef();
    private final MethodRef writeMethodRef = new MethodRef();
    private Reference<? extends Class<?>> propertyEditorClassRef;
```

读方法和写方法都没有的时候，他就认为你这个属性是没有的。 beaseName 是 id 的名词

`PropertyEditorClassRef` 是什么东西



## Java Beans 事件监听

- 属性变化监听器（PropertyChangeListener）
- 属性变化事件（PropertyChangeEvent）
  - 事件源（Source）
  - 属性名称（PropertyName）
  - 变化前值（OldValue）
  - 变化后值（NewValue）



```
private List<WeakReference<Class<?>>> params;
```

Java 里边的方法签名是不可以打乱顺序的，Class 里边不一样，因为它考虑到存储所以就有缩写。



`java.beans.PropertyEditor`

```java
PropertyEditor
```



它是一个 String 类型的。

BeanInfo 是针对某一个类的。

类是模板，没有状态

实例是（Bean） ，有模板

User(id = 1)

User(id = 2)



```java
public PropertyEditor createPropertyEditor(Object bean) {
```

这里我传递一个相应的 Bean 过来，然后我做响应的调整。

类没有状态，类是个模板，类一旦定义好以后，就变成字节码，字节码里有什么东西，我这个类就有什么东西。构造器，方法，属性，父类的方法，一旦加载之后不能变了。



状态是因为有变量。一个状态的信息可能不一样，正是因为变量不一样，所以每一个对象不一样，但是类是一样的。

```java
public PropertyEditor createPropertyEditor(Object bean) {
        Object editor = null;

        final Class<?> cls = getPropertyEditorClass();
        if (cls != null && PropertyEditor.class.isAssignableFrom(cls)
                && ReflectUtil.isPackageAccessible(cls)) {
            Constructor<?> ctor = null;
            if (bean != null) {
                try {
                    ctor = cls.getConstructor(new Class<?>[] { Object.class });
                } catch (Exception ex) {
                    // Fall through
                }
            }
            try {
                if (ctor == null) {
                    editor = cls.newInstance();
                } else {
                    editor = ctor.newInstance(new Object[] { bean });
                }
            } catch (Exception ex) {
                // Fall through
            }
        }
        return (PropertyEditor)editor;
    }

```



没有设置，

绝大多数框架都会实现，`java.beans.PropertyEditor` 这个接口，

`CharsetEditor` 

`org.springframework.beans.propertyeditors.CharsetEditor`

```java
public void setAsText(String text) throws IllegalArgumentException {
    if (StringUtils.hasText(text)) {
        this.setValue(Charset.forName(text));
    } else {
        this.setValue((Object)null);
    }
}
```

我们都要传递一个 text 过来，

```xml
<beans xmlns="http://www.springframework.org/schema/beans">
    <bean id="user" class="com.darian.javabeans.User">
        <property name="name" value="darian"/>
        <property name="id" value="1"/>
    </bean>
</beans>
```

为什么 `“1”` 文本可以转化为 `Long` 类型



`org.springframework.beans.propertyeditors.CurrencyEditor` 货币类型

为什么，String 可以转化为 Long;

![1543505994589](/img/mercyblitz/GP-public/Spring%20%E7%B3%BB%E5%88%97/assets/1543505994589.png)

还是 0， 说明 PropertyDescriptor 关联不到我的 Bean

 **需要增加 监听。** 



```java
/***
 * Java Beans 代码
 */
public class JavaBeansDemo {
    public static void main(String[] args) throws IntrospectionException, ClassNotFoundException {
        Class<?> aClass = Class.forName("com.darian.javabeans.User");
        BeanInfo beanInfo1 = Introspector.getBeanInfo(aClass, Object.class);
        
        // 方法会把父类子类的方法都加载进来，重载方法提供到 Object 类就停止，
        BeanInfo beanInfo = Introspector.getBeanInfo(User.class/*, Object.class*/);
        // Bean描述符（BeanDecriptor）
        // Bean，提供了一个 Java 类文件，还有一个全局的信息
        BeanDescriptor beanDescriptor = beanInfo.getBeanDescriptor();
//        out.println(beanDescriptor);
//         方法描述符（MethodDescriptor）
        MethodDescriptor[] methodDescriptors = beanInfo.getMethodDescriptors();
//        Stream.of(methodDescriptors).forEach(out::println);
        // 属性描述符（PropertyDescriptor）
        // 属性会带方法
        User user = new User();
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        Stream.of(propertyDescriptors).forEach(propertyDescriptor -> {
            String propertyName = propertyDescriptor.getName();
            if ("id".equals(propertyName)) {// 当属性的名称等于 "id" 时
                propertyDescriptor.setPropertyEditorClass(IdPropertiyEditor.class);
                PropertyEditor propertyEditor = propertyDescriptor.createPropertyEditor(user);
                propertyEditor.addPropertyChangeListener(evt -> {
                    // 错误！！！ 这里没有新值
                    Object newValue = evt.getNewValue();
                    Method setIdMethod = propertyDescriptor.getWriteMethod(); // SetId 方法
                    try {
                        setIdMethod.invoke(user,newValue);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
                propertyEditor.setAsText("1");
            }
        });

        out.println(user);

    }
}
```



我这个事件把这个值设置进来了，这就是反射式编程和普通编程的区别。

你把一个 Bean 配置在了 `context.xml` 中：`class = "com.darian.javabenas.User"` 你都不知道他的结构时怎么样，怎么配置，Spring 框架叫 依赖注入的框架，叫做 **IOC** 叫做 **`反转控制`** 。它让你避免去写 `get()` 和 `set(obj)`  ，那么你要怎么去控制它，首先你要知道这个类的结构是怎么样的，同时这个类里边有什么属性，`<property   ... />` 这个东西，然后传一个值进去，然后进行转换，转换成你目标类型就可以了。



假设你换一个类，不知道数据结构，只知道一些简单的类型，有个 id， 并且你只能传一个 **`文本`** 过去，我们的 `context.xml` 中只能传一个文本过去，怎么能做到把这个值给干过去呢？我们反转配置的时候，`我们写编程的时候，get、set 可以直接去塞` 但是我们在运行时的时候我们是没办法知道的，反射是确实可以，反射 **`如何优雅的把类型进行转换`** ，反射 `invoke()` 的时候，

`public Object invoke(Object obj, Object... args)` 

它里边传进去的是一个 `Object` ，

你只能通过内省的机制来做，

​	JAVA Bean 的框架是一个整体的东西， `Propertydescriptor` 得到这个属性描述符的时候，我们可以动态的往里边增加我的 `PropertyEditorClass` 往里边添加我这个 Property 的实现，然后在把实现通过事件的机制动态的变化，它是一个整体的解决方案。

​	这个很复杂。

`private Date date; ` 

` Cannot convert value of type 'java.lang.String' to required type 'java.util.Date' for property 'date': no matching editors or conversion strategy found`

 一个 `java.util.String` 变化成 `java.util.Date`  



### Spring Bean 属性处理

- 属性修改器（`PropertyEditor`）
- 属性修改器注册（`PropertyEditorRegistry`）
- `PropertyEditor` 注册器（`PropertyEditorRegistrar`）
- 自定义 `PropertyEditor` 配置器（`CustomEditorConfigurer`）



`PropertyEditor` 是 `Java.bean` 里边的，`PropertyEditorRegistry` 是 **Spring** 里边的，

##### `org.springframework.beans.PropertyEditorRegistry` 

```java
public interface PropertyEditorRegistry {
    /**
     * 指定一个类型，设置一个 PropertyEditor
     */
    void registerCustomEditor(Class<?> var1, PropertyEditor var2);
    /**
     * 指定一个类型，设置一个 PropertyEditor,不同的名称不同的是实现方法，
     */
    void registerCustomEditor(Class<?> var1, String var2, PropertyEditor var3);

    PropertyEditor findCustomEditor(Class<?> var1, String var2);
}
```





```xml
<property name="date" value="2018-11-30"/>
<property name="date" value="2018-11-30 00:00:00"/>
```

可能两种相同的属性，不同的处理机制。

通过这个方法的 `propertyPath` 来搞，

`void registerCustomEditor(Class<?> var1, String propertyPath, PropertyEditor var3);` 





```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="user" class="com.darian.javabeans.User">
        <property name="name" value="darian"/>
        <property name="id" value="1"/>
        <property name="date" value="2018-11-30"/>
    </bean>

    <bean class="org.springframework.beans.factory.config.CustomEditorConfigurer">
        <property name="propertyEditorRegistrars">
            <list>
                <bean class="com.darian.javabeans.MyPropertyEditorRegistrar"></bean>
            </list>
        </property>
    </bean>
</beans>
```



```java
public class MyPropertyEditorRegistrar implements PropertyEditorRegistrar {

    @Override
    public void registerCustomEditors(PropertyEditorRegistry registry) {
        // 将 Date 类型的字段设置成为 PropertyEditor
        registry.registerCustomEditor(Date.class, "date", new DatePropertyEditor());
    }
}
```



```java
public class DatePropertyEditor extends PropertyEditorSupport {

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
       if(StringUtils.hasText(text)){
           SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
           try {
               Date date = dateFormat.parse(text);
               setValue(date);
           } catch (ParseException e) {
               e.printStackTrace();
           }
       }
    }
}
```



```java
public class SpringPropertyEditorDemo {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext();
        context.setConfigLocation("context.xml");
        context.refresh();

        User user = context.getBean("user", User.class);
        System.out.println(user);
    }
}
```

```verilog
User{id=1, name='darian', date=Fri Nov 30 00:00:00 CST 2018}
```



Java 内省，把一个 Bean 分为三个部分

- BeanDescriptor
  - 好比我们 Spring中  有 `id` 有 `class` `<Bean>...</Bean` 整个全部都是 BeanInfo
- PropertyDescriptor
  - 属性描述，可以调整 `PropertyEditor` 的修改器，我不知道你要什么类型，我只知道我要传一个文本给你，你要具体转化为什么类型，根据你具体的需要进行转换。根据事件进行，这是增加和扩展，还可以覆盖。
  - `PropertyEditor` 不会直接影响到 `Bean` 而是通过事件回调的方式进行改变。用事件的方式统一的抽象的来处理。
- 





​	在很多场景的时候，Java Bean 内省不一定是真好，它是结合 GUI 非常的 **`耦合`**  ，`java.awt.Graphics`、`isPaintable()`、`java.awt.Rectangle`



Spring 提供了拓展机制。



`org.springframework.beans.support.ResourceEditorRegistrar` 



```java
public void registerCustomEditors(PropertyEditorRegistry registry) {
        ResourceEditor baseEditor = new ResourceEditor(this.resourceLoader, this.propertyResolver);
        this.doRegisterEditor(registry, Resource.class, baseEditor);
        this.doRegisterEditor(registry, ContextResource.class, baseEditor);
        this.doRegisterEditor(registry, InputStream.class, new InputStreamEditor(baseEditor));
        this.doRegisterEditor(registry, InputSource.class, new InputSourceEditor(baseEditor));
        this.doRegisterEditor(registry, File.class, new FileEditor(baseEditor));
        if (pathClass != null) {
            this.doRegisterEditor(registry, pathClass, new PathEditor(baseEditor));
        }

        this.doRegisterEditor(registry, Reader.class, new ReaderEditor(baseEditor));
        this.doRegisterEditor(registry, URL.class, new URLEditor(baseEditor));
        ClassLoader classLoader = this.resourceLoader.getClassLoader();
        this.doRegisterEditor(registry, URI.class, new URIEditor(classLoader));
        this.doRegisterEditor(registry, Class.class, new ClassEditor(classLoader));
        this.doRegisterEditor(registry, Class[].class, new ClassArrayEditor(classLoader));
        if (this.resourceLoader instanceof ResourcePatternResolver) {
            this.doRegisterEditor(registry, Resource[].class, new ResourceArrayPropertyEditor((ResourcePatternResolver)this.resourceLoader, this.propertyResolver));
        }

    }
```

都会注册进去，

##### `org.springframework.beans.PropertyEditorRegistrySupport` 

```java
private void createDefaultEditors() {
    this.defaultEditors = new HashMap(64);
    this.defaultEditors.put(Charset.class, new CharsetEditor());
    this.defaultEditors.put(Class.class, new ClassEditor());
    this.defaultEditors.put(Class[].class, new ClassArrayEditor());
    this.defaultEditors.put(Currency.class, new CurrencyEditor());
    this.defaultEditors.put(File.class, new FileEditor());
    this.defaultEditors.put(InputStream.class, new InputStreamEditor());
    this.defaultEditors.put(InputSource.class, new InputSourceEditor());
    this.defaultEditors.put(Locale.class, new LocaleEditor());
    if (pathClass != null) {
        this.defaultEditors.put(pathClass, new PathEditor());
    }

    this.defaultEditors.put(Pattern.class, new PatternEditor());
    this.defaultEditors.put(Properties.class, new PropertiesEditor());
    this.defaultEditors.put(Reader.class, new ReaderEditor());
    this.defaultEditors.put(Resource[].class, new ResourceArrayPropertyEditor());
    this.defaultEditors.put(TimeZone.class, new TimeZoneEditor());
    this.defaultEditors.put(URI.class, new URIEditor());
    this.defaultEditors.put(URL.class, new URLEditor());
    this.defaultEditors.put(UUID.class, new UUIDEditor());
    if (zoneIdClass != null) {
        this.defaultEditors.put(zoneIdClass, new ZoneIdEditor());
    }

    this.defaultEditors.put(Collection.class, new CustomCollectionEditor(Collection.class));
    this.defaultEditors.put(Set.class, new CustomCollectionEditor(Set.class));
    this.defaultEditors.put(SortedSet.class, new CustomCollectionEditor(SortedSet.class));
    this.defaultEditors.put(List.class, new CustomCollectionEditor(List.class));
    this.defaultEditors.put(SortedMap.class, new CustomMapEditor(SortedMap.class));
    this.defaultEditors.put(byte[].class, new ByteArrayPropertyEditor());
    this.defaultEditors.put(char[].class, new CharArrayPropertyEditor());
    this.defaultEditors.put(Character.TYPE, new CharacterEditor(false));
    this.defaultEditors.put(Character.class, new CharacterEditor(true));
    this.defaultEditors.put(Boolean.TYPE, new CustomBooleanEditor(false));
    this.defaultEditors.put(Boolean.class, new CustomBooleanEditor(true));
    this.defaultEditors.put(Byte.TYPE, new CustomNumberEditor(Byte.class, false));
    this.defaultEditors.put(Byte.class, new CustomNumberEditor(Byte.class, true));
    this.defaultEditors.put(Short.TYPE, new CustomNumberEditor(Short.class, false));
    this.defaultEditors.put(Short.class, new CustomNumberEditor(Short.class, true));
    this.defaultEditors.put(Integer.TYPE, new CustomNumberEditor(Integer.class, false));
    this.defaultEditors.put(Integer.class, new CustomNumberEditor(Integer.class, true));
    this.defaultEditors.put(Long.TYPE, new CustomNumberEditor(Long.class, false));
    this.defaultEditors.put(Long.class, new CustomNumberEditor(Long.class, true));
    this.defaultEditors.put(Float.TYPE, new CustomNumberEditor(Float.class, false));
    this.defaultEditors.put(Float.class, new CustomNumberEditor(Float.class, true));
    this.defaultEditors.put(Double.TYPE, new CustomNumberEditor(Double.class, false));
    this.defaultEditors.put(Double.class, new CustomNumberEditor(Double.class, true));
    this.defaultEditors.put(BigDecimal.class, new CustomNumberEditor(BigDecimal.class, true));
    this.defaultEditors.put(BigInteger.class, new CustomNumberEditor(BigInteger.class, true));
    if (this.configValueEditorsActive) {
        StringArrayPropertyEditor sae = new StringArrayPropertyEditor();
        this.defaultEditors.put(String[].class, sae);
        this.defaultEditors.put(short[].class, sae);
        this.defaultEditors.put(int[].class, sae);
        this.defaultEditors.put(long[].class, sae);
    }

}
```

这里设置了很多默认的实现，

有一就有二，

它把 90% 的功能都实现了，然后给你一个模板，让你照着去实现，

Spring MVC 自动一扩展 Properties 协议。

必须自定义扩展，

`CurrencyEditor` 可以在 Spring 里边使用，也可以在 Java Beans 里边使用，两个地方都可以用，何乐而不为呢？

同样的 `EventListener` 是一个 **`标记接口`** ，大家都实现它，没有实现它，也可以，但是这是约定俗成，



Java Beans 规范看的云里雾里，都很迷糊。

 