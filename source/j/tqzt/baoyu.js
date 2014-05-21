// JavaScript Document
define(function(require){
	require('../JQ-Extend');
	var picRoll = require('j/m_picRoll');

	$(function(){
		new picRoll({
            eleFather: '#show',  //容器标签 父元素 最外围标签  
            eleText: '#show .bottom p',    //图解文字所在标签
            eleSmallClass: 'on', //下方的缩略图选中时的样式
            rollLeft: "#show .rollLeft",   //向左转标签
            rollRight: '#show .rollRight'   //向右转标签
        }).roll();

		new picRoll({
	    	eleFather:'#showBigBox1',
	    	rollLeft:'#showBig .showLeft',
	    	rollRight:'#showBig .showRight'
	    }).roll();
	    new picRoll({
	    	eleFather:'#showBigBox2',
	    	rollLeft:'#showBig .showLeft',
	    	rollRight:'#showBig .showRight'
	    }).roll();
	    new picRoll({
	    	eleFather:'#showBigBox3',
	    	rollLeft:'#showBig .showLeft',
	    	rollRight:'#showBig .showRight'
	    }).roll();

	    $('.con3 .left h1 p em').click(function(){
	    	var that = $(this);
	    	var index = _emClick(that);
	    	$('#showBig .showBigBox').hide();
	    	$('#showBigBox'+index).show();
	    })
	    //flash动画切换
	    $('.con4 h1 p em').click(function(){
	    	var that = $(this);
	    	var index = _emClick(that);
			$('.con4 div.m').empty();
			switch(index){
				case 1:$('.con4 div.m').append('<embed width="100%" height="100%" type="application/x-shockwave-flash" src="http://i.weather.com.cn/images/cn/index/dtpsc/2013/05/27/A4ED9C7B439D57AE6879B6CA6508DC2C.swf" name="plugin" style="z-index: 0;" class="swf">');break;
	    		case 2:$('.con4 div.m').append('<embed width="100%" height="100%" src="http://i.weather.com.cn/images/cn/index/dtpsc/2013/05/27/4B243172F9C52CDA67DFAD89A5B32EBD.swf" name="plugin" class="swf" style="z-index: 1;">');break;
	    		case 3:$('.con4 div.m').append('<embed width="100%" height="100%" src="http://i.weather.com.cn/images/cn/index/dtpsc/2013/05/27/8C8A22557C2C130D1EDCB7C71D781910.swf" name="plugin" class="swf" style="z-index: 0;">');break;
	    	}
	    })
	    //风雨排行 降水 风力 切换效果
	    $('.con2 .right h1 p em').click(function(){
	    	var index = $(this).index();
	    	$(this).addClass('on').siblings().removeClass('on');
	    	$('.con2 .right table').eq(index).css('z-index',1).siblings().css('z-index',0)
	    })
	    function _emClick(that){
	    	var index = that.index();
			var $sibs = that.siblings();
	    	that.siblings().removeClass('on');
	    	switch(index){
	    		case 0:var index = 1;that.addClass('on');break;
				case 1:var index = 1;that.next().addClass('on');break;
	    		case 2:var index = 2;that.addClass('on');break;
	    		case 3:var index = 2;that.next().addClass('on');break;
	    		case 4:var index = 3;that.addClass('on');break;
	    	}
	    	return index;
	    }
		//底部滚动图
	    var SN = {
	    	ul:'#picShow ul',
	    	rLeft:'#picShow .rollLeft',
	    	rRight:'#picShow .rollRight',
	    	rW:'129px'//一次滚动的宽度，li的宽加上marign值
	    }
	    var ulW = $(SN.ul).width();
	    var opac = $(SN.rLeft).css('opacity'); 
		$(SN.ul).append($(SN.ul).find('li').clone()).width(ulW*2);
		var arrInter = [];
		$(SN.rLeft+','+SN.rRight).click(function(){
			var sign = $(this).hasClass('rollLeft') && '-' || '+';
			_toRoll(sign);
		}).hover(function(){
			$._clearInter(arrInter);
		},function(){
			_setInter();
		})._fadeHover()
		$('#picShow .mBox').hover(function(){
			$._clearInter(arrInter);
		},function(){
			_setInter();
		})
		function _setInter(){
			arrInter.push(setInterval(function(){_toRoll('-')}, 3000));
		}_setInter();
		function _toRoll(sign){
			$(SN.ul).stop(true,true);
			var ulML = parseInt($(SN.ul).css('marginLeft'));
			ulML<=-ulW && $(SN.ul).css('marginLeft',0) || ulML>=0 && $(SN.ul).css('marginLeft',-ulW+'px');			
			$(SN.ul).stop(true,true).animate({marginLeft:sign+'='+SN.rW},'slow',function(){
			});
		}
	
	})
})
