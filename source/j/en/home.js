// JavaScript Document
$(function(){

	//get cookie
	var defaultCityHistory = '101010100,101020100,101280601';
	cityHistory = $.cookie('cityHistory') || defaultCityHistory;
	var chNum = cityHistory.split(',');
	for(var i=0;i<chNum.length;i++){
		var url='http://61.4.185.111/fc_24_en/'+chNum[i]+'.html';
		setWeather(i,url);
		if(setWeather(i,url)){
			setWeather(i,'http://61.4.185.111/fc_24_en/'+chNum[i+1]+'.html')
		}
		
	};
	
	
	
	//local weather
	var $wLi = $(".localWeather ul li");	
	function setWeather(i,url){
		$.ajax({
			type:'GET',
			url:url,
			dataType:'script',
			cache:false,
			async:false,
			success:function(){
				var $li = $wLi.eq(i);
				$li.children('h1').html(fc_24_en.weatherinfo.city);
				$li.find("img").attr('src','http://localhost/source/i/en/home/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png');
				tool_pngfix()
				$li.find("span").html(parseInt(fc_24_en.weatherinfo.tempF1));
				//setWeather(i+1,'http://61.4.185.111/fc_24_en/'+(i+1)+'.html')
				//$li.find("i").html(parseInt())
				return 1;
			}
		})
	}
	
	//"China Weather Conditions"变来变去的颜色样式,用jq来添加样式，确保html代码的一致性
	var $uSL = $("#ulStyle li");
	var colorNum = [0,3,4,7,8,11];
	
	for(var i=1;i<12;i+=2){
		$uSL.eq(i).addClass("ml");
	};
	for(var i=2;i<12;i++){
		$uSL.eq(i).addClass("mt");
	}
	for(var i=0;i<colorNum.length;i++){
		$uSL.eq(colorNum[i]).addClass('c');
	}
	
	//中英文切换hover效果
	$("#weaUnit li").mouseenter(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
	})
	$('#lanType').hover(function(){
		$(this).next().show();
	},function(){
		$('#lanType').next().hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		})
		$(this).next().hide();
	})
	
	//Local Time
	var $T=$("#localTime");
	function time(){
	  var date=new Date();
	  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
	  $T.html("Local Time &nbsp; "+weatherDate);
	}
	time();
	setInterval(time,60000);
})
//个位数补0
function date_0_9(n){
  if(n<10) return '0'+n;
	  else return n; 
}
