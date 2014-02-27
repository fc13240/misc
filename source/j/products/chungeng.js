// JavaScript Document
$(function(){
	$('area').hover(function(){
		var name = $(this).attr('data-id');
		for(var i=0;i<$('.con>div').length;i++){
			if($('.con>div').eq(i).attr("data-id")==name){
				$('.con>div').eq(i).show();
			}
		}
	},function(){
		$(".con>div").hide();
	})    
	$('.con>div').hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	})                                                       
})