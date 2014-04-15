define(function(require){
	require('./common');

	$(function(){
		
		//初始化雷达图数据
		var ajaxId = ['DL_WXZXCSYT','DL_SQ','HQ_HW','DL_HW'];
		for (var i = ajaxId.length - 1; i >= 0; i--) {
			var ajaxUrl = 'http://d1.weather.com.cn/satellite/JC_YT_'+ajaxId[i]+'.html';
			ajaxJsonp(ajaxUrl);
		};

		//下拉窗添加点击事件
		$('.contro1 div.r').click(function(){
			var $div = $(this).find('div');
			if ($div.is(':visible')) {
				$div.hide();
			}else{
				$div.show();
			};
		})
		$('.contro3 .area').click(function(){
			var $ul = $(this).find('ul');
			if ($ul.is(':visible')) {
				$ul.slideUp('fast');
			}else{
				$ul.slideDown('fast');
			};
		})
		//第一个下拉窗标签li的点击事件
		$('.contro1 div.r ul li').live('mouseenter click',function(event){
			if (event.type == 'mouseenter') {
				$(this).addClass('on').siblings().removeClass('on');
			}else{
				var index = $(this).index();
				$(".contro1 div.r p").html($(this).text());
				$('.show .img:visible a').hide().eq(index).show();
				return pointer = index;
			};;
			
		})		
		//第二个下拉窗标签li点击事件
		$('.contro3 .area ul li').mouseenter(function(){
			$(this).addClass('on').siblings().removeClass('on');
		}).click(function(){
			var index = $(this).index();
			var $ul = $('.contro1 div.r div ul');
			$('.show div.img').hide().eq(index).show().children('a').hide().last().show();
			$ul.hide().eq(index).show();
			$(".contro1 div.r p").html($ul.eq(index).children('li').last().text());
			$(".area p").html($(this).text());
			return pointer=12-1;
		})

		//播放速度控制按钮
		var speed=500;
		$('.contro2 ul li').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			switch($(this).index()){
				case 0:speed=200;break;
				case 1:speed=500;break;
				case 2:speed=1000;break;
			}
			if ($('.contro1 ul.l li.li3').hasClass('stop')) {
				clearInterval(show);
				_show();
				show = setInterval(_show,speed);
			}
			return speed;
		})
		var pointer = 0;
		//播放控制台按钮
		$('.contro1 ul.l li.li3').toggle(function(){ //开始 暂停
			$(this).addClass('stop');
			_show();
			show = setInterval(_show,speed);
		},function(){
			$(this).removeClass('stop');
			clearInterval(show);
		})
		$('.contro1 ul.l li.li1').click(function(){ //跳转到第一图
			$('.show .img:visible a').hide().first().show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li:first').text());
		})
		$('.contro1 ul.l li.li5').click(function(){ //跳转到最后一图
			$('.show .img:visible a').hide().last().show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li:last').text());
		})
		$('.contro1 ul.l li.li4').click(function(){ //下一图
			pointer++;
			if(pointer>=showLength){
				pointer=0;
			}
			$('.show div.img:visible a').hide().eq(pointer).show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
			return pointer;
		})
		$('.contro1 ul.l li.li2').click(function(){ //上一图
			pointer--;
			if(pointer<0){
				pointer=9;
			}  
			$('.show div.img:visible a').hide().eq(pointer).show();
			$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
			return pointer;
		})

		function _show(){
			$('.show div.img:visible').children('a').hide().eq(pointer).show();
			
			$(".contro1 div.r p").html($('.contro1 div.r ul li').eq(pointer).text());
			pointer++;
			if(pointer<12){
				return pointer;
			}else{
				return pointer=0;
			}
		}
	})
})

function readerinfo(json) {
	switch(json.radars[0].fn){
		case 'wxcl_asc_e99_achn':var $divFather=$('.show .img:eq(0)');$ulFather=$('.contro1 div.r ul:eq(0)');var pH = 1;break;//彩色云图
		case 'wxbl_fy2d_ewvp_achn':var $divFather=$('.show .img:eq(1)');$ulFather=$('.contro1 div.r ul:eq(1)');break;//水汽云图
		case 'wxsp_asc_eir_acwp':var $divFather=$('.show .img:eq(2)');$ulFather=$('.contro1 div.r ul:eq(2)');break;//太平洋红外
		case 'wxbl_asc_eir_achn':var $divFather=$('.show .img:eq(3)');$ulFather=$('.contro1 div.r ul:eq(3)');break;//大陆红外
	}

	var length = json.radars.length;
	var showLength = length<12? length: 12;

	for (var i = length - 1; i >= (length-showLength); i--) {
		//prepend图片
		var aHref = 'http://i.weather.com.cn/i/product/pic/l/sevp_nsmc_'+json.radars[i].fn+'_lno_py_' + json.radars[i].ft + '.jpg'; 
		var imgUrl = 'http://i.weather.com.cn/i/product/pic/m/sevp_nsmc_'+json.radars[i].fn+'_lno_py_' + json.radars[i].ft + '.jpg'; 
		$a = $('<a target="_blank" href="'+aHref+'"><img width="630" src="'+imgUrl+'"></a>')
		$divFather.prepend($a);	
		//下拉窗prepend子标签li
		var li = '<li>'+json.radars[i].dt+' radar imgage</li>';
		$ulFather.prepend(li);
	};
	//默认展示最后一张
	$divFather.children('a:last').show();
	if (pH) {
		$(".contro1 div.r p").html($('.contro1 div.r div ul:first').children('li').last().text());
	};
	
	
	
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

	
