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
		//空气质量级别背景色
		var $airSpan = $('.m li.sk .air span');
		var levelNum = parseInt($airSpan.text());
		var levelColor = levelNum<50 && "#44cf12" || levelNum<100 && '#f2e75a' || levelNum<150 && "#f6b42c" && levelNum<200 && "#fa5535" || levelNum<300 && "#e31b40" || "#8e0636";
		$airSpan.css('backgroundColor',levelColor);

		//页面默认执行
		var dd = $('input#whichDay[type=hidden]').attr('value');		
		$('#someDayNav li[data-day='+dd+']').addClass('on').siblings()._hover();
		$('#'+dd).siblings(".m").remove();
		var dataDn = $('#'+dd).find('.on').attr('data-dn');
		var $todayUl = $('#Hour3');
		$todayUl.find('li[data-dn='+dataDn+']').show();
		//今天 明后天 7d 15d 联动
		var $todayUl = $('#Hour3');
		$('#tabDays li.dn').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			var $img = $(this).find('img');
			var imgName = $img.attr('src').match(/\w\d+\.jpg/g);
			$img.attr('src','http://10.14.85.90/source/i/weather2014/jpg/blue/'+imgName);
			$(this).siblings(".dn").find('img').attr('src','http://10.14.85.90/source/i/weather2014/jpg/gray/'+imgName)
			// "http://10.14.85.90/source/i/weather2014/jpg/blue/d01.jpg"
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