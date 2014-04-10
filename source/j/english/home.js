// JavaScript Document
define(function(require){	
	require('jquery');
	require('./jq-cookie');
	require('../tool/tool_pngfix');	

	$(function(){

		//温度格式切换
		$("#weaUnit li").click(function(){
			var index = $(this).index();
			$(this).siblings().removeClass('on');
			$(this).addClass('on');
			switch(index){
				case 0:$(".wF").hide();$('.wC').fadeIn("slow");break;
				case 1:$(".wC").hide();$('.wF').fadeIn("slow");break;
			}
		});
		
		//浏览历史 最近3个城市 Local Weather 模块 cookie  
		//local weather	 	
	 	var defaultCityHistory = '101010100,101020100,101280101';  //默认城市 北上广
	 	var cityHistory = $.cookie('cityHistory') || defaultCityHistory;  //get cookie
	 	var chNum = cityHistory.split(',');
	 	var cityHis_index = 0;	
	 	
	 	function setWeather(){  //递归法 解决for循环 异步执行 数据覆盖问题
	 		$.ajax({
	 			type:'GET',
	 			url:"http://d1.weather.com.cn/fc_24_en/"+chNum[cityHis_index]+".html",
	 			dataType:'script',
	 			cache:false,
	 			async:false,
	 			success:function(type){
	 				
	 				var $li = $(".localWeather ul li").eq(cityHis_index);
	 				var $li_a = $('<a href="http://en.weather.com.cn/weather/'+fc_24_en.weatherinfo.cityid+'.shtml" target="_blank"></a>');
	 				$li.children('a').remove();
	 				$li.append($li_a);
	 				$li.children('h1').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
	 				$li.find("img").attr('src','http://i.tq121.com.cn/i/english/weaIcon/white/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png');
	 				tool_pngfix();
	 				$li.find("span.wC").html(parseInt(fc_24_en.weatherinfo.temp1));
	 				$li.find("span.wF").html(parseInt(fc_24_en.weatherinfo.tempF1));
	 				var indexVal_C = parseInt(fc_24_en.weatherinfo.indexval);
	 				var indexVal_C = indexVal_C ? indexVal_C+'°':'';
	 				var indexVal_F = parseInt(fc_24_en.weatherinfo.indexvalf);
	 				var indexVal_F = indexVal_F ? indexVal_F+'°':'';
	 				$li.find('i.wC').html(indexVal_C); 
	 				$li.find('i.wF').html(indexVal_F); 
	 				if(cityHis_index < chNum.length-1){
	 					cityHis_index++;   //递归
	 					setWeather();
	 				}					
	 			}
	 		})
	 	}setWeather()
	 	//北京 上海 广州 福州 重庆 西安 南宁 昆明 济南 武汉 三亚 哈尔滨
 		$('.wF').hide();
 		$.ajax({
 			type:'GET',
 			url:'http://d1.weather.com.cn/city_12/city_12.html',
 			dataType:'script',
 			cache:false,
 			async:true,
 			success:function(){		
 				var $aLi = $("#ulStyle li");
 				for (var i = $aLi.length - 1; i >= 0; i--) {
 					var $li = $aLi.eq(i);
 					$li.children('span').html('<a target="_blank" href="http://en.weather.com.cn/weather/'+cityWeather.weatherinfo[i].cityid+'.shtml">'+cityWeather.weatherinfo[i].city.substring(0,1).toUpperCase()+cityWeather.weatherinfo[i].city.substring(1)+'</a>');
 					$li.children('i.wC').html(parseInt(cityWeather.weatherinfo[i].temp1)+"°")
 					$li.children('i.wF').html(parseInt(cityWeather.weatherinfo[i].tempF1)+"°")
 					$li.children('img').attr('src','http://i.tq121.com.cn/i/english/weaIcon/blue/'+cityWeather.weatherinfo[i].img1.substring(0,cityWeather.weatherinfo[i].img1.indexOf('.gif'))+'.png')
 				};
 				tool_pngfix();
 			}
 		})
 		
		//预警
		$.ajax({
			type:'GET',
			url:"http://product.weather.com.cn/alarm/Indexalarm_en.php",
			dataType:'script',
			cache:true,
			async:true,
			success:function(){
				var $alarmU = $(".alarm ul");		
				var l=alarminfo.pr.length;
				var gradeObj={"01":'Blue','02':'Yellow','03':'Orange','04':'Red','91':'White'};
				var kindObj = {'01':'Typhoon','02':'Torrential rain','03':'Snowstorm',"04":'Cold spell',"05":'Strong wind',"06":'Sandstorm',"07":'High temperature',"08":'Drought',"09":'Thunderbolt',"10":'Hail',"11":'Frost',"12":'Heavy fog',"13":'Haze',"14":'Icy road',"91":'Cold',"92":'Dust-haze',"93":'Thunderstorm and gale',"94":'Forest fire warning',"95":'Temperature drop',"96":'Snow and ice road',"97":'Dry-hot wind',"98":'Low temperature',"99":'Freeze'};
				for(var j=0;j<alarminfo.gj.length;j++){
					var txt = alarminfo.gj[j].name+"Warning for National Meteorological Center"
					var $li=$('<li><img src="http://www.weather.com.cn/m2/i/alarm/cma_weather.jpg" width="25" height="25"/><a title="' + txt + '" >' + txt + '</a></li>');
					$li.appendTo($alarmU);
					if($alarmU.children('li').length>=8){
						return;
					}
				}
				for(var i=0;i<l;i++){
					var fileName = alarminfo.pr[i][1];
					var point = fileName.lastIndexOf('-');
					var kind = fileName.substr(point + 1, 2);
					var grade = fileName.substr(point + 3, 2);
					var imgNumber = fileName.substr(point + 1, 4);
					var imgNumber = imgNumber>9001?'0000':imgNumber;
					var txt = gradeObj[grade]+" "+kindObj[kind]+" Warning for "+alarminfo.pr[i][0];
					var $li = $('<li><img src="http://www.weather.com.cn/m/i/alarm_s/'+imgNumber+'.gif" width="25" height="20"/><a title="'+ txt +'" target="_blank">'+txt+'</a></li>');
					$li.appendTo($alarmU);
					if($alarmU.children('li').length>=8) return;
				}
			}
		})
		//景点温度、指数
		$.ajax({
			type:'GET',
			url:'http://d1.weather.com.cn/city_12/tr_5.html',
			dataType:'script',
			cache:false,
			async:true,
			success:function(){
				var $aLi = $('.hot ul.f>li');
				for (var i = 0; i < citytr.trinfo.length; i++) {
					var $li = $aLi.eq(i);
					$li.find('span').html(citytr.trinfo[i].name);
					$li.find('i.wC').html(parseInt(citytr.trinfo[i].temp1)+"°")
					$li.find('i.wF').html(parseInt(citytr.trinfo[i].tempF1)+"°")
					for(var j=0;j<citytr.trinfo[i].hintcn;j++){
						$li.find('ul.on').append('<li></li>');
					}
				}
			}
		})

		$(".alarm h1").toggle(function(){
			var height = $(".alarm ul li").length;
			$(this).parent().animate({height:35*height+45+'px'},400);
			$(this).children('i').addClass('down');
		},function(){
			$(this).parent().animate({height:'185px'},400);
			$(this).parent().animate({height:'180px'},400);
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
		
		//头部推荐的三个城市切换
		$('.searchBox p a.rollRight').click(function(){
			$('.searchBox p a:lt(4)').hide();
			$('.searchBox p a:gt(3)').show();
		})
		$('.searchBox p a.rollLeft').click(function(){
			$('.searchBox p a:lt(4)').show();
			$('.searchBox p a:gt(3)').hide();
		})

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
})

