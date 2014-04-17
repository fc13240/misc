// JavaScript Document
define(function(require){
	require('./common');

	$(function(){
		var index = parseInt(document.URL.substring(document.URL.indexOf('index=')+6))||1;console.log(index)
		var $p = $('.imgNav .b p');
		var $p1 = $p.eq(0);
		var $p2 = $p.eq(1);
		var $tA = $('.imgNav .t a');
		

		// ajax({
		// 	type:'GET',
		// 	url:'',
		// 	dataType:'script',
		// 	async:false,
		// 	cache:false,
		// 	success:function(){
		// 		for (var i = Things.length - 1; i >= 0; i--) {
		// 			var $a = $('<a target="_blank" href="http://i.weather.com.cn/i/product/pic/l/sevp_nmc_gisp_s99_eth10_achn_l88_pb_20140414000000000.gif" ><img src="http://i.weather.com.cn/i/product/pic/l/sevp_nmc_gisp_s99_eth10_achn_l88_pb_20140414000000000.gif" width="630" ></a>');
		// 			$('.show').prepend($a);
		// 		};
		// 		// $('.show a:first').show();
				
		// 	}
		// })

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
			// $('.show a').hide().eq(index-1).show();	
		}



	})
})