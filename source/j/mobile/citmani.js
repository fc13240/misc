$(function(){
	var $firLi = $('.cityman ul li:first');
	var localCity = $.cookie('localCity') || "";
	$firLi.children('a').attr('href','http://wap.weather.com.cn/tq/'+localCity+'.shtml');

	var citys = $.cookie('citys');
	var arrCity = citys.split('/');
	var $firLi = $('.cityman ul li:first');
	for (var i = arrCity.length - 1; i > 0; i--) {
		var arr = arrCity[i].split(',');
		$firLi.after('<li><a href="http://wap.weather.com.cn/tq/'+parseInt(arr[0])+'.shtml">'+arr[1]+'</a><img src="http://i.tq121.com.cn/i/mobile/images/cha.png"></li>') 
	};

	$('.cityman ul li img').live('click',function(){
		$(this).parents('li').remove();
		
		for (var i = arrCity.length - 1; i > 0; i--) {
			arrCity[i].split(',')[0] == parseInt($(this).prev().attr('href')) && arrCity.splice(i,1);
		};
		citysL = arrCity.join('/');
		$.cookie('citys',citysL,{expires:30,path: '/'});
	})
	
})
function deleteCity(){
	$('.cityman ul li img').fadeIn();
}