/*针对搜索框的封装*/
define(function(require){
	require('../../c/m_search.css');
	require('../plugs/jquery.placeholder');
	var Suggest = require('../m_search_suggest');
	var conf = {"北京":"bj","上海":"sh","天津":"tj","重庆":"cq","河北":"hebei","河南":"henan","山东":"sd","山西":"shanxi","陕西":"shaanxi","江苏":"js","湖南":"hunan","湖北":"hubei","安徽":"ah","浙江":"zj","江西":"jx","福建":"fj","台湾":"taiwan.shtml","香港":"xianggang.shtml","澳门":"mo","广东":"gd","广西":"gx","海南":"hainan","云南":"yn","贵州":"gz","四川":"sc","西藏":"xz","新疆":"xj","青海":"qh","甘肃":"gs","宁夏":"nx","内蒙古":"nmg","黑龙江":"hlj","吉林":"jl","辽宁":"ln"};
	var host = 'weather.com.cn';
	var isWWW = new RegExp('www1?.'+host).test(location.host);
	//新闻的内容地址
	var newsUrl = '/'+(isWWW?'':'data/')+'pubmodel/header_rdph_json.html';
	//提示面板内容地址
	var additionUrl = '/'+(isWWW?'profile':'examples/search_suggest')+'/search_addition.html';
	var $addition;
	var isLoading = false;
	function show($inputText){
		if($addition){
			var offset = $inputText.offset();
			offset.top += $inputText.height()+(parseFloat($inputText.css('padding-top'))||0)+(parseFloat($inputText.css('padding-bottom'))||0);
			$addition.css(offset).show();
			$inputText.trigger('show_addition');
		}
	}
	function hide(){
		$addition.hide();
	}
	return function($inputText,$btnSubmit){
		$inputText.placeholder();
		var isEnter = false;//鼠标是否移上addition
		//提示面板和输入提示逻辑
		$inputText.focus(function(){
			var $this = $(this);
			if(!$this.val()){
				if(!$addition && !isLoading){
					isLoading = true;
					$.get(additionUrl,function(html){
						isLoading = false;
						$addition = $(html).appendTo($('body')).mouseleave(function(){
							hide();
							isEnter = false;
						}).mouseenter(function(){
							isEnter = true;
						});
						var className = 'active';
						var $items = $('#selectsionGroups').find('ul');
						var $tabs = $addition.find('.tab').click(function(){
							$tabs.removeClass(className);
							var $this = $(this).addClass(className);
							$items.hide();
							$('#'+$this.attr('id').replace('tab_','')).show();
						});
						show($inputText);
						var $zx = $('#zx');
						$.getJSON(newsUrl,function(data){
							if($.isArray(data)){
								$.each(data,function(i,v){
									$zx.append('<li class="num'+(i+1)+'"><a target="_blank" href="'+v[0]+'">'+v[1]+'</a></li>');
								})
							}
						});
					});
				}else{
					show($inputText);
				}
			}
		}).blur(function(e){
			if(!isEnter){
				hide();
			}
		});
		$inputText.keydown(hide);
		new Suggest({
			'textBox': $inputText
			// ,'url': 'http://localhost:8010/search'
	        ,'bindEvent': false
	        ,'onSelect': function(data){
	        	var cityName = data[2];
	        	$inputText.val(cityName);
	        	var toUrl = 'http://';
	            if(data.length == 20){
	            	var enName = conf[cityName];
	                if(~enName.indexOf('.')){
	                	toUrl += 'www.'+host+'/html/province/'+enName;
	                }else{
	                	toUrl += enName+'.'+host;
	                }
	            }else{
	                toUrl += 'www.'+host+'/weatherfc/'+data[0]+'.shtml';
	            }
	            $inputText.data('url',toUrl);
	            window.open(toUrl);
	        }
		});
		//给指定按钮绑定事件
		if($btnSubmit && $btnSubmit.length){
			$btnSubmit.click(function(){
				var toUrl = $inputText.data('url');
				if(toUrl){
					window.open(toUrl);
				}else{
					alert('输入城市名、全拼、简拼、电话区号、邮编查询');
					$inputText.focus();
				}
			});
		}
		//对外提供可修复$addition样式的API
		return function(cssObj){
			if($addition){
				$addition.css(cssObj);
			}
		};
	}
})