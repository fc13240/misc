!function() {
    function lload(f) {
        document.readyState == "complete" ? f() : setTimeout(f, 10);
    }
    document.write('<script type="text/javascript" id="g78191"></script>'), lload(function() {
        var g1 = document.getElementById(""), g0 = document.createElement("iframe"), g = document.getElementById("g78191");
        g0.style.zIndex = 99999, g0.style.width = "220px", g0.style.height = "200px", g0.style.border = "0", g0.frameBorder = "0", g0.allowTransparency = !0, g0.scrolling = "no", g0.src = "http://ext.weather.com.cn/78191.html", g1 ? g1.appendChild(g0) : g.parentNode.insertBefore(g0, g);
        var s1 = document.createElement("script");
        s1.type = "text/javascript", s1.src = "http://cfps.cw.china-netwave.com/ashx/GetPutWay.ashx?lid=16&width=320&height=250&divId=20130927112831582&domain=ljy.weather.com.cn&pluginid=78191", g1 ? g1.appendChild(s1) : g.parentNode.insertBefore(s1, g);
        var s2 = document.createElement("script");
        s2.type = "text/javascript", s2.src = "http://cfps.cw.china-netwave.com/ashx/GetPutWay.ashx?lid=52&width=360&height=300&divId=20130927112831582&domain=ljy.weather.com.cn&pluginid=78191", g1 ? g1.appendChild(s2) : g.parentNode.insertBefore(s2, g);
    });
}();