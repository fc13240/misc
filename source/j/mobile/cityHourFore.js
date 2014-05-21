$(function(){
	$('.down').toggle(function() {
		$('.di ul li.move').show();		
	},
	function() {
		$('.di ul li.move').hide();
	});	
	//获取地址第几天参数，显示相应的该天逐n小时预报
	var reg = /day\=\d/;
	var dayId = document.URL.match(reg) || "day=1";
	var dayId = dayId.toString().match(/\d/);
	dayId = dayId<1 || dayId >7 ? 1 : dayId;
	$('.per_3h .title[data-id="day'+ dayId +'"],.per_3h .hours3[data-id="day'+ dayId +'"]').show();  
})