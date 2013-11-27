(function(global){
global.scroll=function(obj){
	var index = 0;
	var container = obj.container;
	var el = obj.el;
	var flag=obj.flag;
	var num=$(container).find(el).length;
	var step,whole_length,
		orientation = obj.orientation;
	switch(orientation){
		case "v":
			step = $(container).find(el).outerHeight();
			whole_length=step*num;
			$(container).css({"height":whole_length});
			break;
		case "h":
			step = $(container).find(el).outerWidth();
			whole_length=step*num;
			$(container).css({"width":whole_length});
			break;
	}
	return{
		go:function(stepNum){
			if(num <= flag) return;
			index=index+stepNum;
			if(index+flag > num){
				for(var i = 0;i < stepNum;i++){
					$(container).append($(container+" " + el).eq(0).clone());
					$(container+" " + el).eq(0).remove();
				}
				index=index-stepNum;
				if(orientation == "h"){
					$(container).css({"marginLeft":-(index-stepNum)*step});
				}else{
					$(container).css({"marginTop":-(index-stepNum)*step});
				}
			}
			if(index < 0){
				for(var j =0;j < Math.abs(stepNum);j++){
					$(container).prepend($(container+" " + el).eq(num-1).clone());
					$(container+" " + el).eq(num).remove();
				}
				index=index-stepNum;
				if(orientation == "h"){
					$(container).css({"marginLeft":-(index-stepNum)*step});
				}else{
					$(container).css({"marginTop":-(index-stepNum)*step});
				}
			}
			if(orientation == "h"){
				$(container).stop().animate({"marginLeft":-index*step},500);
			}else{
				$(container).stop().animate({"marginTop":-index*step},500);
			}
							
		}
	};
};
})(this.W || (this.W = {}));
define(function(require){
	//require('../jquery-1.8.2);
	require('../base');
	//require('./selCity');
    require('./hotcity_index');
	require('./city3index');
	var _alarm = require('./alarm');
	//焦点图切换
	var focusDelay = alarmDelay = 500;
	var focusImg = new W.scroll({"container":".focusImg ul","el":"li","flag":1,"orientation":"h"});
		focusImg.autoScroll = function(){
			var tempDom = $(".focusImg span .on");
			var oldIndex = $(".focusImg span i").index($(".focusImg span .on"));
			focusImg.go(1);
			tempDom.removeClass("on");
			if(oldIndex < ($(".focusImg span i").length - 1))
				tempDom.next('i').addClass("on");
			else
				$(".focusImg span i").eq(0).addClass("on");	
		};
	   	focusImg.Timer = setInterval(function(){
			focusImg.autoScroll();
		},focusDelay);
	$(".focusImg span i").click(function(){
		if($(this).hasClass("on")) return;
		clearInterval(focusImg.Timer);
		focusImg.Timer = null;
		var prevIndex = $(".focusImg span i").index($(".focusImg span .on"));
		var curIndex = $(".focusImg span i").index($(this));
		focusImg.go(curIndex - prevIndex);
		$(".focusImg span .on").removeClass("on");
		$(this).addClass("on");
	})
	$(".focusImg").hover(function(){
		clearInterval(focusImg.Timer);
		focusImg.Timer = null;
	},function(){
		if(focusImg.Timer == null){
			focusImg.Timer = setInterval(function(){
				focusImg.autoScroll();
			},focusDelay);
		}
	})
	_alarm(function(){
		//预警切换
		var alarm = new W.scroll({"container":".rightBlock #alarm p span","el":"a","flag":1,"orientation":"v"});
		var alarmTimer = setInterval(function(){
			alarm.go(1);
		},alarmDelay);
		$(".rightBlock #alarm p").hover(function(){
			clearInterval(alarmTimer);
			alarmTimer = null;
		},function(){
			alarmTimer = setInterval(function(){
				alarm.go(1);
			},alarmDelay);
		})
	});
	
	//旅游天气图片脚本
	$(".imgArea a").hover(function(){
		$(this).find("i").stop().fadeIn();
		$(this).find("b").stop().fadeIn();
	},function(){
		$(this).find("i").stop().fadeOut();
		$(this).find("b").stop().fadeOut();
	})
	//热门景点切换
	$(".hotSpot h3 span a").hover(function(){
		if($(this).hasClass("on")) return;
		var currIndex = $(".hotSpot h3 span a").index($(this));
		$(".hotSpot h3 span .on").removeClass("on");
		$(this).addClass("on");
		$(".hotSpot ul.on").removeClass("on");
		$(".hotSpot ul").eq(currIndex).addClass("on");
	})
	//排行切换
	$(".rank h3 span a").hover(function(){
		if($(this).hasClass("on")) return;
		var currIndex = $(".rank h3 span a").index($(this));
		$(".rank h3 span .on").removeClass("on");
		$(this).addClass("on");
		$(".rank ul.on").removeClass("on");
		$(".rank ul").eq(currIndex).addClass("on");
	})
	$(".rank ul li").hover(function(){
		if($(this).hasClass("on")) return;
		$(".rank ul.on li.on").removeClass("on");
		$(this).addClass("on");
	})

	
})
