// JavaScript Document
define(function(require){
    require('jquery');

$(function(){    
    function MM_jumpMenu(targ, selObj, restore) {
        eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'"), restore && (selObj.selectedIndex = 0);
    }

    var weather = weather || {};

    weather.ZS = function(obj) {
        this.Container = obj.Container, this.mask = obj.mask, this.height = obj.height;
    }, weather.ZS.prototype = {
        "ItemAnimate": function(old, current) {
            var temp = $(this.Container + ":eq(" + current + ")" + " " + this.mask);
            temp.children().last().insertBefore(temp.children().eq(0)), temp.css("top", "-" + this.height + "px"), temp.stop().animate({
                "top": "0px"
            }, 500);
            if (old != -1) {
                var tempOld = $(this.Container + ":eq(" + old + ")" + " " + this.mask);
                tempOld.children().last().insertBefore(tempOld.children().eq(0)), tempOld.css("top", "-" + this.height + "px"), tempOld.stop().animate({
                    "top": "0px"
                }, 500);
            }
        }
    };

    var weather_ZS_Manager = {
        "old_index": 0,
        "current_index": 0,
        "zs": null,
        "height": 0,
        "timer": null,
        "length": 0,
        "init": function(obj) {
            this.height = $(obj.Container + ":eq(0)").height(), this.zs = new weather.ZS({
                "Container": obj.Container,
                "mask": obj.mask,
                "height": weather_ZS_Manager.height
            }), this.length = $(obj.Container).length, weather_ZS_Manager.zs.ItemAnimate(-1, weather_ZS_Manager.current_index), weather_ZS_Manager.timer = setInterval(function() {
                weather_ZS_Manager.Animate();
            }, 3e3), $(obj.Container).hover(function() {
                clearInterval(weather_ZS_Manager.timer);
                if (weather_ZS_Manager.current_index === $(obj.Container).index($(this)[0])) return;
                weather_ZS_Manager.current_index = $(obj.Container).index($(this)[0]), weather_ZS_Manager.zs.ItemAnimate(weather_ZS_Manager.old_index, weather_ZS_Manager.current_index), weather_ZS_Manager.old_index = weather_ZS_Manager.current_index;
            }, function() {
                clearInterval(weather_ZS_Manager.timer), weather_ZS_Manager.timer = setInterval(function() {
                    weather_ZS_Manager.Animate();
                }, 3e3);
            });
        },
        "Animate": function() {
            while (weather_ZS_Manager.current_index === weather_ZS_Manager.old_index) weather_ZS_Manager.current_index = parseInt(Math.random() * weather_ZS_Manager.length);
            weather_ZS_Manager.zs.ItemAnimate(weather_ZS_Manager.old_index, weather_ZS_Manager.current_index), weather_ZS_Manager.old_index = weather_ZS_Manager.current_index;
        },
        "Stop": function() {
            clearInterval(weather_ZS_Manager.timer), weather_ZS_Manager.zs.ItemAnimate(-1, weather_ZS_Manager.old_index), weather_ZS_Manager.old_index = null, weather_ZS_Manager.current_index = null;
        }
    };

    $(document).ready(function() {
        var otherZS = [ {
            "name": "逛街指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/4.jpg"
        }, {
            "name": "美发指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/8.jpg"
        }, {
            "name": "雨伞指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/9.jpg"
        }, {
            "name": "交通指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/10.jpg"
        }, {
            "name": "路况指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/11.jpg"
        }, {
            "name": "晨练指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/13.jpg"
        }, {
            "name": "钓鱼指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/14.jpg"
        }, {
            "name": "划船指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/15.jpg"
        }, {
            "name": "约会指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/16.jpg"
        }, {
            "name": "晾晒指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/17.jpg"
        }, {
            "name": "防晒指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/21.jpg"
        }, {
            "name": "过敏指数",
            "src": "http://www.weather.com.cn/m2/i/zs/zs_pic/19.jpg"
        } ], flag = !1;
        weather_ZS_Manager.init({
            "Container": "#zs0 ul li",
            "mask": ".area"
        }), $("#aboutZS h2 span a").click(function() {
            var zs = $("#aboutZS h2 span a").index(this);
            weather_ZS_Manager.Stop(), $("#aboutZS .zs").hide(), $("#aboutZS .zs").eq(zs).show(), !flag && zs == 1 && ($("#zs" + zs + " ul li").each(function(i) {
                $(this).find(".imgArea a").html('<img src="' + otherZS[i].src + '" alt="' + otherZS[i].name + '">');
            }), flag = !0), weather_ZS_Manager.init({
                "Container": "#zs" + zs + " ul li",
                "mask": ".area"
            }),$(this).addClass('on').siblings().removeClass('on');
        }), $(".RadarSatellit").find("li").mouseover(function() {
            var t0 = $(".RadarSatellit").find("li").index(this);
            return $(".RadarSatelliteim").hide(), $(".RadarSatelliteim").eq(t0).show(), $(".RadarSatellit").find("li").removeClass("moverad"), $(this).addClass("moverad"), !1;
        }), $("#hosSpotsNav").find("li").mouseover(function() {
            var ii = $("#hosSpotsNav").find("li").index(this);
            return $("#hosSpotsNav").find("li").removeClass("move"), $(this).addClass("move"), $(".hotSpotsBox").hide(), $(".hotSpotsBox").eq(ii).show(), !1;
        }), $(".sugg_tan").find("li").click(function() {
            var sug = $(".sugg_tan").find("li").index(this);
            return $(".sugg_tan .sugg_show").hide(), $(".sugg_tan .sugg_show").eq(sug).show(), $(".sugg_tan").find("li").removeClass("move"), $(this).addClass("move"), !1;
        }), $(".RadarSatellit").find("li").eq(0).trigger("mouseover"), $(".lifeTravel div").eq(0).show(), $("#lifeTravelNav").children("li").mouseover(function() {
            var n = $("#lifeTravelNav").children("li").index(this);
            $("#lifeTravelNav").children("li").removeClass("move"), $(this).addClass("move"), $(".lifeTravel div").hide(), $(".lifeTravel div").eq(n).show();
        }), $URL = window.location.href, $("#weatherClickYubao").toggle(function() {
            return $("#weatherYubao2").slideDown(), $(this).html("关闭未来4-7天天气预报"), !1;
        }, function() {
            return $("#weatherYubao2").slideUp(), $(this).html("查看未来4-7天天气预报"), !1;
        }), $URL.indexOf("7d") > -1 && $("#weatherClickYubao").trigger("click");
    });
})
})