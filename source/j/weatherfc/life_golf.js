define(function(){
	var golfData = [{"province":"选择省","city":[{"cityname":"选择市","list":[{"golf":"全部","code":"beijing"}]}]},{"province":"北京","city":[{"cityname":"北京","list":[{"golf":"全部","code":"beijing"},{"golf":"北京燕子口国际高尔夫俱乐部","code":"G0001"},{"golf":"北京华彬高尔夫俱乐部球场","code":"G0002"},{"golf":"北京顺峰乡村高尔夫俱乐部","code":"G0003"},{"golf":"北京太伟高尔夫球会","code":"G0004"},{"golf":"北京国际高尔夫俱乐部","code":"G0005"},{"golf":"北京丽宫体育公园","code":"G0006"},{"golf":"北京天竺高尔夫俱乐部球场","code":"G0007"},{"golf":"北京黄港国际高尔夫俱乐部球场","code":"G0008"},{"golf":"北京高尔夫球俱乐部球场","code":"G0009"},{"golf":"北京东方明珠乡村高尔夫俱乐部","code":"G0010"},{"golf":"北京金世纪国际高尔夫球俱乐部","code":"G0011"},{"golf":"北京加州水郡高尔夫俱乐部球场","code":"G0012"},{"golf":"北京尧上高尔夫俱乐部球场","code":"G0013"},{"golf":"北京长阳国际高尔夫俱乐部球场","code":"G0014"},{"golf":"北京京辉高尔夫俱乐部球场","code":"G0015"},{"golf":"北京鸿禧国际高尔夫俱乐部球场","code":"G0016"},{"golf":"北京大兴京城高尔夫俱乐部球场","code":"G0017"},{"golf":"北京龙熙温泉高尔夫俱乐部球场","code":"G0018"},{"golf":"北京宝兴高尔夫俱乐部球场","code":"G0019"},{"golf":"北京银泰鸿业高尔夫俱乐部","code":"G0020"},{"golf":"北京月亮河高尔夫休闲俱乐部","code":"G0021"},{"golf":"北京人济山庄高尔夫俱乐部","code":"G0022"},{"golf":"北京君山高尔夫俱乐部","code":"G0023"},{"golf":"北京朝阳广济堂高尔夫俱乐部","code":"G0024"},{"golf":"北京CBD国际高尔夫俱乐部球场","code":"G0025"},{"golf":"北京金色河畔高尔夫俱乐部球场","code":"G0026"},{"golf":"北京北辰高尔夫俱乐部球场","code":"G0027"},{"golf":"北京天安假日高尔夫俱乐部球场","code":"undefined"},{"golf":"西山阳光高尔夫练习场","code":"G0029"},{"golf":"北京燕西高尔夫俱乐部","code":"G0030"},{"golf":"北京香山国际高尔夫球会","code":"G0031"},{"golf":"北京万柳高尔夫俱乐部球场","code":"G0032"},{"golf":"北京天一高尔夫俱乐部","code":"G0033"}]}]},{"province":"上海","city":[{"cityname":"上海","list":[{"golf":"全部","code":"shanghai"},{"golf":"上海滨海高尔夫俱乐部","code":"G0059"},{"golf":"汤臣上海浦东高尔夫俱乐部","code":"G0060"},{"golf":"上海中港高尔夫俱乐部","code":"G0061"},{"golf":"上海大都会高尔夫俱乐部球场","code":"G0062"},{"golf":"上海高尔夫俱乐部","code":"G0063"}]}]},{"province":"天津","city":[{"cityname":"天津","list":[{"golf":"全部","code":"tianjin"},{"golf":"天津国际温泉高尔夫俱乐部","code":"G0034"},{"golf":"天津杨柳青高尔夫俱乐部","code":"G0035"},{"golf":"天津龙海国际高尔夫","code":"G0036"},{"golf":"滨海森林高尔夫俱乐部","code":"G0037"},{"golf":"天津华纳高尔夫俱乐部","code":"G0038"}]}]},{"province":"重庆","city":[{"cityname":"重庆","list":[{"golf":"全部","code":"chongqing"},{"golf":"重庆保利高尔夫球会","code":"G0152"},{"golf":"重庆上邦高尔夫球场","code":"G0153"},{"golf":"重庆红鼎高尔夫球会","code":"G0154"},{"golf":"重庆国际高尔夫俱乐部","code":"G0155"},{"golf":"成都麓山国际高尔夫俱乐部","code":"G0156"},{"golf":"四川成都国际高尔夫俱乐部","code":"G0157"}]}]},{"province":"河北","city":[{"cityname":"唐山","list":[{"golf":"全部","code":"tangshan"},{"golf":"唐山南湖国际高尔夫俱乐部球场","code":"G0039"}]},{"cityname":"石家庄","list":[{"golf":"全部","code":"shijiazhuang"},{"golf":"石家庄世纪高尔夫俱乐部","code":"G0040"}]},{"cityname":"秦皇岛","list":[{"golf":"全部","code":"qinhuangdao"},{"golf":"秦皇岛黄金海岸海滨俱乐部","code":"G0041"}]}]},{"province":"山西","city":[{"cityname":"太原","list":[{"golf":"全部","code":"taiyuan"},{"golf":"山西太原辰憬高尔夫俱乐部","code":"G0042"}]}]},{"province":"内蒙古","city":[{"cityname":"呼和浩特","list":[{"golf":"全部","code":"huhehaote"},{"golf":"内蒙古大青山太伟高尔夫俱乐部","code":"G0044"}]},{"cityname":"乌拉特前旗","list":[{"golf":"全部","code":"wulateqianqi"},{"golf":"内蒙古维信高尔夫俱乐部球场","code":"G0043"}]}]},{"province":"辽宁","city":[{"cityname":"沈阳","list":[{"golf":"全部","code":"shenyang"},{"golf":"沈阳陨石山高尔夫度假村","code":"G0046"},{"golf":"沈阳美兰湖乡村俱乐部","code":"G0047"},{"golf":"沈阳沈水湾高尔夫俱乐部","code":"G0048"},{"golf":"沈阳盛京国际高尔夫俱乐部","code":"G0049"},{"golf":"沈阳江南国际高尔夫俱乐部","code":"G0050"}]},{"cityname":"大连","list":[{"golf":"全部","code":"dalian"},{"golf":"大连高尔夫俱乐部","code":"G0052"},{"golf":"大连金石高尔夫俱乐部","code":"G0053"},{"golf":"东方(大连)高尔夫俱乐部","code":"G0054"},{"golf":"大连湾山高尔夫俱乐部","code":"G0055"},{"golf":"辽宁大连西郊高尔夫乡村俱乐部","code":"G0056"}]},{"cityname":"丹东","list":[{"golf":"全部","code":"dandong"},{"golf":"丹东五龙国际高尔夫俱乐部","code":"G0051"}]},{"cityname":"铁岭","list":[{"golf":"全部","code":"tieling"},{"golf":"沈阳铁岭龙山高尔夫俱乐部","code":"G0045"}]}]},{"province":"吉林","city":[{"cityname":"长春  ","list":[{"golf":"全部","code":"changchun"},{"golf":"长春净月潭森林高尔夫俱乐部","code":"G0057"}]}]},{"province":"黑龙江","city":[{"cityname":"哈尔滨","list":[{"golf":"全部","code":"haerbin"},{"golf":"哈尔滨国际高尔夫俱乐部球场","code":"G0058"}]}]},{"province":"江苏","city":[{"cityname":"南京","list":[{"golf":"全部","code":"nanjing"},{"golf":"南京昭富国际高尔夫俱乐部","code":"G0064"},{"golf":"南京钟山国际高尔夫俱乐部","code":"G0065"},{"golf":"南京银杏湖国际高尔夫俱乐部","code":"G0066"}]},{"cityname":"苏州","list":[{"golf":"全部","code":"suzhou"},{"golf":"苏州太湖国际高尔夫俱乐部","code":"G0072"},{"golf":"苏州三阳高尔夫俱乐部球场","code":"G0073"},{"golf":"苏州中兴高尔夫俱乐部球场","code":"G0074"},{"golf":"苏州金鸡湖国际高尔夫俱乐部","code":"G0075"}]},{"cityname":"常州","list":[{"golf":"全部","code":"changzhou"},{"golf":"江苏常州香树湾高尔夫俱乐部","code":"G0067"}]},{"cityname":"昆山","list":[{"golf":"全部","code":"kunshan"},{"golf":"大上海国际高尔夫球度假村","code":"G0071"}]},{"cityname":"无锡","list":[{"golf":"全部","code":"wuxi"},{"golf":"江苏无锡太湖国际高尔夫俱乐部","code":"G0070"}]},{"cityname":"张家港","list":[{"golf":"全部","code":"zhangjiagang"},{"golf":"张家港双山高尔夫俱乐部球场","code":"G0069"}]},{"cityname":"溧阳","list":[{"golf":"全部","code":"liyang"},{"golf":"江苏天目湖乡村高尔夫俱乐部球场","code":"G0068"}]}]},{"province":"浙江","city":[{"cityname":"杭州","list":[{"golf":"全部","code":"hangzhou"},{"golf":"杭州西湖高尔夫乡村俱乐部","code":"G0077"}]},{"cityname":"温州","list":[{"golf":"全部","code":"wenzhou"},{"golf":"浙江温州东方高尔夫俱乐部","code":"G0079"}]},{"cityname":"绍兴","list":[{"golf":"全部","code":"shaoxing"},{"golf":"浙江绍兴鉴湖高尔夫俱乐部","code":"G0076"}]},{"cityname":"淳安","list":[{"golf":"全部","code":"chunan"},{"golf":"杭州千岛湖乡村俱乐部","code":"G0078"}]}]},{"province":"安徽","city":[{"cityname":"合肥","list":[{"golf":"全部","code":"hefei"},{"golf":"合肥元一国际高尔夫俱乐部","code":"G0080"}]},{"cityname":"宣城","list":[{"golf":"全部","code":"xuancheng"},{"golf":"宣城白马山庄高尔夫俱乐部","code":"G0082"}]},{"cityname":"黄山区","list":[{"golf":"全部","code":"huangshanqu"},{"golf":"黄山松柏高尔夫俱乐部","code":"G0081"}]}]},{"province":"福建","city":[{"cityname":"福州","list":[{"golf":"全部","code":"fuzhou"},{"golf":"福建福州登云高尔夫球场","code":"G0083"},{"golf":"福建温泉高尔夫俱乐部","code":"G0084"}]},{"cityname":"厦门","list":[{"golf":"全部","code":"beijing"}]},{"cityname":"泉州","list":[{"golf":"全部","code":"quanzhou"},{"golf":"福建泉州高尔夫俱乐部","code":"G0087"}]}]},{"province":"江西","city":[{"cityname":"南昌","list":[{"golf":"全部","code":"nanchang"},{"golf":"南昌铭雅欧洲高尔夫乡村俱乐部","code":"G0089"},{"golf":"南昌翠林高尔夫球会","code":"G0090"}]},{"cityname":"庐山","list":[{"golf":"全部","code":"lushan"},{"golf":"江西庐山国际高尔夫球会","code":"G0088"}]}]},{"province":"山东","city":[{"cityname":"济南","list":[{"golf":"全部","code":"jinan"},{"golf":"山东济南国科国际高尔夫俱乐部","code":"G0095"}]},{"cityname":"青岛","list":[{"golf":"全部","code":"qingdao"},{"golf":"青岛华山国际乡村高尔夫俱乐部","code":"G0096"},{"golf":"山东青岛国际高尔夫俱乐部球场","code":"G0097"},{"golf":"东方(青岛)高尔夫俱乐部","code":"G0098"}]},{"cityname":"烟台","list":[{"golf":"全部","code":"yantai"},{"golf":"山东烟台高尔夫俱乐部","code":"G0092"}]},{"cityname":"威海  ","list":[{"golf":"全部","code":"weihai"},{"golf":"山东威海泛华高尔夫俱乐部","code":"G0093"}]},{"cityname":"蓬莱 ","list":[{"golf":"全部","code":"penglai"},{"golf":"中粮君顶酒庄高尔夫俱乐部","code":"G0091"}]},{"cityname":"荣成 ","list":[{"golf":"全部","code":"rongcheng"},{"golf":"山东荣成市好当家高尔夫俱乐部","code":"G0094"}]}]},{"province":"河南","city":[{"cityname":"郑州","list":[{"golf":"全部","code":"zhengzhou"},{"golf":"河南思念高尔夫俱乐部","code":"G0099"},{"golf":"河南金沙湖高尔夫俱乐部球场","code":"G0100"}]}]},{"province":"湖北","city":[{"cityname":"武汉","list":[{"golf":"全部","code":"wuhan"},{"golf":"武汉天外天高尔夫乡村俱乐部","code":"G0101"},{"golf":"武汉东方国际高尔夫乡村俱乐部","code":"G0102"},{"golf":"武汉金银湖国际高尔夫俱乐部","code":"G0103"},{"golf":"武汉红莲湖高尔夫乡村俱乐部","code":"G0104"},{"golf":"湖北梁子湖高尔夫度假中心","code":"G0105"}]}]},{"province":"湖南","city":[{"cityname":"长沙","list":[{"golf":"全部","code":"changsha"},{"golf":"湖南龙湖国际高尔夫俱乐部","code":"G0106"},{"golf":"长沙青竹湖国际高尔夫球会","code":"G0107"},{"golf":"湖南清水湖高尔夫球会","code":"G0108"}]},{"cityname":"益阳","list":[{"golf":"全部","code":"yiyang"},{"golf":"湖南梓山湖国际高尔夫俱乐部","code":"G0109"}]},{"cityname":"常德","list":[{"golf":"全部","code":"beijing"}]}]},{"province":"广东","city":[{"cityname":"广州","list":[{"golf":"全部","code":"guangzhou"},{"golf":"广州九龙湖高尔夫球会","code":"G0115"},{"golf":"广东南湖高尔夫乡村俱乐部","code":"G0116"},{"golf":"广东南海高尔夫球会","code":"G0117"},{"golf":"广东紫云山高尔夫乡村俱乐部","code":"G0118"},{"golf":"广州宝巾高尔夫球乡村俱乐部","code":"G0119"}]},{"cityname":"深圳","list":[{"golf":"全部","code":"shenzhen"},{"golf":"深圳世纪海景高尔夫俱乐部","code":"G0123"},{"golf":"深圳市九龙山高尔夫乡村俱乐部","code":"G0124"},{"golf":"观澜湖世界杯球场","code":"G0125"},{"golf":"深圳云海谷高尔夫球场","code":"G0126"},{"golf":"深圳光明高尔夫球会","code":"G0127"}]},{"cityname":"珠海  ","list":[{"golf":"全部","code":"zhuhai"},{"golf":"珠海高尔夫俱乐部","code":"G0128"},{"golf":"珠海万盛乡村俱乐部","code":"G0129"},{"golf":"珠海金湾高尔夫球俱乐部","code":"G0130"},{"golf":"珠海翠湖高尔夫球会","code":"G0131"},{"golf":"广东珠海东方高尔夫俱乐部","code":"G0132"}]},{"cityname":"东莞  ","list":[{"golf":"全部","code":"dongguan"},{"golf":"东莞凤凰山高尔夫球场","code":"G0110"},{"golf":"东莞长安高尔夫球乡村俱乐部","code":"G0111"},{"golf":"广东东莞海逸高尔夫球会","code":"G0112"},{"golf":"中信常平高尔夫俱乐部","code":"G0113"},{"golf":"东莞峰景高尔夫球会","code":"G0114"}]},{"cityname":"汕头  ","list":[{"golf":"全部","code":"shantou"},{"golf":"广东金海湾国际高尔夫俱乐部","code":"G0120"}]},{"cityname":"中山 ","list":[{"golf":"全部","code":"zhongshan"},{"golf":"中山温泉高尔夫球会","code":"G0134"}]},{"cityname":"韶关 ","list":[{"golf":"全部","code":"shaoguan"},{"golf":"广东省韶关银山高尔夫俱乐部","code":"G0133"}]},{"cityname":"顺德 ","list":[{"golf":"全部","code":"shunde"},{"golf":"君兰国际高尔夫俱乐部","code":"G0122"}]},{"cityname":"佛山南海","list":[{"golf":"全部","code":"foshannanhai"},{"golf":"佛山高尔夫球乡村俱乐部","code":"G0121"}]}]},{"province":"广西","city":[{"cityname":"南宁","list":[{"golf":"全部","code":"nanning"},{"golf":"广西嘉和城温泉高尔夫球场","code":"G0138"},{"golf":"广西南宁青秀山高尔夫俱乐部","code":"G0139"}]},{"cityname":"桂林","list":[{"golf":"全部","code":"guilin"},{"golf":"广西桂林乐满地高尔夫俱乐部","code":"G0135"},{"golf":"广西桂林山水高尔夫俱乐部","code":"G0136"},{"golf":"广西桂林漓江高尔夫乡村俱乐部","code":"G0137"}]}]},{"province":"海南","city":[{"cityname":"海口","list":[{"golf":"全部","code":"haikou"},{"golf":"南丽湖高尔夫球会俱乐部","code":"G0140"},{"golf":"海南东山湖高尔夫俱乐部","code":"G0141"},{"golf":"海南月亮湾高尔夫球会","code":"G0142"},{"golf":"海南西海岸高尔夫球场","code":"G0143"},{"golf":"海南台达高尔夫球俱乐部","code":"G0144"}]},{"cityname":"三亚","list":[{"golf":"全部","code":"sanya"},{"golf":"海南清水湾高尔夫球会","code":"G0147"},{"golf":"三亚日出观光高尔夫球会","code":"G0148"},{"golf":"海南亚龙湾高尔夫球会","code":"G0149"},{"golf":"海南岛三亚国际高尔夫俱乐部","code":"G0150"},{"golf":"三亚甘什岭森林高尔夫俱乐部","code":"G0151"}]},{"cityname":"琼海","list":[{"golf":"全部","code":"qionghai"},{"golf":"博鳌高尔夫乡村俱乐部","code":"G0145"},{"golf":"博鳌亚洲论坛国际会议中心球会","code":"G0146"}]}]},{"province":"贵州","city":[{"cityname":"贵阳","list":[{"golf":"全部","code":"guiyang"},{"golf":"贵阳高尔夫度假中心","code":"G0158"}]}]},{"province":"云南","city":[{"cityname":"昆明","list":[{"golf":"全部","code":"kunming"},{"golf":"昆明阳光高尔夫球场","code":"G0159"},{"golf":"云南春城湖畔高尔夫度假村","code":"G0160"}]},{"cityname":"丽江 ","list":[{"golf":"全部","code":"lijiang"},{"golf":"云南丽江古城高尔夫俱乐部","code":"G0161"},{"golf":"玉龙雪山高尔夫俱乐部","code":"G0162"}]},{"cityname":"大理  ","list":[{"golf":"全部","code":"dali"},{"golf":"云南大理苍海高尔夫球会","code":"G0163"}]}]},{"province":"陕西","city":[{"cityname":"西安","list":[{"golf":"全部","code":"xian"},{"golf":"西安亚建国际高尔夫俱乐部","code":"G0165"},{"golf":"西安国际高尔夫俱乐部","code":"G0166"}]},{"cityname":"宝鸡 ","list":[{"golf":"全部","code":"baoji"},{"golf":"宝鸡都市高尔夫俱乐部","code":"G0164"}]}]},{"province":"宁夏","city":[{"cityname":"银川 ","list":[{"golf":"全部","code":"yinchuan"},{"golf":"银川黄河高尔夫俱乐部","code":"G0167"}]}]},{"province":"新疆","city":[{"cityname":"乌鲁木齐 ","list":[{"golf":"全部","code":"wulumuqi"},{"golf":"新疆雪莲山高尔夫俱乐部","code":"G0168"}]},{"cityname":"克拉玛依 ","list":[{"golf":"全部","code":"kelamayi"},{"golf":"克拉玛依大漠国际高尔夫俱乐部","code":"G0169"}]}]}];
	
	$("#golf .province").click(function(){
		if($(this).find(".provinceItem").is(":visible")){
			$(this).find(".provinceItem").hide();
			return;
		}
		if($(this).find(".provinceItem a").length > 0){
			$(this).find(".provinceItem").show();
			return;
		}
		var temp_Item = "";
		for(var i=0,ii=golfData.length;i<ii;i++){
			if(i != ii-1)
				temp_Item+="<a href=\"javascript:void(0);\" data-role=\""+i+"\" target=\"_self\">"+golfData[i].province+"</a>";
			else
				temp_Item+="<a class=\"noBorder\" href=\"javascript:void(0);\" data-role=\""+i+"\" target=\"_self\">"+golfData[i].province+"</a>";
		}
		$(this).find(".provinceItem").html(temp_Item).show();
	})
	$("#golf .provinceItem a").live("click",function(){
		$("#golf .province b").html($(this).html());
		$("#golf .provinceItem").hide();
		var index = $(this).attr("data-role"),
			temp_Item = "",
			temp_arr = golfData[index].city;
		for(var i=0,ii=temp_arr.length;i<ii;i++){
			if(i != ii-1)
				temp_Item+="<a href=\"javascript:void(0);\" data-role=\""+i+"\" target=\"_self\">"+temp_arr[i].cityname+"</a>";
			else
				temp_Item+="<a class=\"noBorder\" href=\"javascript:void(0);\" data-role=\""+i+"\" target=\"_self\">"+temp_arr[i].cityname+"</a>";
		}
		$("#golf .cityItem").html(temp_Item);
		$("#golf .province b").attr("data-role",index);
	})
	$("#golf .city").click(function(){
		if($("#golf .cityItem").is(":visible")){
			$("#golf .cityItem").hide();
			return;
		}
		$("#golf .cityItem").show();
	})
	$("#golf .cityItem a").live("click",function(){
		$("#golf .city b").html($(this).html());
		$("#golf .cityItem").hide();
		var provinceIndex = $("#golf .province b").attr("data-role"),
			cityIndex = $(this).attr("data-role"),
			temp_arr = golfData[provinceIndex].city[cityIndex].list,
			temp_Item = "";
		for(var i=0,ii=temp_arr.length;i<ii;i++){
			if(i == 0){
				$("#golf .golfname b").html(temp_arr[i].golf);
				$("#golf .golfname b").attr("data-role",temp_arr[i].code);
			}
			if(i != ii-1)
				temp_Item+="<a href=\"javascript:void(0);\" data-role=\""+temp_arr[i].code+"\" target=\"_self\">"+temp_arr[i].golf+"</a>";
			else
				temp_Item+="<a class=\"noBorder\" href=\"javascript:void(0);\" data-role=\""+temp_arr[i].code+"\" target=\"_self\">"+temp_arr[i].golf+"</a>";
		}
		$("#golf .golfItem").html(temp_Item);
	})
	$("#golf .golfname").click(function(){
		if($("#golf .golfItem").is(":visible")){
			$("#golf .golfItem").hide();
			return;
		}
		$("#golf .golfItem").show();
	})
	$("#golf .golfItem a").live("click",function(){
		$("#golf .golfname b").html($(this).html());
		$("#golf .golfname b").attr("data-role",$(this).attr("data-role"));
		$("#golf .golfItem").hide();
	})
	$("#golf .queryBtn").click(function(){
		var valueid = $("#golf .golfname b").attr("data-role");
		if(valueid==0){
			alert("请选择城市");
			return false;
		}
		window.open('http://www.weather.com.cn/html/life/golf/'+valueid+'.shtml');
	})
})