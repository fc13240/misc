define(function(require){
	require("./W");
	//要闻、旅游、生活切换
	var Block1=new W.rightBlock({tabEl:'.hotNews .tabs ul li',onClass:'on',container:'.hotNews .tabContent',containerEl:'.news',arrow:'.hotNews .tabs span'});
	$(".hotNews .tabs ul li").hover(function(){
		if($(this).hasClass("on")) return;
		var curIndex=$(".hotNews .tabs ul li").index($(this));
		Block1.changeTab(curIndex);
	})
	//视频、高清组图切换
	var Block2=new W.rightBlock({tabEl:'.hotVideo .tabs ul li',onClass:'on',container:'.hotVideo .tabContent',containerEl:'.video',arrow:'.hotVideo .tabs span'});
	$(".hotVideo .tabs ul li").hover(function(){
		if($(this).hasClass("on")) return;
		var curIndex=$(".hotVideo .tabs ul li").index($(this));
		Block2.changeTab(curIndex);
	})
	//热门景点、空气质量切换
	var Block3=new W.rightBlock({tabEl:'.rank .tabs ul li',onClass:'on',container:'.rank .tabContent',containerEl:'.rankItems',arrow:'.rank .tabs span'});
	$(".rank .tabs ul li").hover(function(){
		if($(this).hasClass("on")) return;
		var curIndex=$(".rank .tabs ul li").index($(this));
		Block3.changeTab(curIndex);
	})
	//社区互动、生活天气助手切换
	var Block4=new W.rightBlock({tabEl:'.interact .tabs ul li',onClass:'on',container:'.interact .tabContent',containerEl:'.news',arrow:'.interact .tabs span'});
	$(".interact .tabs ul li").hover(function(){
		if($(this).hasClass("on")) return;
		var curIndex=$(".interact .tabs ul li").index($(this));
		Block4.changeTab(curIndex);
	})
})