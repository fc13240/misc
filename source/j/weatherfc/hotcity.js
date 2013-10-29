define(function(require){
	require('../global')
	var cookie = W.util.cookie;
	var COOKIE_NAME = 'f_city';
	$(function(){
		var $icons = $(".icons");
		var $cityList = $(".citylist");
		var REG_IMG = /([a-z])(\d+)(?:\.gif)/;
		var imgs=function(img){
			var m = REG_IMG.exec(img);
			if(m){
				return m[1]+(m[2].length==1?'0':'')+m[2]
			}
			return img;
		}
		var initCityInfo = function(cityArr){
			$.each(cityArr,function(i,v){
				if(!v){
					return;
				}
				var cityInfo = v.split('|');
				var shortName = cityInfo[2];
				var cityid = cityInfo[1]
				$.getJSON("/data/sk/" + cityid + ".html",function(data){
					shortName || (shortName = cityInfo[0]);
					$cityList.append($('<li class="city"><a href="http://www.weather.com.cn/weatherfc/'+cityid+'.shtml" title="'+data.weather+'"><span class="alias">'+shortName+'</span><i class="'+imgs(data.img)+' fl"></i><span>'+data.temp+'</span></a></li>').fadeIn());
					// $cityList.append("<li class=\"city\"><p><a href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\">"+shortName+"</a></p><p class=\"img\"><a class=\"d01\"  href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\"></a><a class=\"n01\"  href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\"></a></p><p><a class=\"temp\" href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\">"+weatherInfo.temp1+"~"+weatherInfo.temp2+"</a></p></li>");
				});
			});
			cityInfoArr = cityArr || [];
		}
		var scrollTop = $(window).scrollTop();
		var winHeight = $(window).height();
		var myhotcity = cookie.get(COOKIE_NAME) || '北京|101010100|';
		var cityArr = myhotcity.split(",").splice(0,3),//只显示前三个
			cityNum = cityArr.length;
		$icons.css({"marginRight":"-565px","top":(scrollTop+winHeight-(cityNum*75)-405)});
		//北京|101010100|,郑州|200000000|家
		initCityInfo(cityArr);
	});
})