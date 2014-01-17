$(function(){
	$('.blog>h1>span:first').hover(function(){
		$(this).children('img').attr("src","http://i.tq121.com.cn/i/tqzt_pandian/sina2.jpg");
		$(this).next().children("img").attr("src","http://i.tq121.com.cn/i/tqzt_pandian/tq1.jpg");
		$(".sinablog").show();
		$(".tqblog").hide();
	});
	$('.blog>h1>span:last').hover(function(){
		$(this).prev().children("img").attr("src","http://i.tq121.com.cn/i/tqzt_pandian/sina1.jpg");
		$(this).children('img').attr("src","http://i.tq121.com.cn/i/tqzt_pandian/tq2.jpg");
		$(".sinablog").hide();
		$(".tqblog").show();
	});
	
	$(".pdShow .img1,.pdShow .img2,.pdShow .img5,.pdShow .img7,.pdShow .img9").hover(function(){
		var w=$(this).width();
		$(this).children("div").stop(true,true).animate({left:'-'+w},400);
	},function(){
		$(this).children("div").stop(true,true).animate({left:0},400);
	})
	$(".pdShow .img3,.pdShow .img6,.pdShow .img8,.pdShow .img4").hover(function(){
		var h=$(this).height();
		$(this).children("div").stop(true,true).animate({top:'-'+h},400);
	},function(){
		$(this).children("div").stop(true,true).animate({top:0},400);
	})
})