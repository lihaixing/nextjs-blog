---
title: 'Git 命令'
date: '2021-07-31'
---

1.在某目录中Git Bash 
确定是否安装git成功

2. 自报家门

```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```


3. 查看用户名和邮箱地址：

```
$ git config user.name
$ git config user.email
```


4.工作目录

```
$ mkdir learngit 创建空目录
$ cd learngit 
$ pwd 显示当前目录
```


5.目录变仓库

```
git init
```

6.文件的添加、提交

```
git add readme.txt 把文件添加到仓库（在这之前目录中必须有此文件），可以是多个文件（添加到暂存区）
git commit -m "wrote a readme file" 将文件提交到仓库
没修改或添加文件一次，就循环这两步
```


7.文件的状态、修改、日志查看、命令查看、内容查看

```
git status 查看文件状态 提示被修改过了，但还没有准备提交的修改
cat readme.txt 查看内容
git diff readme.txt 查看修改了什么内容

git log 命令显示从最近到最远的提交日志
git log --pretty=oneline 精简版 只显示日志，不显示时间、修改者等

git reflog 记录每一次命令（不只是提交） 可查看commit ID
```


8.恢复到历史版本或未来版本

```
git reset --hard HEAD^ 回复到上一个版本  head是当前版本，不是最新版本
git reset --hard HEAD^^ 回复到上上一个版本
git reset --hard HEAD~100 表示100个^
git reset --hard 3628164 可以去到未来 一串数字是commit ID
```


9.工作区和暂存区
Learngit是工作区 
 

10.丢掉工作区的修改 恢复到最近git add或git commit的状态

```
git checkout –- readme.txt
```


11.想删除暂存区的东西，用这个命令可以将暂存区的东西回退到工作区（并没消失，只是回到工作区）

```
git reset HEAD readme.txt 若已经add
```


12.删除文件 先手动删除或者 rm test.txt

```
然后 git rm test.txt（rm 和 add性质相同）
	git commit
```



### 远程库
现在操作的是版本库，接下来要操作远程库

创建SSH Key

```
$ ssh-keygen -t rsa -C youremail@example.com
```


关联远程库

```
$ git remote add origin git@github.com:lihaixing/learngit.git
```


把本地库的所有内容推送到远程库上 把当前分支master推送到远程

```
$ git push -u origin master
```


把本地master分支的最新修改推送至GitHub

```
$ git push origin master
```


克隆库到本地（分为SSH和https）

```
$ git clone git@github.com:lihaixing /gitskills2.git
```


分支的原理图
创建分支 master是主分支 dev是自己设置的分支 head是当前所在的分支

 
创建分支
 
修改和提交
 
转变分支（将head指向master） 合并分支
 
删除分支
 

创建分支、切换分支、查看分支、合并分支、删除分支

```
$ git checkout -b dev 创建并切换分支到dev
相当于
git branch dev 创建分支
git checkout dev  切换分支
git branch 查看分支
git merge dev 把dev分支的工作成果合并到master分支上
git branch -d dev 删除分支

Fast-forward表示快进模式，直接把指针指向分支
```



解决冲突

```
当在分支feature1上修改并提交文件后，又在master上修改并提交文件
这两个分支就存在冲突，合并时怎么办
注意：如果在分支上去合并，并不起作用，必须在master上合并，因为在分支上合并就是分支和分支合并（也就是自己和自己合并）
 

合并不了就在master上修改文件 就会自动合并
```

 

查看分支合并情况

```
git log --graph --pretty=oneline --abbrev-commit
git log –graph 分支合并图
```


不使用Fast forward模式合并
git merge --no-ff -m "merge with no-ff" dev
因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去

可以看到，不使用Fast forward模式，merge后就像这样
 
工作都是在分支上完成，完成后合并到主支master

工作区储存
工作未完成时，想先修复bug，可以先把工作区储存起来，以后再恢复

```
git stash 工作区储存
git stash list查看工作现场存到哪去
```


工作区恢复
一是用
```
git stash apply
```
恢复，但是恢复后，stash内容并不删除，你需要用
```
git stash drop
```
来删除；
另一种方式是用
```
git stash pop
```
，恢复的同时把stash内容也删了：

你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：

恢复指定的stash

```
$ git stash apply stash@{0}
```


若分支提交后 没有合并 分支是删除不了的 需要用

```
git branch -D <name>强行删除
```



要查看远程库的信息，用git remote：
用
```
git remote -v
```
可以查看抓取和推送的origin的地址


但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？
master分支是主分支，因此要时刻与远程同步；主要用来发布新版本，不要在上面干活

dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

总之，就是在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！

现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：

```
$ git checkout -b dev origin/dev
```


git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突
git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接git branch --set-upstream dev origin/dev

标签管理

```
git tag v1.0 打标签  （打在最近commit）
git tag查看所有标签
git tag v0.9 6224937 给对应ID版本打标签
git show v1.0 标签信息
```


还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字：

```
$ git tag -a v0.1 -m "version 0.1 released" 3628164

git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
git tag -d v0.1 删除标签
如果要推送某个标签到远程，使用命令git push origin <tagname>
一次性推送全部尚未推送到远程的本地标签
```


```
$ git push origin –tags
```


如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除再删除远程

```
$ git tag -d v0.9
$ git push origin :refs/tags/v0.9
```



•  在GitHub上，可以任意Fork开源仓库；
•  自己拥有Fork后的仓库的读写权限；
•  可以推送pull request给官方仓库来贡献代码

其他git命令
让Git显示颜色，会让命令输出看起来更醒目：

```
$ git config --global color.ui true
```


