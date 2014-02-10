// JavaScript Document
var SN={
	'trackObj':'ul.breadcrumb_c',  //定义面包屑的容器元素
	'btnObj':'.col_right .menu',   //定义右侧按钮的容器元素
	'ifrObj':'#new',               //iframe对象
	'ifrSrc':'http://www.weather.com.cn/static/productframe2013.php?class=',  //iframe的src不变的前缀
	'navMainObj':'ul.navLink a',   //导航栏click触发的事件对象
	'stopClass':'navLink',         //遍历截至的dom元素
	'liveDomObj':'.menu a,.breadcrumb_c a',             //live 面包屑，btn点击事件对象
	'navHoverObj':'.col_left ul li,.col_left>div>h1',   //导航栏hover效果 绑定对象
	'navHoverClass':'oneLevelMenu'      			    //导航栏hover后触发 效果class
}

//面包屑 生产函数
function makeFlag(dataId,str){
	$(SN.trackObj).prepend("<li>&nbsp;>&nbsp;<a data-id="+dataId+">"+str+"</a></li>");	
}
//子目录选项按钮 生产函数
function makeBtn(dataId,str){
	$(SN.btnObj).append("<a data-id="+dataId+">"+str+"</a>");
}

//iframe 
function getSrc(str){
	$(SN.ifrObj).attr('src',SN.ifrSrc+str);
}
$(SN.ifrObj).load(function(){         
    $(this).height($(this).contents().find("body").height() + 40); 
}).attr('src',SN.ifrSrc+'JC_JSL_02405');   

$(function(){
	//给左侧导航栏事件	
	$(SN.navMainObj).click(function(e){
		$(SN.trackObj).empty();
		$(SN.btnObj).empty();
		//给一级目录添加data-id属性，值为第一子级的data-id
		$(".navLeftT .navLink>li>a,.LBnav").attr('data-id',$(this).next('ul').children('li:first').children("a").attr("data-id"));
		var T=$(this);
		var U=T.closest('ul');
		var U1=U.parents('ul');
		var D=$(this).attr('data-id');
		var A=T.next().children('li');
		//遍历目标子级目录 对应生产右侧按钮 
		for(i=0;i<A.length;i++){
			makeBtn(A.eq(i).children('a').attr('data-id'),A.eq(i).children('a').text());	
		}
		//刷新面包屑
		if(U.attr("class")!=SN.stopClass){
			makeFlag(D,T.text());
			makeFlag(D,U.prev().text());
			if(U1.attr("class")!=SN.stopClass){
				makeFlag(D,U1.prev().text());
			}
		}else{
			makeFlag(D,T.text());
		}
		//iframe
		getSrc(D);
	})
	//面包屑、选项按钮点击刷新
	$(SN.liveDomObj).live('click',function(e){
		$(SN.trackObj).empty();
		$(SN.btnObj).empty();
		
		var A=$(SN.navMainObj);
		for(i=0;i<A.length;i++){			
			if(A.eq(i).text()==$(e.target).text()){
				A.eq(i).click();
				return false;
			}
		}
	})
	//iframe内相关服务产品点击刷新
	$('#new').load(function(){
		$(this).contents().find('.productsList a').click(function(){
			var A=$(SN.navMainObj);
			
					$(SN.trackObj).empty();		
					$(SN.btnObj).empty();
					makeFlag($(this).attr('data-id'),$(this).text());
					getSrc($(this).attr('data-id'));

			for(i=0;i<A.length;i++){			
				if(A.eq(i).attr('data-id')==$(this).attr('data-id')){
					A.eq(i).click();
					return false;
				}
			}
		})
	})
	
	//左侧导航hover效果
	$(SN.navHoverObj).hover(function(){
		$(this).addClass(SN.navHoverClass);
		$(this).children("ul").stop(true,true).show();	
	},function(){
		$(this).removeClass(SN.navHoverClass);
		$(this).children("ul").stop(true,true).hide();
	})
	
	//省级站下拉菜单效果
	$('#provice').toggle(function(){
		$(this).css({'background-color':'#EBEBEB','color':'#2D6CA6'}).children(':first').css('background','url("http://i.tq121.com.cn/i/index_icons.png") -66px 0').next('.arrow').css('border-color','#2D6CA6 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)');
	},function(){
			$('#provice').css({'background-color':'#0C2A46','color':'#fff'}).children(':first').css({'background': "url(http://i.tq121.com.cn/i/products/products.png) 0 0"}).next().css('border-color','#FFFFFF rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)');
	});
	$('nav ul li').hover(function(){
		$(this).click(function(){
			$(this).children('div').show();
		})
	},function(){
		$(this).children('div').hide();
	})
})
