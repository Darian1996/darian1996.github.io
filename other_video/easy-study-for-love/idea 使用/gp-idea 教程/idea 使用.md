# 一-介绍及安装

JetBrains公司

​              PhpStrom/RubyMine/Pycharm/Webstrom/Android Studio/INtelliJ IDEA

介绍：

Java/scala/Groovy

能够在企业级开发中提供了支持，

最具备沉浸式的IDE，让他沉浸在当前关注的目标情景下，而感到非常的愉悦和满足，而忘记真实世界的情景。

 

1. 语言支持：PHP/python/Ruby/scala/Kotlin

2. 数据库支持：PostgreSQL/Mysql/Oracle/Sql server

 

 

对于我们企业级开发，必不可少的是开源框架。

Spring MVC/GWT/play/Webservices/JSF/struts/hibernate

Html5/css3/sass/less/js/node.js

 

## 1.  下载

 

百度搜索IntelliJ IDEA ，第一个就是

 

Struts2 + spring + mybatisl(hibernate)

spring MVC + mybatis

 

 

## 2.  安装过程：

（下一步安装省略所有插件什么的过程）

 

64-bit la

Create associations 关联打开的文件

.java .groxy .kt


 

 

# 二-目录及基本配置

打开以后

Import IntelliJ IDEA settings free

Custes lsaim comfig fol     保留以前的习惯

Do not import settings

## 1.  输入密钥

 

Accept

 

Set UI theme  

## 2.  选择主题风格

 

Next default plugins

Next:FeaTured plugins

Start using IndellJ IDEA

## 3.  目录

- Intellij IDEA/bin
- Idea64.exe.vmoptioins  主要是idea虚拟机运行的一些配置文件，
- Idea.properties   idea一些属性的配置文件

 

用户目录下IntelliJ IDEA  

## 4.  Config  

个性化配置的目录

## 5.  System  

idea的系统级目录，idea与开发项目之间的桥梁目录，与一些缓存，索引，文件输出


 

 

# 三-界面介绍及常用配置

 

点击setting

搜索maven

 

 

Create from grachetype

 

Quickstart

 

Show Tips on Startup（显示这个配置在打开的时候，关闭它）  close

 

 

主题、字体、编辑区主题、文件编码、乱码问题

 

## 1.  主题

File

​         Settings

 Appearance & Behavior

​                  Appearance 

​                                   Theme:    主题

 

​                  Override default fonts by (not recommended): (覆盖你的默认字体，字体尽量不要修改，避免中文乱码)

​                                   Name:Miccrosoft YaHei UI Light    size:16

 

 

## 2.  编辑区域的字体大小：

Editor:

Color & fonts

​                  Font

​                          Show only monospaced fonts

​                                   Primary font:               size:20

 

 

## 3.  控制台区域字体的设置：

Editor

​         Colors & Fonts

​                  Console Font

​                                                                                        Size: 18

 

## 4.  把控制台调出来

View

​         Toolbar（点击）

​         Tool Buttons（点击）

 

## 5.  编辑区域的主题：

setting

Editor

​         Colors & Fonts

​                          Scheme: default  白色

​                                            Darcula  黑色

 

 

## 6.  编码格式：

setting

Editor

​         Code Style 

​                  File Encodings

​                                   Global Encoding：全局的编码  UTF-8

​                                   Project Encoding: UTF-8

​                                    

​                                   Properties Files(*.properties)

​                                            UTF-8

 

找不到符号、未结束的字符串文字  是由于编码格式导致的

 


 

 

# 四-常见图标、索引、编译方式

 

如果不是source 目录  

右键 

## 1.  Mark Directory as 

​                          Test Sources Root

​                          Sources Root

 

## 2.  索引：

打开项目的时候，会有一个index，右下角有一个Update indecs  indexing (它会更新索引，创建索引) ，它会开始的时候起到一个加载啊，配置的一个作用，所以在第一次打开和创建项目的时候都会创建一个索引，我们项目的启动时间和项目的大小是成正比的。这个索引的重要性非常重要。

