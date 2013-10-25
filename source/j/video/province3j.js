define(function(require,exports,module){
var province = province || {};
	province.provinceid = null;
	province.cityid = null;
	province.areaid = null;
	province.initprovince = function(obj){
		$(obj).click(function(){
		province.cityid = null;
		province.areaid = null;
		$(obj).next().find("b").html("选择市").attr("data-role","0");
		if($(this).find(".provinceItem").is(":visible")){
			$(this).find(".provinceItem").hide();
			return;
		}
		if($(this).find(".provinceItem a").length > 0){
			$(this).find(".provinceItem").show();
			return;
		}
		$.ajax({
			type:'GET',
            url: "/data/city3jdata/china.html",
            cache: true,
			dataType:'json',
            success: function (data) {
				var temp_Item = "";
				$.each(data,function(k,v){
					temp_Item+="<a href=\"javascript:void(0);\" data-role=\""+k+"\" target=\"_self\">"+v+"</a>";
				})
				$(obj).find(".provinceItem").html(temp_Item).show();
			}
		})
		})
	};
	province.initCity = function(el){
		$(el).live("click",function(){
		$(this).parent().prev().html($(this).html());
		$(this).parent().hide();
		province.provinceid = $(this).attr("data-role"),
			temp_Item = "";
		$.ajax({
			type:'GET',
            url: "/data/city3jdata/provshi/"+province.provinceid+".html",
            cache: true,
			dataType:'json',
            success: function (data) {
				var temp_Item = "";
				$.each(data,function(k,v){
					temp_Item+="<a href=\"javascript:void(0);\" data-role=\""+k+"\" target=\"_self\">"+v+"</a>";
				})
				$(el).parent().parent().next().find(".cityItem").html(temp_Item);
			}
		})
	})
	};
	province.showCity = function(obj){
		$(obj).click(function(){
		if($(this).find(".cityItem").is(":visible")){
			$(this).find(".cityItem").hide();
			return;
		}
		$(this).find(".cityItem").show();
	})
	};
	province.initArea = function(el){
		$(el).live("click",function(){
		$(this).parent().prev().html($(this).html());
		province.cityid = $(this).attr("data-role");
		$.ajax({
			type:'GET',
            url: "/data/city3jdata/station/"+province.provinceid+province.cityid+".html",
            cache: true,
			dataType:'json',
            success: function (data) {
				var temp_Item = "";
				$.each(data,function(k,v){
					temp_Item+="<a href=\"javascript:void(0);\" data-role=\""+k+"\" target=\"_self\">"+v+"</a>";
				})
				$(el).parent().parent().next().find(".areaItem").html(temp_Item);
			}
		})
		$(this).parent().prev().attr("data-role",$(this).attr("data-role"));
		$(this).parent().hide();
		})
	};
	province.showArea = function(obj){
		$(obj).live("click",function(){
		if($(this).find(".areaItem").is(":visible")){
			$(this).find(".areaItem").hide();
			return;
		}
		$(this).find(".areaItem").show();
		})
	};
	province.setArea = function(el){
		$(el).live("click",function(){
			province.areaid = $(this).attr("data-role");
			$(this).parent().prev().html($(this).html());
			$(this).parent().prev().attr("data-role",$(this).attr("data-role"));
			$(this).parent().find(".areaItem").hide();
		})
	};
	province.cityID = function(){
		var provid = province.provinceid;
		if (provid=='10101' || provid=='10102' || provid=='10103' || provid=='10104')
	       return provid+province.areaid+province.cityid;
		else
			return provid+province.cityid+province.areaid;
		}

	module.exports = province;
})