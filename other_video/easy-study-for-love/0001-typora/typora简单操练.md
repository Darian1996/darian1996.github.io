# 常用快捷键

| 快捷键      | 作用               | 快捷键       | 作用           |
| ----------- | ------------------ | ------------ | -------------- |
| Ctrl+1      | 一阶标题           | Ctrl+B       | 字体加粗       |
| Ctrl+2      | 二阶标题           | Ctrl+I       | 字体倾斜       |
| Ctrl+3      | 三阶标题           | Ctrl+U       | 下划线         |
| Ctrl+4      | 四阶标题           | Ctrl+Home    | 返回Typora顶部 |
| Ctrl+5      | 五阶标题           | Ctrl+End     | 返回Typora底部 |
| Ctrl+6      | 六阶标题           | Ctrl+T       | 创建表格       |
| Ctrl+L      | 选中某句话         | Ctrl+K       | 创建超链接     |
| Ctrl+D      | 选中某个单词       | Ctrl+F       | 搜索           |
| Ctrl+E      | 选中相同格式的文字 | Ctrl+H       | 搜索并替换     |
| Alt+Shift+5 | 删除线             | Ctrl+Shift+I | 插入图片       |

~~sdasdffasdfsadf~~

asdfasdf

asdfads

~~sdfa~~

`spring cloud`

​	 `spring boot`

​		 `spring freambook`

​			  `sdfa`

```
制表符+空格
才能`spring`
	 spring cloud
```

```java
public class name{
    private int a;
    private Sting b;
}
```

# 标题的使用

## 标题的使用格式

### 一阶标题  ：

```
#+空格 
ctrl+1
```

### 二阶标题：

```
##+空格
ctrl+2
```

### 三阶标题：

```
依此类推
```

# 下划线

## 下划线：

```
<u>下划线</u>
或者
ctrl+U
```

<u>下划线</u>

<u>下划线</u>

# 删除线

## 删除线

```
~~删除线的内容~~
```

~~删除线的内容~~

# 字体加粗

## 加粗字体

```
**加粗的字体**
或者
ctrl+B
```

**加粗的字体**

**加粗的字体**

# 字体倾斜

## 字体倾斜

```
*倾斜的字体*
或者
ctrl+i
```

*倾斜*

*倾斜的字体*

# 图片的插入

## 插入图片

```
直接把本地图片拉进来，他复制的是你的本地路径
ctrl+shift+i

个人建议：因为大家都是github用。把图片传到github上，然后把地址粘贴进去
![](这里输入图片的地址)
```

![图片](https://github.com/Darian1996/Darian-All-Project/blob/master/4524.jpg)

![]()

# 超链接

## 超链接

```
[百度一下](http://www.baidu.com)
ctrl+K
注意：
（必须以http开头）
按住Ctrl键+点击上面链接就可以直接访问该链接
```

[百度一下](http://www.baidu.com)

[百度一下](http://www.baidu.com)

# 代码区域

Typora支持对多种语言的代码区域进行**语法高亮**。这些语言可以说是**涵盖了绝大部分经常使用的编程语言**，包括C++，Python，MATLAB，甚至包含spreadsheet（也就是Excel电子表格）。用Typora记编程笔记，看起来一清二楚。如果设置代码语言为flow，那么可以直接画出一个流程图；还可以使用相应的方法画出时序图等图表。

## 使用

```
​```+java     (java语言)
​```+语言
```

```java
public class simba{
  public static void main(String[] args){
    System.out.println("我爱你，中国");
  }
}
```

# 表格的使用

```
ctrl+T

|国籍|省份|市区|
```



| 国籍 | 省份 | 市区 |
| :--: | :--: | :--: |
|      |      |      |

| 国籍 | 省份 | 国家 |
| ---- | ---- | ---- |
| sadf | sdfa | sdfa |

# 任务列表

```
-[]文字（注：注意用空格隔开）
-+空格（就行）
```

- 任务一
- 二
  - sdfa
    - sdf
      - 

# 列表

```
1.空格（从任意数字都可以）
+ 、- 、*空格
没有顺序都行

```

7. sdafs
8. sdfa

+ 
+ + + 



# 数学表达式

Typora支持加入用LaTeX写成的数学公式，并且在软件界面下用MathJax直接渲染。

数学公式分为两种：

一种是行内公式(inline math)，可以在偏好设置中单独打开，由一个美元符号$将公式围起来；

一种是行外公式，直接按**Ctrl+Shift+M**；

注：上标和下标可以使用数学表达式来获取

```mathematica
son60^{56} = 1/2
```

$$
son60^{56} = 1/2
$$

```
lim_{x \to \infty} \ exp(-x)=0
```

$$
lim_{x \to \infty} \ exp(-x)=0
$$

```
H_{2}O
```

$$
H_{2}O
$$

```
y^2=4
```

$$
y^2=4
$$

# 水平分割线

```
***
---
```

***

---

# 引用：

```
>+空格
```

> 与天斗其乐无穷
>
> ——《毛泽东选集》

# 注释

```
要添加注释的文字[百度一下](http://www.baidu.com)
```

要添加注释的文字[百度一下](http://www.baidu.com)

# 表情

```
:单词:
```

```
:smile:
```

:smile:

# 文本居中(不管用)

## 文本居中：

```
\<center\>这是要居中的文本内容\<center\>
```

\<center\>居中显示\<center\>

注：Typora目前并不会直接预览居中效果——相应的效果只有输出文本的时候才会显现。

注释：(我试不管用)

