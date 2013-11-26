define(function(require){	
	require('jquery');
	//require('../tool/raphael');
	//require('../base');
	//var share = require('../m_share');
	//require('../plugs/jquery.easing.1.3');
	require('./forecast7d');
	require('./hotZS');
	require('./aroundCity');
	//require('./rightBlock');
	//require('./observe24h');
	//require('./life_golf');
	//require('./life_shr');
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
	$(".sina").click(function(){
		share('sina');
	})
	$(".qqweibo").click(function(){
		share('qqweibo');
	})
	$(".renren").click(function(){
		share('renren');
	})
	

	//搜索框
	var search = require('../tool/search');
	var $txtZip = $('#txtZip');
	var rePosFn = search($txtZip.on('show_addition',function(){
		rePosFn({'left':'50%','margin-left':74});
	}),$('#btnZip'));
})
