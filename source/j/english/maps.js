// JavaScript Document
define(function(require){
	require('./common');

	$(function(){
		var index = parseInt(document.URL.substring(document.URL.indexOf('index=')+6))||1;console.log(index)
		var $p = $('.imgNav .b p');
		var $p1 = $p.eq(0); //高温  低温
		var $p2 = $p.eq(1); //24小时  48小时
		var $tA = $('.imgNav .t a');
		var $divShow = $(".show");
		
		//隐藏温度单位转换按钮
		$('#weaUnit').hide();

		function getData(dataId,imgNum){
			ajax({
				type:'GET',
				url:'http://d1.weather.com.cn/product_json/'+dataId+'.html',
				dataType:'script',
				async:false,
				cache:false,
				success:function(){
					var aLink = 'http://i.weather.com.cn/i/product/pic/l/sevp_nmc_apwf_sfer_eairp_achn_lno_p9_'+jsl.radars.ft+'.jpg';
					var imgSrc = 'http://i.weather.com.cn/i/product/pic/m/sevp_nmc_apwf_sfer_eairp_achn_lno_p9_'+jsl.radars.ft+'.jpg';

					$('.show a').attr('href',aLink).children('img').attr('src',imgSrc);

					switch(jsl.radars.dt.split('-')[1]){
						case '01':var mouth = 'Jan';break;
						case '02':var mouth = 'Feb';break;
						case '03':var mouth = 'Mar';break;
						case '04':var mouth = 'Apr';break;
						case '05':var mouth = 'May';break;
						case '06':var mouth = 'Jun';break;
						case '07':var mouth = 'Jul';break;
						case '08':var mouth = 'Aug';break;
						case '09':var mouth = 'Sep';break;
						case '10':var mouth = 'Oct';break;
						case '11':var mouth = 'Nov';break;
						case '12':var mouth = 'Dec';break;
					}

					$('.show .txt p:eq(1)').html('Update Time:  '+jsl.radars.dt.split(' ')[1]+' '+jsl.radars.dt.split('-')[2].substr(0,2)+'.'+mouth+' '+jsl.radars.dt.split('-')[0]);

					$('.show .txt p:last').html('Timeliness:  24 hours');


				}
			})
			var $p = $('.show .txt p:first');
			switch(imgNum){
				case 1:$p.html('Product Name:  China 24-hour highest  temperature forecast');
				case 2:$p.html('Product Name:  China 24-hour lowest temperature forecast');
				case 3:$p.html('Product Name:  China 24-hour Precipitation forecast');
				case 4:$p.html('Product Name:  China 48-hour Precipitation forecast');
				case 5:$p.html('Product Name:  China highway weather forecast');
				case 6:$p.html('');
				case 7:$p.html('Product Name:  China air pollution potential forecast');
			}
			
		}
			

		switch(index){
			case 1:_a_on(index);$p1.children('a:first').addClass('on');$p1.show();_show(index); break;
			case 2:_a_on(index);$p2.children('a:first').addClass('on');$p2.show();_show(5); break;
			case 3:_a_on(index);_show(6); break;
			case 4:_a_on(index);_show(7); break;
			case 5:_a_on(index);_show(8); break;
			case 6:_a_on(1);$p1.children('a:first').addClass('on');$p1.show();_show(1); break;
			case 7:_a_on(1);$p1.children('a:last').addClass('on');$p1.show();_show(2); break;
			case 8:_a_on(2);$p2.children('a:first').addClass('on');$p2.show();_show(3); break;
			case 9:_a_on(2);$p2.children('a:last').addClass('on');$p2.show();_show(4); break;
	
		}
		
		function _a_on(index){
			$tA.eq(index-1).addClass('on').siblings().removeClass('on');
		}
		function _show(index){
			// $('.show li').hide().eq(index-1).show();	
		}



	})
})