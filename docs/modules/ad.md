# caoyu广告异步解决方案
针对现在网站上广告对页面的堵塞(前提：广告系统生成固定代码，更新此模板不太现实),现采用此异步方案。
但此方案有一个弊端：就是`caoyu-min.js`和`http://ad.321tq.com/ex2?posid=d`得特殊处理，参考处理过的`j/ad/caoyu-min.js`和`j/ad/ex2.js`,
此方案要在前端服务器上每天抓取这两个文件并生成相应的处理后文件（随后会写生成脚本）。

用法如下：**在所有广告代码之前**引入广告处理代码（此代码会自动加载依赖文件）,现有广告代码逻辑及用法不变，处理程序用在`W(function(){})`
回调里处理所有广告代码（生成iframe并运行广告代码），整体达到一个异步效果，不再堵塞页面。
```
<script>
// 在所有广告代码前引入处理脚本
W.js('../../source/j/ad/caoyu.js');
</script>
```
处理程序在每个广告的iframe外面的div上加了一个`async-ad`的样式，重写这个样式可以实现不同的loading效果。
```
.async-ad{
	background:url(http://www.weather.com.cn/m2/i/index/loading.gif) center center no-repeat;
	background-color: #eee;
	font-size: 0;
}
```

<h3><a href="/examples/ad/caoyu.md" target="_blank">示例</a></h3>