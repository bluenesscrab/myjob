## npm 包
	
	npm init 初始化 npm
	
	各种 npm install [name] --save
	
	新建目录 mikdr [name]
	新建文件 mkfile -n [大小 1kb/1mb/1g] [name]
	
		mkfile -n 2kb .npmignore
		ls -as

	.npmignore 
	.DS_Store
	node_modules/
	dist
	lib/*
	!lib/.gitkeep
	.vscode
	npm-debug.log

	
> 查看隐藏文件 ls -as
> 
> 显示 .开头文件 终端输入： defaults write com.apple.finder AppleShowAllFiles TRUE; killall Finder
> 
> 隐藏 .开头文件 终端输入： defaults write com.apple.finder AppleShowAllFiles FALSE; killall Finder
> 


### npm 发布

	npm adduser	
	Username: yourname
	Password: yourpassword
	Email: yourmail@163.com
	
	npm publish
	
	






