$(document).ready(function(){
//顶部导航
	$("nav ul li i").click(function(){
		var num = $(this).parent().find(".dropList a").length,
			height = parseInt($(this).parent().find(".dropList a").css("line-height").replace("px",""));
		$(this).parent().find(".dropList i").css({"height":height*num+10});
		$(this).parent().find(".dropList").toggle();
		
	})
	$("nav ul li").mouseleave(function(){
		$(this).find(".dropList").hide();
	})
	$(".dropList").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	})
});
