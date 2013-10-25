(function(global){
	(function(util){
		/*用于调试*/
		util.log = typeof console != 'undefined' && typeof console.log == 'function'? function(){
			return console.log.apply(console,arguments);
		}:function(){
			alert([].slice.call(arguments).join(' '));
		}

		/*
		继承方法封装
		用法:
			var Person = extend(Event,{
				'init': function(name,age){
					this.name = name;
					this.age = age;
					this.on('say',function(d){
						console.log('I know you say: ',d);
					});
				},
				'prototype': {
					'say': function(content){
						content = this.age+','+this.name + ' say "'+ content + '"';
						this.emit('say',content);
						console.log(content);
					}
				}
			});

			var person = new Person('tonny',100);
			person.say('hello');
		*/
		util.inherits = function (Parent,properties){
			var Child = function(){
				Parent.apply(this,arguments);//继承对像作用域属性及方法
				properties && properties.init && properties.init.apply(this,arguments);
			};

			//减小作用域链长度,继承原型链属性及方法
			Child.prototype = Parent.prototype;
			// Child.prototype = new parent();
			Child.constructor = Child;//重置构造函数,否则会通过作用域链找到，parent.constructor
			var extraProp = properties && properties.prototype;
			if(extraProp){
				for(var i in extraProp){
					Child.prototype[i] = extraProp[i];
				}
			}
			return Child;
		}
		var win = window;
		var doc = document;
		/*添加收藏*/
		util.addFav = function(a) {
			var b = win.location.href;
			if (win.sidebar && win.sidebar.addPanel) {
				win.sidebar.addPanel(a, b, "")
			} else if (win.external && win.external.AddFavorite) {
				win.external.AddFavorite(b, a);
		    } else if (win.external && win.external.msAddSiteMode) {
				win.external.msAddSiteMode(b, a);
		    }else {
				alert('请按 Ctrl + D 为你的浏览器添加书签！');
			}
		}
		/*设为首页*/
		util.setHome = function setHomepage() {
			var url = win.location.href;
			if (doc.all) {
				doc.body.style.behavior = 'url(#default#homepage)';
				doc.body.setHomePage(url);

			} else if (win.sidebar) {
				if (win.netscape) {
					try {
						netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					} catch (e) {
						alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
					}
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref('browser.startup.homepage', url);
			} else{
				alert("您的浏览器不支持此功能！");
			}
		}
		/*cookie相关操作*/
		!function(){
			util.cookie = {
				set: function(name,value,days){
					var argv = arguments;
					var argc = argv.length;
					if (days > 0) {
						var LargeExpDate = new Date();
						LargeExpDate.setTime(LargeExpDate.getTime() + (days * 1000 * 3600 * 24));
					}
					doc.cookie = name + "=" + escape(value) + (LargeExpDate ? ("; expires=" + LargeExpDate.toGMTString()): '');
				},
				get: function(name){
					var search = name + "="
					var cookie = doc.cookie;
					if (cookie.length > 0) {
						offset = cookie.indexOf(search)
						if (offset != -1) {
							offset += search.length
							end = cookie.indexOf(";", offset)
							if (end == -1) end = cookie.length
							return unescape(cookie.substring(offset, end))
						} else return ""
					}
				}
			}
		}()
	})(global.util||(global.util = {}));
})(this.W || (this.W = {}));