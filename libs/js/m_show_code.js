(function(){
	var type = ['html','css','js'];
	W(function(){
		var codePre = [];
		var $containers = $('.example_container').each(function(){
			var container = $(this);
			var arr = [];
			var nav = $('<div>').addClass('example_nav');
			nav.append($('<a>').attr('href','javascript:;').addClass('nav_example on').html('示例'));
		
			$.each(type,function(i,v){
				var item = container.find('.example_'+v);
				if(item.length > 0 && item.html().replace(/^\s+|\s+$/,'').length > 0/*过滤内容为空的项*/){
					var html = item.html();
					var codeC = $('<code>').html(html);
					var preC = $('<pre class="code_'+v+'"></pre>').html(codeC).appendTo(container);
					codePre.push(preC);
					nav.append($('<a>').attr('href','javascript:;').addClass('nav_'+v).html(v).attr('t',v));
				}
			});
			nav.prependTo(container);
		});
		//用live方法，防止切换导航时，事件丢失
		$containers.find('.example_nav a').live('click',function(){
			var $this = $(this);
			var $c = $this.closest('.example_container');
			var $example_html = $c.find('.example_html');
			var t = $this.attr('t');
			var cN = '.';
			if(t){
				cN += 'code_'+t;
				$example_html.hide();
			}else{
				cN += 'example_html';
				$example_html.show();
			}
			$this.siblings().removeClass('on');
			$this.addClass('on');
			$c.find('pre').each(function(i,v){
				v = $(this);
				if(v.is(cN)){
					v.show();
				}else{
					v.hide();
				}
			})
		});
		var base = W.data.base;
		W.use([base+'../libs/js/highlight.js',base+'../libs/css/m_show_code.css'],function(){
			$.each(codePre,function(i,v){
				var $code = v.find('code');
				var code = $code.html().replace(/^[\n\r]+|[\s]+$/g,'');
				var m = code.match(/^ {4,}/);//4个空格
				// 消除pre对格式影响
				if(m){
					if(m[0].length % 2 == 0){
						var reg = new RegExp('^'+m[0],'gm');
						code = code.replace(reg,'');
					}
				}
				var code = hljs.highlightAuto(code.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<')).value;
				$code.html(code);
			})
		});
	});
})();