define(function(require){
	require('./common');

	$(function(){
		
		$('#weaUnit').hide();//隐藏温度切换按钮
		var speed=500;  //默认正常播放速度
		var l=10; //图片个数
		var pointer = l-1; //全局指针
		var arrShow = []; //播放定时器的存放数组；
		
		//产品图片点击效果
		$('.show ul li').click(function(){
			var that = $(this);
			var index = that.index();
			hoverClass(that,'li')
			$('.show div.img').hide().eq(index).show().children('a').hide().last().show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li:last').text());
			// if (typeof show !== "undefined") {
				clearIntervals(arrShow);
			// };
			$('.contro1 ul.l li.li3').removeClass('stop');
			return pointer=l-1;
		})
		//初始化雷达图数据
		var ajaxId = ['CHN_JB','DB_JB','HB_JB','XB_JB','HD_JB','HZ_JB','HN_JB','XN_JB'];
		for (var i = ajaxId.length - 1; i >= 0; i--) {
			var ajaxUrl = 'http://d1.weather.com.cn/radar/JC_RADAR_'+ajaxId[i]+'.html';
			ajaxJsonp(ajaxUrl);
		};
		//下拉窗添加点击事件
		$('.contro1 div.r,.contro3 .area,.contro3 .city').click(function(){
			var $ul = $(this).find('ul');
			if ($ul.is(':visible')) {
				$ul.slideUp('fast');
			}else{
				$ul.slideDown('fast');
			};
		}).mouseleave(function(){
			$(this).find('ul').slideUp('fast');
		})
		//下拉窗子标签li的点击事件
		$('.contro1 div.r ul').children('li').mouseenter(function(){
			$(this).addClass('on').siblings().removeClass('on');
		}).click(function(){
			var index = $(this).index();
			$(".contro1 div.r p").html($(this).text());
			$('.show .img:visible a').hide().eq(index).show();
			return pointer = index;
		});
		//播放速度控制按钮	
		$('.contro2 ul li').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			switch($(this).index()){
				case 0:speed=200;break;
				case 1:speed=500;break;
				case 2:speed=1000;break;
			}
			if ($('.contro1 ul.l li.li3').hasClass('stop')) {
				clearIntervals(arrShow);
				// _show();
				arrShow.push(setInterval(_show, speed));
			}
			return speed;
		})
		//播放控制台按钮
		$('.contro1 ul.l li.li3').click(function(){ //开始 暂停
			if ($(this).hasClass('stop')) {
				$(this).removeClass('stop');
				clearIntervals(arrShow);
			}else{
				$(this).addClass('stop');
				// _show();
				arrShow.push(setInterval(_show, speed));
			};
		})
		$('.contro1 ul.l li.li1').click(function(){ //跳转到第一图
			$('.show .img:visible a').hide().first().show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li:first').text());
			return pointer=0;
		})
		$('.contro1 ul.l li.li5').click(function(){ //跳转到最后一图
			$('.show .img:visible a').hide().last().show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li:last').text());
			return pointer=l-1;
		})
		$('.contro1 ul.l li.li4').click(function(){ //下一图
			clearIntervals(arrShow);
			$('.contro1 ul.l li.li3').removeClass('stop');
			if(pointer<(l-1)){		
				pointer++;
				$('.show div.img:visible a').hide().eq(pointer).show();
				$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
				return pointer;
			}
			
		})
		$('.contro1 ul.l li.li2').click(function(){ //上一图
			clearIntervals(arrShow);
			$('.contro1 ul.l li.li3').removeClass('stop');
			if(pointer>0){
				pointer--;
				$('.show div.img:visible a').hide().eq(pointer).show();
				$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
				return pointer;
			}
			
		})
		//关闭所有正在运行的定时器
		function clearIntervals(array){
			for (var i = array.length - 1; i >= 0; i--) {
				// if (typeof array[i] !== 'undefined') {
					clearInterval(array[i]);
				// };
			};
		}
		function _show(){
			pointer++;
			if (pointer>(l-1)) {
				pointer=0;
			}else if (pointer==(l-1)) {
				$('.contro1 ul.l li.li3').click();
			};
			$('.show div.img:visible').children('a').hide().eq(pointer).show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
			return pointer;
		}

		
	})
})

function readerinfo(json) {
	var l=10; //图片个数
	switch(json.radars[0].fn){
		case 'ebref_achn':var $divFather=$('.show .img:eq(0)');break;//华中
		case 'ebref_anec':var $divFather=$('.show .img:eq(1)');break;//东北
		case 'ebref_ancn':var $divFather=$('.show .img:eq(2)');break;//华北
		case 'ebref_anwc':var $divFather=$('.show .img:eq(3)');break;//西北
		case 'ebref_aecn':var $divFather=$('.show .img:eq(4)');break;//华东
		case 'ebref_accn':var $divFather=$('.show .img:eq(5)');break;//华中
		case 'ebref_ascn':var $divFather=$('.show .img:eq(6)');break;//华南
		case 'ebref_aswc':var $divFather=$('.show .img:eq(7)');var isEnd = true;break;//西南
	}

	var length = json.radars.length;
	var showLength = length<l? length: l;

	for (var i = length - 1; i >= (length-showLength); i--) {
		var aHref = 'http://i.weather.com.cn/i/product/pic/l/sevp_aoc_rdcp_sldas_' + json.radars[i].fn + '_l88_pi_' + json.radars[i].ft + '.gif';
		var imgUrl = 'http://i.weather.com.cn/i/product/pic/m/sevp_aoc_rdcp_sldas_' + json.radars[i].fn + '_l88_pi_' + json.radars[i].ft + '.gif'; 
		$a = $('<a target="_blank" href="'+aHref+'"><img width="630" src="'+imgUrl+'"></a>')
		$divFather.prepend($a);	
	};
	//默认展示最后一张
	$divFather.children('a:last').show();

	if(isEnd){
		$(".contro1 div.r p").html(json.radars[length-1].dt+' radar imgage');
		//下拉窗append子标签li
		for (var j = length-1; j >=(length-showLength); j--){		
			var text = json.radars[j].dt+' radar imgage';
			$(".contro1 div.r ul li").eq(l+j-length).html(text); //9-(length-1-j)
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

	
