define(function(require){
	var Suggest = require('../m_search_suggest.js');
	require('../plugs/jquery.placeholder');
	require("http://www.weather.com.cn/m2/j/public/dltotw.js");

	var COOKIE_NAME = 'hotcity';
	$(function(){

//选择城市

		var $hotCities = $(".hotCities");
		var cityInfoArr = [];
		$("#cityset #addCity").click(function(){
			$cityname.each(function(i,v){
				var info = cityInfoArr[i] || '||';
				var cityInfo = info.split('|');
				var shortName = cityInfo[2];
				$cityname.eq(i).val(cityInfo[0]).data('code',cityInfo[1]).next('.nick').val(shortName);
			});
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

		var $icons = $("#cityset");
		var $cityList = $("#cityset");

		var initCityInfo = function(cityArr){
			var initedNum = 0;
			$.each(cityArr,function(i,v){
				if(!v){
					return;
				}
				var cityInfo = v.split('|');
				var shortName = cityInfo[2];
				$.getJSON("/n/j/index/datatest/" + cityInfo[1] + ".html",function(data){
					var weatherInfo = data.weatherinfo;
					var cityid = weatherInfo.cityid;
					var image1=imgs(weatherInfo.img1);
					var image2=imgs(weatherInfo.img2);
					shortName || (shortName = cityInfo[0]);
					$cityList.append("<dl class=\"city\"><dt>"+shortName+"</dt><dd><span><i class=\"d"+image1+"\"></i></span><span><i class=\"n"+(image2=99?image1:image2)+"\"></i></span><span>"+weatherInfo.temp1+"~"+weatherInfo.temp2+"</span></dd></dl>");
					$cityname.eq(initedNum).val(weatherInfo.city).data('code',cityid);
					$shorname.eq(initedNum).val(shortName);
					initedNum++;
				});
			});
			cityInfoArr = cityArr || [];
		}
		var imgs=function(img){
			var imgend=img.substring(1,img.indexOf("."));
			if(imgend<10)imgend="0"+imgend;
			return imgend;
		}
		var scrollTop = $(window).scrollTop();
		var winHeight = $(window).height();
		var myhotcity = getCookie(COOKIE_NAME) || '';
		var cityArr = myhotcity.split(","),
			cityNum = cityArr.length;
		//$icons.css({"marginRight":"-565px","top":(scrollTop+winHeight-(cityNum*75)-405)});
		//北京|101010100|,郑州|200000000|家
		initCityInfo(cityArr);
		$('.hotCities p span.btn:contains(清除)').click(function(){
			$(this).siblings('input').val('').removeData('code');
		});
		$("#canc").click(function(){
			$hotCities.toggle();
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
			//if(dataArr.length == 0){
			//	alert('请填写城市信息!');
			//}else{
				setCookie(COOKIE_NAME,dataArr.join(','),7);
				$cityList.find('.city').remove();
				initCityInfo(dataArr);
				$hotCities.hide();
			//}
		});
	});
})
