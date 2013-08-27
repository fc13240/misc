# 拖拽模块——拖动
### 1. 左右两列布局
<div class="example_container">
    <style class="example_css">
    ul{
		list-style: none outside none;
		margin: 0;
		padding: 0;
	}
	li{
		background: #ddd;
		margin: 5px;
		padding: 3px 10px;
		width: 300px;
		word-break:break-all;
	}
	.layout-horizontal{width: 450px;border: 1px dotted #ccc;margin: 20px;}
	.layout-horizontal ul{
		float: left; background: #eee;
		display: inline;
		width: 130px;
		margin: 0 10px;
		padding: 0px;
		padding: 10px 0;}
	.layout-horizontal ul li{width: 100px;}
	.container ul li.drag_placeholder{
		border: 2px dotted #000;
		padding: 1px 8px;
		text-indent: -2000px;
		background: none;
	}
    </style>
    <div class="example_html">
    	<input type="button" value="添加新布局" style="margin-left: 10px;" id="btn-addlayout"/>
    	<br/>
		<div class="container layout-horizontal clearfix">
			<ul>
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
				<li>Four</li>
				<li>Five</li>
			</ul>
			<ul></ul>
		</div>
    </div>
    <script class="example_js">
    W.use('j/m_drag',function(Drag){
		/*************布局****************/
		// 1.左右两列布局
		var layout1 = new Drag({
			'container': '.layout-horizontal',
			'animal': 200,
			'getLayoutContainer': function($dragHandle){
				if($dragHandle && $dragHandle.length > 0){
					return $dragHandle.closest('ul');
				}
				else{
					return $('.layout-horizontal ul')
				}			
			},
			'dragHandle': '.layout-horizontal li'
		}).layout();
		$('#btn-addlayout').click(function(){
			layout1.addLayout($('<ul>'));
			$(this).remove();
		});
	});
    </script>
</div>
### 2. 上下行布局
<div class="example_container">
    <style class="example_css">
    .layout-vertical{
		width: 270px;
		margin: 20px;
		border: 1px dotted #ccc;
	}
	.layout-vertical p{
		padding: 0;
		margin: 0;
	}
	.layout-vertical li div{
		height: 20px;
		margin: -3px -10px;
		margin-bottom: 5px;
		background-color: #ccc;
	}

	.layout-vertical .drag_placeholder{
		border: 2px dotted #333;
		margin: 5px;
		padding: 1px 10px;
		width: 296px;
		color: none;
		display: block;
	}
	.layout-vertical .drag_placeholder div{
		background: none;
	}
	.layout-vertical .drag_placeholder p{
		text-indent: -20000px;
	}
	.layout-vertical ul{
		width: 100%;
		float: left;
		margin: 5px 0;
		padding: 10px 0;
		background-color: #eee;
	}
	.layout-vertical li,
	.layout-vertical .drag_placeholder{
		float: left;
		display: inline;
		width: 60px;
	}
	.layout-vertical .drag_placeholder{
		width: 56px;
	}
    </style>
    <div class="example_html">
    	<div class="layout-vertical clearfix">
			<ul>
				<li data='1'><div></div><p>OneOne</p></li>
			</ul>
			<ul>
				<li data='10'><div></div><p>again1</p></li>
			</ul>
			<ul>
				<li data='11'><div></div><p>One 1</p></li>
				<li data='12'><div></div><p>Two 1</p></li>
				<li data='13'><div></div><p>Three 1</p></li>
				<li data='14'><div></div><p>Four 1</p></li>
				<li data='15'><div></div><p>Five 1</p></li>
				<li data='16' data-notlayout=true><div></div><p><a href="javascript:;">dont layout 1</a></p></li>
			</ul>
			<ul>
				<li data='111'><div></div><p>One 2</p></li>
			</ul>
		</div>
    </div>
    <script class="example_js">
   	W.use('j/m_drag',function(Drag){
    	//2.上下行布局
		var layout2 = new Drag({
			'container': '.layout-vertical',
			'animal': 200,
			'getLayoutContainer': function($dragHandle){
				if($dragHandle && $dragHandle.length > 0){
					return $dragHandle.closest('ul');
				}
				else{
					return $('.layout-vertical ul')
				}			
			},
			'getMoveHandle': function(){
				return $(this).parent();
			},
			'dragHandle': '.layout-vertical li div'
		}).layout();

		setTimeout(function(){
			//这里要外部控制添加顺序，Drag内容维持拖动元素索引
			var tempDrag = $('.layout-vertical li:first').clone().appendTo($('.layout-vertical ul:first')).find('div');
			
			layout2.addDrag(tempDrag);

			setTimeout(function(){
				layout2.removeDrag(tempDrag);
			},2000);
		},1000);
	});
    </script>
</div>
### 3. 上下一列(普通)布局
<div class="example_container">
    <style class="example_css">
    .layout-common{
		width: 300px;
		margin: 20px;
		border: 1px dotted #ccc;
	}
	.layout-common li{
		width: 280px;
		margin-left: 0;
		margin-right: 0;
	}
	.layout-common .drag_placeholder{
		border: 2px dotted #000;
		padding: 1px 8px;
		text-indent: -2000px;
		background: none;
	}
    </style>
    <div class="example_html">
    	<ul class="container layout-common">
			<li>One</li>
			<li>Two</li>
			<li>Three</li>
			<li>Four</li>
			<li>Five</li>
		</ul>
    </div>
    <script class="example_js">
    W.use('j/m_drag',function(Drag){
	    //普通布局
		new Drag({
			'container': '.layout-common',
			'dragHandle': '.layout-common li'
		}).layout();
	});
    </script>
</div>

<script>W.use(W.data.base+'../../libs/js/m_show_code');</script>