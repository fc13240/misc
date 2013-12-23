# 天气网产品播放器
> 依赖 `c/m_player.css`、`jquery`

> 重写`m_player.css`可实现播放器不同样式展示效果

options 可有以下选项
```
href {String} //数据源地址
isNotice {Boolean} //是否显示提示信息，鼠标移动到进度条上提示时间
parseData {Function} //解析数据源数据成指定格式
```

defaultData (parseData返回数据) 数据格式如下：
```
zone {String} //地区名
name {String} //数据类型名称
data {Array} //数据数组
	t {String} //时间
	s {String} //小图地址
	m {String} //中图地址
	l {String} //大图地址
index {Number} //选中索引
showsize {String} //显示的数据键名
```

<div class="example_container" style="margin-top:20px">
    <style class="example_css">
    .container{
		position: relative;
		background-color: #eee;
	}
	.player .toolbar div.progress{
		width: 350px;
	}
	#player_container{
		margin: 20px;
	}
    </style>
    <div class="example_html">
    	<div class="container" id="player_container" style="width:600px;"></div>
		<input type="button" value="逐小时降水" class="btn_change" data-href="http://i.weather.com.cn/i/product/json/jsl/JC_JSL_1HR.html"/>
		<input type="button" value="全国降水" class="btn_change" data-href="http://i.weather.com.cn/i/product/json/jsl/JC_JSL_02405.html"/>
    </div>
    <script class="example_js">
    W.use('j/m_player',function(Player){
    	W(function(){
    		var player = new Player($('#player_container'));
			//若数据格式不是默认的处理，可重写配置中的‘parseData’，返回如：
			//{'zone':'中国','name':'降水量',data:[{{'t':'2013-07-25 05:35','s':'','m':'','l':''}}],'index':0,'showsize':'m'};
			$('.btn_change').click(function(){
				var href = $(this).data('href');
				player.config({
					href: href
				});
			}).eq(0).click();
    	})
    });
    </script>
</div>