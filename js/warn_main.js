define(function(require){
	var whole_height = $(".advice").outerHeight()+$(".ad").outerHeight()+$(".radar").outerHeight()+$(".expert").outerHeight()+$(".knowledge").outerHeight()+$(".hotLine").outerHeight()+60;
	$(".block_content,.block .bg").css({"height":whole_height});
	$(".block_content").parent().css({"height":whole_height});
	require('./base');
	require('./share');
	require('./hotcity');
	//顶部导航
	$("nav ul li").click(function(){
		var num = $(this).find(".dropList a").length,
			height = parseInt($(this).find(".dropList a").css("line-height").replace("px",""));
		$(this).find(".dropList i").css({"height":height*num+10});
		$(this).find(".dropList").toggle();
	})
	$("nav ul li").mouseleave(function(){
		$(this).find(".dropList").hide();
	})
	$(".dropList").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	})
	//分享
	$(".qzone").click(function(){
		share('qq');
	})
	$(".sina").click(function(){
		share('sina');
	})
	$(".qqweibo").click(function(){
		share('qqweibo');
	})
	$(".renren").click(function(){
		share('renren');
	})
	$(".kaixin").click(function(){
		share('kaixin');
	})
	//右侧内容块定位
	var rightElements = $(".rightEl"),
		top = 0;
	for(var i=0,ii = rightElements.length;i<ii;i++){
		rightElements.eq(i).css({"top":top});
		top+= rightElements.eq(i).outerHeight()+10;
	}
	//图片鼠标效果
	$(".imgNews figure img,.imgArea a img,.gallery .imgArea a img").hover(function(){
		$(this).css("opacity",0.8);
	},function(){
		$(this).css("opacity",1);
	})

})