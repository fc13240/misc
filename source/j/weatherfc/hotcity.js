define(function(require){
	var Suggest = require('../m_search_suggest');
	require('../plugs/jquery.placeholder');
	require("http://www.weather.com.cn/m2/j/public/dltotw.js");
	var COOKIE_NAME = 'hotcity';
	$(function(){
		var $hotCities = $(".hotCities");
		$(".icons .addCity,#canc").click(function(){
			$hotCities.toggle();
		});
		var $cityname = $('input.cityname').each(function(){
			var $this = $(this);
			new Suggest({
		        'url': 'http://toy1.weather.com.cn/search',
		        'textBox': $this
		        ,'bindEvent': false
		        ,'onSelect': function(data){
		        	var name = data[2],code;
		            if(data.length == 20){
		                // alert('您选择了一个省，默认帮您选择省会');
		                // name = data[12];
		                code = data[10];
		            }else{
		                 // name = data[2];
		                 code = data[0];
		            }
		            $this.val(name);
		            $this.data('code',code);
		        }
		    });
		});
		var $shorname = $('input.nick');
		$('[placeholder]').placeholder();

		var $icons = $(".icons");
		var $cityList = $(".citylist");

		var initCityInfo = function(cityArr){
			var initedNum = 0;
			$.each(cityArr,function(i,v){
				if(!v){
					return;
				}
				var cityInfo = v.split('|');
				var shortName = cityInfo[2];
				$.getJSON("/data/cityinfo/" + cityInfo[1] + ".html",function(data){
					var weatherInfo = data.weatherinfo;
					var cityid = weatherInfo.cityid;
					shortName || (shortName = weatherInfo.city);
					$cityList.append("<li class=\"city\"><p><a href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\">"+shortName+"</a></p><p class=\"img\"><a class=\"d01\"  href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\"></a><a class=\"n01\"  href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\"></a></p><p><a class=\"temp\" href=\"http://www.weather.com.cn/weather/"+cityid+".shtml\">"+weatherInfo.temp1+"~"+weatherInfo.temp2+"</a></p></li>");
					$cityname.eq(initedNum).val(weatherInfo.city).data('code',cityid);
					$shorname.eq(initedNum).val(shortName);
					initedNum++;
				});
			})
		}
		var scrollTop = $(window).scrollTop();
		var winHeight = $(window).height();
		var myhotcity = getCookie(COOKIE_NAME) || '';
		var cityArr = myhotcity.split(","),
			cityNum = cityArr.length;
		$icons.css({"marginRight":"-565px","top":(scrollTop+winHeight-(cityNum*75)-330)});
		//北京|101010100|,郑州|200000000|家
		initCityInfo(cityArr);
		$('.hotCities p span.btn:contains(清除)').click(function(){
			$(this).siblings('input').val('').removeData('code');
		});

		$('#add').click(function(){
			var dataArr = [];
			$cityname.each(function(){
				var $this = $(this);
				var shortName = $this.next('.nick').val();
				var val = $this.val();
				var code = $this.data('code');
				if(val && code){
					dataArr.push([val,code,shortName].join('|'));
				}
			});
			if(dataArr.length == 0){
				alert('请填写城市信息!');
			}else{
				setCookie(COOKIE_NAME,dataArr.join(','),7);
				$cityList.find('.city').remove();
				initCityInfo(dataArr);
				$hotCities.hide();
			}
		});
	});
})