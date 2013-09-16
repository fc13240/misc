(function(global){
	var index = 0;
	var dataCache = {};
	function getAdId(data){
		var name = 'ad_'+new Date().getTime()+'_'+(index++);
		dataCache[name] = data;
		return name;
	}
	global.WR_PARAMETER = {};
	global.WRATING = {
		PLAY: {
			ACTION: function(adData){
				document.write('<div id="'+getAdId(adData)+'" class="async-ad"></div>');
			}
		}
	};

	(function(){
		W.__adCallback = function(fn){
			var match = REG_FUNCTION.exec(fn.toString());
			if(match){
				code.push(match[1]);
			}
		}
		/*子iframe得到广告数据*/
		W.__getAdData = function(adId){
			return dataCache[adId];
		}
		var REG_FUNCTION = /^function\s*\([^)]*\)\s*{([\s\S]*)}\s*$/;
		var code = [];
		var isIE = !-[1,];
		W.use(['j/ad/caoyu-min.js','j/ad/ex2.js'],function(){
			W.__adCallback = null;
			code = code.join(';');
			W(function(){
				for(var i in dataCache){
					var container = $('#'+i);
					var containerParaent = container.parent();
					var ifrm = $('<iframe class="bgLoading" frameborder="0" scrolling="no">')
								.attr('width',containerParaent.width())
								.attr('height',containerParaent.height())
								.appendTo(container).get(0);

			        var doc = null;
					if(ifrm.contentDocument) { // Firefox, Opera
						doc = ifrm.contentDocument;
					} else if(ifrm.contentWindow) { // Internet Explorer
						doc = ifrm.contentWindow.document;
					} else if(ifrm.document) { // Others?
						doc = ifrm.document;
					}
					doc.open();
					doc.write('<html><head><script>'+code+'</'+'script></head><body style="background-color: transparent;padding:0;margin:0;"><script>WRATING.PLAY.ACTION(parent.W.__getAdData("'+i+'"))</'+'script></body></html>');
					//thanks to http://antalpha.blogspot.com/2009/02/add-dynamic-content-to-iframe-ie-issues.html
					if (!isIE) {
						doc.close();
					}
				}
			});
		});
	})();
})(this);