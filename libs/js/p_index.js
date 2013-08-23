(function(){
	var loading,contentContainer;
	W(function(){
		contentContainer = $('.content');
		loading = $('<div class="loading">正在加载</div>').insertAfter(contentContainer);
	});
	var base = W.data.base;
	W.use([base+'../libs/js/highlight.js',base+'../libs/css/markdown.css','jquery'],function(){
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
					html = $('<div>').html(html).find('pre code').each(function(){
						$(this).html(hljs.highlightAuto($(this).html()).value);
					}).end().children();//直接存储编译后内容

					cache[href] = html;
					showHtml(html);
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
		links.filter('.init').click();
	});
})();