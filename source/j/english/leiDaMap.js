$(function(){


	$('.show ul li').click(function(){
		var index = $(this).index();
		$(this).siblings().removeClass('on')
		$(this).addClass('on');
		
		$('.show div.img').hide().eq(index).show().children('a').hide().eq(0).show();
		$(".contro1 div.r p").html($('.contro1 div.r ul li:first').text());
		return pointer=0;

		// switch(index){
		// 	case 0:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_CHN_JB.html');break;
		// 	case 1:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_DB_JB.html');break;
		// 	case 2:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_HB_JB.html');break;
		// 	case 3:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_XB_JB.html');break;
		// 	case 4:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_HD_JB.html');break;
		// 	case 5:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_HZ_JB.html');break;
		// 	case 6:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_HN_JB.html');break;
		// 	case 7:clearInterval(show);ajaxJsonp('http://i.weather.com.cn/i/product/json/radar/JC_RADAR_XN_JB.html');break;
		// }

	})
	//初始化雷达图数据
	var ajaxId = ['CHN_JB','DB_JB','HB_JB','XB_JB','HD_JB','HZ_JB','HN_JB','XN_JB'];
	for (var i = ajaxId.length - 1; i >= 0; i--) {
		var ajaxUrl = 'http://i.weather.com.cn/i/product/json/radar/JC_RADAR_'+ajaxId[i]+'.html';
		ajaxJsonp(ajaxUrl);
	};

	//下拉窗添加点击事件
	$('.contro1 div.r,.contro3 .area,.contro3 .city').mousedown(function(){
		$(this).find('ul').slideDown('fast');
		// clearInterval(show);
	}).mouseleave(function(){
		$(this).find('ul').slideUp('fast');

	})
	

	//下拉窗子标签li的点击事件
	$('.contro1 div.r ul').children('li').mouseenter(function(){
		$(this).addClass('on').siblings().removeClass('on');
	}).click(function(){
		var index = $(this).index();
		// var poi = length-index-1;
		$(".contro1 div.r p").html($(this).text());
		$('.show .img:visible a').hide().eq(index).show();
		// var imgUrl = 'http://i.weather.com.cn/i/product/pic/l/sevp_aoc_rdcp_sldas_' + json.radars[poi].fn + '_l88_pi_' + json.radars[poi].ft + '.gif';
		// $('.show .img a').attr('href',imgUrl).children('img').attr("src",imgUrl);
		return pointer = index;
	
	});

	var pointer = 0;
	//播放控制按钮
	// show = setInterval(_show,500);
	// clearInterval(show)
	$('.contro1 ul.l li.li3').toggle(function(){
		$(this).addClass('stop');
		show = setInterval(_show,500);
	},function(){
		$(this).removeClass('stop');
		clearInterval(show)
	})



	function _show(){
		$('.show div.img:visible').children('a').hide().eq(pointer).show();
		
		$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
		pointer++;
		if(pointer<10){
			return pointer;
		}else{
			return pointer=0;
		}
	}
	
})


function readerinfo(json) {
	

	switch(json.radars[0].fn){
		case 'ebref_achn':var $divFarther=$('.show .img:eq(0)');break;//华中
		case 'ebref_anec':var $divFarther=$('.show .img:eq(1)');break;//东北
		case 'ebref_ancn':var $divFarther=$('.show .img:eq(2)');break;//华北
		case 'ebref_anwc':var $divFarther=$('.show .img:eq(3)');break;//西北
		case 'ebref_aecn':var $divFarther=$('.show .img:eq(4)');break;//华东
		case 'ebref_accn':var $divFarther=$('.show .img:eq(5)');break;//华中
		case 'ebref_ascn':var $divFarther=$('.show .img:eq(6)');break;//华南
		case 'ebref_aswc':var $divFarther=$('.show .img:eq(7)');var isEnd = true;break;//西南
	}


	var length = json.radars.length;
	var showLength = length<10? length: 10;
	// var tab = json.radars.length - 1;
	
	// var imgUrl = 'http://i.weather.com.cn/i/product/pic/l/sevp_aoc_rdcp_sldas_' + json.radars[tab].fn + '_l88_pi_' + json.radars[tab].ft + '.gif';
	// $('.show .img a').attr('href',imgUrl).children('img').attr("src",imgUrl);
	// $(".contro1 div.r p").html(json.radars[tab].dt+' radar imgage')

	// $(".contro1 div.r ul").empty()



	for (var i = length - 1; i >= (length-showLength); i--) {
		var aHref = 'http://i.weather.com.cn/i/product/pic/l/sevp_aoc_rdcp_sldas_' + json.radars[i].fn + '_l88_pi_' + json.radars[i].ft + '.gif';
		var imgUrl = 'http://i.weather.com.cn/i/product/pic/m/sevp_aoc_rdcp_sldas_' + json.radars[i].fn + '_l88_pi_' + json.radars[i].ft + '.gif'; 
		$a = $('<a target="_blank" href="'+aHref+'"><img width="630" src="'+imgUrl+'"></a>')
		$divFarther.append($a);
		
	};
	$divFarther.children('a:first').show();

	if(isEnd){
		$(".contro1 div.r p").html(json.radars[length-1].dt+' radar imgage');


		//下拉窗append子标签li
		for (var j = length-1; j >=(length-showLength); j--){		
			var text = json.radars[j].dt+' radar imgage';
			$(".contro1 div.r ul li").eq(length-1-j).html(text);
			// var $li = $('<li>'+json.radars[j].dt+' radar imgage</li>');
			// $(".contro1 div.r ul").append($li);	
		};


	}
	

}	
function ajaxJsonp(xmlfile){	
	$.ajax({
		type: "GET",	
		url: xmlfile + '?jsoncallback=readerinfo',
		dataType: 'jsonp',
		error:function(){
			//$('.show .img img').attr("src","http://product.weather.com.cn/m/i/tqld/no_product.jpg");
		}	
	})
}

	
