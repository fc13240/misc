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
	//	//ie6 png
//		tool_pngfix();
//		//滚动图
//		new picRoll({
//            eleFather: '#scrollPic',  //容器标签 父元素 最外围标签  
//            eleText: '#scrollPic p',    //图解文字所在标签
//            eleSmallClass: 'on', //下方的缩略图选中时的样式
//            rollLeft: "#scrollPic .rollLeft",   //向左转标签
//            rollRight: '#scrollPic .rollRight'   //向右转标签
//        }).roll();  
//        new picRoll({
//            eleFather: '.sqhdPic',
//            eleText: '.sqhdPic p',   
//            eleSmallClass: 'on', 
//            rollLeft: ".sqhdPic .rollLeft",   
//            rollRight: '.sqhdPic .rollRight' 
//        }).roll();
//        new picRoll({
//            eleFather: '.travel',   
//            eleText: '.travel p',    
//            eleSmallClass: 'on', 
//            rollLeft: ".travel .rollLeft",   
//            rollRight: '.travel .rollRight',
//            time:3500
//        }).roll();
//
//        
//		var botUlWidth = $('#scrollPic img').length*25;
//		var botUlWidth1 = $('.sqhdPic img').length*25;
//		var botUlWidth2 = $('.travel img').length*25;
//		$('#scrollPic ul:not(:has(img)):last').css('marginLeft',150-botUlWidth/2+'px').width(botUlWidth);
//		$('.sqhdPic ul:not(:has(img)):last').css('marginLeft',150-botUlWidth1/2+'px').width(botUlWidth1);
//		$('.travel ul:not(:has(img)):last').css('marginLeft',150-botUlWidth2/2+'px').width(botUlWidth2);
//		//空气质量级别背景色
//		var $airSpan = $('.m li.sk .air span');
//		var levelNum = parseInt($airSpan.text());
//		var levelColor = levelNum<50 && "#44cf12" || levelNum<100 && '#f2e75a' || levelNum<150 && "#f6b42c" && levelNum<200 && "#fa5535" || levelNum<300 && "#e31b40" || "#8e0636";
//		$airSpan.css('backgroundColor',levelColor);
//
//		//页面默认执行
//		var dd = $('input#whichDay[type=hidden]').attr('value');		
//		$('#someDayNav li[data-day='+dd+']').addClass('on').siblings()._hover();
//		$('#'+dd).siblings(".m").remove();
//		var dataDn = $('#'+dd).find('.on').attr('data-dn');
//		var $todayUl = $('#Hour3');
//		$todayUl.find('li[data-dn='+dataDn+']').show();
//		$('.d23 #todayliving .detail aside[data-dn=23d2]').show();
//		//今天 明后天 7d 15d 联动
//		var $todayUl = $('#Hour3');
//		$('#tabDays li.dn').click(function(){
//			$(this).addClass('on').siblings().removeClass('on');
//			var $img = $(this).find('img');
//			var imgName = $img.attr('src').match(/\w\d+\.jpg/g);
//			$img.attr('src','http://i.tq121.com.cn/i/weather2014/jpg/blue/'+imgName);
//			$(this).siblings(".dn").find('img').attr('src','http://i.tq121.com.cn/i/weather2014/jpg/gray/'+imgName)
//			// "http://i.tq121.com.cn/i/weather2014/jpg/blue/d01.jpg"
//			dataDn = $(this).attr('data-dn');
//			$todayUl.children('li[data-dn='+dataDn+']').show();
//			$todayUl.children('li[data-dn!='+dataDn+']').hide();
//			$('#todayliving .detail aside[data-dn='+dataDn+']').fadeIn().siblings('aside').hide();
//		})._hover();
//		//七天
//		$('.d7 #todayliving .detail aside[data-dn=7d1]').show();
//		$('.d7 .h3zs span').click(function(){
//			$(this).addClass('on').siblings().removeClass('on');
//			if($(this).index()==0){
//				$('#Hour3').show();
//				$('#todayliving').hide();
//				
//			}else{
//				$('#Hour3').hide();
//				$('#todayliving').show();
//				
//			}
//		})
//		//排行效果
//		$('.chartPH h1 i:first').click(function(){
//			$('#hot').hide();$('#video').show();
//			$(this).addClass('on').siblings().removeClass('on');
//		}).next().click(function(){
//			$('#hot').show();$('#video').hide();
//			$(this).addClass('on').siblings().removeClass('on');
//		})
//		$('.chartPH ul li')._hover();
//		//周边城市 景点 下拉框
//		$('.cityName .scorll div').hover(function(){
//			$(this).children('ul').show();
//		},function(){
//			$(this).children('ul').hide();
//		})
//		//周边地区效果
//		$('#around ul li').hover(function(){
//			$(this).addClass('hover').siblings().removeClass('hover')
//			$img1 = $(this).find('img:first');
//			$img2 = $(this).find('img:last');
//			imgSrc1 = $img1.attr("src").replace(/blue_30/,'white_30');
//			imgSrc2 = $img2.attr("src").replace(/blue_30/,'white_30');
//			$img1.attr("src",imgSrc1);
//			$img2.attr('src',imgSrc2);
//		},function(){
//			$(this).removeClass('hover');
//			$img1 = $(this).find('img:first');
//			$img2 = $(this).find('img:last');
//			imgSrc1 = $img1.attr("src").replace(/white_30/,'blue_30');
//			imgSrc2 = $img2.attr("src").replace(/white_30/,'blue_30');
//			$img1.attr("src",imgSrc1);
//			$img2.attr('src',imgSrc2);
//		});
		//七天趋势
		alert(1)
		var $F = $('.sevenDay');
		var $fUl = $F.find('ul.f');
		var $fLi = $fUl.find('li');
		var arrTemH = [];
		var arrTemB = [];
		var maxT = 0;
		var minT = 100;
		var $dataLi = $('#7d ul li');
		for (var i = $dataLi.length - 1; i >= 0; i--) {
			var $li = $dataLi.eq(i);
			var tem1s = $li.find('.tem1').text().replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
			var tem2s = $li.find('.tem2').text().replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
			var tem1 = parseInt(tem1s);
			var tem2 = parseInt(tem2s);
			img1 = $li.find('img:first').attr('src').match(/d\d{2}\./) || ' ';
			img2 = $li.find('img:last').attr('src').match(/n\d{2}\./) || ' ';
			if(parseInt(tem1)<(parseInt(tem2))){
				var tems = tem1;
				var tem1 = tem2;
				var tem2 = tems;
				var imgs = img1;
				var img1 = img2;
				var img2 = imgs;
			}
			var strImg1 = img1 == ' ' && ' ' || '<img src="http://i.tq121.com.cn/i/weather2014/png/blue_30/'+img1+'png" width="30" height="30" >';
			var strImg2 = img2 == ' ' && ' ' || '<img src="http://i.tq121.com.cn/i/weather2014/png/blue_30/'+img2+'png" width="30" height="30" >';
			console.log(img1+''+img2);
			$F.children('ul.f').children('li:eq('+i+')').find("p:first").html(tem1s).after(strImg1);
			$F.children('ul.f').children('li:eq('+i+')').find("p:last").html(tem2s).before(strImg2);
			var $c = $F.children('ul.d').children('li:eq('+i+')').children('.c');
			var strWd = $li.find('h1').text();
			if(strWd == '周六' || strWd == '周日'){
				$c.addClass('end');
			}
			$c.html(strWd);
			arrTemH.unshift(tem1);
			arrTemB.unshift(tem2);
			maxT = tem1 > maxT ? tem1 : maxT;
			minT = tem2 < minT ? tem2 : minT;
		}
		var lineT = Math.ceil(maxT/5)+1;
		var lineB = minT%5;
		var lineB = lineB > 3 ? Math.ceil(minT/5)-1:Math.floor(minT/5)-1;
		for (var i = $fLi.length - 1; i >= 0; i--) {
			var mt = (lineT*5-arrTemH[i])*12;
			$fLi.eq(i).css('marginTop',mt+'px').find('.zc').height(arrTemH[i]*12-arrTemB[i]*12-20);
		};
		var b1Li = '';
		var b2Li = '';
		for (var i = lineT; i >= lineB; i--) {
			b1Li += '<li></li>';
			b2Li += '<li>' + i*5 +'°C</li>';
		};
		var lineN = lineT-lineB;
		$F.children('ul.b1').empty().append(b1Li).children('li:last').css({'border-left':'none','border-right':'none'}).parent('ul').next('.b2').empty().append(b2Li);
		$F.children('ul.d').css('top',lineN*60+15+"px");
	

		
	})()
})