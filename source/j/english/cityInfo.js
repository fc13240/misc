// JavaScript Document
$(function(){
	//"China Weather Conditions"变来变去的颜色样式,用jq来添加样式，确保html代码的一致性
	var $uCL = $("#nearCity li");
	var $uAL = $("#nearAttr li");
	var colorNum = [0,3,4,7,8];
	
	for(var i=1;i<12;i+=2){
		$uCL.eq(i).addClass("ml");
		$uAL.eq(i).addClass("ml");
	};
	for(var i=2;i<12;i++){
		$uCL.eq(i).addClass("mt");
		$uAL.eq(i).addClass("mt");
	}
	for(var i=0;i<colorNum.length;i++){
		$uCL.eq(colorNum[i]).addClass('c');
		$uAL.eq(colorNum[i]).addClass('c');
	}
	
	$(".wF").hide();
	
	$(".cityName span").click(function(){
		var that = $(this);
		hoverClass(that,"span")
		var index=$(this).index();
		switch(index){
			case 2:$(".livIndex,.hour6").hide();$('.act').fadeIn('slow');break;
			case 3:$(".act,.hour6").hide();$('.livIndex').fadeIn("slow");break;
			case 4:$(".act,.livIndex").hide();$('.hour6').fadeIn("slow");break;
		}
	})
	
	$(".day7 h1 span").click(function(){
		var that = $(this);
		hoverClass(that,"span")
		var index=$(this).index();
		$(".graph,.table").hide();
		switch(index){
			case 1:$(".day7").children().eq(2).show();break;
			case 2:$(".day7").children().eq(1).show();break;
		}
	})
	
	$(".livIndex h1 a").hover(function(){
		var that=$(this);
		hoverClass(that,'a');
	})
	
	$(".livIndex li").hover(function(){
		$(this).children('em').show();
	},function(){
		$(this).children('em').hide();
	})
	
	$(".near h1 span").click(function(){
		var that = $(this);
		var index = $(this).index();
		hoverClass(that,'span');
		$(".near").children('ul').hide();
		$(".near").children('ul').eq(index).fadeIn("slow");
	})
	
	function hoverClass(that,obj){
		that.siblings(obj).removeClass('on');
		that.addClass('on')
	}
	
})