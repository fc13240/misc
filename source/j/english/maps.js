// JavaScript Document
define(function(require){
	require('./common');

	$(function(){
		var index = parseInt(document.URL.substring(document.URL.indexOf('index=')+6))||1;
		var index = index>19||index<1?1:index;
		var $tA = $('.imgNav .t a');
		

		//隐藏温度单位转换按钮
		$('#weaUnit').hide();

		switch(index){
			case 1:_a_on(index);getData('YB_WD_ZG24');rightData = [{dataId:'YB_WD_ZD24',ind:'?index=6'},{dataId:'JC_WD_ZG10',ind:'?index=7'},{dataId:'JC_WD_ZG20',ind:'?index=8'}]; break;//24小时最高温度预报
			case 2:_a_on(index);getData('YB_JSL_024');rightData = [{dataId:'YB_JSL_048',ind:'?index=9'},{dataId:'JC_JSL_02405',ind:'?index=10'},{dataId:'JC_JSL_10',ind:'?index=11'}]; break;//全国24小时降水量预报
			case 3:_a_on(index);getRoad();rightData = [{dataId:'YB_GL_SJL_24H',ind:'?index=14'},{dataId:'YB_TL_SJL_24H',ind:'?index=15'},{dataId:'JC_GL_NJD_ZH',ind:'?index=16'},{dataId:'JC_TL_NJD_ZH',ind:'?index=17'}];break;
			//全国主要公路气象预报
			case 4:_a_on(index);typFlah();break;//台风flash动画
			case 5:_a_on(index);getData('YB_KQWR_24');rightData = [{dataId:'YB_M_24',ind:'?index=18'},{dataId:'YB_W_24',ind:'?index=19'}];break;//空气污染气象条件预报
			case 6:_a_on(1);getData('YB_WD_ZD24');rightData = [{dataId:'YB_WD_ZG24',ind:'?index=1'},{dataId:'JC_WD_ZG10',ind:'?index=7'},{dataId:'JC_WD_ZG20',ind:'?index=8'}]; break;//24小时最低温度预报
			case 7:_a_on(1);getData('JC_WD_ZG10');rightData = [{dataId:'YB_WD_ZD24',ind:'?index=6'},{dataId:'YB_WD_ZG24',ind:'?index=1'},{dataId:'JC_WD_ZG20',ind:'?index=8'}]; break;//全国10天最高气温分布
			case 8:_a_on(1);getData('JC_WD_ZG20');rightData = [{dataId:'YB_WD_ZD24',ind:'?index=6'},{dataId:'JC_WD_ZG10',ind:'?index=7'},{dataId:'YB_WD_ZG24',ind:'?index=1'}]; break;//全国20天最高气温分布

			case 9:_a_on(2);getData('YB_JSL_048');rightData = [{dataId:'YB_JSL_024',ind:'?index=2'},{dataId:'JC_JSL_02405',ind:'?index=10'},{dataId:'JC_JSL_10',ind:'?index=11'}]; break;//全国48小时降水量预报
			case 10:_a_on(2);getData('JC_JSL_02405');rightData = [{dataId:'YB_JSL_048',ind:'?index=9'},{dataId:'YB_JSL_024',ind:'?index=2'},{dataId:'JC_JSL_10',ind:'?index=11'}]; break;//全国降水量实况
			case 11:_a_on(2);getData('JC_JSL_10');rightData = [{dataId:'YB_JSL_048',ind:'?index=9'},{dataId:'JC_JSL_02405',ind:'?index=10'},{dataId:'YB_JSL_024',ind:'?index=2'}]; break;//全国近10天降水量实况
		
			case 14:_a_on(3);getData('YB_GL_SJL_24H');rightData = [{dataId:'YB_TL_SJL_24H',ind:'?index=15'},{dataId:'JC_GL_NJD_ZH',ind:'?index=16'},{dataId:'JC_TL_NJD_ZH',ind:'?index=17'}];break;//公路24小时降水量预报
			case 15:_a_on(3);getData('YB_TL_SJL_24H');rightData = [{dataId:'YB_GL_SJL_24H',ind:'?index=14'},{dataId:'JC_GL_NJD_ZH',ind:'?index=16'},{dataId:'JC_TL_NJD_ZH',ind:'?index=17'}];break;//铁路24小时降水量预报
			case 16:_a_on(3);getData('JC_GL_NJD_ZH');rightData = [{dataId:'YB_GL_SJL_24H',ind:'?index=14'},{dataId:'YB_TL_SJL_24H',ind:'?index=15'},{dataId:'JC_TL_NJD_ZH',ind:'?index=17'}];break;//公路逐小时能见度实况
			case 17:_a_on(3);getData('JC_TL_NJD_ZH');rightData = [{dataId:'YB_GL_SJL_24H',ind:'?index=14'},{dataId:'YB_TL_SJL_24H',ind:'?index=15'},{dataId:'JC_GL_NJD_ZH',ind:'?index=16'}];break;//铁路逐小时能见度实况

			case 18:_a_on(5);getData('YB_M_24');rightData = [{dataId:'YB_KQWR_24',ind:'?index=5'},{dataId:'YB_W_24',ind:'?index=19'}]; break;//24小时霾预报
			case 19:_a_on(5);getData('YB_W_24');rightData = [{dataId:'YB_M_24',ind:'?index=18'},{dataId:'YB_KQWR_24',ind:'?index=5'}]; break;//24小时大雾预报
		}
		
		//右侧相关产品的数据获取
		var setRigIndex = 0;
		function setRight(){
			$.ajax({
				type:'GET',
				url:'http://d1.weather.com.cn/product_json/'+rightData[setRigIndex].dataId+'.html',
				dataType:'script',
				async:false,
				success:function(){
					var strDiv = '<div class="mt clearfix"><a href="'+rightData[setRigIndex].ind+'"><img width="180" height="125" class="fl" src="http://i.weather.com.cn/i/product/pic/s/'+jsl.jsinfo[0].fn+'"></a><div class="fl r"><p class="txt">'+jsl.jsinfo[0].descpri+'</p><div class="time"><p>'+jsl.jsinfo[0].dt.split(' ')[1]+jsl.jsinfo[0].dt.split(' ')[2]+'</p><p>'+jsl.jsinfo[0].dt.split(' ')[0]+'</p>';
					$('.map').append(strDiv);
					if (setRigIndex<rightData.length-1) {
						setRigIndex++;
						setRight();
					};
				}
			})
		}setRight(); 
		//主体内容的图片、说明的信息获取
		function getData(dataId){
			$.ajax({
				type:'GET',
				url:'http://d1.weather.com.cn/product_json/'+dataId+'.html',
				dataType:'script',
				async:false,
				cache:false,
				success:function(){
					var aLink = 'http://i.weather.com.cn/i/product/pic/l/'+jsl.jsinfo[0].fn;
					var imgSrc = 'http://i.weather.com.cn/i/product/pic/m/'+jsl.jsinfo[0].fn;
					$('.show a').attr('href',aLink).children('img').attr('src',imgSrc);
					$('.show .txt p:eq(0)').html('Product Name:'+jsl.jsinfo[0].descpri);
					$('.show .txt p:eq(1)').html('Update Time:'+jsl.jsinfo[0].dt);
					$('.show .txt p:eq(2)').html('Timeliness:'+jsl.jsinfo[0].vti+' hours');
				}
			})
		}
		//交通，读一个图片
		function getRoad(){
			var aLink = 'http://i.weather.com.cn/i/product/pic/ybjt24m.png';
			var imgSrc = 'http://i.weather.com.cn/i/product/pic/ybjt24m.png';

			$('.show a').attr('href',aLink).children('img').attr('src',imgSrc);
			// $('.show .txt p:eq(0)').html('Product Name:  '+jsl.jsinfo[0].descpri);
			// $('.show .txt p:eq(1)').html('Update Time:  '+jsl.jsinfo[0].dt);
			// $('.show .txt p:eq(2)').html('Timeliness:  '+jsl.jsinfo[0].vti+' hours');
		}
		//台风的flash动画
		function typFlah(){	
			var iframe = '<iframe width="630" scrolling="no" height="488" frameborder="0" src="http://flash.weather.com.cn/typhoon/taifeng.swf" name="surf"></iframe>'

			$('.show').empty().append(iframe);

			var strDiv = '<div class="mt clearfix"><a href="http://en.weather.com.cn/satellite/"><img width="180" height="125" class="fl" src="http://i.tq121.com.cn/i/english/cityInfo/map2.jpg"></a><div class="d1"><div class="d2"><div class="d3"><a href="http://en.weather.com.cn/satellite/">China Satellite Image</a></div></div></div></div><div class="mt clearfix"><a href="http://en.weather.com.cn/radar/"><img width="180" height="125" class="fl" src="http://i.tq121.com.cn/i/english/cityInfo/map1.jpg"></a><div class="d1"><div class="d2"><div class="d3"><a href="http://en.weather.com.cn/radar/">China Radar</a></div></div></div></div>';
			$('.map').append(strDiv);
		}
		//二级导航的选中样式
		function _a_on(index){
			$tA.eq(index-1).addClass('on').siblings().removeClass('on');
		}


	})
})