# 天气网前端规范

> 现由于天气网对网站页面性能优化，经测试总结，做如下规范：

## 1. 整体架构
> ### 1.1 脚本只同步引入core.js,其它都异步引入（以seajs，依赖jquery-1.8.2），保证脚本尽量小地堵塞页面
> ### 1.2 资源延时加载，如：
> > 第二屏图片资源当用户拉动滚动条（即要显示第二屏时）再请求资源，可参考lazyload.js;
> > 选项卡暂时不显示的图片不加载，当用户操作时按需加载
> ### 1.3	ajax请求资源在客户端缓存，减少重复请求数

## 2. 细节说明
> ### 2.1	外部样式和外部脚本位置
> > #### 2.1.1	css最好放在<head>里，模块化后依赖的css可以动态引入
> > #### 2.1.2	core.js放在<head>里
> > >由于2.1.1的限制,core.js应该放在所有外部css后,保证此核心脚本同步引入

> ### 2.2	JS编写规范
> > #### 2.2.1 脚本尽量模块化
> > > 参考[seajs](http://seajs.org/docs/) 用法，让框架自动管理依赖，把开发人员从依赖的管理里解放出来
> > #### 2.2.2 尽量少地定义全局变量，保证全局生态环境的清洁度，可以把代码段放在闭包里，如：
> > ```
(function(global){
	var name = 'inner';
	global.getName = function(){
		return name;
	}
})(this);
> > ```
> > #### 2.2.3 当引用的对像或变量超过两次时，都要用局部变量保存（提高性能，方便压缩）
> > #### 2.2.4 天气网脚本全局变量'W'的用法，可参考[示例](http://tonny-zhang.github.io/front-end-code-review/example/1.html)
> > ##### 2.2.4.1 为保证全局生态环境的清洁度，也为了全局使用的必要，现规定全局命名空间为'W',可在此基础上进行扩展，如：
> > > 模块util命令空间为 W.util ,内容如下：
> > > ```
(function(global){
	(function(util){
		util.log = typeof console != 'undefined' && typeof console.log == 'function'? function(){
			return console.log.apply(console,arguments);
		}:function(){
			alert([].slice.call(arguments).join(' '));
		}
	})(global.util||(global.util = {}));
})(this.W || (this.W = {}));
> > >
用法：W.util.log('hello');
> > > ```

> > ##### 2.2.4.2 W用法
> > > 此方法主要是解决jquery的依赖问题，类似于jquery.ready,当没有jquery时，异步加载jquery,加载完成后，把定义的回调函数放在jquery.ready里：
> > >```
W(function(){
	alert('jquery loaded and event DOMContentLoaed emited');
})
> > >```
***当不需要把回调放到$.ready里，又想使用jquery怎么办？*** 参考：2.2.4.4.

> > ##### 2.2.4.3	W.config
> > > 可参考：seajs.config,但隐藏seajs接口，把要暴露的接口放到W全局变量上
> > >```
W.config({
	base: location.protocol + '//' + location.host + '/front-end-code-review/', //配置静态资源的根目录
	map: [
		[/\.(js|css)$/, '$&?' + frontVersion] //加版本号，由发布脚本更改
	],
	alias: {
		'jquery': 'n/j/jquery-1.8.2.js'
	},
	charset: 'utf-8'
});
> > >```
> > ##### 2.2.4.4 W.use
> > > 可参考：seajs.use，异步加载模块化的JS或变量JS，用法：
> > >```
W.use(jsArr/*{Array|String}*/,callback/*{Function}加载完后的回调*/)
W.use('jquery',function(){//这里的jquery是2.2.4.3里配置的alias
	W.util.log($('body').html());
	W(function(){
		W.util.log('loaded');
	});
});
> > >```
> > > 关于W.use及模块里`require`及`require.async`，路径问题可参考[这里](#/docs/seajs.md)

> ### 2.3	CSS编写规范
> > #### 2.3.1 尽量按功能进行分隔，要不要所有CSS放在同个文件里，如：
> > ```
reset.css           对浏览器的样式进行统一处理
core.css            整个网站的核心css，里面会定义一些常用的类
ui.css              可以在此文件里定义常用的UI的样式
p_index.css         index对应的样式文件
m_dialog.css        模块dialog要依赖的css
> > ```
> > #### 2.3.2	尽量符合css解析规范，提高CSS解析效率
> > #### 2.3.3	样式图片尽量合并，减少http请求数
> > #### 2.3.4	提高代码的复用度(可细粒度拆分，对元素进行多个class，但要权衡利弊)

> ### 2.4	关于压缩
> > 现前端资源发布时会对静态资源(css、js)进行压缩,压缩脚本为基于[Uglifyjs](https://github.com/mishoo/UglifyJS)
> > 并结合现业务进行开发的[Compresser](https://github.com/tonny-zhang/compresser),为使压缩文件的大小达到最小，
> > 现对JS做如下规定：
> > 
> > **1. 尽量用局部变量存储要多次使用的相对全局变量，如：**
> > > ```
(function(){
	function Persion(name,age,height){
		this.name = name;
		this.age = age;
		this.height = height;
	}
	Persion.prototype.run = function(){
		// some code
	}
	Persion.prototype.say = function(){
		// some code
	}
	Persion.prototype.wait = function(){
		// some code
	}
})();
//压缩后结果：
!function(){function t(t,n,o){this.name=t,this.age=n,this.height=o}t.prototype.run=function(){},t.prototype.say=function(){},t.prototype.wait=function(){}}();
> > > ```
可简写成如下形式：
> > > ```
(function(){
	function Persion(name,age,height){
		var _this = this;
		_this.name = name;
		_this.age = age;
		_this.height = height;
	}
	var persionProp = Persion.prototype;
	persionProp.run = function(){
		// some code
	}
	persionProp.say = function(){
		// some code
	}
	persionProp.wait = function(){
		// some code
	}
})();
//压缩后结果
!function(){function n(n,t,i){var o=this;o.name=n,o.age=t,o.height=i}var t=n.prototype;t.run=function(){},t.say=function(){},t.wait=function(){}}();
> > > ```

> > **2. 对多次出现的字符串尽量采用预定义，如：**
> > > ```
(function(){
	var a,b,c;
	if(a == 1){
		console.log('出现的字符串');
	}
	if(b == 1){
		console.log('出现的字符串');
	}
	if(c == 1){
		console.log('出现的字符串');
	}
})();
//压缩后结果
!function(){var o,l,n;1==o&&console.log("出现的字符串"),1==l&&console.log("出现的字符串"),1==n&&console.log("出现的字符串")}();
> > > ```
可简写成如下形式：
> > > ```
(function(){
	var NOTICE = '出现的字符串';
	var a,b,c;
	if(a == 1){
		console.log(NOTICE);
	}
	if(b == 1){
		console.log(NOTICE);
	}
	if(c == 1){
		console.log(NOTICE);
	}
})();
//压缩后结果
!function(){var o,l,n,c="出现的字符串";1==o&&console.log(c),1==l&&console.log(c),1==n&&console.log(c)}();
> > > ```