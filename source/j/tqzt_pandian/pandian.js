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
	
})