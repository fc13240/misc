// JavaScript Document
$(function(){
	
	//温度格式切换
	$("#weaUnit li:first").click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		//weaTypeFunS();
	}).click()
	$("#weaUnit li:last").click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		weaTypeFunF();
	})
	
	function weaTypeFunS(){
		//local weather
		var defaultCityHistory = '101010100,101020100,101280601';  //默认城市
		cityHistory = $.cookie('cityHistory') || defaultCityHistory;  //get cookie
		var chNum = cityHistory.split(',')
		var cityHis_index = 0;	
		$(".localWeather dt").html("°C")
		function setWeather(){
			$.ajax({
				type:'GET',
				url:"http://61.4.185.111/fc_24_en/"+chNum[cityHis_index]+".html",
				dataType:'script',
				cache:false,
				async:false,
				success:function(type){
					var $li = $(".localWeather ul li").eq(cityHis_index);
					$li.children('h1').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
					$li.find("img").attr('src','http://localhost/source/i/en/home/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png');
					tool_pngfix()
					$li.find("span").html(parseInt(fc_24_en.weatherinfo.temp1))
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
				url:'http://61.4.185.111/fc_24_en/'+id+'.html',
				dataType:'script',
				cache:false,
				async:false,
				success:function(){
					var $li = $("#ulStyle li").eq(weaConArr_index);
					$li.children('span').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
					$li.children('i').html(fc_24_en.weatherinfo.temp1)
					$li.children('img').attr('src','http://localhost/source/i/en/home/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.jpg')			
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
		var defaultCityHistory = '101010100,101020100,101280601';  //默认城市
		cityHistory = $.cookie('cityHistory') || defaultCityHistory;  //get cookie
		var chNum = cityHistory.split(',')
		var cityHis_index = 0;	
		$(".localWeather dt").html("°F")
		function setWeather(){
			$.ajax({
				type:'GET',
				url:"http://61.4.185.111/fc_24_en/"+chNum[cityHis_index]+".html",
				dataType:'script',
				cache:false,
				async:false,
				success:function(){
					var $li = $(".localWeather ul li").eq(cityHis_index);
					$li.children('h1').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
					$li.find("img").attr('src','http://localhost/source/i/en/home/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.png');
					tool_pngfix()
					$li.find("span").html(parseInt(fc_24_en.weatherinfo.tempF1));
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
				url:'http://61.4.185.111/fc_24_en/'+id+'.html',
				dataType:'script',
				cache:false,
				async:false,
				success:function(){
					var $li = $("#ulStyle li").eq(weaConArr_index);
					$li.children('span').html(fc_24_en.weatherinfo.city.substring(0,1).toUpperCase()+fc_24_en.weatherinfo.city.substring(1));
					$li.children('i').html(parseInt(fc_24_en.weatherinfo.tempF1)+"°F")
					$li.children('img').attr('src','http://localhost/source/i/en/home/'+fc_24_en.weatherinfo.img1.substring(0,fc_24_en.weatherinfo.img1.indexOf('.gif'))+'.jpg')			
					if(weaConArr_index<weaConArr.length){
						weaConArr_index++;
						weaConFun();
					}
				}
			})
		}weaConFun();
	}
	//预警
	$(".alarm h1").toggle(function(){
		$(this).parent().animate({height:'280px'},400);
		$(this).children('i').addClass('down');
		
	},function(){
		$(this).parent().animate({height:'80px'},400);
		$(this).children('i').removeClass();
	})
	//
	
	
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
