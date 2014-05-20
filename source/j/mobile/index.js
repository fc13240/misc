$(function(){
	
	var imgWea = './weaIcon/blue_200/';

	function getData(areaid){
		var url = './data/cityinfo/'+areaid+'.html'; //json数据路径
		$.getJSON(url,function(data){
			$('.yj span a').html(data.y+'-'+data.m+'-'+data.d+' '+data.w+data.h+':00发布')
			$('.pic_yb img').attr('src',imgWea+'d'+data.wc1+'.png');
			$('.yb_you h1').html('<a href="citmani.html">'+data.s+'</a>');
			data.w1 == data.w2 && $('.yb_you .mid span:first').html(data.w1) || $('.yb_you .mid span:first').html(data.w1+'转'+data.w2);
			var text = '';
			data.wd1 == data.wd2 && (text += data.wd1) || (text += (data.wd1+'转'+data.wd2));
			data.ws1 == data.ws2 && (text += data.ws1+'级') || (text += (data.ws1+'转'+data.ws2+'级'));
			$('.yb_you .mid span:last').html(text);
			$('.yb_you p:last').html(data.t1+'/'+data.t2+'°C')
		})
	}

	//获取地理信息
	if(!$.cookie('localCity')){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;console.log(lat,lon);
				var rs ="http://geoip.weather.com.cn/ll.php?lon="+lon+"&lat="+lat;
				$.getScript(rs,function(){
					getData(id);
					$.cookie('localCity',id,{expires:30,path: '/'});
				});
			},
			function(error){
				var areaid="101020100";
				getData(areaid);
				$.cookie('localCity',areaid,{expires:30,path: '/'});
			},{
				maximumAge:60*1000*3,
				timeout:4000
			});
		}else{		
	        var areaid="101020100";
			getData(areaid);
			$.cookie('localCity',areaid,{expires:30,path: '/'});
		}
	}else{
		var areaid=$.cookie('localCity');
		getData(areaid);
	}


})