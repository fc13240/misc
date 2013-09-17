(function(global){
	//产生随机数
	global.createRandom = function(oldIndex,len){
		var newIndex = parseInt(Math.random()*len);
		while(newIndex === oldIndex){
			newIndex = parseInt(Math.random()*len);
		}
		return newIndex;
	};
	//指数
	global.ZS = function(obj){
		this.Container = obj.Container;
		this.mask = obj.mask;
		this.height = obj.height;
	};
	global.ZS.prototype = {
	ItemAnimate:function(old,current){
		if(current != -1){
			var temp_Dom = $(this.Container + ":eq("+current+")" + " " + this.mask);
				temp_Dom.children().eq(1).insertBefore(temp_Dom.children().eq(0));
				temp_Dom.css("top","-"+this.height+"px");
				temp_Dom.stop().animate({top:"0px"},500);
		}
		if(old != -1){
			var temp_Dom = $(this.Container + ":eq("+old+")" + " " + this.mask);
				temp_Dom.children().eq(1).insertBefore(temp_Dom.children().eq(0));
				temp_Dom.css("top","-"+this.height+"px");
				temp_Dom.stop().animate({top:"0px"},1000,"easeInOutQuint");
		}
	}
	};
	//右侧tab切换通用js
	global.rightBlock=function(obj){
	return{
		changeTab:function(num){
			var that=this;
			var temp_left=0;
			this.flag=false;
			this.obj=obj;
			if(!this.flag){
				this.width=[];
				$(this.obj.tabEl).each(function(i){
					that.width[i]=$(this).outerWidth();
				});
				this.flag=true;
			}
			$(this.obj.tabEl+"."+this.obj.onClass).removeClass(this.obj.onClass);
			if(arguments.length > 1)
				$(this.obj.tabEl).eq(arguments[1]).addClass(this.obj.onClass);
			else
				$(this.obj.tabEl).eq(num).addClass(this.obj.onClass);
			$(this.obj.container+" ."+this.obj.onClass).removeClass(this.obj.onClass);
			$(this.obj.container+" "+this.obj.containerEl).eq(num).addClass(this.obj.onClass);
			if(this.obj.arrow){
				for(var i=0;i<num;i++){
					temp_left+=this.width[i];
				}
				$(this.obj.arrow).stop().animate({left:parseInt(temp_left+this.width[num]/2+2)},500,"easeInOutQuint");
			}
		}
	};
	};
	//循环滚动代码
	global.scroll=function(obj){
	var index = 0;
	var container = obj.container;
	var el = obj.el;
	var flag=obj.flag;
	var num=$(container).find(el).length;
	var width = $(container).find(el).outerWidth();
	if(num > flag){
		var whole_length=width*num;
		$(container).css({"width":whole_length});
	}
	return{
		go:function(step){
			if(num <= flag) return;
			index=index+step;
			if(index+flag > num){
				for(var i = 0;i < step;i++){
					$(container).append($(container+" " + el).eq(0).clone());
					$(container+" " + el).eq(0).remove();
				}
				index=index-step;
				$(container).css({"marginLeft":-(index-step)*width});
			}
			if(index < 0){
				for(var j =0;j < Math.abs(step);j++){
					$(container).prepend($(container+" " + el).eq(num-1).clone());
					$(container+" " + el).eq(num).remove();
				}
				index=index-step;
				$(container).css({"marginLeft":-(index-step)*width});
			}
			$(container).animate({"marginLeft":-index*width},500);
		}
	};
	};

})(this.W || (this.W = {}));
