// JavaScript Document
define(function(require){	
	require('jquery');
	require('./jq-cookie');
	require('./broHistory');
	require('../tool/tool_pngfix');	
		
	$(function(){	
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

		//七天预报 图例版 和 列表版 切换
		$(".day7 h1 span").click(function(){
			$('.tab,.gra').removeClass('on');
			$('.day7 h1 span i').css('opacity',0.5);
			$(this).children('i').css('opacity',1);
			var that = $(this);
			hoverClass(that,"span")
			var index=$(this).index()==1?0:1;
			$(".day7").children('div').hide();
			$(".day7").children('div').eq(index).show();
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
			
			var $dUl = $(".day7 .bBox div ul");
			var liIndex = 0;
			var $iRoll = $('.day7 div.b i');
			
			var id = parseInt(document.URL.substring(document.URL.indexOf('id=')+3))||1;
			var id = id>7?1:id;
			//默认内容
			for(var i=0;i<id;i++){			//清除之前的<a> 和 <li>
				$('#day1_3_t a[data-id='+i+']').remove();  
				$('#day1_3_b>.bBox ul li[data-id='+i+']').remove();
			}		
			var $a = $("#day1_3_t a");
			var $dLi = $dUl.children('li');
			var dUlW = 211*$dLi.length;
			
			$a.eq(0).addClass('move').next().addClass('move1');     //添加默认 class  ”move”
			$dLi.eq(0).addClass("move")
			
			var tAWidth=$a.width()*($a.length+1);   //设置容器宽
			$("#day1_3_t p").width(tAWidth)
			$dUl.width(dUlW);
			
			$('.day7 div table[data-id='+id+']').show();  // 显示table 表格

			//点击事件
			$iRoll.click(function(){		
				var iIndex=$(this).index();
				liIndex += (iIndex ==1||iIndex==3)?-1:1;//兼容ie6 index
				$("#day1_3_t p").stop(true,true).animate({left: '-='+$a.width()*((iIndex ==1||iIndex==3)?-1:1)+'px'},'slow');
				return liIndex=_roll(liIndex);
			})
			
			$("#day1_3_t a:not(:last)").click(function(){  
				var iIndex = $(this).index();
				if(!((iIndex)%6)){
						$("#day1_3_t p").animate({left: -$a.width()*iIndex+35+'px'},'slow');
				};
				return liIndex=_roll(iIndex);
			})
					
			
			if(id==1){
				$(".rollLeft").hide();
			}

			var _roll = function(iIndex){
				$dUl.stop(true,true);
				$(".rollLeft,.rollRight").show();	
				if(iIndex==$a.length-2 && id==7){
					$(".rollRight").hide();
				}
				if(iIndex==-1){
					window.open('?id='+(id-1),'_self');
				}
				// if(iIndex==$a.length-1){
				// 	window.open('?id='+(id+1),'_self');
				// }
				$a.removeClass('move move1');
				$dLi.removeClass('move');
				$a.eq(iIndex).addClass("move").next().addClass('move1');
				$dLi.eq(iIndex).addClass("move");


				if(iIndex<=$a.length-4){
					$dUl.animate({left: -211*iIndex+"px"}, 600);
				}else if(iIndex>$a.length-4&&iIndex<$a.length-1){
					$dUl.animate({left: -211*($a.length-4)+"px"}, 600);
				}

				var dataId = $dLi.eq(iIndex).attr('data-id');
				if(dataId==undefined){
					dataId = id-1;
				}else if(dataId!=id){
					window.open('?id='+dataId,'_self');
				};
				return iIndex;
			}
			
			
			
			
			//about URL index  '  ?id=  '  
			var $div = $(".lcoalcity>div#yubao");
			var $ul_0 = $div.children('ul:first');
			var $ul_1 = $div.children('ul:last');
			var $ul_0_li = $ul_0.find("li");
			var $ul_1_li = $ul_1.find("li");
			var $tit = $(".lcoalcity>.local>ul>li");
			
			$tit.removeClass('move');
			$div.find('li').removeClass('on move');
			
			$ul_0_li.click(function(){
				var index = $(this).index()+1;
				window.open('?id='+index,'_self')
			})
			$ul_1_li.click(function(){
				var index = $(this).index()+4;
				window.open('?id='+index,'_self')
			})
			
			
			switch(id){
				case 1: $ul_0.show();$ul_0_li.eq(0).addClass("on");$tit.eq(0).addClass('move');break;
				case 2: $ul_0.show();$ul_0_li.eq(1).addClass("on");$tit.eq(0).addClass('move');break;
				case 3: $ul_0.show();$ul_0_li.eq(2).addClass("on");$tit.eq(0).addClass('move');break;
				case 4: $ul_1.show();$ul_1_li.eq(0).addClass("move");$tit.eq(1).addClass('move'); break;
				case 5: $ul_1.show();$ul_1_li.eq(1).addClass("move");$tit.eq(1).addClass('move'); break;
				case 6: $ul_1.show();$ul_1_li.eq(2).addClass("move");$tit.eq(1).addClass('move'); break;
				case 7: $ul_1.show();$ul_1_li.eq(3).addClass("move");$tit.eq(1).addClass('move'); break;
			}
			
			

		}_day1_3();

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
		//周边城市 周边景点
		$(".near h1 span").click(function(){
			var that = $(this);
			var index = $(this).index();
			hoverClass(that,'span');
			$(".near").children('ul').hide();
			$(".near").children('ul').eq(index).show();
		})
		
		
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
})

