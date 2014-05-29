$(function(){
	// 83780,圣保罗,502955100
	// 81839,纳塔尔,502548100
	// 86705,库亚坝,502232100
	// 83248,萨尔瓦多,432020100
	// 86800,贝洛奥里藏特,502305100
	// 81758,福塔莱萨/福塔雷萨,502520100
	// 81958,累西腓,502596100
	// 81730,马瑙斯,502505100
	// 83378,巴西利亚,502866100
	// 86988,阿雷格里港,502463100
	// 83755,里约热内卢,502138100
	// 86933,库里蒂巴,502412100
	var arrIds = [502955100,502548100,502232100,432020100,502305100,502520100,502596100,502505100,502866100,502463100,502138100,502412100];
	$('.cityWea ul.t li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index();
		$('.cityWea .main .l img.h').eq(index).show().siblings('.h').hide();

		setData(arrIds[index]);
	})
	function setData(cityId){
		var url = 'http://www.weather.com.cn/data/cmsgj/'+cityId+'.html';	
		$.getJSON(url,function(data){
			var strLis = '';
			for (var i = 0; i <4; i++) {
				var startTime = data.threeHour[i].startTime.split(' ');
				var startDay = startTime[0].split('-')[2];
				var startTime = startDay +"日"+ startTime[1].split(':')[0]+"时";
				var endTime = data.threeHour[i].endTime.split(' ');
				var endDay = endTime[0].split('-')[2];
				var endTime = endDay +"日"+ endTime[1].split(':')[0]+"时";
				var pText = startTime + " ~ " +endTime;
				var img1 = data.threeHour[i].img1.match(/\d+/);
				var img1 = img1<10?'0'+img1:img1;
				var img1 = data.threeHour[i].img1.match(/\w/)+img1+'.gif';
				var img2 = data.threeHour[i].img2.match(/\d+/);
				var img2 = img2<10?'0'+img2:img2;
				var img2 = data.threeHour[i].img2.match(/\w/)+img2+'.gif';
				var wea = data.threeHour[i].wea1 == data.threeHour[i].wea2?data.threeHour[i].wea1:data.threeHour[i].wea1 +'转'+ data.threeHour[i].wea2;
				var tem = data.threeHour[i].tem1 == data.threeHour[i].tem2?data.threeHour[i].tem1+'°C':data.threeHour[i].tem1 +'°C~'+ data.threeHour[i].tem2+'°C';
				var win = data.threeHour[i].win1 == data.threeHour[i].win2?data.threeHour[i].win1:data.threeHour[i].win1 +'转'+ data.threeHour[i].win2;
				var winGra = data.threeHour[i].winGra1 == data.threeHour[i].winGra2?data.threeHour[i].winGra1:data.threeHour[i].winGra1 +'转'+ data.threeHour[i].winGra2;
				var spanText = wea + '&nbsp;&nbsp;' + tem + '&nbsp;&nbsp;' + win +'&nbsp;&nbsp;'+ winGra+'级';
				strLis += '<li><p class="d">'+pText+'</p><div class="m"><img class="img1" width="39" height="27" src="http://www.weather.com.cn/m2/i/icon_weather/50x36/'+ img1 +'" alt=""><img class="img2" width="39" height="27" src="http://www.weather.com.cn/m2/i/icon_weather/50x36/'+ img2+ '" alt=""><span>'+spanText+'</span></div></li>';
			};
			$('ul#threeHour').empty().append(strLis);
		})		
	}setData(502955100)
})