Java class located out of the source root.Refer to the setion configuring content Roots for details（表示我们java类文件没有在我们的source root的文件目录下，在项目的加载过程中，所有的类的图标都是这个样子），如果你在项目加载的时候去写了代码，也编译不了，因为你的代码还没有办法，让这个程序识别到。你的代码没有让IntelliJ IDEA观测到，所以你编译不了，运行不起来，你只能等到索引创建完以后，你才能去运行你的代码。IntelliJ IDEA是干什么用的？它的索引主要是用来加快文件的查询，以及加快各种代码提示等操作的速度，查找时特别快。类似于我们搜索引擎的索引。IntelliJ IDEA并不是很好的支持索引，有时候也有一些问题，有时候我们的IntelliJ IDEA的索引文件损坏的时候，突然断电，IntelliJ IDEA突然关闭，再次打开项目，之前的设置全部没有了，有时候会出现一些莫名其妙的问题，包括索引的问题，包括界面设置的问题。出现这种问题，怎么解决？

## 3.  清理缓存

File

​         Invalidate Caches / restart…  

​         提供清理缓存和索引的一个入口，建议通过这样的方式去清理，这样会比较干净一点。


 

 

 

The cachea will be inbalidated and rebilit on the next startup.

WARNING:Local History will be also cleared.

Would you like to continue?

会清理掉缓存还有历史记录，如果重要的话，备份一下历史记录，

通过 Everything找一下在用户目录的.intelliJ IDEA目录下，有一个叫system，有一个localHistory

​         .intelliJ IDEA

​                  System

​                          localHistory

如果项目缓存损坏，项目打不开，可以直接请删除system下的所有东西，就能够解决一些问题。

 

 

## 4.  编译方式：

​         我们在写java类的时候它的一个编译，跟我们eclipse的实时编译相比IntelliJ IDEA的编译更加手动话，虽然IntelliJ IDEA可以通过手动开启实时编译，但是不建议这么做，因为如果你电脑性能比较差的话，不建议你这么做，因为它比较占资源，因为你是一个实时编译的一个过程，所以IntelliJ IDEA手工编译之外，在我们的容器运行之前，配置上一个编译事件，先编译后运行。用这个事件去触发。我们写代码不需要去保存，一般来说没有*号提示我们去保存，但是不会编译，点run的时候会触发一个事件，就会触发整个工程的一个编译。虽然我们在IntelliJ IDEA里边没有实时编译，但是对我们代码检查来说也没有影响。

​         IntelliJ IDEA里有三种编译方式：

\1.      Compile  对我们选定的java类文件进行强制编译，不管目标是否被修改过，

右键 Recomopile ”App.java”

​                  让它手动去编译

\2.      Rebuild  对选定的目标进行强制的编译，这个目标就是我们的project，

右键工程有一个Rebuild Modele ‘michael-public

对我们的项目进行强制的编译，不管目标是否修改过，由于目标，由于rebuild的目标是一个项目，所以rebuild每次花的时间比较长，因为它编译的是整个工程’

\3.      Make                  对我们选定的目标进行编译，但是make只会编译到我们修改过的文件， 

（新版本可能没有了，build里边      ）

Build目录下都有！！！

如果我们运行之前做一个编译的话，可以做一个配置，

ThreadLocalDEmo2    三角run debug  左边

有一个Edit Configuratios

Run/Debug Configurations里会有一个当前可运行的文件

​         Before lauch:Build,Activate tool window

​                  相当于在运行之前，触发一个编译事件，有一个build，还可以加

​                  可以去配置我们的很多操作，比如说

 

 

 

​         还有一些编译器的设置，

File

​         Settings（所有的设置都是在Settings里边，针对我们项目的一个设置，但是当前的设置里边仍然或有一些设置是全局的）

 

File

​         Other Setting 

​                  Default Setting（是一个全局的设置）

 

File

​         Setting

