# 拖拽模块

> 依赖[`m_event.js`](#/docs/modules/event.md){.ajax-link .md}

　　此模块继承自`m_event.js(事件模块)`，所以此模块有事件模块的基本功能。此模块主要实现两个功能 **拖拽功能** ,
 **拖拽布局功能** 。用法需要实例化成对象并传相应参数，如：`new Drag(options)`

**要使用布局时，为美观，样式表应重写`.drag_placeholder`**
> 可参考[layout示例](#/examples/drag/layout.md){.ajax-link .md}

options 可有以下选项
>```
container {Object} //移动元素可移动的容器范围(默认为$(window))
dragHandle {Object} //可以拖动的元素，即响应mousedown事件
getMoveHandle {Function} //得到移动元素，'this' is dragHandle (默认为dragHandle)
getLayoutContainer {Function} //得到拖动元素布局容器
animal {Number|String|Boolean} //设置动画的速度,参考：http://www.w3school.com.cn/jquery/effect_animate.asp (speed)
>```

API如下:
### drag
初始化拖动,[示例](#/examples/drag/drag.md){.ajax-link .md}
```
W.use('m_drag',function(Drag){
	// 1.拖动指定容器里的元素
	new Drag({
		'container': '.container3',
		'dragHandle': '.container3 .moveObj'
	}).drag();
	//2.拖动指定容器及容器里的子元素
	new Drag({
		'dragHandle': '.container4'
	}).drag();
	new Drag({
		'container': '.container4',
		'dragHandle': '.container4 .moveObj'
	}).drag();
	//3.拖动指定容器里的子元素，并指定子元素的鼠标响应范围（或子元素）
	new Drag({
		'container': '.container5',
		'getMoveHandle': function(){
			return $(this).parent();
		},
		'dragHandle': '.container5 .moveTitle'
	}).drag();
});
```
### layout
初始化布局,[示例](#/examples/drag/layout.md){.ajax-link .md}

```javascript
W.use('m_drag',function(Drag){
	// 1.左右两列布局
	var layout1 = new Drag({
		'container': '.container',
		'animal': 200,
		'getLayoutContainer': function($dragHandle){
			if($dragHandle && $dragHandle.length > 0){
				return $dragHandle.closest('ul');
			}
			else{
				return $('.container ul')
			}			
		},
		'dragHandle': '.container li'
	}).layout();
	$('.container input').click(function(){
		layout1.addLayout($('<ul>'));
	});
	//2.上下行布局
	var layout2 = new Drag({
		'container': '.container2',
		'animal': 200,
		'getLayoutContainer': function($dragHandle){
			if($dragHandle && $dragHandle.length > 0){
				return $dragHandle.closest('ul');
			}
			else{
				return $('.container2 ul')
			}			
		},
		'getMoveHandle': function(){
			return $(this).parent();
		},
		'dragHandle': '.container2 li div'
	}).layout();
});
```
---
## 以下API多在使用布局功能时使用
### addDrag
动态添加拖动元素

### removeDrag
删除拖动元素


### addLayout
动态添加布局

### removeLayout
删除布局