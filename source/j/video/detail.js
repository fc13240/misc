define(function(require){
	var share = require('../m_share');
	var City = require('../m_city');
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
	var city = new City({
        'prov': $('.province select'),
        'city': $('.city select'),
        'county': $('.areaItem select')
    });
	$(".search .searchBtn").click(function(){
		window.open("http://www.weather.com.cn/weather/"+city.getValue()+".shtml");
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