​                  Build,Execution,Deployment（构建，执行，发布）

​                          Compiler（编译设置）

​                                   Resource patterns:          #.java;!?form针对这样结尾一些文件会做一些匹配和编译

​                                   Build project automatically  （工程是否要自动编译）

​                                   Build process heap size(Mbytes):  （构建过程中堆的大小，默认是700，建议内存够的话修改成1500，或者以上，编译的时候报错，一般可以去修改这个地方，”out of memery”，内存溢出）

​                                   Shared build process VM options:

​                                            设置编译时候VM参数

​                                   User-local build process VM options(overrides Shared options)

​                                   

​                                   Excludes（可以对我们的一些文件做排除，我们希望哪些文件排除在外面，不再我们的IntelliJ IDEA的默认编译范围之内的，点”+”去设置）

​                                   Java Compiler（这个表示你当前项目使用的jdk版本）

​                                            User compiler: javac

​                                            Project bytecode version（项目字节码编译的版本）：1.8

​                                            Per-module bytecode version（针对项目下边的不同模块设置不同的bytecode version） 1.8

 


 

 

# 五-开始第一个 Hello World

\1.      创建一个java项目

\2.      讲解版本工具的使用

\3.      实时模板

 

 

## 1.  创建一个java项目

Create New Project

​         Java

​                  Project SDK（我们在开发java项目中要用到的虚拟机，没有的话，可以new一个，选择本地安装的JDK版本）

​                  Java EE

​                          NEXT

​         

Crete project frm template（勾选上）

​                  Command line App (Simple Java application that includes a class with main() method )(创建一个带有main方法的简单的java类)

​                  Java Hello World   (Simple Java “Hello World” application)(一个简单的叫Hello World的项目)

​                          Next

​         

​         Project name:  Hello-World（项目名字）

​         Project location: D:\workspace\Hello-word（项目路径）

​                  Finshed

 

IDEA 里边目录是以一个project为一个单位的，一个project必须打开一个IDEA窗口，如果你再打开一个Project，它是另外一个窗口。

​         企业级开发中，每个人单独负责一个项目，只专注于做自己的那部分功能就好了。我们虽然以Project为单位，但是，它的project如果是maven的话，maven里边是有模块的。其实项目是以模块为单位

 

​         Src  右键

​                  new  

​                          package

 

com.gupao.idea.demo

 

**HelloWorld >** src > idea > demo

右键idea，new 

​                                   Class    classname: Hello

 

 

 

Project                      齿轮（点击）

​         Flatten Packages      每一个子包都是一个全路径

​         Hide Empty Middle Packages    一个包一个包一个包的层级关系，树形的递进型的一个形式。

 

右键相应的包 右键

​         New

​                  Class

​                  File

​                  HTML

 

Project下面有一个.idea的文件

​         这个是idea里边一个独立的文件夹，独立的管理项目配置信息的文件，就像eclipse里边一个XML文件，这个.idea文件是可以更改的，还可以弄成ipr

​         JDK环境等等，这个是一个人的本地项目的文件，不建议上传这个文件。

 

 

 

## 2.  讲解版本工具的使用

​         Cvs/svn/vss/git

​         通过git管理我们的版本控制

File

​         Settings   项目文件的配置

​         Project Structure   项目结构的一些配置

​         Other settings > default setting 全局的配置

 

## 3.  git下载地址

 

https://git-scm.com/downloads   

## 4.  下载以后一路傻瓜式安装，next

安装完成后，还需要最后一步设置，在命令行输入：

$ git config --global user.name "Your Name"

$ git config --global user.email "email@example.com"

因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。

注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

 

​                                                  

 

 

File

​         Setting

​                  Version Control

 

Set this path only for current project（只为当前项目配置此路径）

   

 

通过git这样一个客户端去和我们git服务器去做一个交互，

 

CVS也可以去配置，CVS不需要去配置，它是自带的一个版本控制工具，

 

