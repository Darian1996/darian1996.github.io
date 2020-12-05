如果你已经初始化过了，但是不小心把邮箱和用户名输错了，那么就要修改了。

我看到网上有人说继续 `$ git config --global user.name "输入你的用户名" 或者` `$ git config --global user.email "输入你的邮箱"` 来修改邮箱和密码。我尝试了一下，是不行的（至少在window10的环境下）会给出这样的错误：

```c
warning: user.name has multiple values
error: cannot overwrite multiple values with a single value
       Use a regexp, --add or --replace-all to change user.name.
```



这边给出了--repalce-all 这个东西。



然后我尝试着用

```c
$  git config --global --replace-all user.email "输入你的邮箱" 
$  git config --global --replace-all user.name "输入你的用户名"
```





然后再查看下

```c
$  git config --list 
```

发现修改成功了。

