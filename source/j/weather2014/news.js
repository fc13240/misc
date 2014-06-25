// JavaScript Document

define(function(require){
	require('jquery');
	require('../tool/tool_pngfix');	
	require('../JQ-Extend');
	var picRoll = require('j/m_picRoll');

	$.fn.extend({
		_hover:function(){
			$(this).hover(function(){
				$(this).addClass('hover').siblings().removeClass('hover')
			},function(){
				$(this).removeClass('hover');
			})
		}
	})
	
	$(function(){

       //排行切换
	
	$(".hotSpot ul li").hover(function(){
		if($(this).hasClass("on")) return;
		$(".hotSpot ul li.on").removeClass("on");
		$(this).addClass("on");
	})
    
   


    $(".exleft ul li").click(function(){
		var slide =  $(".exleft ul li").index(this);
		$(".exleft ul li .jj").hide();
		$(".exleft ul li .jj").eq(slide).show();
	})		
	
	
	$(".trayin a").hover(function(){
		$(this).find("i").show();
		$(this).find("b").show();
		$(this).find("em").show();
	},function(){
		$(this).find("i").hide();
		$(this).find("b").hide();
		$(this).find("em").hide();
	})


		//ie6 png
		tool_pngfix();
		//滚动图
		new picRoll({
            eleFather: '#scrollPic',  //容器标签 父元素 最外围标签  
            eleText: '#scrollPic p',    //图解文字所在标签
            eleSmallClass: 'on', //下方的缩略图选中时的样式
            rollLeft: "#scrollPic .rollLeft",   //向左转标签
            rollRight: '#scrollPic .rollRight'   //向右转标签
        }).roll();
		var botUlWidth = $('#scrollPic img').length*25;
		$('#scrollPic ul:not(:has(img)):last').css('marginLeft',150-botUlWidth/2+'px').width(botUlWidth	);
		//今天 明后天导航hover click效果
		var dd = $('input#whichDay[type=hidden]').attr('value');
		$('#someDayNav li[data-day='+dd+']').addClass('on').siblings()._hover();
		
		
		//排行效果
		$('.chartPH h1 i:first').click(function(){
			$('#hot').hide();$('#video').show();
			$(this).addClass('on').siblings().removeClass('on');
		}).next().click(function(){
			$('#hot').show();$('#video').hide();
			$(this).addClass('on').siblings().removeClass('on');
		})
		$('.chartPH ul li')._hover();
		

       //精彩图集
       var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity",1);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").css("opacity",1).mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//上一页、下一页按钮透明度处理
	$("#focus .preNext").css("opacity",1).hover(function() {
		$(this).stop(true,false).animate({"opacity":"1"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"1"},300);
	});

	//上一页按钮
	$("#focus .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});

	//下一页按钮
	$("#focus .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
		

		
	})()
})