subversion （IDEA自带的版本控制工具，可以配置svn，也是需要下载客户端，然后去配置它的目录）

 

VCS

​         Cherkout from Version Control 

​                          Git

 

create project from existing sources    （从现有项目创建工程）

import project from external model（从外部模型导入项目）

​     import project from external model

​                          maven

 

 

 

## 5.  实时模板

 

psvm     public static void main(){

 

sout       System.out.println() ;

 

 

<https://www.jetbrains.com/help/idea/using-live-templates.html>

​                  官网的模板

 

 

psfs  private static final String

 

fori   for(int i = 0 ; i< ; i++)

 

ifn     if(var == null){

 

获取代码提示的方法：   tab 或者 ctrl + j

 

配置模板：

File

​         Setting 

​                  Editor

​                          Live Templates 

 


 

 

# 六-IntelliJ IDEA maven项目和打包部署

## 1.  新建一个工程

File

​         Setting

​                  Build,Exiecution,Deployment

​                          Build Tools

​                                   maven

 

   

 

 

Maven

​         Importing

​                  Import Maven projects automatically(自动检测pom文件的变更，自动导入jar包)

   

 

Automatically download: (是否自动下载)

​         Sources (源文件)  Documentation(文件)

​                  Idea自带反编译工具，点进去，右上角有 Download sources  是否要去下载源码，

Dependency types(依赖类型)

 

   

 

​         VM options for importer: (配置我们导入的时候所需要的虚拟机的参数，项目大的时候可以调整。)

 

 

 

 

构建一个maven项目web项目：

​         File

​                  New 

​                          Project 

​                                   Maven

​                                            Create from archetype(骨架)

​                                                     Web-app

 

新构建一个文件夹

​         Directory

   

 

Java 右键

​         Mark Directory as 

​                  Sources root

 

Pom.xml   maven的核心配置。

 

 

有插件可以滚动代码

 

 

Reimport All Maven Project   (根据你的pom文件重新去加载项目)

 

Generate Sources and Update Folders For All Projects       (生成我们的源文件，以及更新我们项目下的一些文件)

 

Download Sources and / or Documentation         (下载第三方的源代码，以及文档)

 

Add Maven project

 

Run Maven Build   运行maven这个项目

 

Execute Maven Goal  运行maven的命令，是全局的

 

Toggle Offline Mode  切换我们maven的 offline的模式  你把这个包提交到远程仓库的时候关掉以后没办法与远程仓库保持一个连接，点开就可以了

 

Toggle ‘Skip Tests’ Mode

​         跳过test 命令的执行

 

Show Dependencies (Ctrl+Alt+Shift+U)

​         显示maven传递的jar包，依赖包，都可以看到版本，

​         右键

​                  Exclude （排除在外边）

 

   

 

 

点击向下的箭头

   

 

Edit Configurations

​         Run/Debug configurations

   

配置 Tomcat Server

   

 

 

local

## 2.  tomcat下载地址

<http://tomcat.apache.org/>  

.zip文件就行

下载成功，解压之后，start up一下，就可以配置到IDEA和STS中了，

   下载下来后，进行解压缩，最好放在根目录下。设置系统环境变量   1，新建变量名：CATALINA_BASE，变量值：C:\tomcat    2，新建变量名：CATALINA_HOME，变量值：C:\tomcat    3，打开PATH，添加变量值：%CATALINA_HOME%\lib;%CATALINA_HOME%\bin       测试Tomcat是否配置成功。   在“运行”中输入cmd 打开命令窗口。输入 catalina start 如果如下图片所示，则代表配置成功。   

 

STS需要配置

   

 

## Idea配置tomcat

先把tomcat配置到idea中，再把tomcat配置到项目中

   

 

Edit configurations

 

   

 

   

 

选择tomcatà>local

   

如果想要热部署的话，

Deployment

​         Projectdemo:war exploded (可以实现热部署，通常在开发环境中这样用)

   

 

再返回去 

Server

   

更新资源和类文件的话，直接热部署，

 

可以配置log，打印log在控制台，一般不配

 

 

 

 

## 3. [CodeGlance](https://plugins.jetbrains.com/plugin/7275-codeglance)

类似SublimeText的Mini Map插件 
    

 

 

   


 

 

 

# 七-debug调试及database管理工具

 

 

F7     进入下一步，如果当前行断点是一个方法，进入方法体内，如果方法还有方法，则不会进入内嵌的方法中。

F8     进入下一步，如果当前的行断点是一个方法，则不进入方法体内。

F9     恢复程序运行，如果该断点下面的代码还有断点，则停到下一个断点上。

 

Alt+F8 选中对象弹出可输入计算项的提示框，查看该输入内容的调试结果。

 

 

   

直接选中表达式，直接拉到variables里边，显示出表达式的值。

 

 

 

 

 

右键断点，可以设置断点的条件。

F9时跳过的条件

   

 

DataBase


 

 

# 八-IntelliJ IDEA 常用设置及快捷键的使用说明

Mic:2227324689

 

## 1.  代码提示：

Ctrl + space

   

先remove 在add

 

   

 

提示是否区分大小写，  选择 none 不区分

​                                                     all 完全区分大小写

​                                                     first letter 首字母区分大小写

   

 

## 2.  代码的检查级别。

 

右下角人物头像，

   

 

## 3.  自动import包的功能

​         自动导包，

​         自动优化包

   

 

**省电模式，**（关闭代码检查与提示功能）

 

## 4.  查找定位

​         Ctrl+shirft+N   搜索      

​                  HelloWorld  17    直接定位到HelloWorld 这个类的17行

​                  Helloworld:17

 

## 5.  窗口复原

还原成默认的窗口界面

   

 

 

 

 

失去焦点，不去盯住，自动化最大代码

   

 

 

打开项目时，在一**个新的窗口里边打开。**

   

 

 

## 6.  右键查看历史记录：

​         Local history

​        show history

 

 

 

 

 


 

 

# 九-常用快捷键

## 1.  智能提示

设置成 Alt+/

## 2.  代码模板生成

psvm/sout/ifn

## 3.  生成get/set，还有toString 

Alt+insert

## 4.  编辑快捷键

a)       Ctrl+y      删除某一行

b)       Ctrl+D      复制一行

