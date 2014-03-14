// JavaScript Document
$(function(){
	var i=1,j=60;
	//上边的小焦点图
	setInterval(function(){n=i%4;auto(n);i++;},3000);	
	$("#show .bottom ul li").mouseenter(function(){
		var n = $(this).index();
		auto(n);
	})
	function auto(n){
		$("#show .bigImg").stop(true,true).animate({left: -441*n+'px'},300);
		var text = $("#show .bigImg li").eq(n).children("a").attr('title');
		$('#show .bottom p').text(text)
		$("#show .bottom ul li").eq(n).siblings().removeClass();
		$("#show .bottom ul li").eq(n).addClass("on");
	}

	//中间的大一点的焦点图	
	var imgWidth = $("#showBig .bigImg li img").width();
	
	$("#showBig .bigImg li").clone().prependTo($("#showBig .bigImg"));	
	
	setInterval(function(){autoBig('left',imgWidth)},5000);	
	$("#showBig .showLeft,#showBig .showRight").hover(function(){
		$(this).css('opacity',0.6);
	},function(){
		$(this).css('opacity',0.3);
	})
	
	$("#showBig .showLeft").click(function(){
		autoBig('right',imgWidth)
	})
	$("#showBig .showRight").click(function(){
		autoBig('left',imgWidth)
	})
	
	var autoBig = function(roll,w){
		if(roll=='left'){
			$("#showBig .bigImg").stop(true,true)
			var l=$("#showBig .bigImg").position().left;	
			var lp = parseInt(l);
			if(lp<=(-w*11)){
				$('#showBig .bigImg').css('left',-w*5+'px')
			}
			$("#showBig .bigImg").animate({left: '-='+w+'px'},500);
			j++;
		}else if(roll == 'right'){
			$("#showBig .bigImg").stop(true,true)
			var l=$("#showBig .bigImg").css('left');	
			var lp = parseInt(l);
			if(lp>=0){
				$('#showBig .bigImg').css('left',-w*6+'px')
			}
			$("#showBig .bigImg").animate({left: '+='+w+'px'},500);
			j--;
		}
		n=j%6;
		if(n<0)n=-n;
		$("#showBig .bottom ul li").eq(n).siblings().removeClass();
		$("#showBig .bottom ul li").eq(n).addClass("on");
	}
})
