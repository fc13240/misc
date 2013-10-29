# 封装的搜索框

<div class="example_container mt20">
    <style class="example_css">
    #txtZip{
    	width: 404px;
		height: 26px;
		line-height: 26px;
		text-indent: 4px;
		margin-top: 2px;
		font-size: 18px;
       	height: 22px;
		margin-top: 0;
		line-height: 22px;
    }
    #btnZip{
    	border: none;
		background: url(http://www.weather.com.cn/m2/i/btn_headerschsmall.jpg) no-repeat;
		width: 70px;
		height: 29px;
		margin-left: 0px;
    }
    </style>
    <div class="example_html">
        <div id="ZipContent" class="clearfix">
			<input type="text" class="textinput fl" id="txtZip" placeholder="输入城市名、全拼、简拼、电话区号、邮编查询"/>
			<input type="button" class="btn fl" id="btnZip"/>
		</div>
    </div>
    <script class="example_js">
    W.use('j/tool/search',function(search){
    	var inputText = $('#txtZip');
        var btnZip = $('#btnZip');
        search(inputText,btnZip);
    });
    </script>
</div>