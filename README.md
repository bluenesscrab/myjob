
##GIT使用

	目录：
	1.html5
	2.css3
	3.javascript
		-- es5
		-- es6
		-- regexp 正则
	4. vue
	5. react
	6. reactnative
	7. webpack
	8. node
	9. xiaochengxu(微信小程序)
	10. Tools
		-- dateURL  转换器
		-- Tween  运动形式

##### 1.创建一个版本库
	mkdir project
	cd project
	pwd  （ps:显示当前目录路径）

##### 2.把新建目录变成Git可以管理的仓库
	git init
	
##### 3.添加 上传文件到 git 仓库
	1. 用命令 git add 把文件提交仓库
		git add .
		
	2. 用命令git commit告诉Git，把文件提交到仓库
		git commit -m "description"
	bogon:goodjob zhangsen$ git add README.md 
	bogon:goodjob zhangsen$ git commit -m 'description'
	[master 7a71563] xiugai md
 	1 file changed, 2 insertions(+)
	bogon:goodjob zhangsen$ 
	
##### 4.时光机穿梭
	1、我们已经成功地添加并提交了一个README.md文件，现在，是时候继续工作了，于是，我们继续修改README.md
	2、运行git status命令看看结果：
	
	3、git status命令可以让我们时刻掌握仓库当前的状态，上面的命令告诉我们，README.md被修改过了，但还没有准备提交的修改。
	
	4、git diff这个命令 告诉我们具体修改了什么内容
	
	nothing to commit (working directory clean)
	Git告诉我们当前没有需要提交的修改，而且，工作目录是干净（working directory clean）的。
	
##### 5.版本回退
	1. git log  命令可以告诉我们历史记录，命令显示从最近到最远的提交日志[ PS: q 退出log ]
	
	git log --pretty=oneline [只查看版本和备注]
	
	
	2.git reset --hard HEAD^  
	我们要把当前版本 回退到上一个版本
	
	git reset --hard 3628164
	把当前版本回退到指定版本；
	版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。
	
	
	3. “后悔药” git reflog 用来记录你的每一次命令
	用git reflog查看命令历史，以便确定要回到未来的哪个版本。
	
##### 6.删除文件
	1. 一通常直接在文件管理器中把没用的文件删了或者用rm命令删了：
	rm test.txt
	用命令git rm删掉，并且git commit：
	
	2. 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：
	git checkout -- test.txt
	
##### 7. 远程仓库
	1. 第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
	ssh-keygen -t rsa -C "youremail@example.com"
	里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。
	
	
	2. 第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面 点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容;
	
	为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。
	
##### 8.添加远程库
	1.首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库： 
	
	2.Repository name填入[先把公墓名称]，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：
	
	3.我们根据GitHub的提示，在本地的 [项目] 仓库下运行命令：
	git init
	git add README.md
	git commit -m "first commit"
	git remote add origin https://github.com/bluenesscrab/goobjob.git
	git push -u origin master
	
	4. git push -u origin master 就可以把本地库的所有内容推送到远程库上
	把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
	由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
	从现在起，只要本地作了提交，就可以通过命令：
	git push origin master
		git add .
		git commit -m 'description'
		git push origin master