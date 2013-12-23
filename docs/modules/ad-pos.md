#caoyu的广告处理方案
针对现在网站上广告对页面的堵塞，严重影响了页面主体数据（包括图片、数据、脚本）显示，考虑页面主体框架优先显示又考虑到广告异步写不能保证百分百正常，新版页面决定采用把广告代码放在底部，然后第一时间完成广告块的定位。

这个方案要求在写页面时要严格按照固定写法。

原理：

一、 common.css里加入
```
.adposter_pos{
	position: absolute;
	left: -10000px;
}
```
二、 `/source/j/ad/caoyu-min.js`里重写`WRATING.PLAY.ACTION`方法,第一时间完成广告外层容器（class="adposter"）的定位

一般样例可以为：

```
<style>
#adpos_1{
	width: 300px;
	height: 50px;
}
</style>
<div class="loading" id="adpos_1"></div>
这里省略N个html结点
<script>
//在整个广告的前面引入
W.js('/source/j/ad/caoyu-min.js');
W.js('/examples/ad/conf.js');
</script>
<div class="ad-container">
	<div class="adposter_pos" data-posid="adpos_1">
		<!--#include virtual="/aposter/adposter_6087.htm"-->
	</div>
</div>
```

>这里一定要注意`<div class="adposter_pos" data-posid="adpos_1"></div>` class不可变，data-posid为要定位到的显示广告的容器ID，这个容器最好有尺寸的样式


-----

### 遇到的问题
此方案会在页面有动态调整某块高度或宽度时，会影响到广告的绝对定位，出现此情况，可以用如下方法解决：
```
try{
	W.util.adPos();//在广告之前加载并初始化完成的化，此方法为undefined
}catch(e){}
```
这种方案当页面的改变在广告代码运行之前会报错，所以**必须用`try{}catch(e){}`**，当页面改变在广告代码运行（即完成某个广告的定位）之后，此方法可正常运行。

## W.util.adPos 用法
参数: `$adposterContainer` 不传此参数时，把所有广告都重新定位
