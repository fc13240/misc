// JavaScript Document
define(function(require){	
	//require('./jq-cookie');

	//有新城市浏览，刷新cookie - cityHistory
	var defaultCityHistory = '101010100,101020100,101280601';
//	var url = document.URL;
//	cityId = url.match(/english\/.*?\.html/).join().replace(/english\//,"").replace(/\.html/,"");	
	var reg = /\d{9}/;
	var cityId = document.URL.match(reg)[0];
	

	cityHistory = $.cookie('cityHistory') || defaultCityHistory;
	city_3 = cityHistory.split(',');
	
	var al = true;
	
	for(var i=0;i<city_3.length;i++){
		if(city_3[i] == cityId){
			var al=false;
		}
	}
	if(al){
		city_3.unshift(cityId);
		city_3.pop();
	}
	
	cityHistory = city_3.join(',');
	$.cookie('cityHistory',cityHistory,{expires:30,path: '/'})

})