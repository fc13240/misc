define(function(require){
	require('jquery');
	/*得到一条预警数据*/
	var getAlarm = (function(){
		var yjlb = ['台风', '暴雨', '暴雪', '寒潮', '大风', '沙尘暴', '高温', '干旱', '雷电', '冰雹', '霜冻', '大雾', '霾', '道路结冰'];
		var gdlb = ['寒冷', '灰霾', '雷雨大风', '森林火险', '降温', '道路冰雪'];
		var yjyc = ['蓝色', '黄色', '橙色', '红色'];
		var gdyc = ['白色'];
		//得到预警描述及等级
		var REG = /-(\d{2})(\d{2})\.html/;
		//得到预警信息URL
		var getAlarmUrl = 'http://product.weather.com.cn/alarm/stationalarm.php?count=1&areaid='
		return function(cityId,callback){
			$.getScript(getAlarmUrl+cityId,function(){
				console.log(cityId,alarminfo,alarminfo.count > 0);
				if(alarminfo.count > 0){
					var result = {'url':'','text':'','title':'','d':''};
					var data = alarminfo.data[0];
					var url = data[1];
					var m = REG.exec(url);
					if(m){
						result.url = 'http://www.weather.com.cn/alarm/newalarmcontent.shtml?file='+url;
						var textIndex = parseInt(m[1],10);
						var text = '';
						if(textIndex > 90){
							text = gdlb[textIndex-91];
						}else{
							text = yjlb[textIndex - 1];
						}
						result.text = text;

						var level = '';
						var levelIndex = parseInt(m[2],10);
						if(levelIndex > 90){
							level = gdyc[levelIndex - 91];
						}else{
							level = yjyc[levelIndex - 1];
						}
						result.levelIndex = levelIndex;
						result.textIndex = textIndex;
						result.title = text+level+'预警';
						result.d = data;
					}
				}
				callback && callback(result);
			});
		}
	})();
	return getAlarm;
})