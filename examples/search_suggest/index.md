# 文本框搜索提示模块
<div class="example_container">
    <style class="example_css">
    body{
    	font-family: "SimSun","宋体","Arial","HELVETICA","sans-serif";
		color: #000;
    }
    #text_simple{
    	width: 400px;
    }
    </style>
    <div class="example_html">
    	<input type="text" id="text_simple"/>
    </div>
    <script class="example_js">
    W.use('j/m_search_suggest',function(Suggest){
    	var $textBox = $('#text_simple');
    	new Suggest({
    		'textBox': $textBox
    		,'bindEvent': false
    		,'onSelect': function(data){
    			$textBox.val(data[2]+data[0]);
    		}
    	});
    });
    </script>
</div>
<div class="example_container">
    <style class="example_css">
    #text_fuza{
    	width: 400px;
    }
    </style>
    <div class="example_html">
    	<input type="text" id="text_fuza" value="请输入内容"/>
    </div>
    <script class="example_js">
    W.use('j/m_search_suggest',function(Suggest){
    	var text = "请输入内容";
    	var $textBox = $('#text_fuza').focus(function(){
    		if($(this).val() == text){
    			$(this).val('');
    		}
    	}).blur(function(){
    		if(!$(this).val()){
    			$(this).val(text)
    		}
    	});
    	new Suggest({
    		'textBox': $textBox
    		,'bindEvent': false
    		,'onSelect': function(data){
    			$textBox.val(data[2]+data[0]);
    		}
    	});
    });
    </script>
</div>