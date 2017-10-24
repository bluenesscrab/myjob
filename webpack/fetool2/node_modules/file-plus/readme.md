## 文件操作类库
* **getAllFilesSync**	 获得所有目录下的文件<br/>
	* 参数：
		* **filePath**：文件夹路径；
		* **ext**：要获取文件的后缀名名称 // 支持扩展名数组 ；
		* **filter**： 要过滤的文件名称列表；

* **getAllDirsSync**	 同步获得所有目录下的目录<br/>
	* 参数：
		* **filePath**：文件夹路径；
		* **filter**：要过滤的目录称列表，数组；

* **createFile**	 异步创建文件<br/>
	* 参数：
		* **fileName**：文件全部路径 ；
		* **callback**：回调函数；

* **createFileSync**	 同步创建文件<br/>
	* 参数：
		* **fileName**：文件全部路径 ；
	* 返回：
		* **true/false** ；

 * **mkdirsSync**	 同步创建多层文件夹<br/>
	* 参数：
		* **fileName**：文件夹全部路径 ；
		* **mode**：文件夹权限 ；
	* 返回：
		* **true/false** ；

 * **mkdirsSync**	异步创建多层文件夹<br/>
	* 参数：
		* **fileName**：文件夹全部路径 ；
		* **mode**：文件夹权限 ；
		* **callback**：回调函数，参数为true／false ；