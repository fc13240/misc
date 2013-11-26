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
	var arrowStyle = {fill: "#ee842f", stroke: "#ee842f", "stroke-width": 1};
		paper = Raphael("flHolder", 84, 84),
		x = 46,
		y = 42,
		r = 20,
		ang = 0,
		arrowR = 10;
	if(flAngle <= '22.5' || (flAngle > '337.6' && flAngle <= '360')){
		y = y - r;
		ang = 180;
	}else if(flAngle > '22.6' && flAngle <= '67.5'){
		x = x+r*Math.cos(45);
		y = y - r*Math.sin(45);
		ang = 225;
	}else if(flAngle > '67.6' && flAngle <= '112.5'){
		x = x+r;
		ang = 270;
	}else if(flAngle > '112.6' && flAngle <= '157.5'){
		x = x+r*Math.cos(45);
		y = y + r*Math.sin(45);
		ang = 315;
	}else if(flAngle > '157.6' && flAngle <= '202.5'){
		y = y + r;
		ang = 360;
	}else if(flAngle > '202.6' && flAngle <= '247.5'){
		x = x-r*Math.cos(45);
		y = y + r*Math.sin(45);
		ang = 45;
	}else if(flAngle > '247.6' && flAngle <= '292.5'){
		x = x - r;
		ang = 90;
	}else if(flAngle > '292.6' && flAngle <= '337.5'){
		x = x-r*Math.cos(45);
		y = y - r*Math.sin(45);
		ang = 135;
	}
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
