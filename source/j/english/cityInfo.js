// JavaScript Document
define(function(require){	
	require('jquery');
	require('./jq-cookie');
	//require('./broHistory');
	require('../tool/tool_pngfix');	

	//预警
	$.ajax({
		type:'GET',
		url:"http://product.weather.com.cn/alarm/grepalarm_en.php",
		dataType:'script',
		cache:true,
		async:true,
		success:function(){
			var gradeObj={'01':'blue','02':'yellow','03':'orange','04':'red','91':'white'};
			var kindObj = {'01':'typhoon','02':'torrential rain','03':'snowstorm','04':'cold spell','05':'strong wind','06':'sandstorm','07':'high temperature','08':'drought','09':'thunderbolt','10':'hail','11':'frost','12':'heavy fog','13':'haze','14':'icy road','91':'cold','92':'dust-haze','93':'thunderstorm and gale','94':'forest fire warning','95':'temperature drop','96':'snow and ice road','97':'dry-hot wind','98':'low temperature','99':'freeze'};
			var localId = parseInt(document.URL.substr(document.URL.indexOf('weather/')+8)).toString();   //提取当前页面的 9 位 站号
			for(var i=0;i<alarminfo.data.length;i++){
				var fullName = alarminfo.data[i][0];
				var alarmNum = alarminfo.data[i][1].split('-');
				var cityId =  alarmNum[0]  //json数据正在预警城市的站号
				var kind = alarmNum[2].substr(0,2);
				var grade = alarmNum[2].substr(2,2);
				if(cityId == localId){//如果县等级满足alert(localId)
					addAlarm();return false;
				}else if(cityId == localId.substr(0,7)){ //市级预警
					addAlarm();return false;
				}else if(cityId == localId.substr(0,5)){ //省级预警
					addAlarm();return false;
				};
			}
			function addAlarm(){	
				$('.cityAlarm').show();
				$(".alarm").show();			
				var imgSrc = 'http://i.tq121.com.cn/i/alarm_icon/'+kind+grade+'.gif';
				var txt = gradeObj[grade]+' '+kindObj[kind]+" for "+fullName;
				$(".alarm span").text(txt);
				$(".alarm img").attr("src",imgSrc);
			}
		}
	})


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
	
	
	//实况、六小时预报、指数 ?index
	function _htmlIndex(){
		htmlIndex = parseInt(document.URL.substring(document.URL.indexOf('?index=')+7)) || 1;
		$(".cityName span").removeClass('on');
		$(".cityName span").eq(htmlIndex-1).addClass('on');	
		var $obj = $(".livIndex,.hour6,.act");
		switch(htmlIndex){
			case 1:$obj.hide();$('.act').show();$("#changeBox").height(304);break;
			case 2:$obj.hide();$('.hour6').show();$("#changeBox").height(284);break;
			case 3:$obj.hide();$('.livIndex').show();$("#changeBox").height(467);break;
		}
	}_htmlIndex();


	
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
		$('.tab,.gra').removeClass('on');
		$('.day7 h1 span i').css('opacity',0.5);
		$(this).children('i').css('opacity',1);
		var that = $(this);
		hoverClass(that,"span")
		var index=$(this).index()==2?0:1;
		$(".day7").children('div').hide();
		$(".day7").children('div').eq(index).show();
	})
	//七天预报图例版 左右滚动效果
	function _roll(){
		var $dUl = $(".day7 .bBox ul");
		var $dLi = $dUl.children('li');
		var dUlW = $dLi.width()*$dLi.length;
		var liIndex = 0;
		var $iRoll = $('.day7 div.b i');
		$(".rollLeft").hide();
		$dUl.width(dUlW);
		$iRoll.click(function(){
			var iIndex=$(this).index();
			liIndex += (iIndex ==1||iIndex==3)?-1:1; //兼容ie6 index
			return liIndex=_roll(liIndex);
		})
		var $tLi = $('.day7 .graph ul.t li');
		$tLi.click(function(){
			var iIndex = $(this).index();
			return liIndex=_roll(iIndex);
		})
		var _roll = function(iIndex){
			$dUl.stop(true,true);
			$(".rollLeft,.rollRight").show();		
			if(iIndex==0){
				$(".rollLeft").hide();
			}
			if(iIndex>=$tLi.length-1){
				$(".rollRight").hide();
			}
			$tLi.removeClass('on');
			$tLi.eq(iIndex).addClass('on');
			$dUl.animate({left: -518*iIndex+"px"}, 600);
			return iIndex;
		}
	}_roll()
	
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
	
	
	
	//Local Time
	var $T=$("#localTime");
	function time(){
	  var date=new Date();
	  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
	  $T.html("Local Time in China &nbsp; "+weatherDate);
	}
	time();
	setInterval(time,60000);
	
	tool_pngfix();
})
//个位数补0
function date_0_9(n){
  if(n<10) return '0'+n;
	  else return n; 
}
