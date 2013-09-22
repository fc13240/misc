(function(global){
	var index = 0;
	var dataCache = {};
	function getAdId(data){
		var name = 'ad_'+new Date().getTime()+'_'+(index++);
		dataCache[name] = data;
		return name;
	}
	//重写广告里用到变量及方法
	global.WR_PARAMETER = {};
	global.WRATING = {
		PLAY: {
			ACTION: function(adData){
				document.write('<div id="'+getAdId(adData)+'" class="async-ad"></div>');
			}
		}
	};

	W(function(){
		//当没有要处理的广告时，不去加载广告代码，节省资源
		if(index == 0){
			return;
		}
		/*加载广告依赖代码*/
		W.__adCallback = function(fn){
			var match = REG_FUNCTION.exec(fn.toString());
			if(match){
				code.push(match[1]);
			}
		}
		var runedNum = 0;
		/*子iframe得到广告数据*/
		W.__getAdData = function(adId){
			//清除全局方法
			if(++runedNum >= index){
				W.__getAdData = null;
			}
			return dataCache[adId];
		}
		var REG_FUNCTION = /^function\s*\([^)]*\)\s*{([\s\S]*)}\s*$/;
		var code = [];
		var isIE = !-[1,];
		W.use(['j/ad/caoyu-min.js','j/ad/ex2.js'],function(){
			W.__adCallback = null;
			code = code.join(';');
			for(var i in dataCache){
				var container = $('#'+i);
				var containerParaent = container.parent();
				var ifrm = $('<iframe class="bgLoading" frameborder="0" scrolling="no" allowTransparency="true">')
							.attr('width',containerParaent.width())
							.attr('height',containerParaent.height()||containerParaent.parent().height())
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
				doc.write('<html><head><script>var oParent=parent;top=parent=this;'+code+'</'+'script></head><body style="background-color: transparent;padding:0;margin:0;"><script>WRATING.PLAY.ACTION(oParent.W.__getAdData("'+i+'"))</'+'script></body></html>');
				//thanks to http://antalpha.blogspot.com/2009/02/add-dynamic-content-to-iframe-ie-issues.html
				if (!isIE) {
					doc.close();
				}
			}
		});
	});
})(this);