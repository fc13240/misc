 //指数种类初始化
 define(function(require){
 	var zsColor = require('./color');
 	var province = require('./province');
	 //var zstype="";
	 //var cityid="";
	var url = window.location.href;
	var urlitems = url.split("/");
	var zstype = urlitems[urlitems.length - 2];
	var cityid = urlitems[urlitems.length - 1].substring(0, 9);
	 //var zstype = "ct",
	 //cityid = "101010100";

	 //初始化color
	var color;
	$.each(zsColor, function(i, o) {
		if (o.zstype == zstype) {
			color = o.color;
			return false;
		}
	})



	if (zstype != "ct" && zstype != "gz") {
		$("#forecast h3 span").hide();
	} else {
		$("#forecast h3 span").show();
	}

	var provinceid = cityid.substring(0, 5),
		provinceItem;
	$.each(province, function(i, o) {
		if (o.id == provinceid) {
			provinceItem = o;
			return false;
		}
	});
	return {
		zstype: zstype,
		cityid: cityid,
		color: color,
		provinceItem: provinceItem
	}
 });