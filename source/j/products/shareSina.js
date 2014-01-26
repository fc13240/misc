// JavaScript Document
$(document).ready(function(){
	var param = {
		url:window.location,
		type:'6',
		count:'', /**是否显示分享数，1显示(可选)*/
		appkey:'', /**您申请的应用appkey,显示分享来源(可选)*/
		title:'', /**分享的文字内容(可选，默认为所在页面的title)*/
		pic:'', /**分享图片的路径(可选)*/
		ralateUid:'', /**关联用户的UID，分享微博会@该用户(可选)*/
		language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
		rnd:new Date().valueOf()
	};
	$("#conBody p").hover(function(){
		$(this).append("<img id='share_weibo_dy' title='分享到微博' style='border:0;cursor:pointer;' src='http://localhost/source/i/products/share_weibo.png'>");
		
		var title = $(this).text();
		param.title = title;
		
		$("#share_weibo_dy").click(function(){
			share(param);
		});
	},function(){
		$("#share_weibo_dy").remove()
	});
	$("#share_weibo").click(function(){
		var title = "";
		$("#conBody p").each(function(k,v){
			if($(this).text().length > 0){
				title = $(this).text();
				return false;
			}
		});
		param.title = title;
		var pic = $("#img_path").attr('src');
		if(pic.length > 0){
			param.pic = pic;
		}
		share(param);
	});
	function share(params){
		var temp = [];
		for( var p in params ){
			temp.push(p + '=' + encodeURIComponent( param[p] || '' ) );
		}
		window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
	}
})
