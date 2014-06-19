define(function(require){
	require('jquery');
	require('../tool/tool_pngfix');	
	require('../JQ-Extend');
	var picRoll = require('j/m_picRoll');

	$.fn.extend({
		_hover:function(){
			$(this).hover(function(){
				$(this).addClass('hover').siblings().removeClass('hover')
			},function(){
				$(this).removeClass('hover');
			})
		}
	})
	
	$(function(){
		//ie6 png
		tool_pngfix();
		//滚动图
		new picRoll({
            eleFather: '#scrollPic',  //容器标签 父元素 最外围标签  
            eleText: '#scrollPic p',    //图解文字所在标签
            eleSmallClass: 'on', //下方的缩略图选中时的样式
            rollLeft: "#scrollPic .rollLeft",   //向左转标签
            rollRight: '#scrollPic .rollRight'   //向右转标签
        }).roll();
		var botUlWidth = $('#scrollPic img').length*25;
		$('#scrollPic ul:not(:has(img)):last').css('marginLeft',150-botUlWidth/2+'px').width(botUlWidth	);
		//今天 明后天导航hover click效果
		var dd = $('input#whichDay[type=hidden]').attr('value');
		$('#someDayNav li[data-day='+dd+']').addClass('on').siblings()._hover();
		
		//白天和黑夜之间的切换
		var $todayUl = $('.left .m ul.b');
		$todayUl.children('li[data-dn=n]').hide();
		$('#someDayLi li.dn').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			var dn = $(this).attr('data-dn');
			$todayUl.children('li[data-dn='+dn+']').show();
			$todayUl.children('li[data-dn!='+dn+']').hide();
		})._hover();
		//排行效果
		$('.chartPH h1 i:first').click(function(){
			$('#hot').hide();$('#video').show();
			$(this).addClass('on').siblings().removeClass('on');
		}).next().click(function(){
			$('#hot').show();$('#video').hide();
			$(this).addClass('on').siblings().removeClass('on');
		})
		$('.chartPH ul li')._hover();
		//周边城市 景点 下拉框
		$('.cityName .scorll div').hover(function(){
			$(this).children('ul').show();
		},function(){
			$(this).children('ul').hide();
		})

		//周边地区效果
		$('#around ul li')._hover();

		
	})()
})