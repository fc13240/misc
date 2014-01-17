$(function(){
	$('.col_left ul li,.col_left>div>h1').hover(function(){
		$(this).addClass("oneLevelMenu");
		$(this).children("ul").stop(true,true).show();	
	},function(){
		$(this).removeClass('oneLevelMenu');
		$(this).children("ul").stop(true,true).hide();
	})	
})