define(function(require){	
	require('jquery');
	require('../tool/raphael');
	require('../base');
	var share = require('../m_share');
	require('../plugs/jquery.easing.1.3');
	require('./forecast7d');
	require('./hotZS');
	require('./aroundCity');
	require('./observe24h');
	require('./life_golf');
	require('./life_shr');
	require('./hotcity');
	
	paper.polygon(x,y,arrowR).attr(arrowStyle).animate({transform:["t0,0r"+ang]},500);
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
	//查看周边区县
	$("#selAroundCity").click(function(){
		$(".Cities").animate({ height: 'toggle'}, "normal");
	})
	$(".Cities").hover(function(){
	},function(){
		$(".Cities").animate({ height: 'toggle'}, "normal");
	})
	
	//分享
	$(".sina").click(function(){
		share('sina');
	})
	$(".qqweibo").click(function(){
		share('qqweibo');
	})
	$(".renren").click(function(){
		share('renren');
	})
	

	//生活天气助手action
	var birthP=false,
		commonP=false,
		birthC=false,
		commonC=false,
		golfP=false,
		golfC=false,
		golfG=false;
	$("#birth .provinceItem").mouseenter(function() {birthP =false;}).mouseleave(function() {birthP = true;});
	$("#common .provinceItem").mouseenter(function() {commonP =false;}).mouseleave(function() {commonP = true;});
	$("#birth .cityItem").mouseenter(function() {birthC =false;}).mouseleave(function() {birthC = true;});
	$("#common .cityItem").mouseenter(function() {commonC =false;}).mouseleave(function() {commonC = true;});
	$("#golf .provinceItem").mouseenter(function() {golfP =false;}).mouseleave(function() {golfP = true;});
	$("#golf .cityItem").mouseenter(function() {golfC =false;}).mouseleave(function() {golfC = true;});
	$("#golf .golfItem").mouseenter(function() {golfG =false;}).mouseleave(function() {golfG = true;});
	$(document).mousedown(function(){
		if(birthP && $("#birth .provinceItem").is(":visible"))
			$("#birth .provinceItem").hide();
		if(commonP && $("#common .provinceItem").is(":visible"))
			$("#common .provinceItem").hide();
		if(birthC && $("#birth .cityItem").is(":visible"))
			$("#birth .cityItem").hide();
		if(commonC && $("#common .cityItem").is(":visible"))
			$("#common .cityItem").hide();
		if(golfP && $("#golf .provinceItem").is(":visible"))
			$("#golf .provinceItem").hide();
		if(golfC && $("#golf .cityItem").is(":visible"))
			$("#golf .cityItem").hide();
		if(golfG && $("#golf .golfItem").is(":visible"))
			$("#golf .golfItem").hide();
	})
	

	//搜索框
	var search = require('../tool/search');
	var $txtZip = $('#txtZip');
	var rePosFn = search($txtZip.on('show_addition',function(){
		rePosFn({'left':'50%','margin-left':74});
	}),$('#btnZip'));
})
