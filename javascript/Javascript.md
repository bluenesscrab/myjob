## javascript

#### window 弹窗
	
window.open(pageURL,name,parameters) 
 
> pageURL 为弹出窗口路径  
	name 为弹出窗口名称，也可以是系统自带的比如：_self, _blank,_top,_parent ...  
>
> parameters 为窗口参数(各参数用逗号分隔) 
> 各项参数 
> 其中yes/no也可使用1/0；pixel value为具体的数值，单位象素。 
> 参数           | 取值范围      | 说明 
> 
> alwaysLowered | yes/no | 指定窗口隐藏在所有窗口之后  
> alwaysRaised | yes/no | 指定窗口悬浮在所有窗口之上  
> depended | yes/no | 是否和父窗口同时关闭  
> directories | yes/no | Nav2和3的目录栏是否可见  
> height | pixel value | 窗口高度  
> hotkeys | yes/no | 在没菜单栏的窗口中设安全退出热键  
> innerHeight | pixel value | 窗口中文档的像素高度  
> innerWidth | pixel value | 窗口中文档的像素宽度  
> location | yes/no | 位置栏是否可见  
> menubar | yes/no | 菜单栏是否可见  
> outerHeight | pixel value | 设定窗口(包括装饰边框)的像素高度  
> outerWidth | pixel value | 设定窗口(包括装饰边框)的像素宽度  
> resizable | yes/no | 窗口大小是否可调整  
> screenX | pixel value | 窗口距屏幕左边界的像素长度  
> screenY | pixel value | 窗口距屏幕上边界的像素长度  
> scrollbars | yes/no | 窗口是否可有滚动栏  
> titlebar | yes/no | 窗口题目栏是否可见  
> toolbar | yes/no | 窗口工具栏是否可见  
> Width | pixel value | 窗口的像素宽度  
> z-look | yes/no | 窗口被激活后是否浮在其它窗口之上 

	
	let btn1 = document.getElementById('btn1');
	let btn2 = document.getElementById('btn2');
	btn1.onclick = function () {
	  mywindow = window.open('http://www.baidu.com','_blank', 'height=200, width=400, top=0, left=0, resizable=no')
	}
	btn2.onclick = function () {
	  mywindow.close();
	}
	
	
	

window.alert()

> 参数，只有一个，显示警告框的信息；无返回值。 
	
window.confirm()

> 参数就只有一个。显示提示框的信息。按确定,返回true；按取消返回false。

	btn.onclick = function () {
	  if(confirm('ok or cancel')){
	    document.body.append('ok -> true');
	  }else{
	    document.body.append('cancel -> false');
	  }
	}
	
 window.prompt()
 
 > 参数,有两个，第一个参数，显示提示输入框的信息。第二个参数,用于显示输入框的默认值。返回，用户输入的值。
 
 	btn.onclick = function () {
	  var person = prompt("请输入你的名字","Harry Potter");
	  // ok person -> "Harry Potter"
	  if (person != null && person != ""){
	      console.log("你好 " + person + "!")
	  }
	}

window.showModalDialog() 
	

> 方法用来创建一个显示HTML内容的模态对话框。window.showModelessDialog()方法用来创建一个显示HTML内容的非模态对话框。
>   
>  window.showModelessDialog("url","name","参数：值；参数：值；……")  
> url：对话框窗口链接地址  
> name：对话框的名称，可以为空  
> scroll：是否有滚动条，0表示无，非0表示有  
> status：是否有状态栏，0表示无，非0表示有  
> help：是否有问号，0表示无，非0表示有  
> resizable：是否可以用鼠标拖动改变框提大小，0表示不可以，非0表示可以  
> dialogWidth：对话框宽度值  
> dialogHeight：对话框高度值 
> 
>  
> showModalDialog()与showModelessDialog()的区别:  
> showModalDialog()打开的窗口，置在父窗口上，必须关闭才能访问父窗口；  
> showModelessDialog() 打开后不必关闭也可访问父窗口打开的窗口。

	
