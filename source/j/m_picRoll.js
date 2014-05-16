define(function(require){
	require('jquery');
	//使用条件：1、必须并只能有两个ul列表，img图片列表，一个放缩略图列表
	//2、图示文字说明提取的是img标签的alt属性，也就是说img必须要有alt属性
	var defaultConfig = {
		eleFather: null,  //容器标签 父元素 最外围标签  
		eleText: null,    //图解文字所在标签
		eleSmallClass: null, //下方的缩略图选中时的样式
		// eleBottom: null,  //下方的缩略图
		rollLeft: null,   //向左转标签
		rollRight: null,  //向右转标签
		time:3000         //图片切换时间间隔，默认3000毫秒
	}
	function picRoll(config){
		config = $.extend({},defaultConfig,config);
		
		this.roll = function(){
			var pointer = 0;
			var $imgUl = $(config.eleFather).find('ul:has(img):first');  //检索获取图片ul列表
			var $botUl = $(config.eleFather).find('ul:not(:has(img)):last'); //检索获取缩略图ul列表
			var imgWidth = $imgUl.find('img').width();
			var imgNum = $imgUl.find('img').length;
			var arrInter = [];
			//定时器
			arrInter.push(setInterval(function(){_move(++pointer)},config.time));
			$(config.eleFather).mouseover(function(){
				_clearInter(arrInter);
			}).mouseout(function(){
				arrInter.push(setInterval(function(){_move(++pointer)},config.time));
			})
			//左右点击按钮的hover透明度效果
			var opa = $(config.rollLeft).css('opacity');
			$(config.rollLeft+","+config.rollRight).hover(function(){
				$(this).css('opacity',1);
				_clearInter(arrInter);
			},function(){
				$(this).css('opacity',opa);
				arrInter.push(setInterval(function(){_move(++pointer)},config.time));
			})
			//向左，向右滚动点击效果
			$(config.rollLeft).click(function(){
				_move(++pointer);
			})
			$(config.rollRight).click(function(){
				_move(--pointer);
			})
			//底部缩略图点击效果
			$botUl.find('li').click(function(){
				pointer = $(this).index();
				_move(pointer);
			})
			function _move(poi){
				poi = poi>=imgNum?0:poi;
				poi = poi<0?imgNum-1:poi;
				$imgUl.stop(true,true).animate({left: -imgWidth*poi+'px'},'fast');
				$botUl.find('li').removeClass(config.eleSmallClass).eq(poi).addClass(config.eleSmallClass);
				//图示文字切换
				$(config.eleText).html($imgUl.children('li').eq(poi).find('img').attr('alt'));
				return pointer = poi;
			}
			function _clearInter(arrInter){
				for (var i = arrInter.length - 1; i >= 0; i--) {
					clearInterval(arrInter[i]);
				}
			}
		}
	}
	return picRoll;
})