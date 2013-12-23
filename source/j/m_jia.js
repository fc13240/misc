define(function(require){
	require('../c/m_jia.css');
	require('./global');
	var conf = [
		{
			'n': '新浪微博',
			'en': 'tsina'
		},
		{
			'n': 'MSN',
			'en': 'msn'
		},
		{
			'n': '复制网址',
			'en': 'copy',
			'm': 'jiathis_copyUrl'
		},
		{
			'n': '收藏夹',
			'en': 'fav',
			'm': 'jiathis_addBookmark'
		},
		{
			'n': '邮件',
			'en': 'email'
		},
		{
			'n': 'QQ空间',
			'en': 'qzone'
		},
		{
			'n': '人人网',
			'en': 'renren'
		},
		{
			'n': '开心网',
			'en': 'kaixin001'
		},
		{
			'n': '网易微博',
			'en': '163'
		},
		{
			'n': '搜狐微博',
			'en': 'tsohu'
		},
		{
			'n': '谷歌Buzz',
			'en': 'buzz'
		},
		{
			'n': '百度空间',
			'en': 'hi'
		},
		{
			'n': '淘江湖',
			'en': 'taobao'
		},
		{
			'n': '百度搜藏',
			'en': 'baidu'
		},
		{
			'n': '豆瓣',
			'en': 'douban'
		},
		{
			'n': '腾讯微博',
			'en': 'tqq'
		},
		{
			'n': 'QQ校友',
			'en': 'xiaoyou'
		},
		{
			'n': '查看更多',
			'en': 'jiathis'
		}
	];
	var JIATHIS_UID = 1854826;
	var tmpl = '<div id="ckepop">'+
				  '<div class="jiadiv_01">'+
				    '<div class="jiaTable">'+
				      '<table width="95%">'+
				        '<tr>'+
				          '<td>分享到...</td>'+
				          '<td align="right">'+
				            '<span id="shareClose">[关闭]</span>'+
				          '</td>'+
				        '</tr>'+
				      '</table>'+
				    '</div>'+
				    '<div id="jiathis_sers" class="jiadiv_02">'+
				    	'__BTNS__'+
				    	'<div style="clear: both;"></div>'+
				    '</div>'+
				    '<div class="ckepopBottom">'+
				      '<div>'+
				        '<a target="_blank" class="link_01" href="http://www.jiathis.com/help/html/what-is-jiathis">这是什么工具?</a>'+
				      '</div>'+
				    '</div>'+
				  '</div>'+
				'</div>';
	var ec = encodeURIComponent;
	function jiathis_sendto(a) {
		window.open('http://www.jiathis.com/send/?webid=' + a + '&url=' + ec(location.href) + '&title=' + ec(doc.title) + '&uid=' + JIATHIS_UID);
		return false;
	}
	var doc = document;
	function jiathis_copyUrl() {
		var a = win.location.href;
		var b = doc.title;
		var c = b + " " + a;
		var d = navigator.userAgent.toLowerCase();
		var e = d.indexOf('opera') != -1 && opera.version();
		var f = (d.indexOf('msie') != -1 && !e) && d.substr(d.indexOf('msie') + 5, 3);
		if (f) {
			clipboardData.setData('Text', c);
			alert("复制成功,请粘贴到你的QQ/MSN上推荐给你的好友！")
		} else if (prompt('你使用的是非IE核心浏览器，请按下 Ctrl+C 复制代码到剪贴板', c)) {
			alert('复制成功,请粘贴到你的QQ/MSN上推荐给你的好友！')
		} else {
			alert('目前只支持IE，请复制地址栏URL,推荐给你的QQ/MSN好友！')
		}
	}
	var win = window;
	function render(){
		var html = '';
		for(var i = 0,j=conf.length;i<j;i++){
			var obj = conf[i];
			var en = obj['en'];
			html += '<a class="jiatitle" data-en="'+en+'">'+
				        '<span class="jtico jtico_'+en+'">'+obj['n']+'</span>'+
				    '</a>';
		}
		var jiaHtml = $(tmpl.replace('__BTNS__',html));
		jiaHtml.find('.jiatitle').each(function(){
			var $this = $(this);
			var en = $this.data('en');
			if(en == 'copy'){
				$this.click(jiathis_copyUrl)
			}else if(en == 'fav'){
				$this.click(function(){
					W.util.addFav(doc.title)
				})
			}else{
				if(en == 'jiathis'){
					en = 'jiathis.com/share/?uid='+JIATHIS_UID;
				}
				$this.click(function(){
					jiathis_sendto(en);
				});
			}
		});
		jiaHtml.find("#shareClose").click(function(){
			jiaHtml.hide();
		});
		return jiaHtml;
	}
	return render();
});