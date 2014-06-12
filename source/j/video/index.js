define(function(require){
	var City = require('../m_city');
	W(function(){
		var city = new City({
            'prov': $('#prov'),
            'city': $('#district'),
            'county': $('#city')
        });
        $('#weatherselect').click(function(){
            window.open('http://www.weather.com.cn/weather/'+city.getValue()+'.shtml');
        });
	})
});
W(function() {
	$(".gdc").toggle(function() {
		$("body").css("background", "#000");
		$(".dWeatherRankingH1").css({
			"background-color": "#000",
			"color": "#ddd"
		});
		$(".locationSearch .location ").css({
			"background-color": "#000",
			"color": "#ddd"
		});
		$(".maibx h3").css({
			"background-color": "#000",
			"color": "#ddd",
			"border-bottom": "1px solid #393939"
		});
		$(".locationSearch .search label").css({
			"background-color": "#000",
			"color": "#ddd"
		});
		$(".locationSearch").css({
			"border-bottom": "1px solid #393939"
		});
		$(".xgnews h1").css({
			"background": "#000",
			"color": "#ddd"
		});
		$(".xgnews dl dd").css({
			"background": "#000",
			"color": "#ddd"
		});
		$(".source").css({
			"background": "#000",
			"color": "#ddd"
		});
		$(".weatherLeft p").css({
			"background": "#000",
			"color": "#ddd"
		});
		$(".ric").css({
			"background": "#000",
			"color": "#ddd"
		});
		$(".bottomFooter p").css({
			"background": "#000",
			"color": "#ddd"
		});
		$(".copyIcp").css({
			"color": "#ddd"
		});
		$(".dlifeTravelH1").css({
			"background-color": "#000",
			"color": "#ddd"
		});
		$(".mainBoxh1").css({
			"background-color": "#000",
			"color": "#ddd"
		});
		$(".moredd a").css({
			"color": "#ddd"
		});
		$(".life dl dd p").css({
			"color": "#ddd"
		});
		var urlopen = document.getElementById("comifra").src;
		var mid = "_b";
		var str2 = urlopen.substring(0, urlopen.indexOf(".jsp")) + mid + urlopen.substring(urlopen.indexOf(".jsp"));
		document.getElementById("comifra").src = str2;
		change();

	}, function() {
		$("body").css("background", "#fff");
		$(".dWeatherRankingH1").css({
			"background-color": "#EBEFF8",
			"color": "#000"
		});
		$(".locationSearch .location").css({
			"background-color": "#fff",
			"color": "#000"
		});
		$(".maibx h3").css({
			"background-color": "#fff",
			"color": "#000",
			"border-bottom": "1px solid #dddddd"
		});
		$(".locationSearch .search label").css({
			"background-color": "#fff",
			"color": "#000"
		});
		$(".locationSearch").css({
			"border-bottom": "1px solid #dddddd"
		});
		$(".xgnews h1").css({
			"background": "#fff",
			"color": "000"
		});
		$(".xgnews dl dd").css({
			"background": "#fff",
			"color": "#000"
		});
		$(".source").css({
			"background": "#fff",
			"color": "#000"
		});
		$(".weatherLeft p").css({
			"background": "#fff",
			"color": "#000"
		});
		$(".ric").css({
			"background": "#fff",
			"color": "#000"
		});
		$(".bottomFooter p").css({
			"background": "#fff",
			"color": "#000"
		});
		$(".copyIcp").css({
			"color": "#000"
		});
		$(".dlifeTravelH1").css({
			"background-color": "#EBEFF8",
			"color": "black"
		});
		$(".mainBoxh1").css({
			"background-color": "#EBEFF8",
			"color": "#000000"
		});
		$(".moredd a").css({
			"color": "#3366BB"
		});
		$(".life dl dd p").css({
			"color": ""
		});


		var urlopen = document.getElementById("comifra").src;
		var mid = "";
		var str2 = urlopen.substring(0, urlopen.indexOf("_b")) + mid + urlopen.substring(urlopen.indexOf(".jsp"));
		document.getElementById("comifra").src = str2;
		changeone();
	});

	function change() {
		$(".gdc").html("开灯");
		$(".gdc").css({
			"color": "#ddd"
		});
	}

	function changeone() {
		$(".gdc").html("关灯");
		$(".gdc").css({
			"color": "#3366BB"
		});
	}
})