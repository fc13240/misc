(function(){
	/*
	重写document.write(ln)实现广告代码的异步载入，可能调用document.write(ln)的情况如下：
	1.页面直接调用
		1) 直接document.write
		2) 调用外部文件调用document.write
	2.在某回调函数中输出页面代码
		1) 直接输出内连脚本
		2) 输出外部脚本,同步加载完成后再调用document.write(ln)
	
	解决方案：先调用真实的document.write(ln)输出点位符
	1. 直接输出点位符
	2. 1) 直接输出点位符
	   2) 把当前的<script src=""></script>替换成点位符
	*/
})();