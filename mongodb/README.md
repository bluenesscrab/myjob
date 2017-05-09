
## mongodb

> 下载地址： https://www.mongodb.com/download-center#community

#### MacOs

	# 进入 /usr/local
	cd /usr/local
	
	# 下载
	sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz
	
	# 解压
	sudo tar -zxvf mongodb-osx-x86_64-3.4.2.tgz
	
	# 重命名为 mongodb 目录
	sudo mv mongodb-osx-x86_64-3.4.2 mongodb
	
	
	运行 MongoDB
	1、首先我们创建一个数据库存储目录 /data/db：
	sudo mkdir -p /data/db
	启动 mongodb，默认数据库目录即为 /data/db：
	sudo mongod

	如果没有创建全局路径 PATH，需要进入以下目录
	cd /usr/local/mongodb/bin
	sudo ./mongod
	
	
	再打开一个终端进入执行以下命令：
	$ cd /usr/local/mongodb/bin
	$ ./mongo
	MongoDB shell version v3.4.2
	connecting to: mongodb://127.0.0.1:27017
	MongoDB server version: 3.4.2
	Welcome to the MongoDB shell.
	……
	> 1 + 1
	2
	> 	
	
	打开 http://127.0.0.1:27017/
	It looks like you are trying to access MongoDB over HTTP on the native driver port.
	看起来你正在尝试通过本地驱动程序端口上的HTTP访问MongoDB。


	SQL术语/概念	MongoDB术语/概念	  解释/说明
	database	   database	            数据库
	table	       collection           数据库表/集合
	row	           document	            数据记录行/文档
	column	       field	            数据字段/域
	index	       index	            索引
	table          joins	   	        表连接,MongoDB不支持
	primary key	   primary key	       主键,MongoDB自动将_id字段设置为主键


## 操作
	
	./mongo
	
	show dbs //查看mongodb 上的所有数据库
	> show dbs
	admin   0.000GB
	local   0.000GB
	runoob  0.000GB
	test    0.000GB
	user    0.000GB
	
	
	use test //	切换数据库 use [name]
	> use test
	switched to db test
	
	
	show collections //查看数据库下的表
	> show collections
	admin
	user
	
	db.user.find(); // 查看表中的数据；
	> db.user.find();
	{ "_id" : ObjectId("590033dbe329afe9b0dc92fc"), "name" : "zhang12", "age" : "12", "gender" : "boy" }
	{ "_id" : ObjectId("590033e8e329afe9b0dc92fd"), "name" : "zhang15", "age" : "15", "gender" : "girl" }
	{ "_id" : ObjectId("590033f0e329afe9b0dc92fe"), "name" : "zhang5", "age" : "5", "gender" : "girl" }
	{ "_id" : ObjectId("59101e0512e35dbcf6a70f81"), "name" : "zhang45", "age" : "5", "gender" : "girl" }
	


## node.js mongodb

	cnpm install mongodb
 