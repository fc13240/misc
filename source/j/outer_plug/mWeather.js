$(function() {
	//getJson数据 城市天气信息
    function _getJson(cityid) {
		// var url="http://www.weather.com.cn/data/cityinfo/"+cityid+".html";
        var url = "data/" + cityid + ".html";
        $.getJSON(url,
        function(data) {
            var aLink = "http://www1.weather.com.cn/weather/" + data.weatherinfo.cityid + ".shtml";
            $("#selected a").attr("href", aLink).html(data.weatherinfo.city),
            $(".topsaetitle .span01 a").attr("href", aLink).children("img").attr("src", "http://i.tq121.com.cn/i/outer_plug/blue_30/" + data.weatherinfo.img1.substring(0, data.weatherinfo.img1.indexOf(".gif")) + ".png"),
            fixPng(),
            $(".topsaetitle .span02 a").attr("href", aLink).html(data.weatherinfo.temp1 + "~" + data.weatherinfo.temp2);
        });
    }_getJson(101010100);
	//ie6下png透明背景bug处理
    function fixPng() {
        var arVersion = navigator.appVersion.split("MSIE"),
        version = parseFloat(arVersion[1]);
        if (version >= 5.5 && version < 7 && document.body.filters) for (var i = 0; i < document.images.length; i++) {
            var img = document.images[i],
            imgName = img.src.toUpperCase();
            if (imgName.indexOf(".PNG") > 0) {
                var width = img.width,
                height = img.height,
                sizingMethod = img.className.toLowerCase().indexOf("scale") >= 0 ? "scale": "image";
                img.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.src.replace("%23", "%2523").replace("'", "%27") + "', sizingMethod='" + sizingMethod + "')",
                img.src = "http://i.tq121.com.cn/i/english/home/blank.gif",
                img.width = width,
                img.height = height;
            }
        }
    }
	//预警
    $yjlb = ["台风", "暴雨", "暴雪", "寒潮", "大风", "沙尘暴", "高温", "干旱", "雷电", "冰雹", "霜冻", "大雾", "霾", "道路结冰"],
    $gdlb = ["寒冷", "灰霾", "雷雨大风", "森林火险", "降温", "道路冰雪", "干热风", "低温", "冰冻"],
    $yjyc = ["蓝色", "黄色", "橙色", "红色"],
    $gdyc = ["白色"],
    $ifurl = "http://product.weather.com.cn/alarm/newIndexalarm.php",
    $.ajax({
        "type": "GET",
        "url": $ifurl,
        "dataType": "script",
        "cache": !1,
        "async": !1,
        "success": function() {
			      $("#count").html("<a href='http://www.weather.com.cn/alarm/newalarmlist.shtml' target='_blank'>正在预警中" + alarminfo.count + "个</a>");
            if (alarminfo.gj.length > 0 || alarminfo.pr.length > 0) {
                $alarm = $("#alarm"),
                $.each(alarminfo.gj,
                function(i, k) {
                    $('<a href="' + k.http + '" target="_blank" >中央气象台发布' + k.name + "</a>").appendTo($alarm);
                }),
                $.each(alarminfo.pr,
                function(i, k) {
                    $filename = k[1],
                    $pos = $filename.lastIndexOf("-"),
                    $lb = $filename.substr($pos + 1, 2),
                    $jb = $filename.substr($pos + 3, 2),
                    $img = $lb + $jb,
                    $textlb = $yjlb[parseInt($lb, 10) - 1],
                    $textyc = $yjyc[parseInt($jb, 10) - 1];
                    if ($lb > 90 || $jb > 90) $img = "0000";
                    $lb > 90 && ($textlb = $gdlb[parseInt($lb, 10) - 91]),
                    $jb > 90 && ($textyc = $gdyc[parseInt($jb, 10) - 91]),
                    $('<a target="_blank" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=' + $filename + '">' + k[0] + "气象台发布" + $textlb + $textyc + "预警</a>").appendTo($alarm);
                });
                
                var aPointer = 0;
                $("#alarm a:first").show();
                function _showA() {
                    $("#alarm a").length > 1 && (aPointer++, aPointer = aPointer >= $("#alarm a").length ? 0 : aPointer, $("#alarm").children("a").hide().eq(aPointer).fadeIn());
                }
                setInterval(_showA, 2e3);
            }else{
              $alarm = $("#alarm").html('无预警信息')
            }
        }
    }),
	//城市下拉框
    $("#select_area").hover(function() {
        $("#select_main").show();
    },
    function() {
        $("#select_main").hide();
    }),
    $("#select_main").hover(function() {
        $(this).show();
    },
    function() {
        $(this).hide();
    }),
	//选择城市 点击显示该城市天气
    $("#select_main a").hover(function() {
        $(this).addClass("active").siblings().removeClass("active");
    }).click(function() {
        var data_id = $(this).attr("data-id");
        _getJson(data_id);
        $("#select_main").hide();
    })
    
});