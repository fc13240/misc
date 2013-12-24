define(function(require){
	var province = require('./province3j.js');

	province.initprovince(".hotCities .province2");
	province.initCity(".hotCities .province2 a");
	province.showCity(".hotCities .city");
	province.initArea(".hotCities .city a");
	province.showArea(".hotCities .area");
	province.setArea(".hotCities .area a");

    var defaultName = "自定义名称";
	$(".hotCities .shortname").bind("blur",function(){
		if($(this).val() == ""){
			$(this).val(defaultName);
		}
	})
	$(".hotCities .shortname").bind("click",function(){
		if(defaultName == $(this).val())
			$(this).val("");
	})
	
	//cookie相关操作
	require.async("http://www.weather.com.cn/m2/j/public/dltotw.js",function(){
		var myhotcity = getCookie("hotcity");
		var getCityInfo = function(id,shortname){
			$.ajax({
			type:'GET',
            url: "/data/cityinfo/" + id + ".html",
            cache: true,
            success: function (a) {
				a = eval("("+a+")");
				if(shortname.length > 0){
					$(".citylist").append("<li class=\"city\"><p><a href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\">"+shortname+"</a></p><p class=\"img\"><a class=\"d01\"  href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\"></a><a class=\"n01\"  href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\"></a></p><p><a class=\"temp\" href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\">"+a.weatherinfo.temp1+"~"+a.weatherinfo.temp2+"</a></p><i class=\"del\" data-role=\""+id+"\"></i></li>");
				}
				else{
					$(".citylist").append("<li class=\"city\"><p><a href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\">"+a.weatherinfo.city+"</a></p><p class=\"img\"><a class=\"d01\"  href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\"></a><a class=\"n01\"  href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\"></a></p><p><a class=\"temp\" href=\"http://www.weather.com.cn/weather/"+a.weatherinfo.cityid+".shtml\">"+a.weatherinfo.temp1+"~"+a.weatherinfo.temp2+"</a></p><i class=\"del\" data-role=\""+id+"\"></i></li>");
				}
               
            }
			})
			}
		//设置default cookie值
		if(myhotcity == undefined || myhotcity.length == 0){
			myhotcity = "";
			$(".icons").css({"marginRight":"-565px","top":($(window).scrollTop()+$(window).height()-$(".icons").outerHeight()-40)});
		}
		else{
			var cityArr = myhotcity.split(","),
				ii = cityArr.length;
			for(var i=1;i<ii;i++ ){
				var cityItem = cityArr[i].split("|");
				getCityInfo(cityItem[0],cityItem[1]);
			}
			$(".icons").css({"marginRight":"-565px","top":($(window).scrollTop()+$(window).height()-(ii*75)-40)});
		}
		//添加我的热点城市
		$(".hotCities .add").live("click",function(){
			var cityid = province.cityID(),
				shortname = $(".hotCities .shortname").val(),
				cityArr = myhotcity.split(",");
			if(cityArr.length > 3){
				alert("对不起，您最多只能选择3个热点城市！");
				return false;
			}
			if(cityid == 0 || cityid.indexOf("null") > -1){
				alert("请选择城市");
				return false;
			}
			for(var i = 0,ii = cityArr.length;i<ii;i++){
				if(cityArr[i].indexOf(cityid) != -1){
					alert("您已经添加了该城市！");
					return false;
				}
			}
		    if(cityid==0){
				alert("请选择城市");
				return false;
			}
			if(shortname == defaultName)
				shortname = "";

			setCookie("hotcity",myhotcity+","+cityid+"|"+shortname,7);
			getCityInfo(cityid,shortname);
			myhotcity = myhotcity+","+cityid+"|"+shortname;
			var temp_top = parseFloat($(".icons").css("top"))-75;
			$(".icons").css({"marginRight":"-565px","top":temp_top});
			initAddCity();
		})
		//取消热点城市
		$(".icons .citylist .city .del").live("click",function(){
			var cityid = $(this).attr("data-role"),
				temp_cookie="",
				cityArr = myhotcity.split(",");
			for(var i=1,ii =cityArr.length;i<ii;i++ ){
				var cityItem = cityArr[i].split("|");
				if(cityItem[0].indexOf(cityid) == -1){
					temp_cookie = temp_cookie +","+ cityArr[i];
				}
			}
			myhotcity = temp_cookie;
			setCookie("hotcity",temp_cookie,7);
			$(this).parent().remove();
			var temp_top = parseFloat($(".icons").css("top"))+75;
			$(".icons").css({"marginRight":"-565px","top":temp_top});
		})

	})
    var initAddCity = function(){
		$(".hotCities").hide();
		$(".hotCities .province2 .provinceItem,.hotCities .city .cityItem,.hotCities .area .areaItem").html("").hide();
		$(".hotCities .province2 b").html("选择省");
		$(".hotCities .city b").html("选择市");
		$(".hotCities .area b").html("选择县/区");
		$(".hotCities .shortname").val(defaultName);
		province.provinceid = null;
	}
	var cityFlag = true;
	$(".hotCities").hover(function(){
		cityFlag = false;
	},function(){
	   cityFlag = true;
	})
	$(document).click(function(c){
		var d = c || window.event,
            b = c.target || c.srcElement;
		if(cityFlag && $(".hotCities").is(":visible") && !$(b).closest("li").hasClass("addCity") && !$(b).closest("div").hasClass("hotCities")){
			initAddCity();
			return;
		}
	})
	$(".icons .addCity").click(function(){
		$(".hotCities").toggle();
		if(!$(".hotCities").is(":visible")){
			initAddCity();
		}
	})
	$(".hotCities .close").live("click",function(){
		initAddCity();
	})
})