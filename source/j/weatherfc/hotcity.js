define(function(require){
	require('../global')
	var cookie = W.util.cookie;
	var COOKIE_NAME = 'f_city';
	$(function(){
		var $icons = $(".icons");
		var $cityList = $(".citylist");
		var initCityInfo = function(cityArr){
			$.each(cityArr,function(i,v){
				if(!v){
					return;
				}
				var cityInfo = v.split('|');
				var shortName = cityInfo[2];
				$.getJSON("/data/cityinfo/" + cityInfo[1] + ".html",function(data){
					var weatherInfo = data.weatherinfo;
					var cityid = weatherInfo.cityid;
					shortName || (shortName = cityInfo[0]);
					$cityList.append("<li class=\"city\"><p><a href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\">"+shortName+"</a></p><p class=\"img\"><a class=\"d01\"  href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\"></a><a class=\"n01\"  href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\"></a></p><p><a class=\"temp\" href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\">"+weatherInfo.temp1+"~"+weatherInfo.temp2+"</a></p></li>");
					
				});
			});
			cityInfoArr = cityArr || [];
		}
		var scrollTop = $(window).scrollTop();
		var winHeight = $(window).height();
		var myhotcity = cookie.get(COOKIE_NAME) || '';
		var cityArr = myhotcity.split(",").splice(0,3),//只显示前三个
			cityNum = cityArr.length;
		$icons.css({"marginRight":"-565px","top":(scrollTop+winHeight-(cityNum*75)-405)});
		//北京|101010100|,郑州|200000000|家
		initCityInfo(cityArr);
	});
})