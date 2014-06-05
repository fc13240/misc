define(function(require){
	require('jquery');

	$.fn.extend({ 
		_fadeHover:function(){
			//0 or 2 opacity值为参 取值范围：0~1
			//无参数: opacity默认值到1； 两个参数：opacity值参数1 到 参数2
			//例子：$('i')._fadeHover();$('i')._fadeHover('0.4','0.8')
			var l = arguments.length;
			var opa1 = l==0 && $(this).css('opacity') || l==2 &&  arguments[0];
			var opa2 = l==0 && 1 || l==2 &&  arguments[1]
			$(this).css('opacity',opa1).hover(function(){
				$(this).css('opacity',opa2);
			},function(){
				$(this).css('opacity',opa1);
			})
		}
	})

	$.extend({
		_clearInter:function(arrInter){
			for (var i = arrInter.length - 1; i >= 0; i--) {
				clearInterval(arrInter[i]);
			}
		}	
	})
})