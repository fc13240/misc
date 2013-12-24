define(function(require){
	var province = [{"id":"10122","p":"安徽","n":"ah"},{"id":"10101","p":"北京","n":"bj"},{"id":"10104","p":"重庆","n":"cq"},{"id":"10123","p":"福建","n":"fj"},{"id":"10116","p":"甘肃","n":"gs"},{"id":"10128","p":"广东","n":"gd"},{"id":"10130","p":"广西","n":"gx"},{"id":"10126","p":"贵州","n":"gz"},{"id":"10131","p":"海南","n":"hainan"},{"id":"10109","p":"河北","n":"hebei"},{"id":"10105","p":"黑龙江","n":"hlj"},{"id":"10118","p":"河南","n":"henan"},{"id":"10120","p":"湖北","n":"hubei"},{"id":"10125","p":"湖南","n":"hunan"},{"id":"10119","p":"江苏","n":"js"},{"id":"10124","p":"江西","n":"jx"},{"id":"10106","p":"吉林","n":"jl"},{"id":"10107","p":"辽宁","n":"ln"},{"id":"10133","p":"澳门","n":"mo"},{"id":"10108","p":"内蒙古","n":"nmg"},{"id":"10117","p":"宁夏","n":"nx"},{"id":"10115","p":"青海","n":"qh"},{"id":"10112","p":"山东","n":"sd"},{"id":"10102","p":"上海","n":"sh"},{"id":"10110","p":"山西","n":"shanxi"},{"id":"10111","p":"陕西","n":"shaanxi"},{"id":"10127","p":"四川","n":"sc"},{"id":"10103","p":"天津","n":"tj"},{"id":"10113","p":"新疆","n":"xj"},{"id":"10114","p":"西藏","n":"xz"},{"id":"10129","p":"云南","n":"yn"},{"id":"10121","p":"浙江","n":"zj"},{"id":"10132","p":"香港","n":"xg","u":"http://www.weather.com.cn/html/province/xianggang.shtml"},{"id":"10134","p":"台湾","n":"tw","u":"http://www.weather.com.cn/html/province/taiwan.shtml"}];
//日期
/*
	(function(){
var lunarInfo = new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
		//传回农历 y年的总天数
function lYearDays(y) {
   var i, sum = 348
   for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0
   return(sum+leapDays(y))
}
 //传回农历 y年闰月的天数
function leapDays(y) {
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29)
   else return(0)
}
//传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf)
}
//传回农历 y年m月的总天数
function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )
}
//算出农历, 传入日期物件, 传回农历日期物件
//该物件属性有 .year .month .day .isleap .yearcyl .daycyl .moncyl
function Lunar(objDate) {

   var i, leap=0, temp=0
   var baseDate = new Date(1900,0,31)
   var offset   = (objDate - baseDate)/86400000

   this.dayCyl = offset + 40
   this.monCyl = 14

   for(i=1900; i<2050 && offset>0; i++) {
      temp = lYearDays(i)
      offset -= temp
      this.monCyl += 12
   }

   if(offset<0) {
      offset += temp;
      i--;
      this.monCyl -= 12
   }

   this.year = i
   this.yearCyl = i-1864

   leap = leapMonth(i)//闰哪个月
   this.isLeap = false

   for(i=1; i<13 && offset>0; i++) {
   ////闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }
		 //解除闰月

      if(this.isLeap==true && i==(leap+1)) this.isLeap = false

      offset -= temp
      if(this.isLeap == false) this.monCyl ++
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; --this.monCyl;}

   if(offset<0){ offset += temp; --i; --this.monCyl; }

   this.month = i
   this.day = offset + 1
  }
		var myDate = new Date(),
		Year = myDate.getFullYear()+"年",
		Month = (myDate.getMonth()+1)+"月",
		Day = myDate.getDate()+"日",
		Week = myDate.getDay(),
		currDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate()),
		lDObj = new Lunar(currDate);
		switch(Week){
			case 0:
				Week = "星期天";
				break;
			case 1:
				Week = "星期一";
				break;
			case 2:
				Week = "星期二";
				break;
			case 3:
				Week = "星期三";
				break;
			case 4:
				Week = "星期四";
				break;
			case 5:
				Week = "星期五";
				break;
			case 6:
				Week = "星期六";
				break;
		}
		$("#time").html(Year+Month+Day+'&nbsp;&nbsp;'+Week+'&nbsp;&nbsp;农历'+(lDObj.isLeap?'闰 ':' ')+lDObj.month+' 月 '+lDObj.day+' 日');
			})()
*/
//<!--#config timefmt="%Y-%m-%d-%w"-->
//var curtime='<!--#echo var="DATE_LOCAL"-->';
//var d=curtime.split("-");
//var yn=d[0];
//var mn=d[1];
//var dn=d[2];
//var wn=d[3];


var dddate = new Date();
var yn=dddate.getFullYear();
var mn=dddate.getMonth() + 1;
var dn=dddate.getDate();
var wn=dddate.getDay();


var Calendar = (function(){   
    var CalendarData = new Array(100);   
    var madd = new Array(12);   
    var tgString = "甲乙丙丁戊己庚辛壬癸";   
    var dzString = "子丑寅卯辰巳午未申酉戌亥";   
    var numString = "一二三四五六七八九十";   
    var monString = "正二三四五六七八九十冬腊";   
    var weekString = "日一二三四五六";   
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";   
    var cYear, cMonth, cDay, TheDate;   
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);   
    madd[0] = 0;   
    madd[1] = 31;   
    madd[2] = 59;   
    madd[3] = 90;   
    madd[4] = 120;   
    madd[5] = 151;   
    madd[6] = 181;   
    madd[7] = 212;   
    madd[8] = 243;   
    madd[9] = 273;   
    madd[10] = 304;   
    madd[11] = 334;   
    function GetBit(m, n) {   
        return (m >> n) & 1;   
    }   
    function e2c() {   
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);   
        var total, m, n, k;   
        var isEnd = false;   
        var tmp = TheDate.getFullYear();   
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;   
        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {   
            total++;   
        }   
        for (m = 0;; m++) {   
            k = (CalendarData[m] < 0xfff) ? 11 : 12;   
            for (n = k; n >= 0; n--) {   
                if (total <= 29 + GetBit(CalendarData[m], n)) {   
                    isEnd = true;   
                    break;   
                }   
                total = total - 29 - GetBit(CalendarData[m], n);   
            }   
            if (isEnd) break;   
        }   
        cYear = 1921 + m;   
        cMonth = k - n + 1;   
        cDay = total;   
        if (k == 12) {   
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {   
                cMonth = 1 - cMonth;   
            }   
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {   
                cMonth--;   
            }   
        }   
    }   
    function GetcDateString() {   
        var tmp = "";   
        tmp += tgString.charAt((cYear - 4) % 10);   
        tmp += dzString.charAt((cYear - 4) % 12);   
        tmp += "年 ";   
        if (cMonth < 1) {   
            tmp += "(闰)";   
            tmp += monString.charAt( - cMonth - 1);   
        } else {   
            tmp += monString.charAt(cMonth - 1);   
        }   
        tmp += "月";   
        tmp += (cDay < 11) ? "初": ((cDay < 20) ? "十": ((cDay < 30) ? "廿": "三十"));   
        if (cDay % 10 != 0 || cDay == 10) {   
            tmp += numString.charAt((cDay - 1) % 10);   
        }   
        return tmp;   
    }   
    function GetLunarDay(solarYear, solarMonth, solarDay) {   
        if (solarYear < 1921 || solarYear > 2020) {   
            return "";   
        } else {   
		var aaa=parseInt(solarMonth);
		if(aaa==0){solarMonth=solarMonth.substring(1);}
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;   
            e2c(solarYear, solarMonth, solarDay);   
            return GetcDateString();   
        }   
    }   
    function CAL() {   
        //var D = new Date();   
        var yy = yn;//D.getFullYear();   
        var mm = mn;//D.getMonth();   
        var dd = dn;//D.getDate();   
        var ww = wn;//D.getDay();   
        //var ss = parseInt(D.getTime() / 1000);   
        var week = ["日","一","二","三","四","五","六"];   
        var date = yy + "年" + mm + "月" + dd + "日 星期" + week[ww] + "  ";   
        return date + GetLunarDay(yy, mm, dd);   
    }   
    return{   
        show:CAL   
    }   
})();
var timestr=Calendar.show();
$("#time").html(timestr);

	
	//简体、繁体转换
	require.async("http://www.weather.com.cn/m2/j/public/dltotw.js",function(){
		$("#dl_tw").click(function(){
			StranBodyc();
			return false;
		})
	})
	//显示省级站
	$("#provice").click(function(){
		$(".provinceLinks").animate({ height: 'toggle'}, "normal");
	})
	//显示移动客户端
	$("#toolBar b").click(function(){
		$(".app").animate({height:'toggle'},"normal");
	})
	//收藏脚本
	$("#collect").click(function(){
		try {
           typeof window.sidebar == "object" && typeof window.sidebar.addPanel == "function" ? window.sidebar.addPanel("中国天气", "http://www.weather.com.cn", "中国天气") : typeof window.external.msAddSiteMode != "undefined" ? window.external.msAddSiteMode() : window.external.AddFavorite("http://www.weather.com.cn", "中国天气")
        } catch (a) { }
        return !1
	})
	//设为首页
	$("#setIndex").click(function(){
		try{
          this.style.behavior='url(#default#homepage)';this.setHomePage("http://www.weather.com.cn");
        }
        catch(e){
          if(window.netscape) {
                try {
                   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                 }
                catch (e) {
                   alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                }
               var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
               prefs.setCharPref('browser.startup.homepage',"http://www.weather.com.cn");
        }
        }
	})
	//快速入口脚本
	if($(window).width() <= 1130){
		$(".icons").hide();	
		$(".entrance").show();
	}
	$(window).resize(function(){
		if($(this).width() <= 1130){
			$(".entrance").show();
			if($(".entrance").hasClass("open")){
				$(".icons").css({"marginRight":-($(window).scrollLeft()+$(window).width()/2),"top":($(window).scrollTop()+$(window).height()-($(".icons li").length*75)-40)});	
			}
			else{
				$(".icons").hide();
			}
		}
		else{
			$(".entrance").removeClass("open").hide();
			$(".icons").css({"marginRight":"-565px","top":($(window).scrollTop()+$(window).height()-($(".icons li").length*75)-40)}).show();
		}
	
	})
	$(window).scroll(function(){
		if($(".entrance").hasClass("open")){
			$(".icons").css({"marginRight":-($(window).scrollLeft()+$(window).width()/2),"top":($(window).scrollTop()+$(window).height()-($(".icons li").length*75)-40)});
		}
		else{
			$(".icons").css({"marginRight":"-565px","top":($(window).scrollTop()+$(window).height()-($(".icons li").length*75)-40)});
		}
	})
	$(".entrance").click(function(){
		if($(".entrance").hasClass("open")){
			$(this).removeClass("open");
			$(".icons").css({"marginRight":"-565px"}).hide();
		}
		else{
			$(this).addClass("open");
			$(".icons").css({"marginRight":-($(window).width()/2+$(window).scrollLeft()),"top":($(window).scrollTop()+$(window).height()-($(".icons li").length*75)-115)}).show();

		}
	})
	//回到首页
	$(".toTop").click(function () { $("html,body").animate({ scrollTop: 0 }, 800); return !1 });
	//城市id
	var provinceid = cityid.substring(0,5),
		provinceItem;
	$.each(province,function(i,o){
		if(o.id == provinceid){
			provinceItem = o;
			return false;
		}
	})
	$(".icons .province").addClass(provinceItem.n);
	if(provinceItem.id == "10132" || provinceItem.id =="10134")
		$(".icons .province").html("<a href=\""+provinceItem.u+"\" target=\"_blank\">"+provinceItem.p+"首页</a>");
	else{
		if(provinceItem.p.length > 2)
			$(".icons .province").html("<a href=\"http://"+provinceItem.n+".weather.com.cn\" target=\"_blank\" style=\"font-size:12px;\">"+provinceItem.p+"首页</a>");
		else
			$(".icons .province").html("<a href=\"http://"+provinceItem.n+".weather.com.cn\" target=\"_blank\">"+provinceItem.p+"首页</a>");
	}
	
})