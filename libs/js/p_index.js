(function(){
	var base = W.data.base;
	define(function(require){
		require('./highlight.js');
		require('../css/markdown.css');
		var m_show_code = require('./m_show_code.js');
		var loading,contentContainer;
		W(function(){
			contentContainer = $('.content');
			loading = $('<div class="loading">正在加载</div>').insertAfter(contentContainer);
			// config highlight
			hljs.tabReplace = '    ';

			var cache = {};//缓存加载数据
			var $title = $('title');
			function showHtml (html){
				contentContainer.html(html);
				/*IE下$title.html会报错
				==
				http://forum.jquery.com/topic/jquery-title-html-test-shortcut-to-document-title-test

				As far as IE goes, Microsoft says this: "To set the title
				programmatically using script, use document.title instead of setting
				the innerHTML property of the title object. For more information, see
				Q296113: Script Fails to Change the Document Title of a Web Page "
				http://support.microsoft.com/kb/q296113/
				==
				*/
				document.title = ('天气网前端-'+contentContainer.find('h1').html());
			}
			function loadPage(href){
				if(cache[href]){
					showHtml(cache[href]);
					return;
				}
				loading && loading.show();
				$.get(href,function(html){
					var tempDiv = $('<div>').get(0);
					tempDiv.innerHTML = html;
					tempDiv = $(tempDiv).find('pre code').each(function(){
						$(this).html(hljs.highlightAuto($(this).html().replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<')).value);
					}).end();//直接存储编译后内容
					// html = $(tempDiv.innerTHML);
					tempDiv.find('.example_js').each(function(){
						var $this = $(this);
						$('<div>').addClass('example_js').html($this.html()).appendTo($this.closest('.example_container'));
					});
					html = tempDiv.children();
					cache[href] = html;
					showHtml(html);
					m_show_code();
					loading.hide();
				});
			}
			function hashChange (hash){
				var href = hash.replace('#','');
				if(/.md/.test(hash)){
					href += '?ajax=1';
				}
				loadPage(href);
			}
			var links = $('.ajax-link');
			// bindLinkEvent(links);
			var initHash = location.hash;
			if(initHash){
				hashChange(initHash);
			}else{
				var initLinks = links.filter('.init');
				if(!initLinks.length){
					initLinks = links;
				}
				// initLinks.first().click();
				hashChange(initLinks.first().attr('href'));
			}
			if ('onhashchange' in window) {
      			window.onhashchange = function() {
        			hashChange(location.hash);
      			}
    		}
		});
	});
})();
