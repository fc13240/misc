# 全局工具方法

### `core.js`里暴露方法

> #### W
用法相当于`$.ready`,只不过它会自动去加载`jquery`,**建议在用到`$.ready`方法时都换成此方法**

> #### W.use
用法可参考`seajs.use`方法,引用路径可以参考[#](/docs/seajs.md)

> #### W.css
同步在页面当前位置调用`document.write`，写入`<link>`, **此方法不应该在异步JS文件里用**

> #### W.js
同步在页面当前位置调用`document.write`，写入`<script>`, **此方法不应该在异步JS文件里用**

> #### W.getSeajs
此方法用于调试`seajs`

> #### W.data
此方法可以存储全局数据，默认存储为`{base:'前端资源根目录',v:'版本号'}`

### `global.js`里暴露方法

> #### W.util.log
全局调用输出日志方法

> #### W.util.inherits
继承用工具方法,可参考[#](https://github.com/tonny-zhang/tonny-zhang.github.com/blob/master/js-ppt/docs/extend.md)
> > ```
(function(global){
	var inherits = function (Parent,properties){
		var Child = function(){
			Parent.apply(this,arguments);//继承对像作用域属性及方法
			properties && properties.init && properties.init.apply(this,arguments);
		};
		//减小作用域链长度,继承原型链属性及方法
        Child.prototype = Parent.prototype;
        Child.constructor = Child;//重置构造函数,否则会通过作用域链找到，parent.constructor
        var extraProp = properties && properties.prototype;
        if(extraProp){
                for(var i in extraProp){
                        Child.prototype[i] = extraProp[i];
                }
        }
        return Child;
	}
	function Person(name){
    	this.name = name;
    }
    Person.prototype.say = function(){
    	console.log('My name is :'+this.name);
    }
    var Child = inherits(Person,{
    	init: function(name,age){
    		this.age = age;
    	},
    	prototype: {
    		sayAge: function(){
    			console.log(this.name + ' is '+this.age);
    		}
    	}
    });
    var man = new Person("person");
    man.say();
    console.log('man instanceof Person:',man instanceof Person);
    console.log('Person.prototype.isPrototypeOf(man):',Person.prototype.isPrototypeOf(man));
    var child = new Child("Tonny",26);
    child.say();
    child.sayAge();
    console.log('child instanceof Person:',child instanceof Person);
    console.log('Person.prototype.isPrototypeOf(child):',Person.prototype.isPrototypeOf(child));
    console.log('child instanceof Child:',child instanceof Child);
    console.log('Child.prototype.isPrototypeOf(child):',Child.prototype.isPrototypeOf(child));
})(this);
> > ```
> #### W.util.addFav
添加到收藏夹

> #### W.util.setHome
设置为首页

> #### W.util.cookie.get
得到一个cookie

> #### W.util.cookie.set
设置一个cookie