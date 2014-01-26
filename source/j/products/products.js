var Check=function(cruObj,btnObj){
	switch($(this).text()){
	
		//////////////////////////降水 begin
		case '降水':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国降水量预报图</a><a class='getText current' onClick=\'getSrc(\"JC_JSL_02405\")\'>全国降水量实况图</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国降水距平百分率</a>");break;
		
		case '全国降水量预报图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_072\")\'>全国72小时降水量预报</a>");break;
		case '全国降水量实况图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");	
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_10\")\'>全国近10天降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_20\")\'>全国近20天降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_30\")\'>全国近30天降水量实况</a>");break;
		case '全国降水距平百分率':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国10天降水距平</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL20\")\'>全国20天降水距平</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL30\")\'>全国30天降水距平</a>");break;

		case '全国24小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国降水量预报图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_072\")\'>全国72小时降水量预报</a>");break;
		case '全国48小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国降水量预报图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a><a class='getText current' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_072\")\'>全国72小时降水量预报</a>");break;
		case '全国72小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国降水量预报图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a><a class='getText current' onClick=\'getSrc(\"YB_JSL_072\")\'>全国72小时降水量预报</a>");break;

		case '全国近10天降水量实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>全国降水量实况图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_10\")\'>全国近10天降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_20\")\'>全国近20天降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_30\")\'>全国近30天降水量实况</a>");break;
		case '全国近20天降水量实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>全国降水量实况图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_JSL_10\")\'>全国近10天降水量实况</a><a class='getText current' onClick=\'getSrc(\"JC_JSL_20\")\'>全国近20天降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_30\")\'>全国近30天降水量实况</a>");break;
		case '全国近30天降水量实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>全国降水量实况图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_JSL_10\")\'>全国近10天降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_20\")\'>全国近20天降水量实况</a><a class='getText current' onClick=\'getSrc(\"JC_JSL_30\")\'>全国近30天降水量实况</a>");break;

		case '全国10天降水距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国降水距平百分率</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国10天降水距平</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL20\")\'>全国20天降水距平</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL30\")\'>全国30天降水距平</a>");break;
		case '全国20天降水距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国降水距平百分率</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国10天降水距平</a><a class='getText current' onClick=\'getSrc(\"JC_JSL_JPL20\")\'>全国20天降水距平</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL30\")\'>全国30天降水距平</a>");break;
		case '全国30天降水距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>降水</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国降水距平百分率</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国10天降水距平</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL20\")\'>全国20天降水距平</a><a class='getText current' onClick=\'getSrc(\"JC_JSL_JPL30\")\'>全国30天降水距平</a>");break;
		
		//////////////////////////气温 begin
		
		case '气温':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>全国最高气温分布图 </a><a class='getText' onClick=\'getSrc(\"JC_WDSK_DW_24\")\'>全国最低气温分布图</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国平均温度距平</a>");break;
		
		case '全国最高气温分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_ZG10\")\'>全国10天最高气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZG20\")\'>全国20天最高气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZG30\")\'>全国30天最高气温分布</a>");break;
		case '全国最低气温分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");	
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_ZD10\")\'>全国10天最低气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZD20\")\'>全国20天最低气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZD30\")\'>全国30天最低气温分布</a>");break;
		case '全国平均温度距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国10天平均温度距平</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP20\")\'>全国20天平均温度距平</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP30\")\'>全国30天平均温度距平</a>");break;

		case '全国10天最高气温分布':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>全国最高气温分布图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_ZG10\")\'>全国10天最高气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZG20\")\'>全国20天最高气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZG30\")\'>全国30天最高气温分布</a>");break;
		case '全国20天最高气温分布':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>全国最高气温分布图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_WD_ZG10\")\'>全国10天最高气温分布</a><a class='getText current' onClick=\'getSrc(\"JC_WD_ZG20\")\'>全国20天最高气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZG30\")\'>全国30天最高气温分布</a>");break;
		case '全国30天最高气温分布':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>全国最高气温分布图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_WD_ZG10\")\'>全国10天最高气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZG20\")\'>全国20天最高气温分布</a><a class='getText current' onClick=\'getSrc(\"JC_WD_ZG30\")\'>全国30天最高气温分布</a>");break;

		case '全国10天最低气温分布':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_DW_24\")\'>全国最低气温分布图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_ZD10\")\'>全国10天最低气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZD20\")\'>全国20天最低气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZD30\")\'>全国30天最低气温分布</a>");break;
		case '全国20天最低气温分布':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_DW_24\")\'>全国最低气温分布图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_WD_ZD10\")\'>全国10天最低气温分布</a><a class='getText current' onClick=\'getSrc(\"JC_WD_ZD20\")\'>全国20天最低气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZD30\")\'>全国30天最低气温分布</a>");break;
		case '全国30天最低气温分布':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_DW_24\")\'>全国最低气温分布图</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_WD_ZD10\")\'>全国10天最低气温分布</a><a class='getText' onClick=\'getSrc(\"JC_WD_ZD20\")\'>全国20天最低气温分布</a><a class='getText current' onClick=\'getSrc(\"JC_WD_ZD30\")\'>全国30天最低气温分布</a>");break;

		case '全国10天平均温度距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国平均温度距平</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国10天平均温度距平</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP20\")\'>全国20天平均温度距平</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP30\")\'>全国30天平均温度距平</a>");break;
		case '全国20天平均温度距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国平均温度距平</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国10天平均温度距平</a><a class='getText current' onClick=\'getSrc(\"JC_WD_PJJP20\")\'>全国20天平均温度距平</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP30\")\'>全国30天平均温度距平</a>");break;
		case '全国30天平均温度距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>气温</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国平均温度距平</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_WD_PJJP10\")\'>全国10天平均温度距平</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJJP20\")\'>全国20天平均温度距平</a><a class='getText current' onClick=\'getSrc(\"JC_WD_PJJP30\")\'>全国30天平均温度距平</a>");break;

		//////////////////////////交通 begin

		case '交通':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>全国道路降水量预报 </a><a class='getText' onClick=\'getSrc(\"JC_GL_JS_ZH\")\'>全国道路降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_GL_JX_ZH\")\'>全国道路积雪深度实况</a><a class='getText' onClick=\'getSrc(\"JC_GL_WD_ZH\")\'>全国道路温度实况</a><a class='getText' onClick=\'getSrc(\"JC_GL_NJD_ZH\")\'>全国道路能见度实况</a><a class='getText' onClick=\'getSrc(\"JC_GL_FC_ZH\")\'>全国道路风场实况</a>");break;

		case '全国道路降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>公路24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_TL_SJL_24H\")\'>铁路24小时降水量预报</a>");break;
		case '全国道路降水量实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_JS_ZH\")\'>公路逐小时降水实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_JS_ZH\")\'>铁路逐小时降水实况</a>");break;
		case '全国道路积雪深度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_JX_ZH\")\'>公路沿线积雪深度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_JX_ZH\")\'>铁路沿线积雪深度实况</a>");break;
		case '全国道路温度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_WD_ZH\")\'>公路逐小时温度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_WD_ZH\")\'>铁路逐小时温度实况</a>");break;
		case '全国道路能见度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_NJD_ZH\")\'>公路逐小时能见度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_NJD_ZH\")\'>铁路逐小时能见度实况</a>");break;
		case '全国道路风场实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_FC_ZH\")\'>公路逐小时风场实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_FC_ZH\")\'>铁路逐小时风场实况</a>");break;

		case '公路24小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>全国道路降水量预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>公路24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_TL_SJL_24H\")\'>铁路24小时降水量预报</a>");break;
		case '铁路24小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>全国道路降水量预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>公路24小时降水量预报</a><a class='getText current' onClick=\'getSrc(\"YB_TL_SJL_24H\")\'>铁路24小时降水量预报</a>");break;

		case '公路逐小时降水实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_JS_ZH\")\'>全国道路降水量实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_JS_ZH\")\'>公路逐小时降水实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_JS_ZH\")\'>铁路逐小时降水实况</a>");break;
		case '铁路逐小时降水实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_JS_ZH\")\'>全国道路降水量实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_GL_JS_ZH\")\'>公路逐小时降水实况</a><a class='getText current' onClick=\'getSrc(\"JC_TL_JS_ZH\")\'>铁路逐小时降水实况</a>");break;

		case '公路沿线积雪深度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_JX_ZH\")\'>全国道路积雪深度实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_JX_ZH\")\'>公路沿线积雪深度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_JX_ZH\")\'>铁路沿线积雪深度实况</a>");break;
		case '铁路沿线积雪深度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_JX_ZH\")\'>全国道路积雪深度实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_GL_JX_ZH\")\'>公路沿线积雪深度实况</a><a class='getText current' onClick=\'getSrc(\"JC_TL_JX_ZH\")\'>铁路沿线积雪深度实况</a>");break;

		case '公路逐小时温度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_WD_ZH\")\'>公路逐小时温度实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_GL_WD_ZH\")\'>公路逐小时温度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_WD_ZH\")\'>铁路逐小时温度实况</a>");break;
		case '铁路逐小时温度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_WD_ZH\")\'>公路逐小时温度实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_WD_ZH\")\'>公路逐小时温度实况</a><a class='getText current' onClick=\'getSrc(\"JC_TL_WD_ZH\")\'>铁路逐小时温度实况</a>");break;

		case '公路逐小时能见度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_NJD_ZH\")\'>全国道路能见度实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_NJD_ZH\")\'>公路逐小时能见度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_NJD_ZH\")\'>铁路逐小时能见度实况</a>");break;
		case '铁路逐小时能见度实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_NJD_ZH\")\'>全国道路能见度实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_NJD_ZH\")\'>公路逐小时能见度实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_NJD_ZH\")\'>铁路逐小时能见度实况</a>");break;

		case '公路逐小时风场实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_FC_ZH\")\'>全国道路风场实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_GL_FC_ZH\")\'>公路逐小时风场实况</a><a class='getText' onClick=\'getSrc(\"JC_TL_FC_ZH\")\'>铁路逐小时风场实况</a>");break;
		case '铁路逐小时风场实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_GL_SJL_24H\")\'>交通</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_GL_FC_ZH\")\'>全国道路风场实况</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_GL_FC_ZH\")\'>公路逐小时风场实况</a><a class='getText current' onClick=\'getSrc(\"JC_TL_FC_ZH\")\'>铁路逐小时风场实况</a>");break;

		//////////////////////////环境 begin

		case '环境':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_KQWR_24\")\'>空气污染气象条件预报</a>");break;

		case '空气污染气象条件预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_KQWR_24\")\'>环境</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_KQWR_24\")\'>空气污染气象条件预报</a>");break;


		//////////////////////////雷电 begin

		case '雷电':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_LD_CHN\")\'>全国地闪实时监测(1h)</a><a class='getText' onClick=\'getSrc(\"JC_LD_HH\")\'>半小时雷电图</a><a class='getText' onClick=\'getSrc(\"JC_LD_3H\")\'>三小时雷电图</a>");break;

		case '全国地闪实时监测(1h)':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_LD_CHN\")\'>雷电</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_LD_CHN\")\'>全国地闪实时监测(1h)</a><a class='getText' onClick=\'getSrc(\"JC_LD_HH\")\'>半小时雷电图</a><a class='getText' onClick=\'getSrc(\"JC_LD_3H\")\'>三小时雷电图</a>");break;
		case '半小时雷电图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_LD_CHN\")\'>雷电</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_LD_CHN\")\'>全国地闪实时监测(1h)</a><a class='getText current' onClick=\'getSrc(\"JC_LD_HH\")\'>半小时雷电图</a><a class='getText' onClick=\'getSrc(\"JC_LD_3H\")\'>三小时雷电图</a>");break;
		case '三小时雷电图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_LD_CHN\")\'>雷电</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_LD_CHN\")\'>全国地闪实时监测(1h)</a><a class='getText' onClick=\'getSrc(\"JC_LD_HH\")\'>半小时雷电图</a><a class='getText current' onClick=\'getSrc(\"JC_LD_3H\")\'>三小时雷电图</a>");break;

		//////////////////////////监测 begin

		case '监测':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>土壤相对湿度图</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>天气图分析</a>");break;

		case '土壤相对湿度图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>监测</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>土壤相对湿度图</a>");break;
		case '天气图分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>监测</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_TQFX_DM\")\'>地面分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_500hPa\")\'>500百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_700hPa\")\'>700百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_850hPa\")\'>850百帕分析</a>");break;


		case '地面分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>监测</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>天气图分析</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_TQFX_DM\")\'>地面分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_500hPa\")\'>500百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_700hPa\")\'>700百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_850hPa\")\'>850百帕分析</a>");break;
		case '500百帕分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>监测</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>天气图分析</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>地面分析</a><a class='getText current' onClick=\'getSrc(\"JC_TQFX_500hPa\")\'>500百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_700hPa\")\'>700百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_850hPa\")\'>850百帕分析</a>");break;
		case '700百帕分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>监测</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>天气图分析</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>地面分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_500hPa\")\'>500百帕分析</a><a class='getText current' onClick=\'getSrc(\"JC_TQFX_700hPa\")\'>700百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_850hPa\")\'>850百帕分析</a>");break;
		case '850百帕分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_QH_TRXDSD\")\'>监测</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>天气图分析</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"JC_TQFX_DM\")\'>地面分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_500hPa\")\'>500百帕分析</a><a class='getText' onClick=\'getSrc(\"JC_TQFX_700hPa\")\'>700百帕分析</a><a class='getText current' onClick=\'getSrc(\"JC_TQFX_850hPa\")\'>850百帕分析</a>");break;

		//////////////////////////预报 begin

		case '预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_TQQS_3D\")\'>天气趋势预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a><a class='getText' onClick=\'getSrc(\"YB_DZZH_24\")\'>地质水文气象</a><a class='getText' onClick=\'getSrc(\"YB_HXDJ_SL\")\'>火险等级短期预报</a>");break;

		case '天气趋势预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_TQQS_3D\")\'>未来三天</a><a class='getText' onClick=\'getSrc(\"YB_TQQS_10D\")\'>未来十天</a><a class='getText' onClick=\'getSrc(\"YB_TQQS_GW\")\'>国外天气预报</a>");break;
		case '海洋预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;
		case '地质水文气象':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_DZZH_24\")\'>地质灾害气象等级</a>");break;
		case '火险等级短期预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_HXDJ_SL\")\'>森林火险</a>");break;

		case '未来三天':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>天气趋势预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_TQQS_3D\")\'>未来三天</a><a class='getText' onClick=\'getSrc(\"YB_TQQS_10D\")\'>未来十天</a><a class='getText' onClick=\'getSrc(\"YB_TQQS_GW\")\'>国外天气预报</a>");break;
		case '未来十天':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>天气趋势预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>未来三天</a><a class='getText current' onClick=\'getSrc(\"YB_TQQS_10D\")\'>未来十天</a><a class='getText' onClick=\'getSrc(\"YB_TQQS_GW\")\'>国外天气预报</a>");break;
		case '国外天气预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>天气趋势预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>未来三天</a><a class='getText' onClick=\'getSrc(\"YB_TQQS_10D\")\'>未来十天</a><a class='getText current' onClick=\'getSrc(\"YB_TQQS_GW\")\'>国外天气预报</a>");break;

		case '海洋天气预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;
		case '全球海事公报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText current' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;
		case '海平面气压场分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText current' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;
		case '500mpa高度场分析':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText current' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;
		case '海平面海况形势':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText current' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;
		case '500mpa海况形势':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText' onClick=\'getSrc(\"YB_HY_TQYB\")\'>海洋天气预报</a><a class='getText' onClick=\'getSrc(\"YB_HY_HSGB\")\'>全球海事公报</a><a class='getText' onClick=\'getSrc(\"JC_HY_HPM_SK\")\'>海平面气压场分析</a><a class='getText' onClick=\'getSrc(\"JC_HY_500Pha_SK\")\'>500mpa高度场分析</a><a class='getText' onClick=\'getSrc(\"YB_HY_HPM_24H\")\'>海平面海况形势</a><a class='getText current' onClick=\'getSrc(\"YB_HY_500Pha_24H\")\'>500mpa海况形势</a>");break;

		case '地质灾害气象等级':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_DZZH_24\")\'>地质水文气象</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_DZZH_24\")\'>地质灾害气象等级</a>");break;

		case '森林火险':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_TQQS_3D\")\'>预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_HXDJ_SL\")\'>火险等级短期预报</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_HXDJ_SL\")\'>森林火险</a>");break;

		//////////////////////////数值产品 begin

		case '数值产品':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>中期指数</a><a class='getText' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>沙尘模式</a><a class='getText' onClick=\'getSrc(\"SZ_RY_BJHL_400HPA_3H\")\'>人影模式</a><a class='getText' onClick=\'getSrc(\"SZ_MM5_12XSLJJS_ZG_12H\")\'>MM5模式</a><a class='getText' onClick=\'getSrc(\"SZ_HL_DXY_12H\")\'>海浪模式</a>");break;

		case '中期指数':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>数值产品</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>中期指数</a>");break;
		case '沙尘模式':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>数值产品</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"SZ_SC_3H\")\'>沙尘模式</a>");break;
		case '人影模式':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>数值产品</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"SZ_RY_BJHL_400HPA_3H\")\'>人影模式</a>");break;
		case 'MM5模式':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>数值产品</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"SZ_MM5_12XSLJJS_ZG_12H\")\'>MM5模式</a>");break;
		case '海浪模式':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"SZ_ZQSZ_SD_200HPA_12H\")\'>数值产品</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"SZ_HL_DXY_12H\")\'>海浪模式</a>");break;

		//////////////////////////新产品推荐 begin

		case '新产品推荐':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_WD_ZG24\")\'>最高气温预报分布图</a><a class='getText' onClick=\'getSrc(\"YB_WD_ZD24\")\'>最低气温预报分布图</a><a class='getText' onClick=\'getSrc(\"YB_WD_PJ24\")\'>平均气温预报分布图</a><a class='getText' onClick=\'getSrc(\"JC_WD_PJ\")\'>平均气温实况分布图</a><a class='getText' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>全国最高气温实况分布图</a><a class='getText' onClick=\'getSrc(\"JC_WDSK_DW_24\")\'>全国最低气温实况分布图</a>");break;

		case '最高气温预报分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_WD_ZG24\")\'>新产品推荐</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_WD_ZG24\")\'>最高气温预报分布图</a>");break;
		case '最低气温预报分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_WD_ZG24\")\'>新产品推荐</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_WD_ZD24\")\'>最低气温预报分布图</a>");break;
		case '平均气温预报分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_WD_ZG24\")\'>新产品推荐</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_WD_PJ24\")\'>平均气温预报分布图</a>");break;
		case '平均气温实况分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_WD_ZG24\")\'>新产品推荐</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WD_PJ\")\'>平均气温实况分布图</a>");break;
		case '全国最高气温实况分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_WD_ZG24\")\'>新产品推荐</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WDSK_GW_24\")\'>全国最高气温实况分布图</a>");break;
		case '全国最低气温实况分布图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_WD_ZG24\")\'>新产品推荐</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WDSK_DW_24\")\'>全国最低气温实况分布图</a>");break;

		//////////////////////////最新更新 begin

		case '最新更新':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_072\")\'>全国72小时降水量预报</a><a class='getText' onClick=\'getSrc(\"JC_JSL_1HT\")\'>逐小时全国气温实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_1HR\")\'>逐小时降水量实况</a><a class='getText' onClick=\'getSrc(\"JC_JSL_1HW\")\'>逐小时极大风速实况</a><a class='getText' onClick=\'getSrc(\"JC_LD_HH\")\'>半小时雷电图</a><a class='getText' onClick=\'getSrc(\"YB_HY_JHHQYB\")\'>24小时近海海区预报</a><a class='getText' onClick=\'getSrc(\"YB_BW_ZG24\")\'>72小时最高气温变化预报</a><a class='getText' onClick=\'getSrc(\"YB_BW_ZG24\")\'>今日最高气温变化预报</a>");break;

		case '全国24小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a>");break;
		case '全国48小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a>");break;
		case '全国72小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_072\")\'>全国72小时降水量预报</a>");break;
		case '逐小时全国气温实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_1HT\")\'>逐小时全国气温实况</a>");break;
		case '逐小时降水量实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_1HR\")\'>逐小时降水量实况</a>");break;
		case '逐小时极大风速实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_1HW\")\'>逐小时极大风速实况</a>");break;
		case '半小时雷电图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_LD_HH\")\'>半小时雷电图</a>");break;
		case '24小时近海海区预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_HY_JHHQYB\")\'>24小时近海海区预报</a>");break;
		case '72小时最高气温变化预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_BW_ZG24\")\'>72小时最高气温变化预报</a>");break;
		case '今日最高气温变化预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>最新更新</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_BW_ZG24\")\'>今日最高气温变化预报</a>");break;


		//////////////////////////推荐浏览 begin

		case '推荐浏览':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_BW_ZD24\")\'>今日最低气温变化预报</a><a class='getText' onClick=\'getSrc(\"YB_BW_ZG24\")\'>今日最高气温变化预报</a><a class='getText' onClick=\'getSrc(\"JC_WX_DBWD\")\'>旬全国地表温度图</a><a class='getText' onClick=\'getSrc(\"JC_JSL_02405\")\'>全国降水量实况</a><a class='getText' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a><a class='getText' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a><a class='getText' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国10天降水距平</a>");break;

		case '今日最低气温变化预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_BW_ZD24\")\'>今日最低气温变化预报</a>");break;
		case '今日最高气温变化预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_BW_ZG24\")\'>今日最高气温变化预报</a>");break;
		case '旬全国地表温度图':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_WX_DBWD\")\'>旬全国地表温度图</a>");break;
		case '全国降水量实况':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_02405\")\'>全国降水量实况</a>");break;
		case '全国24小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_024\")\'>全国24小时降水量预报</a>");break;
		case '全国48小时降水量预报':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"YB_JSL_048\")\'>全国48小时降水量预报</a>");break;
		case '全国10天降水距平':cruObj.empty().append("<li><a href='http://www.weather.com.cn/'>中国天气网</a></li><li class=\"divider\">&gt;</li><li><a class='getText' onClick=\'getSrc(\"YB_BW_ZD24\")\'>推荐浏览</a></li><li class=\"divider\">&gt;</li><li><a class='getText'>"+$(this).text()+"</a></li>");
			 btnObj.empty().append("<a class='getText current' onClick=\'getSrc(\"JC_JSL_JPL10\")\'>全国10天降水距平</a>");break;
	}
}
$(function(){
	$('.col_left ul li,.col_left>div>h1').hover(function(){
		$(this).addClass("oneLevelMenu");
		$(this).children("ul").stop(true,true).show();	
	},function(){
		$(this).removeClass('oneLevelMenu');
		$(this).children("ul").stop(true,true).hide();
	})	
	
	//$(document.frames('new').document).find('a.getText').live('click',Check($(window.parent.document).find("ul.breadcrumb"),Check($(window.parent.document).find(".col_right .menu"))));
		$(document.frames['new'].document).find('a').click(function(){alert(111)})

	$('a.getText').live('click',Check($("ul.breadcrumb"),$(".col_right .menu")));
})
