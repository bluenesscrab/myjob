npm init

npm install webpack

npm install --save-dev babel-loader babel-core babel-preset-es2015  安装babel（ES6转ES5）

export

	//demo1.js
	export const str = 'hello world'
	export function f(a){
	  return a+1
	}
	
	对应的导入方式：
	//demo2.js
	import { str, f } from 'demo1' //也可以分开写两次，导入的时候带花括号

export default

	//demo1.js
	export default const str = 'hello world'

	对应的导入方式：
	//demo2.js
	import str from 'demo1' //导入的时候没有花括号