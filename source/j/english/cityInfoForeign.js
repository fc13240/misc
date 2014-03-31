// JavaScript Document
define(function(require){	
	require('jquery');
	require('./jq-cookie');
	//require('./broHistory');
	require('../tool/tool_pngfix');		
	
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

	//七天预报
	$(".day7 h1 span").click(function(){
		$('.tab,.gra').removeClass('on');
		$('.day7 h1 span i').css('opacity',0.5);
		$(this).children('i').css('opacity',1);
		var that = $(this);
		hoverClass(that,"span")
		var index=$(this).index()==0?2:3;alert($(this).index())
		//$(".day7").children('div').hide();
		//$(".day7").children('div').eq(index).hide();
	})

	//Local Time
	var $T=$("#localTime"); 
	function time(){
	  var date=new Date();
	  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
	  $T.html("Local Time in China &nbsp; "+weatherDate);
	}
	time();
	setInterval(time,60000);

	
	//国外城市
	function _day1_3(){
		var $a = $("#day1_3_t a:not(:first)");
		var $tA = $('.day7>.graph p a');
		

		var $dUl = $(".day7 .bBox div ul");
		var $dLi = $dUl.children('li');
		var dUlW = 211*$dLi.length;
		var liIndex = 0;
		var $iRoll = $('.day7 div.b i');
		
		
		var tAWidth=$a.width()*($a.length+1);
		$("#day1_3_t p").width(tAWidth)
		$dUl.width(dUlW);
		
		$iRoll.click(function(){		
			var iIndex=$(this).index();
			liIndex += (iIndex ==1||iIndex==3)?-1:1;//兼容ie6 indexa
			$("#day1_3_t p").stop(true,true).animate({left: '-='+$a.width()*((iIndex ==1||iIndex==3)?-1:1)+'px'},'slow');
			return liIndex=_roll(liIndex);
		})
		
		$a.click(function(){
			var iIndex = $(this).index();
			$tA.removeClass('move move1');
			$(this).addClass("move").next().addClass('move1');
			if(!((iIndex)%6)){
				if(iIndex/6){
					
					$("#day1_3_t p").animate({left: -$a.width()*iIndex+35+'px'},'slow');
				}
			};
			return liIndex=_roll(iIndex);
		})
		
		
		
		
		
		
		
		
		var id = parseInt(document.URL.substring(document.URL.indexOf('id=')+3))||1;
		if(id==1){
			$(".rollLeft").hide();
		}

		var _roll = function(iIndex){
			$dUl.stop(true,true);
			$(".rollLeft,.rollRight").show();	
			
			if(iIndex==$tA.length-2 && id==7){
				$(".rollRight").hide();
			}
			if(iIndex==-1){
				window.open('?id='+(id-1),'_self');
			}
			if(iIndex==$tA.length-1){
				window.open('?id='+(id+1),'_self');
			}
			$tA.removeClass('move move1');
			$dLi.removeClass('move');
			$tA.eq(iIndex).addClass("move").next().addClass('move1');
			$dLi.eq(iIndex).addClass("move");
			if(iIndex<=$tA.length-4){
				$dUl.animate({left: -211*iIndex+"px"}, 600);
			}else if(iIndex>$tA.length-4&&iIndex<$tA.length-1){
				$dUl.animate({left: -211*($tA.length-4)+"px"}, 600);
			}
			return iIndex;
		}
		
		
		
		
		
		var $div = $(".lcoalcity>div.yubao");
		var $div_0 = $div.eq(0);
		var $div_1 = $div.eq(1);
		var $div_0_li = $div_0.find("li");
		var $div_1_li = $div_1.find("li");
		var $tit = $(".lcoalcity>.local>ul>li");
		
		$tit.removeClass('move');
		$div.find('li').removeClass('on move');
		
		$div_0_li.click(function(){
			var index = $(this).index()+1;
			window.open('?id='+index,'_self')
		})
		$div_1_li.click(function(){
			var index = $(this).index()+4;
			window.open('?id='+index,'_self')
		})
		
		
		switch(id){
			case 1: $div_0.show();$div_0_li.eq(0).addClass("on");$tit.eq(0).addClass('move');break;
			case 2: $div_0.show();$div_0_li.eq(1).addClass("on");$tit.eq(0).addClass('move');break;
			case 3: $div_0.show();$div_0_li.eq(2).addClass("on");$tit.eq(0).addClass('move');break;
			case 4: $div_1.show();$div_1_li.eq(0).addClass("move");$tit.eq(1).addClass('move'); break;
			case 5: $div_1.show();$div_1_li.eq(1).addClass("move");$tit.eq(1).addClass('move'); break;
			case 6: $div_1.show();$div_1_li.eq(2).addClass("move");$tit.eq(1).addClass('move'); break;
			case 7: $div_1.show();$div_1_li.eq(3).addClass("move");$tit.eq(1).addClass('move'); break;
		}
		
		

	}_day1_3();

	
	
	
	//mouse hover function
	function hoverClass(that,obj){
		that.siblings(obj).removeClass('on');
		that.addClass('on')
	}
	
	tool_pngfix();
})
//个位数补0
function date_0_9(n){
  if(n<10) return '0'+n;
	  else return n; 
}

