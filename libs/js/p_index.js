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
				bindLinkEvent(html.filter('.ajax-link').add(html.find('.ajax-link')));
				$title.html('天气网前端-'+contentContainer.find('h1').html());
			}
			var bindLinkEvent = function($links){
				$links.click(function(e){
					e.preventDefault();
					var href = $(this).data('_href');
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
				}).each(function(){
					var $this = $(this);
					var href = $this.attr('href').replace('#','');
					if($this.hasClass('md')){
						href += (!~href.indexOf('?')?'?':'&')+'ajax=1';
					}
					
					$this.data('_href',href);
				});
			}
			var links = $('.ajax-link');
			bindLinkEvent(links);
			var initLinks = links.filter('.init');
			if(!initLinks.length){
				initLinks = links;
			}
			initLinks.first().click();
		});
	});
})();
