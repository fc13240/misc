// JavaScript Document
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

//预警
var $yjlb = ["台风", "暴雨", "暴雪", "寒潮", "大风", "沙尘暴", "高温", "干旱", "雷电", "冰雹", "霜冻", "大雾", "霾", "道路结冰"];
var $gdlb = ["寒冷", "灰霾", "雷雨大风", "森林火险", "降温", "道路冰雪", "干热风", "低温", "冰冻"];
var $yjyc = ["蓝色", "黄色", "橙色", "红色"];
var $gdyc = ["白色"];
var $ifurl = "http://product.weather.com.cn/alarm/newIndexalarm.php";
$('.localPopup .r a').click(function(){	
	$('.localPopup').hide();
	var file = $('.localPopup span a').attr('href').split('=')[1];
	$.cookie('closeWarn',file,{expires:30,path: '/'})
})
function getInfo(){
    $.ajax({
        "type": "GET",
        "url": $ifurl,
        "dataType": "script",        
        "success": function() {
            if (alarminfo.pr.length > 0) {
                var localId = id.toString().substr(0,5);
				var closeWarn = $.cookie('closeWarn');
    			$.each(alarminfo.pr,function(i,k){
					if(k[1] != closeWarn){
						var $filename = k[1];
						var cityId = $filename.split('-')[0];
						if(cityId == localId){ 
							$pos = $filename.lastIndexOf("-"),
							$lb = $filename.substr($pos + 1, 2),
							$jb = $filename.substr($pos + 3, 2),
							$textlb = $yjlb[parseInt($lb, 10) - 1],
							$textyc = $yjyc[parseInt($jb, 10) - 1];
							$lb > 90 && ($textlb = $gdlb[parseInt($lb, 10) - 91]),
							$jb > 90 && ($textyc = $gdyc[parseInt($jb, 10) - 91]),
							$(".localPopup i a").hover(function(){
								$(this).css('backgroundImage','url(http://10.14.85.90/source/i/Popup/warn_'+ $jb +'.png)');
							},function(){
								$(this).css('backgroundImage','none');
							});
							$('.localPopup i,.localPopup span').css('backgroundImage','url(http://10.14.85.90/source/i/Popup/warn_'+ $jb +'.png)');
							$('.localPopup span').html('<a target="_blank" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=' + $filename + '">' + k[0] + '气象台发布' + $textlb + $textyc + '预警</a>');
							$('.localPopup').show();
						};
					}
    			})
            }
        }
    })
}getInfo()
setInterval(getInfo, 1000*60)
