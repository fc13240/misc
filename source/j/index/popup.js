// JavaScript Document
//cookie
var myCookie = function(name, value, options) {
	if (typeof value != 'undefined') { 
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
			expires = '; expires=' + date.toUTCString(); 
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { 
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
$.fn.extend({
  actual : function ( method, options ){
    if( !this[ method ]){
      throw '$.actual => The jQuery method "' + method + '" you called does not exist';
    }
    var defaults = {
      absolute      : false,
      clone         : false,
      includeMargin : false
    };
    var configs = $.extend( defaults, options );
    var $target = this.eq( 0 );
    var fix, restore;
    if( configs.clone === true ){
      fix = function (){
        var style = 'position: absolute !important; top: -1000 !important; ';
        $target = $target.
          clone().
          attr( 'style', style ).
          appendTo( 'body' );
      };
      restore = function (){
        $target.remove();
      };
    }else{
      var tmp   = [];
      var style = '';
      var $hidden;
      fix = function (){
        $hidden = $target.parents().addBack().filter( ':hidden' );
        style   += 'visibility: hidden !important; display: block !important; ';
        if( configs.absolute === true ) style += 'position: absolute !important; ';
        $hidden.each( function (){
          var $this     = $( this );
          var thisStyle = $this.attr( 'style' );
          tmp.push( thisStyle );
          $this.attr( 'style', thisStyle ? thisStyle + ';' + style : style );
        });
      };
      restore = function (){
        $hidden.each( function ( i ){
          var $this = $( this );
          var _tmp  = tmp[ i ];
          if( _tmp === undefined ){
            $this.removeAttr( 'style' );
          }else{
            $this.attr( 'style', _tmp );
          }
        });
      };
    }
    fix();
    var actual = /(outer)/.test( method ) ?
      $target[ method ]( configs.includeMargin ) :
      $target[ method ]();
    restore();
    return actual;
  }
});
var arrInter = [];
var $Ul = $('.localPopup ul');
$('.localPopup .r a').live('click mouseover mouseleave',function(e){
	if(e.type == 'click'){
		var $li = $(this).parents('li');	
		if($(this).attr('data-id')){
			var file = myCookie('closeWea') || '';
			var file = file +','+$(this).attr('data-id');
			myCookie('closeWea',file,{expires:7,path: '/'})
		}else{
			var file = myCookie('closeWarn') || '';
			var file = file +','+ $li.find('span').children('a').attr('href').split('=')[1];
			myCookie('closeWarn',file,{expires:30,path: '/'})
		}
		$li.remove();		
	}else if(e.type == 'mouseover'){
		var bgId = $(this).parent('i').attr("data-id")
		$(this).css('background','url(&quot;http://i.tq121.com.cn/i/Popup/warn_'+bgId+'.png&quot;) repeat scroll -3px 110px rgba(0, 0, 0, 0);');
		$(this).css({backgroundImage:'url("http://i.tq121.com.cn/i/Popup/warn_'+bgId+'.png")',backgroundPosition:"-3px 110px"})
	}else{
		$(this).css('background','none');
	}
})
$('.localPopup span a').live('click',function(){
	var $li = $(this).parents('li');	
	if($(this).attr('data-id')){
		var file = myCookie('closeWea') || '';
		var file = file +','+$(this).attr('data-id');
		myCookie('closeWea',file,{expires:7,path: '/'})
	}else{
		var file = myCookie('closeWarn') || '';
		var file = file +','+ $(this).attr('href').split('=')[1];
		myCookie('closeWarn',file,{expires:30,path: '/'})
	}
	$li.remove();
})
//预警
var kindObj = {'01':'台风','02':'暴雨','03':'暴雪','04':'寒潮','05':'大风','06':'沙尘暴','07':'高温','08':'干旱','09':'雷电','10':'冰雹','11':'霜冻','12':'大雾','13':'霾','14':'道路结冰',
'91':'寒冷','92':'灰霾','93':'雷雨大风','94':'森林火险','95':'降温','96':'道路冰雪','97':'干热风','98':'低温','99':'冰冻'};
var gradeObj={'01':'蓝色','02':'黄色','03':'橙色','04':'红色','91':'白色'};
var $alarmUrl = "http://product.weather.com.cn/alarm/grepalarm_cn.php";
// var $alarmUrl = "http://10.14.85.90/data/Popup/grepalarm_cn.php";
// var $cInfoUrl = 'http://10.14.85.90/data/Popup/'+id+'.json'; 
function getInfo(){
	$Ul.empty();
	// $.ajax({ //ajax 周末天气
 //        "type": "GET",
 //        "url": $cInfoUrl,
 //        "dataType": "script",
 //        "cache":false,
 //        "async":false,     
 //        "success": function() {
 //        	var strCookie = myCookie('closeWea') || '';
	// 		var arrCookie = strCookie.split(",");
 //        	var li = '';
 //        	for(prop in popupInfo){
 //        		if(prop!='cityName'){
 //        			var al = 1;
 //        			for (var i = arrCookie.length - 1; i >= 0; i--) {
	//         			if(prop == arrCookie[i]) var al=0; 
	//         		}
	//         		if(al && popupInfo[prop].length!=0){
	//         			li += '<li><i class="l" style="background-image:url(&quot;http://i.tq121.com.cn/i/Popup/warn_10.png&quot;);"><img src="http://i.tq121.com.cn/i/english/weaIcon/white/'+popupInfo[prop][0]+'.png"></i><span style="background-image:url(&quot;http://i.tq121.com.cn/i/Popup/warn_10.png&quot;);"><a target="_blank" data-id="'+prop+'" href="http://www.weather.com.cn/weather/'+id+'.shtml">'+ popupInfo[prop][1] +'</a></span><i style="background-image:url(&quot;http://i.tq121.com.cn/i/Popup/warn_10.png&quot;);" class="r" data-id="10"><a data-id="'+prop+'"></a></i></li>';
	//         		}      	
 //        		}
 //        	}
 //        	$Ul.append(li).hide();       		
 //        }
 //    })    
    $.ajax({ //ajax 预警
        "type": "GET",
        "url": $alarmUrl,
        "dataType": "script",
        "cache":false,
        "async":false,      
        "success": function() {
            if (typeof id != 'undefined') {
                var localCityId = id.toString().substr(0,7);
				var localProId =  localCityId.substr(0,5);
				var strCookie = myCookie('closeWarn') || '';
				var arrCookie = strCookie.split(",");
				var li = '';
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
							li += '<li><i class="l" style="background-image:url(&quot;http://i.tq121.com.cn/i/Popup/warn_'+grade+'.png&quot;);"><img src="http://i.tq121.com.cn/i/Popup/warn.png"></i><span style="background-image:url(&quot;http://i.tq121.com.cn/i/Popup/warn_'+grade+'.png&quot;);"><a target="_blank" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file='+alarminfo.data[i][1]+'">'+ alarminfo.data[i][0] +'气象台发布'+ kindObj[kind] + gradeObj[grade] +'预警</a></span><i style="background-image:url(&quot;http://i.tq121.com.cn/i/Popup/warn_'+grade+'.png&quot;);" class="r" data-id="'+grade+'"><a></a></i></li>';	
						};
					}
				};
				$Ul.append(li);
				setLiWid();
            }
        }
    })
}getInfo();
setInterval(getInfo,1000*60);//ajax请求数据的时间间隔
function setLiWid(){
	for (var i = $Ul.children('li').length - 1; i >= 0; i--) {
		var $li = $Ul.children('li').eq(i);
		var liW = $li.children('span').actual('width')+160;
		var ml = $Ul.width()/2-liW/2;
		$li.css('marginLeft',ml+'px');
	};	
	$Ul.show();
}
//滚动
var grollIndex=0;
function groll(){
	if(navigator.appName=='Microsoft Internet Explorer' && navigator.appVersion.match(/7./i)=="7."){
		var h = 58;
	}else{
		var h = 55;
	}
	var n = $Ul.children('li').length;
	grollIndex++;
	if(grollIndex>=n) grollIndex=0;
	$Ul.animate({marginTop:-h*grollIndex+'px'},300);
}
$('.localPopup').hover(function(){
	clearInter(arrInter);
},function(){
	arrInter.push(setInterval(groll, 1000*5));
})
arrInter.push(setInterval(groll, 1000*5));
//clearInter
function clearInter(arrInter){
	for (var i = arrInter.length - 1; i >= 0; i--) {
		clearInterval(arrInter[i]);
	}
}	
