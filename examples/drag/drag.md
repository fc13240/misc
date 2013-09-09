# 拖拽模块——拖动
### 1. 以整个浏览器为容器 
> **<font color="red">目前不支持body设置宽度及position:relative的页面</font>**

<div class="example_container">
    <style class="example_css">
    .container{width: 90%;height: 200px;margin: 10px auto;background: #ccc;}
    .move_body{width: 50px;height: 50px;background: #666;}
    </style>
    <div class="example_html">
        <div class="container">
            <div class="move_body" id="move_in_window"></div>
        </div>
    </div>
    <script class="example_js">
    W.use('j/m_drag',function(Drag){
        new Drag({
            'dragHandle': '#move_in_window'
        }).drag();
    });
    </script>
</div>

### 2. 以指定元素为容器
<div class="example_container">
    <style class="example_css">
    </style>
    <div class="example_html">
        <div class="container drag_in_container">
            <div class="move_body"></div>
        </div>
    </div>
    <script class="example_js">
    W.use('j/m_drag',function(Drag){
        new Drag({
            'container': '.drag_in_container',
            'dragHandle': '.drag_in_container .move_body'
        }).drag();
    });
    </script>
</div>

### 3. 以指定元素为拖动元素
<div class="example_container">
    <style class="example_css">
    .drag_in_container_special_drag .drag_body{height: 20px;background: #333;}
    .drag_in_container_special_drag .move_body{width: 100px;height: 80px;}
    </style>
    <div class="example_html">
        <div class="container drag_in_container_special_drag">
            <div class="move_body">
                <div class="drag_body"></div>
            </div>
        </div>
    </div>
    <script class="example_js">
    W.use('j/m_drag',function(Drag){
        new Drag({
            'container': '.drag_in_container_special_drag',
            'dragHandle': '.drag_in_container_special_drag .drag_body',
            'getMoveHandle': function(){
                return $(this).parent();
            },
        }).drag();
    });
    </script>
</div>

### 4. 嵌套拖动元素
<div class="example_container">
    <style class="example_css">
    .drag_in_container_nest_drag{height: 300px;}
    .drag_in_container2{width: 300px;height: 200px;}
    .drag_in_container2 .move_body{background: #333;}
    </style>
    <div class="example_html">
        <div class="container drag_in_container_nest_drag">
            <div class="move_body drag_in_container2">
                <div class="move_body"></div>
            </div>
        </div>
    </div>
    <script class="example_js">
    W.use('j/m_drag',function(Drag){
        new Drag({
            'container': '.drag_in_container_nest_drag',
            'dragHandle': '.drag_in_container_nest_drag .drag_in_container2'
        }).drag();

        new Drag({
            'container': '.drag_in_container2',
            'dragHandle': '.drag_in_container2 .move_body'
        }).drag();
    });
    </script>
</div>