// JavaScript Document
define(function(require){	
	require('jquery');
	require('./jq-cookie');
	require('../tool/tool_pngfix');	

	//温度格式切换
	$("#weaUnit li:first").click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		weaTypeFunS();
	}).click()
	$("#weaUnit li:last").click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		weaTypeFunF();
	})
	
	
	//浏览历史 最近3个城市 Local Weather 模块 cookie
	function weaTypeFunS(){
		//local weather
		var defaultCityHistory = '101010100,101020100,101280101';  //默认城市
		cityHistory = $.cookie('cityHistory') || defaultCityHistory;  //get cookie
		var chNum = cityHistory.split(',')
		var cityHis_index = 0;	
		$(".localWeather dt").html("°C")
		function setWeather(){  //递归法 解决for循环 异步执行 数据覆盖问题
			$.ajax({
				type:'GET',
				url:"http://d1.weather.com.cn/fc_24_en/"+chNum[cityHis_index]+".html",
				dataType:'script',
				cache:false,
				async:false,
				success:function(type){
					var $li = $(".localWeather ul li").eq(cityHis_index);
					var $h1_a = '<a href="http://en.weather.com.cn/weather/'+fc_24_en.weatherinfo.cityid+'.shtml" target="_blank">'+fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1)+'</a>';
					$li.children('h1').html($h1_a);
					$li.find("img").attr('src','http://i.tq121.com.cn/i/english/weaIcon/white/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png');
					tool_pngfix();
					$li.find("span").html(parseInt(fc_24_en.weatherinfo.temp1));
					var indexVal = parseInt(fc_24_en.weatherinfo.indexval);
					var indexVal = indexVal?indexVal+'°':'';
					$li.find('i').html(indexVal);
					if(cityHis_index < chNum.length){
						cityHis_index++;   //递归
						setWeather()
					}
				}
			})
		}setWeather()
		//北京 上海 广州 福州 重庆 西安 南宁 昆明 济南 武汉 三亚 哈尔滨
		var weaConArr = [101010100,101020100,101280101,101230101,101040100,101110101,101300101,101290101,101120101,101200101,101310201,101050101];
		var weaConArr_index = 0;
		function weaConFun(){
			var id = weaConArr[weaConArr_index];
			$.ajax({
				type:'GET',
				url:'http://d1.weather.com.cn/fc_24_en/'+id+'.html',
				dataType:'script',
				cache:false,
				async:false,
				success:function(){
					var $li = $("#ulStyle li").eq(weaConArr_index);
					$li.children('span').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
					$li.children('i').html(parseInt(fc_24_en.weatherinfo.temp1)+"°")
					$li.children('img').attr('src','http://i.tq121.com.cn/i/english/weaIcon/blue/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png')			
					tool_pngfix();
					if(weaConArr_index<weaConArr.length){
						weaConArr_index++;
						weaConFun();
					}
				}
			})
		}weaConFun();
	}
	function weaTypeFunF(){
		//local weather
		var defaultCityHistory = '101010100,101020100,101280101';  //默认城市
		cityHistory = $.cookie('cityHistory') || defaultCityHistory;  //get cookie
		var chNum = cityHistory.split(',')
		var cityHis_index = 0;	
		$(".localWeather dt").html("°F")
		function setWeather(){
			$.ajax({
				type:'GET',
				url:"http://d1.weather.com.cn/fc_24_en/"+chNum[cityHis_index]+".html",
				dataType:'script',
				cache:false,
				async:false,
				success:function(){
					var $li = $(".localWeather ul li").eq(cityHis_index);
					var $h1_a = '<a href="http://en.weather.com.cn/weather/'+fc_24_en.weatherinfo.cityid+'.shtml" target="_blank">'+fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1)+'</a>';
					$li.children('h1').html($h1_a);
					$li.find("img").attr('src','http://i.tq121.com.cn/i/english/weaIcon/white/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png');
					tool_pngfix();
					$li.find("span").html(parseInt(fc_24_en.weatherinfo.tempF1));
					var indexValf = parseInt(fc_24_en.weatherinfo.indexvalf);
					var indexValf = indexValf?indexValf+'°':'';
					$li.find('i').html(indexValf);
					if(cityHis_index < chNum.length){
						cityHis_index++;
						setWeather()
					}
				}
			})
		}setWeather()
		//北京 上海 广州 福州 重庆 西安 南宁 昆明 济南 武汉 三亚 哈尔滨
		var weaConArr = [101010100,101020100,101280101,101230101,101040100,101110101,101300101,101290101,101120101,101200101,101310201,101050101];
		var weaConArr_index = 0;
		function weaConFun(){
			var id = weaConArr[weaConArr_index];
			$.ajax({
				type:'GET',
				url:'http://d1.weather.com.cn/fc_24_en/'+id+'.html',
				dataType:'script',
				cache:false,
				async:false,
				success:function(){
					var $li = $("#ulStyle li").eq(weaConArr_index);
					$li.children('span').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
					$li.children('i').html(parseInt(fc_24_en.weatherinfo.tempF1)+"°")
					$li.children('img').attr('src','http://i.tq121.com.cn/i/english/weaIcon/blue/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png')			
					tool_pngfix();
					if(weaConArr_index<weaConArr.length){
						weaConArr_index++;
						weaConFun();
					}
				}
			})
		}weaConFun();
	}
	//预警
	$.ajax({
		type:'GET',
		url:"http://product.weather.com.cn/alarm/Indexalarm_en.php",
		dataType:'script',
		cache:false,
		async:false,
		success:function(){
			var $alarmU = $(".alarm ul");		
			var l=alarminfo.pr.length;
			var gradeObj={"01":'blue','02':'yellow','03':'orange','04':'red','91':'white'};
			var kindObj = {'01':'typhoon','02':'torrential rain','03':'snowstorm',"04":'cold spell',"05":'strong wind',"06":'sandstorm',"07":'high temperature',"08":'drought',"09":'thunderbolt',"10":'hail',"11":'frost',"12":'heavy fog',"13":'haze',"14":'icy road',"91":'cold',"92":'dust-haze',"93":'thunderstorm and gale',"94":'forest fire warning',"95":'temperature drop',"96":'snow and ice road',"97":'dry-hot wind',"98":'low temperature',"99":'freeze'};
			for(var j=0;j<alarminfo.gj.length;j++){
				//var aLink =  alarminfo.gj[j].http;
				var txt = alarminfo.gj[j].name+"Warning for National Meteorological Center"
				var $li=$('<li><img src="http://www.weather.com.cn/m2/i/alarm/cma_weather.jpg" width="25" height="25"/><a title="' + txt + '" >' + txt + '</a></li>');
				$li.appendTo($alarmU);
			}
			for(var i=0;i<l;i++){
				var fileName = alarminfo.pr[i][1];
				var point = fileName.lastIndexOf('-');
				var kind = fileName.substr(point + 1, 2);
				var grade = fileName.substr(point + 3, 2);
				var txt = gradeObj[grade]+" "+kindObj[kind]+" Warning for "+alarminfo.pr[i][0];
				//var aLink = 'http://www.weather.com.cn/alarm/newalarmcontent.shtml?file='+alarminfo.pr[i][1];
				var $li = $('<li><img src="http://i.tq121.com.cn/i/alarm_icon/'+kind+grade+'.gif" width="25" height="20"/><a title="'+ txt +'" target="_blank">'+txt+'</a></li>');
				$li.appendTo($alarmU);
			}
			alarmUh = $(".alarm ul").height()>210?210:$(".alarm ul").height();
			$('.alarm ul').css('height',alarmUh);
			return alarmUh;
		}
	})
	$(".alarm h1").toggle(function(){

		$(this).parent().animate({height:alarmUh+45+'px'},400);
		$(this).children('i').addClass('down');
		
	},function(){
		$(this).parent().animate({height:'80px'},400);
		$(this).children('i').removeClass();
	})
	
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
	
	//Local Time
	var $T=$("#localTime");
	function time(){
	  var date=new Date();
	  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
	  $T.html("Local Time in China &nbsp; "+weatherDate);
	}
	time();
	setInterval(time,60000);
	
})
//个位数补0
function date_0_9(n){
  if(n<10) return '0'+n;
	  else return n; 
}
