define(function(require){
	require('../global')
	var store = W.util.store;
	var STORE_NAME = 'f_city';

	var html = '<div class="icons">'+
					'<ul class="citylist">'+
						'<li class="addCity"><a href="/profile/city.shtml" style="display:block;" _hover-ignore="1" _orighref="/profile/city.shtml" _tkworked="true"><strong>+</strong>定制城市</a></li>'+
					'</ul>'+
				'</div>';
	var REG_IMG = /([a-z])(\d+)/;
	var imgs=function(img){
		var m = REG_IMG.exec(img);
		if(m){
			return m[1]+(m[2].length==1?'0':'')+m[2]
		}
		return img;
	}		
	W(function(){
		var $slidebar = $(html).fadeIn().appendTo($('body'));
		var $citylist = $slidebar.find('.citylist');
		var myhotcity = store.get(STORE_NAME) || '';// || '北京|101010100|';
		var cityArr = myhotcity.split(",").splice(0,3),//只显示前三个
			cityNum = cityArr.length;
		$.each(cityArr,function(i,v){
			if(!v){
				return;
			}
			var cityInfo = v.split('|');
			var shortName = cityInfo[2];
			var cityid = cityInfo[1]
			$.getJSON("/data/dingzhi/" + cityid + ".html",function(data){
				shortName || (shortName = cityInfo[0]);
				$citylist.prepend($('<li class="city"><a href="/weather/'+cityid+'.shtml" title="'+data.weather+'"><span class="alias">'+shortName+'</span><i class="'+imgs(data.img)+' fl"></i><span>'+data.temp+'℃</span></a></li>').fadeIn());
				
				$slidebar.css('margin-top',-$slidebar.outerHeight()/2)
			});
		});
		//修复IE6不支持"position:fixed"
		if ( $.browser.msie && $.browser.version <= 6){
			$(window).scroll(function(){
				$slidebar.css('top',$(window).scrollTop() + $(window).height()/2);
			});
		}
	})
});