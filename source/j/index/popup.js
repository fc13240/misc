// JavaScript Document
//cookie
var myCookie = function(name, value, options) {
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

var arrInter = [];
var $Ul = $('.localPopup ul');
$('.localPopup .r a').live('click',function(){	
	var $li = $(this).parents('li');	
	$li.remove();
	var file = myCookie('closeWarn') || '';
	var file = file +','+ $li.find('span').children('a').attr('href').split('=')[1];
	myCookie('closeWarn',file,{expires:30,path: '/'})
})
//预警
var kindObj = {'01':'台风','02':'暴雨','03':'暴雪','04':'寒潮','05':'大风','06':'沙尘暴','07':'高温','08':'干旱','09':'雷电','10':'冰雹','11':'霜冻','12':'大雾','13':'霾','14':'道路结冰',
'91':'寒冷','92':'灰霾','93':'雷雨大风','94':'森林火险','95':'降温','96':'道路冰雪','97':'干热风','98':'低温','99':'冰冻'};
var gradeObj={'01':'蓝色','02':'黄色','03':'橙色','04':'红色','91':'白色'};
var $ifurl = "http://product.weather.com.cn/alarm/grepalarm_cn.php";
function getInfo(){
    $.ajax({
        "type": "GET",
        "url": $ifurl,
        "dataType": "script",
        "cache":false,      
        "success": function() {
            if (typeof id != 'undefined') {
                var localCityId = id.toString().substr(0,7);
				var localProId =  localCityId.substr(0,5);
				var strCookie = myCookie('closeWarn') || '';
				var arrCookie = strCookie.split(",");
				var li='' 
				for (var i = alarminfo.data.length - 1; i >= 0; i--) {
					var arrId = alarminfo.data[i][1].split('-');
					if((arrId[0].length == 5 && arrId[0] == localProId)||(arrId[0].length == 7 && arrId[0] == localCityId)||(arrId[0] == id)){
						var al = true;
						for (var j = arrCookie.length - 1; j >= 0; j--) {
							if(alarminfo.data[i][1] == arrCookie[j]){
								var al = false;
							}
						};
						if (al) {
							var kind = arrId[2].substr(0,2);
							var grade = arrId[2].substr(2,2);				
							li += '<li><i class="l" style="background-image:url(&quot;http://10.14.85.90/source/i/Popup/warn_'+grade+'.png&quot;);"></i><span style="background-image:url(&quot;http://10.14.85.90/source/i/Popup/warn_'+grade+'.png&quot;);"><a target="_blank" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file='+alarminfo.data[i][1]+'">'+ alarminfo.data[i][0] +'气象台发布'+ kindObj[kind] + gradeObj[grade] +'预警</a></span><i style="background-image:url(&quot;http://10.14.85.90/source/i/Popup/warn_'+grade+'.png&quot;);" class="r"><a></a></i></li>';	
						};
					}
				};
				$Ul.html(li);
            }
        }
    })
}getInfo();
arrInter.push(setInterval(getInfo, 1000*60));
//滚动
var grollIndex=0;
function groll(){
	var $Ul = $(".localPopup ul");
	var n = $Ul.children('li').length;
	grollIndex++;
	if(grollIndex>=n) grollIndex=0;
	$Ul.animate({marginTop:-55*grollIndex+'px'},'fast');
}
$('.localPopup').hover(function(){
	clearInter(arrInter);
},function(){
	arrInter.push(setInterval(groll, 1000*3));
})
arrInter.push(setInterval(groll, 1000*3));
//clearInter
function clearInter(arrInter){
	for (var i = arrInter.length - 1; i >= 0; i--) {
		clearInterval(arrInter[i]);
	}
}	
