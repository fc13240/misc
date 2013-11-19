define(function(require){
	var Drag = require('../m_drag');
	require('../global');
	var convert = require('../tool/convert');
	var store = W.util.store;
	var STORE_NAME = 'wb_i';
	W(function(){
		var clientWidth = window.screen.width;
		
		var addContainerNum = 0;
		if(clientWidth > 1680){
			var addClassName = 'box5col';
			addContainerNum = 2;
		}else if(clientWidth > 1340){
			var addClassName = 'box4col';
			addContainerNum = 1;
		}
		if(addClassName){
			$('.box').addClass(addClassName);
		}
		var centerContainer = $('ul.conCenter');
		for(var i = 0;i<addContainerNum ;i++){
			centerContainer.clone().insertAfter(centerContainer);
		}

		var layoutContainer = $('.layout-horizontal ul.BlogFather');
		var heightArr = [];
		layoutContainer.each(function(){
			heightArr.push($(this).outerHeight());
		});
		/*
		$(ele.html())得到是全部的节点对象
		*/
		var weiboHtml = $($('script[type="text/weibo"]').html()).filter('.borderBg');
		var store_num = (store.get(STORE_NAME)||'').split('|');
		if(store_num.length != heightArr.length){//和窗口个数不一致时，清除储存数据
			store.set(STORE_NAME,'');
			weiboHtml.each(function(){
				var $this = $(this);
				var minHeight = Math.min.apply(Math,heightArr);
				var index = $.inArray(minHeight,heightArr);
				var toContainer = layoutContainer.eq(index).append($this.fadeIn());
				heightArr[index] = toContainer.outerHeight();
			});
		}else{
			//当有保存数据且格式正确时，顺序显示
			$.each(store_num,function(i,v){
				var indexs = v.split(',');
				var toContainer = layoutContainer.eq(i);
				$.each(indexs,function(_i,_v){
					toContainer.append(weiboHtml.filter('[data-index='+_v+']').fadeIn());
				});
			})
		}
		

		var layout = new Drag({
	        'container': '.layout-horizontal',
	        'animal': 200,
	        'getLayoutContainer': function($dragHandle){
	            if($dragHandle && $dragHandle.length > 0){
	                return $dragHandle.closest('ul.BlogFather');
	            }
	            else{
	                return $('.layout-horizontal ul.BlogFather')
	            }           
	        },
	        'getMoveHandle': function(){
	            return $(this).parent();
	        },
	        'dragHandle': '.layout-horizontal li .blogName'
	    }).layout().on('endmove',function(){
	    	clearTimeout(saveTT);
	    	saveTT = setTimeout(save,300);
	    });
	    var saveTT;
	    function save(){
	    	var arr = [];
	    	layoutContainer.each(function(){
	    		var a = [];
	    		$(this).children().each(function(){
	    			var index = $(this).data('index');
	    			if(!isNaN(index)){
	    				a.push(index);
	    			}
	    		});
	    		arr.push(a.join(','));
	    	});
	    	store.set(STORE_NAME,arr.join('|'));//保存数据
	    }

	    /*省级站*/
		var provincelist = $('#cityBoardFather').mouseenter(function(){
			clearTimeout(provincelistTT);
		}).mouseleave(function(){
			up();
		});
		var up = function(){
			provincelistTT = setTimeout(function(){
				provincelist.slideUp();
			},100)
		}
		var provincelistTT ;
	    $('#toolBar_nav_hover').mouseenter(function(){
	    	provincelist.slideDown();
	    }).mouseleave(up);

	    $('#btn_sethome').click(function(){
	    	W.util.setHome();
	    });
	    $('#btn_fav').click(function(){
	    	W.util.addFav();
	    });
	    $('#btn_convert').click(function(){
	    	convert('btn_convert');
	    });
	})
});