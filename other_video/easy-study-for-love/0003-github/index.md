# github

## 限制

- github 不允许上传视频
- 文件不能超过 100M
- 不能管理空文件夹，只有有文件了，才可以管理，文件。





## 申请账号

- https://github.com/



## 配置密钥

SSH 秘钥默认储存在账户的主目录下的 ~/.ssh 目录

如：`C:\Users\BF100400\.ssh\` 如果，欸有，就去生成密钥，如果有，就不需要生成密钥了。

### 生成密钥

-  cmd 窗口

- ```c
  ssh-keygen -t rsa -C "your_email@youremail.com"
  ```

- 

![1574328408849](assets/1574328408849.png)



### 配置密钥到github



![1574328467215](assets/1574328467215.png){:width:="300px"}



<img src="assets/1574328546523.png" alt="1574328546523" style="zoom:60%;" />



#### 注意：

复制的是公钥。

![1574328665493](assets/1574328665493.png)







## 创建 github 仓库

![1574329154251](assets/1574329154251.png)



<img src="assets/1574329345379.png" alt="1574329345379" style="zoom:60%;" />



#### SSH 远端地址

<img src="assets/1574329364958.png" alt="1574329364958" style="zoom:67%;" />







### 空的仓库

```

git init
git add *
git commit -m "first commit"
git remote add origin git@github.com:Darian1996/darian-commons-utils.git
git push -u origin master
```

### 已经有仓库了，可以直接关联，提交

```
git remote add origin git@github.com:Darian1996/darian-commons-utils.git
git push -u origin master
```



## 傻瓜式提交





