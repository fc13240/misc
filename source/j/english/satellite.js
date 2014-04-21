define(function(require){
	require('./common');

	$(function(){
		
		$('#weaUnit').hide();//隐藏温度切换按钮
		var speed=500;  //默认正常播放速度
		var l=12; //图片个数
		var pointer = l-1; //全局指针
		var arrShow = []; //播放定时器的存放数组；

		//初始化雷达图数据
		var ajaxId = ['DL_WXZXCSYT','DL_SQ','HQ_HW','DL_HW'];
		for (var i = ajaxId.length - 1; i >= 0; i--) {
			var ajaxUrl = 'http://d1.weather.com.cn/satellite/JC_YT_'+ajaxId[i]+'.html';
			ajaxJsonp(ajaxUrl);
		};

		//第一个点击弹出下拉窗
		$('.contro1 div.right').click(function(){
			var $div = $(this).find('div');
			if ($div.is(':visible')) {
				$div.hide();
			}else{
				$div.show();
			};
		}).mouseleave(function(){
			$(this).find('div').hide();
		})
		//第二个点击弹出下拉窗
		$('.contro3 .area').click(function(){
			var $ul = $(this).find('ul');
			if ($ul.is(':visible')) {
				$ul.hide();
			}else{
				$ul.show();
			};
		}).mouseleave(function(){
			$(this).find('ul').hide();
		})
		//第一个下拉窗中标签li的点击事件
		$('.contro1 .right ul li').live('mouseenter click',function(event){
			if (event.type == 'mouseenter') {
				$(this).addClass('on').siblings().removeClass('on');
			}else{
				var index = $(this).index();
				$(".contro1 div.right p").html($(this).text());
				$('.show .img:visible a').hide().eq(index).show();
				return pointer = index;
			};;
			
		})		
		//第二个下拉窗中标签li点击事件
		$('.contro3 .area ul li').mouseenter(function(){
			$(this).addClass('on').siblings().removeClass('on');
		}).click(function(){
			var index = $(this).index();
			var $ul = $('.contro1 div.right div ul');
			$('.show div.img').hide().eq(index).show().children('a').hide().last().show();
			$ul.hide().eq(index).show();
			$(".contro1 div.right p").html($ul.eq(index).children('li').last().text());
			$(".area p").html($(this).text());
			clearIntervals(arrShow);
			$('.contro1 ul.l li.li3').removeClass('stop');
			return pointer=l-1;
			
		})

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
			$(".contro1 div.right p").html($('.contro1 div.right ul li:first').text());
			return pointer=0;
		})
		$('.contro1 ul.l li.li5').click(function(){ //跳转到最后一图
			$('.show .img:visible a').hide().last().show();
			$(".contro1 div.right p").html($('.contro1 div.right ul li:last').text());
			return pointer=l-1;
		})
		$('.contro1 ul.l li.li4').click(function(){ //下一图
			clearIntervals(arrShow);
			$('.contro1 ul.l li.li3').removeClass('stop');
			if(pointer<(l-1)){		
				pointer++;
				$('.show div.img:visible a').hide().eq(pointer).show();
				$(".contro1 div.right p").html($('.contro1 div.right ul li').eq(pointer).text());
				return pointer;
			}
		})
		$('.contro1 ul.l li.li2').click(function(){ //上一图
			clearIntervals(arrShow);
			$('.contro1 ul.l li.li3').removeClass('stop');
			if(pointer>0){
				pointer--;
				$('.show div.img:visible a').hide().eq(pointer).show();
				$(".contro1 div.right p").html($('.contro1 div.right ul li').eq(pointer).text());
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
			if (pointer>=l) {
				pointer=0;
			}else if (pointer==(l-1)) {
				$('.contro1 ul.l li.li3').click();
			};
			$('.show div.img:visible').children('a').hide().eq(pointer).show();
			$(".contro1 div.right p").html($('.contro1 div.right ul li').eq(pointer).text());
			return pointer;
		}
	})
})

function readerinfo(json) {
	switch(json.radars[0].fn){
		case 'wxcl_asc_e99_achn':var $divFather=$('.show .img:eq(0)');$ulFather=$('.contro1 div.right ul:eq(0)');var pH = 1;break;//彩色云图
		case 'wxbl_fy2d_ewvp_achn':var $divFather=$('.show .img:eq(1)');$ulFather=$('.contro1 div.right ul:eq(1)');break;//水汽云图
		case 'wxsp_asc_eir_acwp':var $divFather=$('.show .img:eq(2)');$ulFather=$('.contro1 div.right ul:eq(2)');break;//太平洋红外
		case 'wxbl_asc_eir_achn':var $divFather=$('.show .img:eq(3)');$ulFather=$('.contro1 div.right ul:eq(3)');break;//大陆红外
	}
	var l=12;
	var length = json.radars.length;
	var showLength = length<l? length: l;

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
		$(".contro1 div.right p").html($('.contro1 div.right div ul:first').children('li').last().text());
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

	
