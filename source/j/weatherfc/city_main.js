define(function(require){	
	require('jquery');
	require('../raphael');
	require('./base');
	var share = require('../m_share');
	require('../plugs/jquery.easing.1.3');
	require('./forecast7d');
	require('./hotZS');
	require('./aroundCity');
	require('./rightBlock');
	require('./observe24h');
	require('./life_golf');
	require('./life_shr');
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
	//猜你喜欢
	$(".like figure").hover(function(){
		if($(this).find("figcaption").hasClass("on")) return;
		var temp_height = 0;
		$(this).find("figcaption").children().each(function(){
			temp_height = temp_height + $(this).height();
		})
		$(this).find("img").css("opacity","0.4");
		$(this).find("figcaption").addClass("on");
		$(this).find("figcaption").stop().animate({height:temp_height},500,"easeInOutQuint");
		$(this).find(".bg").stop().animate({height:temp_height+20,top:209-temp_height},500,"easeInOutQuint");
	},
	function(){
		$(this).find("img").css("opacity","1");
		$(this).find("figcaption,.bg").stop().animate({height:"40px"},500,"easeInOutQuint");
		$(this).find(".bg").stop().animate({height:"40px",top:189},500,"easeInOutQuint");
		$(this).find("figcaption").removeClass("on");
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
	//右侧内容块定位
	// var rightElements = $(".rightEl"),
	// 	top = 10;
	// for(var i=0,ii = rightElements.length;i<ii;i++){
	// 	rightElements.eq(i).css({"top":top});
	// 	top+= rightElements.eq(i).outerHeight()+10;
	// }
})
