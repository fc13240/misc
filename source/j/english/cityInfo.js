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
	
	//摄氏度和华氏度切换
	$('.wF').hide();
	$("#weaUnit li").click(function(){
		var that = $(this);
		var index = $(this).index()
		hoverClass(that,'li');
		switch(index){
			case 0:$(".wF").hide();$('.wC').fadeIn("slow");break;
			case 1:$(".wC").hide();$('.wF').fadeIn("slow");break;
		}
	});
	
	//中英文切换
	$('#lanType').hover(function(){
		$(this).addClass('down').next().show();
		
	},function(){
		$(this).removeClass('down').next().hover(function(){
			$('#lanType').addClass('down');
			$(this).show();
		},function(){
			$(this).hide();
			$('#lanType').removeClass('down');
		})
		$(this).next().hide();
	})
	
	//实况、六小时预报、指数 选项卡
	$(".cityName span").click(function(){
		var that = $(this);
		hoverClass(that,"span")
		var index=$(this).index();
		switch(index){
			case 2:$(".livIndex,.hour6").hide();$('.act').fadeIn('slow');break;
			case 3:$(".act,.livIndex").hide();$('.hour6').fadeIn("slow");break;
			case 4:$(".act,.hour6").hide();$('.livIndex').fadeIn("slow");break;
		}
	})
	//指数hot index & all index
	$('.livIndex ul li:gt(8)').hide();
	$(".livIndex h1 a").click(function(){
		var that=$(this);
		var index = $(this).index();
		hoverClass(that,'a');
		switch(index){
			case 1:$('.livIndex ul li:gt(8)').show();$('.livIndex ul li:lt(9)').hide();break;
			case 2:$('.livIndex ul li:gt(8)').hide();$('.livIndex ul li:lt(9)').show();break;
		}
	})
	//指数下 hover 覆盖
	$(".livIndex li").hover(function(){
		$(this).children('em').show();
	},function(){
		$(this).children('em').hide();
	})
	$()
	
	//七天预报
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
	
	//周边城市 周边景点
	$(".near h1 span").click(function(){
		var that = $(this);
		var index = $(this).index();
		hoverClass(that,'span');
		$(".near").children('ul').hide();
		$(".near").children('ul').eq(index).fadeIn("slow");
	})
	
	//mouse hover function
	function hoverClass(that,obj){
		that.siblings(obj).removeClass('on');
		that.addClass('on')
	}
	
})