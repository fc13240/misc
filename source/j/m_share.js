define(function() {
	return function(m) {
		switch (m) {
			case 'qq':
				window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(document.location), 'qzone', 'toolbar=0,status=0,width=900,height=760,left=' + (screen.width - 900) / 2 + ',top=' + (screen.height - 760) / 2);
				break;
			case 'sina':
				window.open("http://service.weibo.com/share/share.php?url=" + encodeURIComponent(document.location) + "&title=" + encodeURIComponent(document.title) + '&appkey=%E4%B8%AD%E5%9B%BD%E5%A4%A9%E6%B0%94%E7%BD%91&pic=&ralateUid=1498396803', 'mb', 'toolbar=0,status=0,resizable=1,width=620,height=450,left=' + (screen.width - 620) / 2 + ',top=' + (screen.height - 450) / 2);
				break;
			case 'qqweibo':
				var _t = encodeURI(document.title);
				var _url = encodeURIComponent(document.location);
				var _appkey = encodeURI("appkey");
				var _pic = encodeURI('http://i.weather.com.cn/images/cn/index/2011/08/03/B7F76A61353CDF36B39B8BC52C74EB2C.jpg');
				var _site = '';
				var _u = 'http://v.t.qq.com/share/share.php?url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic + '&title=' + _t;
				window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
				break;
			case 'renren':
				window.open("http://share.renren.com/share/buttonshare.do?link=" + encodeURIComponent(document.location) + "&title=" + encodeURIComponent(document.title), 'xnshare', 'toolbar=0,status=0,resizable=1,width=626,height=436,left=' + (screen.width - 626) / 2 + ',top=' + (screen.height - 436) / 2);
				break;
			case 'kaixin':
				var kw = window.open('', 'kaixin001', 'toolbar=no,titlebar=no,status=no,menubar=no,scrollbars=no,location:no,directories:no,width=570,height=350,left=' + (screen.width - 570) / 2 + ',top=' + (screen.height - 420) / 2);
				var tempForm = kw.document.createElement('form');

				function openPostWindow(url, data, name) {
					var tempForm = document.createElement('form');
					tempForm.id = 'tempForm1';
					tempForm.method = 'post';
					tempForm.action = url;
					tempForm.target = 'kaixin001';
					var hideInput = document.createElement('input');
					hideInput.type = 'hidden';
					hideInput.name = 'rcontent';
					hideInput.value = data;
					tempForm.appendChild(hideInput);
					document.body.appendChild(tempForm);
					tempForm.submit();
					document.body.removeChild(tempForm);
				}

				function add2Kaixin001() {
					var u = document.location.href;
					var t = document.title;
					var c = '' + (document.getSelection ? document.getSelection() : document.selection.createRange().text);
					var iframec = '';
					var url = 'http://www.kaixin001.com/repaste/bshare.php?rtitle=' + encodeURIComponent(t) + '&rurl=' + encodeURIComponent(u) + '&from=maxthon';
					var data = encodeURIComponent(c);
					openPostWindow(url, c, '_blank')
				}
				add2Kaixin001();
				break;
		}
	}

});