/*文件框得到焦点后根据搜索内容进行提示*/
(function(){
	function init(){
		var defaultOptions = {
			'isBindFocus': true	//是否绑定得到和失去焦点事件
			,'textBox': null	//文本框对像
			,'url': 'http://toy1.weather.com.cn/search'			//数据来源http://localhost:8010/search
			,'key': 'cityname'	//关键词名称
			,'cbName': 'callback' //回调函数名
			,'onSelect': function(){} //建议项选中的回调函数
			,'maxnum': 12		//最大条数
		};
		var searchNotice = "输入城市名、全拼、简拼、电话区号、邮编查询";
		var noDataNotice = "No results found. Try your search again!";
		var CLASS_SUGGEST_LIST = 'suggest_list';
		var CLASS_ON = 'on';
		var CLASS_ON_JQ = '.'+CLASS_ON;
		var DATA_LIST_NAME = 'suggest';
		var Suggest = function(options){
			var _this = this;
			_this.options = options = $.extend({},defaultOptions,options);
			options.textBox = $(options.textBox);
			_this.data = {active: false};
			_this._init();
		}
		var suggestProp = Suggest.prototype;
		/*初始化*/
		suggestProp._init = function(){
			var _this = this;
			var options = _this.options;
			var $textBox = options.textBox;
			if(options.isBindFocus){
				$textBox.focus(function(){
					_this.show();
				});
			}
			var textBoxNotice = $textBox.val();
			var url = options.url;
			url += (url.indexOf('?')>-1?'&':'?') + options.key + '=';
			var currentIndex = -1;
			$textBox.keyup(function(e){
				// _this._tryHide();
				var keyCode = e.keyCode;
				var listItems = suggestList.children();
				var len = listItems.length;
				if(len > 0){
					if(keyCode == 40 || keyCode == 38){
						window.test = suggestList.children();
						var currentItem = listItems.filter(CLASS_ON_JQ);
						var nextItem;
						if(keyCode == 40){//向下
							nextItem = currentItem.next();
							if(nextItem.length == 0){
								nextItem = listItems.first();
							}
							
						}else if(keyCode == 38){//向上
							nextItem = currentItem.prev();
							if(nextItem.length == 0){
								nextItem = listItems.last();
							}
						}
						currentItem.removeClass(CLASS_ON);
						nextItem.addClass(CLASS_ON);
						return;
					}else if(keyCode == 13){
						listItems.filter(CLASS_ON_JQ).click();
						return;
					}
				}
				
				var $this = $(this);
				var key = $this.val();
				if(key && key != textBoxNotice){
					$.ajax({
						url: url + key,
						dataType: "jsonp",
						jsonp: options.cbName,
						cache: true,
						success: function(data){
							_this.render(data,key);
							_this.show();
						}
					});
				}else{
					suggestList.children().remove();
				}
			}).blur(function(){
				_this._tryHide();
			});
			var selectCallback = options.onSelect;
			var suggestList = $('<ul>').addClass(CLASS_SUGGEST_LIST).delegate('li','mouseenter',function(){
				// _this._tryHide();
				suggestList.find(CLASS_ON_JQ).removeClass(CLASS_ON);
				$(this).addClass(CLASS_ON);
			}).delegate('li','mouseleave',function(){
				var $this = $(this);
				currentIndex = $this.index();
				$this.removeClass(CLASS_ON);
			}).delegate('li','click',function(){
				_this.hide();
				selectCallback($(this).data('d'));
			}).mouseenter(function(){
				_this._clTT();
			}).mouseleave(function(){
				_this._tryHide();
			}).appendTo($('body'));// 防止css:position对下拉选项的影响

			$textBox.data(DATA_LIST_NAME,suggestList);
			var checkClass = '.'+CLASS_SUGGEST_LIST;
			$(document).click(function(e){
				var target = $(e.target);
				if(!target.is($textBox) && !target.is(checkClass) && target.closest(checkClass).length == 0){
					_this.hide();
				}
			});
		}


       






		/*重置位置*/
		suggestProp.resetPos = function(){
			var $textBox = this.options.textBox;
			var suggestList = $textBox.data(DATA_LIST_NAME);
			var pos = $textBox.offset();
			var textBox = $textBox.get(0);
			var width = textBox.offsetWidth;
			var heigth = textBox.offsetHeight;
			var lb = parseFloat(suggestList.css('border-left')) || 1;
			var rb = parseFloat(suggestList.css('border-right')) || 1;
			suggestList.css({
				'left': pos.left
				,'top': pos.top + heigth
				,'width': width - lb - rb
			})
		}
		suggestProp._clTT = function(){
			clearTimeout(this.data.t);
		}
		/*尝试关闭*/
		suggestProp._tryHide = function(){
			var _this = this;
			var d = _this.data;
			_this._clTT();
			d.t = setTimeout(function(){
				_this.hide();
			},1500);
		}
		var REG_LETTER = /^\w+$/;
		/*渲染数据*/
		suggestProp.render = function(data,key){
			var _this = this;
			if(!$.isArray(data)){
				_this.hide();
			}
			if(!isNaN(key)){
				var isNum = true;
			}else if(REG_LETTER.test(key)){
				var isLetter = true;
			}
			var options = _this.options;
			var maxnum = options.maxnum;
			var suggestList = options.textBox.data(DATA_LIST_NAME);
			var $temp = $();
			if(data.length > 0){
				data.sort(function(a,b){
					return a.ref.localeCompare(b.ref);
				});
				$(data).each(function(i,item){
					if(i >= maxnum){
						return;
					}
					var arr = item.ref.split('~');
					var content = [arr[1]];	//加入城市名
				  
					//arr[1] && content.push(arr[1]); //加入省名
					var tempReg = new RegExp(key,'ig');
					if(isNum){
						var areaCode = arr[6];
						var postCode = arr[3];
						if(tempReg.test(areaCode)){
							content.push(areaCode);
						}
						tempReg.lastIndex = 0;	//重置正则表达式的起始索引
						if(tempReg.test(postCode)){
							content.push(postCode);
						}
						tempReg.lastIndex = 0;
					}else if(isLetter){var tempReg = new RegExp(key,'ig');
						var wholeLetter = arr[1];
						var simpleLetter = arr[3];
						if(tempReg.test(wholeLetter)){
							content.push(wholeLetter);
						}

						tempReg.lastIndex = 0;
						if(tempReg.test(simpleLetter)){
							content.push(simpleLetter);
						}
						tempReg.lastIndex = 0;
					}
					content = content.join('-').replace(tempReg,function(match){
						return '<b>'+match+'</b>';
					});
					$temp = $temp.add($('<li>').data('d',arr).html(content));
				});
			}else{
				$temp = $temp.add($('<b class="no-data">'+noDataNotice+'</b>'));
			}
			suggestList.html($temp);
		}
		suggestProp.show = function(){
			var _this = this;
			_this.resetPos();
			var suggestList = _this.options.textBox.data(DATA_LIST_NAME);
			if(suggestList.children().length > 0){
				suggestList.show();
			}
			// _this._tryHide();
		}
		suggestProp.hide = function(){
			var _this = this;
			clearTimeout(_this.data.t);
			var list = _this.options.textBox.data(DATA_LIST_NAME);
			list && list.hide();
		}
		/*清除下拉列表*/
		suggestProp.clear = function(){
			var _this = this;
			var suggestList = _this.options.textBox.data(DATA_LIST_NAME);
			suggestList && suggestList.children().remove();
			_this.hide();
		}
		return Suggest;
	}
	define(function(require){
		require('jquery');
		require('../c/m_search_suggest.css');
		return init();
	});
})();