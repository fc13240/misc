define(function(require){
	require('./share');
	var province = require('./province3j.js');
	//顶部导航
	$("nav ul li").click(function(){
		var num = $(this).find(".dropList a").length,
			height = parseInt($(this).find(".dropList a").css("line-height").replace("px",""));
		$(this).find(".dropList i").css({"height":height*num+10});
		$(this).find(".dropList").toggle();
	})
	$("nav ul li").mouseleave(function(){
		$(this).find(".dropList").hide();
	})
	$(".dropList").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	})
	//城市天气查询
	province.initprovince(".search .province");
	province.initCity(".search .province a");
	province.showCity(".search .city");
	province.initArea(".search .city a");
	province.showArea(".search .area");
	province.setArea(".search .area a");
	var initAddCity = function(){
		$(".search .province .provinceItem,.search .city .cityItem,.search .area .areaItem").html("").hide();
		$(".search .province b").html("选择省");
		$(".search .city b").html("选择市");
		$(".search .area b").html("选择县/区");
		province.provinceid = null;
	}
	$(".search .searchBtn").click(function(){
		var cityID = province.cityID(),
			url="http://www.weather.com.cn/weather/"+province.cityID()+".shtml";
		if(cityID == 0 || cityID.indexOf("null") > -1){
				alert("请选择城市");
				return false;
			}
		window.open(url);
		initAddCity();
	})

	$(document).click(function(c){
		var d = c || window.event,
            b = c.target || c.srcElement;
		if(!$(b).closest("div").hasClass("search")){
			initAddCity();
			return;
		}
	})

	//分享
	$(".sina").click(function(){
		share('sina');
	})
	$(".qqweibo").click(function(){
		share('qqweibo');
	})
	$(".renren").click(function(){
		share('renren');
	})
		//收藏
	$(".videoplayer .tools .vid_addfav").click(function(){
		try {
           typeof window.sidebar == "object" && typeof window.sidebar.addPanel == "function" ? window.sidebar.addPanel("中国天气", "http://www.weather.com.cn", "中国天气") : typeof window.external.msAddSiteMode != "undefined" ? window.external.msAddSiteMode() : window.external.AddFavorite("http://www.weather.com.cn", "中国天气")
        } catch (a) { }
        return !1
	})
})