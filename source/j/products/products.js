$(function(){
	$('.col_left ul li,.col_left>div>h1').hover(function(){
		$(this).addClass("oneLevelMenu");
		$(this).children("ul").stop(true,true).show();	
	},function(){
		$(this).removeClass('oneLevelMenu');
		$(this).children("ul").stop(true,true).hide();
	})	
	
})

function getSrc(str){
	var ifr = document.getElementsByTagName('iframe')[0];
	ifr.src = ifr.src.replace(ifr.src.substring(ifr.src.indexOf("class=")+6),str)
	
	switch(str){
		case 'JB_ZYTQ_M': $(".col_right .menu").empty().append("<a class=\'current\' onClick=\'getSrc(\"JB_ZYTQ_M\")\'>全国24小时降水量预报</a><a onClick=\'getSrc(\"JB_ZYTQ_DW\")\'>全国48小时降水量预报</a>");break;
		case 'JB_ZYTQ_DW': alert(22);break;
	}
}


function reinitIframe(){
	var Iframe = document.getElementById('new');
	// 声明变量取值
	var bHeight = Iframe.contentWindow.document.body.scrollHeight;
	var dHeight=Iframe.contentWindow.document.documentElement.scrollHeight;
	var height = Math.max(bHeight, dHeight); // 取最大值
	Iframe.height = height;
}
