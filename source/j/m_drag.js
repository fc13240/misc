(function(){
	var MOUSEOVER_CLASS = 'drag_mouseover';
	var DRAG_CONTAINER_CLASS = 'drag_container';
	var DRAG_MOVE_CLASS = 'drag_move';
	var DRAG_PLACEHOLDER_CLASS = 'drag_placeholder';
	var DRAG_OPACITY_CLASS = 'drag_opacity';
	var DRAG_MOVE_ON_CLASS = 'on';

	var STR_MOUSEDOWN = 'mousedown';
	var STR_MOUSEMOVE = 'mousemove';
	var STR_MOUSEUP = 'mouseup';
	var STR_MOUSEENTER = 'mouseenter';
	var STR_MOUSELEAVE = 'mouseleave';

	var EVENT_START_MOVE = 'startmove';
	var EVENT_MOVE = 'move';
	var EVENT_END_MOVE = 'endmove';

	var METHOD_AFTER = 'insertAfter';
	var METHOD_BEFORE = 'insertBefore';

	var LAYOUT_HORIZONTAL = 1;//上下布局
	var LAYOUT_ORIENTATION = 2;//左右布局
	var isMoving = false;

	function init(Event){
		var $doc = $(document);
		//forbade document select
		$doc.on('selectstart',function(){
			return !isMoving; 
		});
		var defaultConfig = {
			'container': $(window)//移动元素可移动的容器范围
			,'dragHandle': null//可以拖动的元素，即响应mousedown事件
			,'getMoveHandle': function(){//得到移动元素，'this' is dragHandle
				return $(this);
			}
			,'getLayoutContainer': null//得到拖动元素布局容器
			,'animal': false//设置动画的速度,参考：http://www.w3school.com.cn/jquery/effect_animate.asp (speed)
		};
		var _inherits = W.util.inherits;
		/*得到元素的宽度*/
		var _width = function($obj,isWindow){
			return isWindow?$obj.width():$obj.get(0).offsetWidth;
		}
		/*得到元素的高度*/
		var _height = function($obj,isWindow){
			return isWindow?$obj.height():$obj.get(0).offsetHeight;
		}
		/*当前元素是否不参加布局，即这个元素不可拖动*/
		var _isnotLayout = function($obj){
			return !!$obj.data('notlayout');
		}
		var Drag = _inherits(Event,{
			'init': function(config){
				var _this = this;
				_this.config = config = $.extend({},defaultConfig,config);
				var getMoveHandle = config.getMoveHandle;
				config.getMoveHandle = $.isFunction(getMoveHandle)? 
				function($relativeObj){
					return getMoveHandle.call($relativeObj||$dragHandle);
				}:function($relativeObj){
					return $relativeObj || $dragHandle;
				}
				/*得到布局最小容器*/
				var getLayoutContainer = config.getLayoutContainer;
				config.getLayoutContainer = $.isFunction(getLayoutContainer)?function($obj){
					return getLayoutContainer($obj);
				}:function($obj){
					//保持和添加的临时div一致
					return $container.find('.'+DRAG_CONTAINER_CLASS).slice(0);//防止后面直接类数组操作
				}
				//存数据，文件扩展
				var data = _this.data = {};

				var $container = $(config.container);
				var isWin = data['isWin'] = $container.is($(window));
				if(isWin){
					$('body').addClass(DRAG_CONTAINER_CLASS);
				}else{
					// 把子元素用新元素包起来，防止容器元素的float和position:relative冲突
					var $tempContainer = $('<div>').addClass(DRAG_CONTAINER_CLASS);
					$container.wrapInner($tempContainer);
				}
				var $dragHandle = $(config.dragHandle);
				_this._initDragEvent($dragHandle);
				data['dragHandle'] = $dragHandle;
				data['container'] = $container;
			}
			,'prototype': {
				/*初始化拖动元素事件*/
				'_initDragEvent': function($dragHandle){
					var _this = this;
					var _getMoveHandle = _this.config.getMoveHandle;
					$dragHandle.on(STR_MOUSEENTER,function(e){
						var _t = this;
						e.target = _t;
						_this.emit(STR_MOUSEENTER,e);
						var $this = $(_t);
						if(!_isnotLayout(_getMoveHandle($this))){
							$this.addClass(MOUSEOVER_CLASS);
						}
					}).on(STR_MOUSELEAVE,function(e){
						var _t = this;
						e.target = _t;
						_this.emit(STR_MOUSELEAVE,e);
						var $this = $(_t);
						if(!_isnotLayout(_getMoveHandle($this))){
							$this.removeClass(MOUSEOVER_CLASS);
						}
					}).on(STR_MOUSEDOWN,function(e){
						//只允许鼠标左键,jquery e.which 1:左键;2:中键;3:右键
						if(e.which != 1){
							return;
						}
						e.target = this;
						_this.emit(STR_MOUSEDOWN,e);
					}).on(STR_MOUSEUP,function(e){
						e.target = this;
						_this.emit(STR_MOUSEUP,e);
					});
				},
				/*拖动*/
				'drag': function(isFromLayout){
					var _this = this;
					var config = _this.config;
					var data = _this.data;

					var isWin = data['isWin'];
					var $win = $(window);
					var $container = data['container'];
					
					var $dragHandle = data['dragHandle'];
					//鼠标按下事件
					_this.on(STR_MOUSEDOWN,function(e_mousedown){
						e_mousedown.stopPropagation();
						var $this = $(e_mousedown.target);
						var $moveHandle = config.getMoveHandle($this);
						if(_isnotLayout($moveHandle)){
							return;
						}
						isMoving = true;
						_this.emit(EVENT_START_MOVE,e_mousedown);
						var $moveObj = $moveHandle;

						var c_width = _width($container,isWin);
						var c_height = _height($container,isWin);
						var m_height = _height($moveObj);
						var m_width = _width($moveObj);
						var x_down = e_mousedown.clientX;
						var y_down = e_mousedown.clientY;
						var m_offset = $moveObj.offset();
						var m_left = m_offset.left;
						var m_top = m_offset.top;
						var x_cha = x_down - m_left;
						var y_cha = y_down - m_top;
						if(isWin){
							var c_left = 0;
							var c_top = 0;
						}else{
							var c_offset = $container.offset();
							var c_left = c_offset.left;
							var c_top = c_offset.top;
						}

						var _resetPos = function(e){
							var x_move = e.clientX;
							var y_move = e.clientY;
							var min_left = min_top = 0;
							if(isWin){
								min_left = $win.scrollLeft(),
								min_top = $win.scrollTop();
							}
							var left = x_move - c_left - x_cha;
							left < min_left && (left = min_left);

							var top = y_move - c_top - y_cha;
							top < min_top && (top = min_top);

							left + m_width - min_left > c_width && (left = c_width - m_width + min_left);
							top + m_height - min_top > c_height && (top = c_height - m_height + min_top);

							var _offset = {'left': left,'top': top};
							$moveObj.css(_offset);
							return _offset;
						}
						!isFromLayout && _resetPos(e_mousedown);
						$moveHandle.addClass(DRAG_MOVE_CLASS).addClass(DRAG_MOVE_ON_CLASS);
						//鼠标移动事件
						$doc.on(STR_MOUSEMOVE,function(e_mousemove){							
							var _offset = _resetPos(e_mousemove);
							e_mousemove.target = $this;//reset e.target
							_this.emit(EVENT_MOVE,$.extend({'w':m_width,'h':m_height,'cw':c_width,'ch': c_height,'cl':c_left,'ct':c_top},e_mousemove,_offset));
						});
						var fn_clear = function(){
							$doc.off(STR_MOUSEMOVE);
							$doc.off(STR_MOUSEUP);
							$moveObj.removeClass('on');
							isMoving = false;
							_this.emit(EVENT_END_MOVE);
						}
						//鼠标抬起时清除事件
						$doc.on(STR_MOUSEUP,fn_clear).on(STR_MOUSELEAVE,fn_clear);
					});
					return _this;
				}
				/*布局*/
				,'layout': function(){
					var ALLOWANCE = 10;//把最佳位置时的容差
					var _this = this;
					var config = _this.config;
					var data = _this.data;
					var $dragHandles = data['dragHandle'];
					var getMoveHandle = config.getMoveHandle;
					var _getLayoutContainer = config.getLayoutContainer;
					var currentMoveHandle,placeholderMoveHandle,currentPlaceholderIndex,oldPlaceholderIndex,newPlaceholderIndex;
					/*设置索引*/
					var _resetIndex = function($obj){
						oldPlaceholderIndex = currentPlaceholderIndex = $dragHandles.index($obj);
					}
					var ttChange;
					/*重置点位*/
					var _resetPlaceholder = function(method,$relativeObj){
						clearTimeout(ttChange);
						ttChange = setTimeout(function(){
							if(oldPlaceholderIndex != newPlaceholderIndex || 
								//从另一个容器过来时，可以索引是一样的
								!$relativeObj.is(_getLayoutContainer($dragHandles.eq(newPlaceholderIndex)))
							){
								$dragHandles.splice(newPlaceholderIndex,0,$dragHandles.splice(oldPlaceholderIndex,1).shift());
								placeholderMoveHandle[method]($relativeObj);
							}
						},10);//防止操作过快，出现抖动现象
					}
					var currentMousePos = [];//当前鼠标的位置
					//开始拖动
					_this.on(EVENT_START_MOVE,function(e){
						currentMousePos = [e.pageX,e.pageY];
						currentMoveHandle && currentMoveHandle.stop(true,true);
						var dragHandle = $(e.target);;
						_resetIndex(dragHandle);
						currentMoveHandle = getMoveHandle(dragHandle);
						currentMoveHandle.css(currentMoveHandle.position()).addClass(DRAG_OPACITY_CLASS);//reset position
						//添加点位符
						placeholderMoveHandle = currentMoveHandle.clone(true).addClass(DRAG_PLACEHOLDER_CLASS).insertAfter(currentMoveHandle);
					})
					//拖动时，点位符处理
					.on(EVENT_MOVE,function(data){
						var x = data.pageX,y = data.pageY;
						var MIN_SIZE = 1;//判断鼠标移动方向容差
						var isToLeft = x < currentMousePos[0];//鼠标是否向左

						var isToTop = y < currentMousePos[1];//鼠标是否向上
						currentMousePos = [x,y];
						var dragHandle = $(data.target);
						_resetIndex(dragHandle);
						// var left = data.left;
						// var top = data.top;
						// var width = data.w;
						// var height = data.h;
						// var middle_left = left+width/2,
						// 	middle_top = top+height/2;

						//以拖拽元素计算中心点
						var _moveObj = getMoveHandle(dragHandle);//拖拽元素可能和移动元素一样
						var _offset = _moveObj.is(dragHandle)?{left:0,top:0}:dragHandle.position();
						var left = _offset.left+data.left;
						var top = _offset.top+data.top;
						var widthMove = data.w;
						var heightMove = data.h;
						var width = _width(dragHandle);
						var height = _height(dragHandle);
						var middle_left = left+width/2,
							middle_top = top+height/2;
						//测试中心点运动轨迹
						// $('<div class="test"></div>').css({'position':'absolute',left:middle_left,top:middle_top,width:'1','height':1,'background':'red','font':0}).appendTo(dragHandle.closest('.'+DRAG_CONTAINER_CLASS));
						//寻找最合适的点位符
						for(var i = $dragHandles.length-1;i>=0;i--){
							var $dragHandle = $dragHandles.eq(i);
							var moveObj = getMoveHandle($dragHandle);
							var offset = moveObj.position();//统一以offset计算
							var m_left = offset.left;
							var m_top = offset.top;
							var m_width = _width(moveObj);
							var m_height = _height(moveObj);
							//根据拖动元素的中心点，找到合适的占位符位置
							if(m_left < middle_left && m_left + m_width > middle_left && m_top < middle_top && m_top + m_height > middle_top){
								
								if(!dragHandle.is($dragHandle) && !_isnotLayout(moveObj)){
									//对要进行的换位进行校验，防止出现小放到大的上出现抖动现象
									if((m_left < middle_left && m_left + widthMove > middle_left && m_top < middle_top && m_top + heightMove > middle_top)){
										newPlaceholderIndex = i;
										var method = METHOD_BEFORE;
										var _child = _getLayoutContainer($dragHandle).children();
										var _index = _child.index(getMoveHandle($dragHandle));
										if(_index == 0){
											newPlaceholderIndex = i - 1;
										}
										//向靠右元素靠近并且此元素可以布局
										if((i > currentPlaceholderIndex || _index == _child.length-1)){
											if(_index > 0){
												method = METHOD_AFTER;
											}
										}
										_resetPlaceholder(method,moveObj);
										return
									}
									
								}
							}
						}
						// return;
						
						//if not suitable,insertAfter the last child of layout container or appendTo the layout container						 
						//得到最近的一个容器
						var layoutContainer = _getLayoutContainer();
						var $tempObjLayout,
							layout_for_container;
						layoutContainer.each(function(){
							var $this = $(this);									
							var offset = $this.position();//统一以offset计算
							if($tempObjLayout){
								layout_for_container = m_left == $tempObjLayout.position().left?LAYOUT_HORIZONTAL:LAYOUT_ORIENTATION;
							}
							$tempObj = $this;
						});
						var closestContainer = layoutContainer.first();
						layoutContainer.each(function(){
							var $this = $(this);
							var _offset = $this.position();
							var _offset_closest = closestContainer.position();
							if(layout_for_container == LAYOUT_HORIZONTAL){
								if(Math.abs(_offset.top + _height($this)/2 - middle_top) < Math.abs(_offset_closest.top + _height(closestContainer)/2 - middle_top)){
									closestContainer = $this;
								}
							}else{
								if(Math.abs(_offset.left + _width($this)/2 - middle_left) < Math.abs(_offset_closest.left + _width(closestContainer)/2 - middle_left)){
									closestContainer = $this;
								}
							}
						})
						//正在拖动的元素或占位元素在最近的容器内，直接返回
						if(closestContainer.is(_getLayoutContainer(dragHandle)) || closestContainer.is(_getLayoutContainer(placeholderMoveHandle))){
							return;
						}
						var closestChildren = closestContainer.children();
						//容器内没有元素时，直接追加占位符
						if(closestChildren.length == 0){
							placeholderMoveHandle.appendTo(closestContainer);
							return;
						}else{
							//占位符已经在容器内，直接返回
							if(closestChildren.last().is(placeholderMoveHandle)){
								return;
							}
							if(closestChildren.length == 1){
								var toPlace = closestChildren.first();
							}else{
								var distanceArr = [];
								var layout = LAYOUT_HORIZONTAL;
								var $tempObj;
								var childArr = closestChildren.filter(function(){
									return !_isnotLayout($(this))
								});
								
								childArr.each(function(i,v){
									var $this = $(this);									
									var offset = $this.position();//统一以offset计算
									var m_left = offset.left;
									var m_top = offset.top;
									var m_width = _width($this);
									var m_height = _height($this);
									if(m_left < middle_left && m_left + m_width > middle_left && m_top < middle_top && m_top + m_height > middle_top){
										distanceArr[i] = Number.MIN_VALUE;
									}else{
										distanceArr[i] = Math.pow(middle_left - m_left - m_width/2,2) + Math.pow(middle_top - m_top - m_height/2,2);
									}
									
								});
								closestChildren.each(function(){
									var $this = $(this);									
									var offset = $this.position();//统一以offset计算
									if($tempObj){
										layout = m_left == $tempObj.position().left?LAYOUT_HORIZONTAL:LAYOUT_ORIENTATION;
									}
									$tempObj = $this;
								});
								var minDistance = Math.min.apply(Math,distanceArr);
								var minIndex = $.inArray(minDistance,distanceArr);
								var toPlace = childArr.eq(minIndex);
							}
							if(!toPlace.length){
								toPlace = closestContainer.children().last();
							}
							var method = METHOD_BEFORE;
							
							var _offset = toPlace.position();
							var _m_left = _offset.left + _width(toPlace)/2;
							var _m_top = _offset.top + _height(toPlace)/2;
							//计算添加的相对位置
							if((layout == LAYOUT_HORIZONTAL && middle_top > _m_top) || (layout == LAYOUT_ORIENTATION && middle_left > _m_left)){
								method = METHOD_AFTER;
							}
							//计算新的点位符的索引
							var num = 0;
							for(var i = 0,j=layoutContainer.length;i<j;i++){
								var layoutC = layoutContainer.eq(i);
								num += layoutC.children().filter(function(){
									return $(this).is(getMoveHandle())
								}).length;
								if(layoutC.is(closestContainer)){
									break;
								}
							}
							newPlaceholderIndex = num;
							_resetPlaceholder(method,toPlace);
							return;
						}
					})
					//拖动结束时，处理点位符及拖动元素
					.on(EVENT_END_MOVE,function(){
						var fn = function(){
							placeholderMoveHandle.replaceWith(currentMoveHandle.removeClass(DRAG_MOVE_CLASS).removeClass(DRAG_OPACITY_CLASS));
						}
						if(config.animal !== false){
							currentMoveHandle.animate(placeholderMoveHandle.position(),config.animal||'fast',fn);
						}else{
							fn();
						}		
					});
					//开启拖动
					return _this.drag.call(_this,true);
				}
				/*临时添加布局*/
				,'addLayout': function($layoutContainer){
					this.data['container'].children().first().append($layoutContainer);
				}
				/*删除布局及子元素，包括拖动元素*/
				,'removeLayout': function($layoutContainer){
					var _this = this;
					var _getMoveHandle = _this.config.getMoveHandle;
					var removeLayoutChild = $layoutContainer.remove().children();
					for(var dhs = _this.data['dragHandle'],i = 0;i<dhs.length;i++){
						if(removeLayoutChild.index(_getMoveHandle(dhs.eq(i))) > -1){
							dhs.splice(i,1);
						}
					}
				}
				/*添加拖动元素*/
				,'addDrag': function($dragHandle){
					var _this = this;
					var config = _this.config;
					var data = _this.data;
					var layoutContainer = config.getLayoutContainer();
					var num = 0;
					var tempMoveHandle = config.getMoveHandle($dragHandle);
					for(var i = 0,j=layoutContainer.length;i<j;i++){
						var layoutC = layoutContainer.eq(i).children();
						var _index = layoutC.index(tempMoveHandle);
						if(_index > -1){
							num += _index;
							break;
						}else{
							num += layoutC.length;	
						}
					}
					_this._initDragEvent($dragHandle);//给新添加的拖动元素添加事件
					data['dragHandle'].splice(num,0,$dragHandle.get(0));//get(0)保持jquery数组中原始元素
				}
				/*删除拖动元素*/
				,'removeDrag': function($dragHandle){
					var _this = this;
					var config = _this.config;
					var data = _this.data;
					var $dragHandles = data['dragHandle'];
					$dragHandles.splice($dragHandles.index($dragHandle),1);
					config.getMoveHandle($dragHandle).remove();
				}
			}
		});
		return Drag;
	}
	define(function(require){
		var Event = require('j/m_event');
		require('jquery');
		require('j/global');
		require('c/m_drag.css');
		return init(Event);
	});
})();