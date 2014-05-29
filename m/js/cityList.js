$(function(){
	//获取地址中城市id
	var reg = /\d{5}/;
	var cityId = reg.exec(document.URL);
	var objCity = cityList[cityId]; //数据包data_city.js 数据对象cityList 属性cityId
	var $Ul = $('#cityList ul');
	var li = '';
	for(var prop in objCity){ //遍历城市信息  打印
		li += '<li><a data-id="'+objCity[prop][0].areaid+'" href="citmani.html">'+objCity[prop][0].name+'</a></li>';
	}
	$Ul.append(li);
	//添加cookie
	$Ul.find('a').live('click',function(){
		var dataId = $(this).attr('data-id');
		var citys = $.cookie('citys') || '';
		var arrCity = citys.split('/');
		var al = true;
		
		for (var i = arrCity.length - 1; i >= 0; i--) {
			if(parseInt(arrCity[i]) == dataId){
				var al=false;
				alert('该城市已添加过');
			}
		};
		if(al){
			var data = dataId+','+$(this).text();
			arrCity.push(data);
		}
		citys = arrCity.join('/');
		$.cookie('citys',citys,{expires:30,path: '/'});
	})

})