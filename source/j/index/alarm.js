define(function(require){
	require('jquery');
	// JavaScript Document

	function getScriptArgs() {
		var scripts = document.getElementsByTagName("script");
		script = scripts[scripts.length - 1];
		src = script.src;
		reg = /(?:\?|&)(.*?)=(.*?)(?=&|$)/g;
		var temp = {};
		var res = {};
		while ((temp = reg.exec(src)) != null) res[temp[1]] = decodeURIComponent(temp[2]);
		return res;
	};
	return function(callback){
		var attrs = getScriptArgs();
		var alarmcount = attrs.count == undefined ? '4' : attrs.count;
		// var alarmdivid = attrs.divid == undefined ? 'alarm-' + new Date().getTime() : 'alarm-' + attrs.divid;
		// document.write("<div class=\"alarm\" id=" + alarmdivid + "><p></p></div>");
		$yjlb = ['台风', '暴雨', '暴雪', '寒潮', '大风', '沙尘暴', '高温', '干旱', '雷电', '冰雹', '霜冻', '大雾', '霾', '道路结冰'];
		$gdlb = ['寒冷', '灰霾', '雷雨大风', '森林火险', '降温', '道路冰雪','干热风','低温','冰冻'];
		$yjyc = ['蓝色', '黄色', '橙色', '红色'];
		$gdyc = ['白色'];
		$ifurl = 'http://product.weather.com.cn/alarm/newIndexalarm.php?count=' + alarmcount;

		// alarmindex($URL);

		$.ajax({
			type: "GET",
			url: $ifurl,
			dataType: "script",
			cache: false,
			async: false,
			success: function() {
				$appparent = $('#alarm');
				$appparent.empty();
				$('<h2><i></i>气象灾害警报与预警信号&nbsp;&nbsp;<a target="_blank" href="http://www.weather.com.cn/alarm/newalarmlist.shtml">正在预警中<b>' + alarminfo.count + '</b>个</a></h2>').appendTo($appparent);

				if(alarminfo.gj.length > 0 || alarminfo.pr.length > 0){
					$pppp = $("<p></p>");
					$gjdiv = $("<span></span>");
					$.each(alarminfo.gj, function(i, k) {
						$('<a href="' + k.http + '" class="df" style="background:url(http://www.weather.com.cn/m2/i/alarm/cma_weather.jpg) no-repeat scroll 5px 5px">中央气象台发布' + k.name + '</a>').appendTo($gjdiv);
					});
					$.each(alarminfo.pr, function(i, k) {
						$filename = k[1];
						$pos = $filename.lastIndexOf('-');
						//alert($pos);
						$lb = $filename.substr($pos + 1, 2);
						$jb = $filename.substr($pos + 3, 2);
						$img = $lb + $jb;
						$textlb = $yjlb[parseInt($lb, 10) - 1];
						$textyc = $yjyc[parseInt($jb, 10) - 1];
						if ($lb > 90 || $jb > 90) $img = '0000';
						if ($lb > 90) $textlb = $gdlb[parseInt($lb, 10) - 91];
						if ($jb > 90) $textyc = $gdyc[parseInt($jb, 10) - 91];
						$('<a target="_blank" class="df" style="background:url(http://www.weather.com.cn/m/i/alarm_s/' + $img + '.gif) no-repeat scroll 7px 7px"  href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=' + $filename + '">' + k[0] + '气象台发布' + $textlb + $textyc + '预警</a>').appendTo($gjdiv);
					});
					$gjdiv.appendTo($pppp);
					$pppp.appendTo($appparent);
					try{
						W.util.adPos();//在广告之前加载并初始化完成的化，此方法为undefine
					}catch(e){}	
				}
				callback && callback();
			}
		});
	}
});