c)        Ctrl+/       注释

d)       Ctrl+w      选择代码块（慢慢的越选越大，自动按照语法选中代码）

e)       Ctrl+shirft+w   反向选中代码块

f)        Ctrl+left  /  ctrl+right前后单词移动光标

## 5.  查找快捷键

a)       Ctrl+N      查找类或资源，提供模糊匹配

b)       Shirft+shirft     按两下shirft(search everywhere) 类，资源，代码。

c)        Ctrl+shirft+f    搜索代码中的关键字，内容搜索

## 6.  代码的格式化

​                     i.            Ctrl+shirft+O   格式化import

​                   ii.            Ctrl+shirft+L    格式化代码

## 7.  Ctrl+tab       切换窗口

​                     i.            Ctrl+E       选择最近打开的文件

​                   ii.            Ctrl+Shrift+E   打开最近编辑过的文件

## 8.  Alt+Enter          自我修复，智能提示

 

 

 

 

 

 

 


 

 

# 总结

Ctrl+z撤销

复制，剪切，粘贴

Ctrl+c  ctrl+x  ctrl+v

Ctrl+F 当前文件查找

Ctrl+shirft+f 全文检索

Ctrl+r 当前文件替换

Ctrl+shrift+r 全文替换

Double shrift 全局查找

Alt+f7 查找这个方法被调用的地方

Ctrl+Alt0+B 快速定位这个方法的实现

Alt+insert 插入构造、get/set、overriding、实现接口

注释

Ctrl+/

Ctrl+shrift+/

Ctrl+alt+L   格式化

Ctrl+alt+o   优化import

Ctrl+d 复制战体

Ctrl+y 删除某一行

 