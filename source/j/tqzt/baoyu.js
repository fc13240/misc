// JavaScript Document
define(function(require){
	require('../JQ-Extend');
	var picRoll = require('j/m_picRoll');

	$(function(){
		var url_1 = 'http://d1.weather.com.cn/product_json/JC_JSL_02405_by.html'
		var url_2 = 'http://d1.weather.com.cn/product_json/YB_JSL_024_by.html'
		
		$.ajax({
			data:'GET',
			url:url_1,
			dataType:'script',
			async:false,
			cache:false,
			success:function(){
				var strLi = '';
				for (var i = jslInfo.jsl.length - 1; i >= 0; i--) {
					 strLi += '<li><a target="_blank" title="全国降水量实况" href="http://i.weather.com.cn/i/product/pic/l/'+jslInfo.jsl[i].fn+'"><img width="490" height="398" alt="全国降水量实况图" src="http://i.weather.com.cn/i/product/pic/m/'+jslInfo.jsl[i].fn+'"></a></li>'				
				};
				$('#showBigBox1 ul.bigImg').empty().append(strLi);
				roll({
			    	eleFather:'#showBigBox1',
			    	rollLeft:'#showBig .showLeft',
			    	rollRight:'#showBig .showRight',
			    	imgNum:jslInfo.jsl.length,
			    	ulWidth:490*jslInfo.jsl.length
		    	})
			}			
		})
		$.ajax({
			data:'GET',
			url:url_2,
			dataType:'script',
			async:false,
			cache:false,
			success:function(){
				var strLi = '';
				for (var i = jslInfo.jsl.length - 1; i >= 0; i--) {
					 strLi += '<li><a target="_blank" title="全国24小时降水量预报" href="http://i.weather.com.cn/i/product/pic/l/'+jslInfo.jsl[i].fn+'"><img width="490" height="398" alt="全国24小时降水量预报" src="http://i.weather.com.cn/i/product/pic/m/'+jslInfo.jsl[i].fn+'"></a></li>'		
				};
				$('#showBigBox2 ul.bigImg').empty().append(strLi);
				roll({
			    	eleFather:'#showBigBox2',
			    	rollLeft:'#showBig .showLeft',
			    	rollRight:'#showBig .showRight',
			    	imgNum:jslInfo.jsl.length,
			    	ulWidth:490*jslInfo.jsl.length
			    })
			}
		})


		new picRoll({
            eleFather: '#show',  //容器标签 父元素 最外围标签  
            eleText: '#show .bottom p',    //图解文字所在标签
            eleSmallClass: 'on', //下方的缩略图选中时的样式
            rollLeft: "#show .rollLeft",   //向左转标签
            rollRight: '#show .rollRight'   //向右转标签
        }).roll();

	  

	    $('.con3 .left h1 p em').click(function(){
	    	var that = $(this);
	    	var index = _emClick(that);
	    	$('#showBig .showBigBox').hide();
	    	$('#showBigBox'+index).show();
	    })

	    function roll(config){
			var pointer = 0;
			var $imgUl = $(config.eleFather).find('ul:has(img):first');//检索获取图片ul列表
			var $botUl = $(config.eleFather).find('ul:not(:has(img)):last'); //检索获取缩略图ul列表
			var imgWidth = $imgUl.find('img').width();
			var imgNum = config.imgNum;
			var arrInter = [];
			
			$imgUl.width(config.ulWidth)
			//左右点击按钮的hover透明度效果
			var opa = $(config.rollLeft).css('opacity');
			$(config.rollLeft+","+config.rollRight).hover(function(){
				$(this).css('opacity',1);
				
			},function(){
				$(this).css('opacity',opa);
				
			})
			//向左，向右滚动点击效果
			$(config.rollLeft).click(function(){
				_move(--pointer);
			})
			$(config.rollRight).click(function(){
				_move(++pointer);
			})
			
			function _move(poi){
				poi = poi>=imgNum?0:poi;
				poi = poi<0?imgNum-1:poi;
				$imgUl.stop(true,true).animate({left: -imgWidth*poi+'px'},'fast');
		
				return pointer = poi;
			}
			function _clearInter(arrInter){
				for (var i = arrInter.length - 1; i >= 0; i--) {
					clearInterval(arrInter[i]);
				}
			}
		}

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
	    var ulW = $(SN.ul).children('li').length*129;
	    var opac = $(SN.rLeft).css('opacity'); 
		$(SN.ul).append($(SN.ul).find('li').clone()).width(ulW*2);
		var arrInter = [];
		$(SN.rLeft+','+SN.rRight).click(function(){
			var sign = $(this).hasClass('rollLeft') && '+' || '-';
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
