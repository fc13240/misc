define(function(require){
	require('./W');
	//一周天气预报
	var curIndex=$("#week .scroll .current").attr("data-role");
	var itemSum = 0,
		right = $(".relateWeather").outerWidth()+1;
	$("#forecast .detail li").each(function(){
		if($(this).attr("data-role") == curIndex){
			$(this).show();
			itemSum++;
		}
	})
	if(itemSum <= 2){
			$("#forecast .detail li:visible").each(function(){
				$(this).addClass("col2");
			})
	}
	$(".relateWeather,#forecast .relateWeather ul").show();
	$("#forecast .scroll .rBtn").css({"right":right});
	$("#forecast .scroll .rBtn").addClass("lBtn");
	$("#week .scroll,#week .RBtn,#week .lBtn").hover(function(){
		$("#week .RBtn,#week .lBtn").show();
	},function(){
		//$("#week .RBtn,#week .lBtn").hide();
	})
	//禁止一周天气a链接跳转
	$("#week a").each(function(){
		$(this).attr({"href":"javascript:void(0)","target":"_self"});
	});
	//当支持触屏事件时进行操作
	if(("createTouch" in document) || ('ontouchstart' in window)){
		var isTouching = false;
		var $scrollUl = $('#week .scroll ul');
		var scrollUl = $scrollUl.get(0);
		scrollUl.ontouchstart = function(eStart){
			isTouching = true;
			var evtStart = eStart.touches[0];
			var xStart = evtStart.clientX;
			scrollUl.ontouchmove = function(eMove){
				var evtMove = eMove.touches[0];
				var xMove = evtMove.clientX;
				var disc = xMove - xStart;
				if(Math.abs(disc) > 20 && !$scrollUl.hasClass('moving')){
					if(disc < 0){
						$btnRight.click();
					}else{
						$btnLeft.click();
					}
				}
			}
			scrollUl.ontouchend = function(){
				isTouching = false;
			}
		}
	}
	var week_scroll = new W.scroll({container:'#week .scroll ul',el:'li',flag:5});
	$("#week .scroll ul li").live("click",function(){
		if(isTouching){return}
		if($(this).hasClass("current")) return;
		var curIndex=$(this).attr("data-role");
		var newIndex=$("#week .scroll ul li").index($(this));
		var oldOnIndex=$("#week .scroll ul li").index($("#week .scroll ul li.current"));
		var itemSum = 0;
		//current标示第一个li元素
		$("#week .scroll .current").removeClass("current");
		$("#week .scroll ul li").eq(newIndex).addClass("current");
		week_scroll.go(newIndex-oldOnIndex);
		$("#forecast .detail li").hide();
		$("#forecast .detail li").each(function(){
			if($(this).attr("data-role") == curIndex){
				$(this).show();
				itemSum++;
			}
		})
		if(itemSum <= 2){
			$("#forecast .detail li:visible").each(function(){
				$(this).addClass("col2");
			})
		}else{
			$("#forecast .detail .col2").each(function(){
				$(this).addClass("col3");
			})
		}
	})
	
	var $btnRight = $("#week .RBtn").click(function(){
		var itemSum = 0;
		week_scroll.go(1);
		//修改第一个li元素的位置
		$("#week .scroll .current").removeClass("current").next().addClass("current");
		var curIndex=$("#week .scroll .current").attr("data-role");
		$("#forecast .detail li").hide();
		$("#forecast .detail li").each(function(){
			if($(this).attr("data-role") == curIndex){
				$(this).show();
				itemSum ++;
			}
		})
		if(itemSum <= 2){
			$("#forecast .detail li:visible").each(function(){
				$(this).addClass("col2");
			})
		}else{
			$("#forecast .detail .col2").each(function(){
				$(this).addClass("col3");
			})
		}
	})
	var $btnLeft = $("#week .lBtn").click(function(){
		var itemSum = 0;
		week_scroll.go(-1);
		//修改第一个li元素的位置
		$("#week .scroll .current").removeClass("current").prev().addClass("current");
		var curIndex=$("#week .scroll .current").attr("data-role");
		$("#forecast .detail li").hide();
		$("#forecast .detail li").each(function(){
			if($(this).attr("data-role") == curIndex){
				$(this).show();
				itemSum++;
			}
		})
		if(itemSum <= 2){
			$("#forecast .detail li:visible").each(function(){
				$(this).addClass("col2");
			})
		}else{
			$("#forecast .detail .col2").each(function(){
				$(this).addClass("col3");
			})
		}
	})
	  //预报
	$("#forecast .scroll .detail").each(function(){
		$(this).css({width:$(this).find("li").outerWidth()*$(this).find("li").length});
	})
	//天气相关信息展开
	$("#forecast .scroll .rBtn").click(function(){
		if($(this).hasClass("lBtn")){
			$(this).removeClass("lBtn");
			$(this).animate({"right":0},"normal");
		}
		else{
			$(this).addClass("lBtn");
			$(this).animate({"right":right},"normal");
		}
		$(".relateWeather,#forecast .relateWeather ul").animate({ width: 'toggle'}, "normal");
	})
})