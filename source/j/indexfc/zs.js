define(function(require) {
	var provinceItem = require('./init').provinceItem;
	var weather = require('./weather');
	//相关指数
	var weather_ZS_Manager = {
		old_index: 0,
		current_index: 0,
		zs: null,
		height: 0,
		timer: null,
		length: 0,
		init: function(obj) {
			this.height = $(obj.Container + ":eq(0)").height();
			this.zs = new weather.ZS({
				Container: obj.Container,
				mask: obj.mask,
				height: this.height
			});
			this.length = $(obj.Container).length;
			weather_ZS_Manager.zs.ItemAnimate(-1, weather_ZS_Manager.current_index);
			this.timer = setInterval(function() {
				weather_ZS_Manager.Animate();
			}, 6000);

			$(obj.Container).hover(function() {
				clearInterval(weather_ZS_Manager.timer);
				if (weather_ZS_Manager.current_index === $(obj.Container).index($(this)[0])) return;
				else {
					weather_ZS_Manager.current_index = $(obj.Container).index($(this)[0]);
					weather_ZS_Manager.zs.ItemAnimate(weather_ZS_Manager.old_index, weather_ZS_Manager.current_index);
					weather_ZS_Manager.old_index = weather_ZS_Manager.current_index;
				}
			}, function() {
				weather_ZS_Manager.timer = setInterval(function() {
					weather_ZS_Manager.Animate();
				}, 6000);
			})
		},
		Animate: function() {
			while (weather_ZS_Manager.current_index === weather_ZS_Manager.old_index) {
				weather_ZS_Manager.current_index = parseInt(Math.random() * weather_ZS_Manager.length);
			}
			weather_ZS_Manager.zs.ItemAnimate(weather_ZS_Manager.old_index, weather_ZS_Manager.current_index);
			weather_ZS_Manager.old_index = weather_ZS_Manager.current_index;
		}
	};
	W(function() {
		//分享到qq空间
		$(".qzone").click(function() {
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(document.location), 'qzone', 'toolbar=0,status=0,width=900,height=760,left=' + (screen.width - 900) / 2 + ',top=' + (screen.height - 760) / 2);
		})
		//分享到新浪微博
		$(".sina").click(function() {
			window.open("http://service.weibo.com/share/share.php?url=" + encodeURIComponent(document.location) + "&title=" + encodeURIComponent(document.title) + '&appkey=%E4%B8%AD%E5%9B%BD%E5%A4%A9%E6%B0%94%E7%BD%91&pic=&ralateUid=1498396803', 'mb', 'toolbar=0,status=0,resizable=1,width=620,height=450,left=' + (screen.width - 620) / 2 + ',top=' + (screen.height - 450) / 2);
		})
		//分享到腾讯微博
		$(".qqweibo").click(function() {
			var _t = encodeURI(document.title);
			var _url = encodeURIComponent(document.location);
			var _appkey = encodeURI("appkey");
			var _pic = encodeURI('http://i.weather.com.cn/images/cn/index/2011/08/03/B7F76A61353CDF36B39B8BC52C74EB2C.jpg');
			var _site = '';
			var _u = 'http://v.t.qq.com/share/share.php?url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic + '&title=' + _t;
			window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
		})
		//分享到人人
		$(".renren").click(function() {
			window.open("http://share.renren.com/share/buttonshare.do?link=" + encodeURIComponent(document.location) + "&title=" + encodeURIComponent(document.title), 'xnshare', 'toolbar=0,status=0,resizable=1,width=626,height=436,left=' + (screen.width - 626) / 2 + ',top=' + (screen.height - 436) / 2);
		})
		//分享到开心
		$(".kaixin").click(function() {
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
		})
		//顶部导航
		$("nav ul li").click(function() {
			var num = $(this).find(".dropList a").length,
				height = parseInt($(this).find(".dropList a").css("line-height").replace("px", ""));
			$(this).find(".dropList i").css({
				"height": height * num + 10
			});
			$(this).find(".dropList").toggle();
		})
		$("nav ul li").mouseleave(function() {
			$(this).find(".dropList").hide();
		})
		$(".dropList").hover(function() {
			$(this).show();
		}, function() {
			$(this).hide();
		})
		//焦点区tab切换动态
		$("#forecast #tabs ul li").hover(function() {
			if ($(this).hasClass("on")) return false;
			var oldIndex = $("#forecast #tabs ul li").index($("#forecast #tabs .on")),
				currIndex = $("#forecast #tabs ul li").index($(this));
			$("#forecast #tabs .on").removeClass("on");
			$(this).addClass("on");
			$("#forecast .mask .items").eq(oldIndex).hide();
			$("#forecast .mask .items").eq(currIndex).show();
			$("#forecast #tabs span ").eq(oldIndex).hide();
			$("#forecast #tabs span ").eq(currIndex).show();
			//选签隐藏及显示
			if (currIndex == 0) {
				$("#forecast h3").show();
			} else {
				$("#forecast h3").hide();
			}
		})

		//推荐/评测
		var tabs02 = new weather.tabs({
			containers: '.block02',
			tabName: '.tabs ul li'
		});
		tabs02.mouseAnimate();

		//专家解读
		var expertTimer = null;
		$("#expert .tabs ul li").hover(function() {
				$(this).addClass("hover");
			},
			function() {
				$(this).removeClass("hover");
			})
		$("#expert .tabs ul li").click(function() {
			if ($(this).hasClass("on")) return;
			if (expertTimer != null) {
				clearInterval(expertTimer);
				expertTimer = null;
			}
			var current = $(this).attr("name");
			var start = 0;
			$(this).siblings().removeClass("on");
			$(this).siblings().addClass("black");
			$(this).addClass("on");
			$(this).removeClass("black");
			expertTimer = setInterval(function() {
				if ($("#expert .items02 #hotNews li").eq(start).find('.' + current).not(".hotNews").length < 1 && current != "hotNews") {
					$("#expert .items02 #hotNews li").eq(start).append($("#expert .items02 #" + current + " li").eq(start).children().clone());
				}
				var expertflip = new weather.flip({
					speed: 150,
					content: $("#expert .items02 ul li").eq(start).find('.' + current).last(),
					current: $("#expert .items02 ul li").eq(start).find('.on'),
					color: $("#expert .items02 ul li").eq(start).find('.' + current).css("background-color")
				});
				start++;
				if (start >= $("#expert .items02 ul li").length)
					clearInterval(expertTimer);
			}, 300);
		})

		weather_ZS_Manager.init({
			Container: '.zs ul li',
			mask: '.area'
		}) //相关指数

		//主要防晒产品排行
		$("#ranking ul li").click(function() {
			if ($(this).hasClass(".on")) return;
			var temp_height = $(this).outerHeight() + $(this).find(".summary").outerHeight();
			$(this).siblings().animate({
				height: $(this).outerHeight()
			}, 500);
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$(this).animate({
				height: temp_height
			}, 500);
		})
		//防晒产品特效
		$(".block03 figure").hover(function() {
				if ($(this).find("figcaption").hasClass("on")) return;
				var temp_height = 0;
				$(this).find("figcaption").children().each(function() {
					temp_height = temp_height + $(this).height();
				})
				$(this).find("figcaption").addClass("on");
				$(this).find("figcaption").stop().animate({
					height: temp_height
				}, 500, "easeInOutQuint");
			},
			function() {
				$(this).find("figcaption").stop().animate({
					height: "40px"
				}, 500, "easeInOutQuint");
				$(this).find("figcaption").removeClass("on");
			})

		$(".icons .province").addClass(provinceItem.n);
		if (provinceItem.id == "10132" || provinceItem.id == "10134"){
			$(".icons .province").html("<a href=\"" + provinceItem.u + "\" target=\"_blank\">" + provinceItem.p + "首页</a>");
		}else {
			if (provinceItem.p.length > 2){
				$(".icons .province").html("<a href=\"http://" + provinceItem.n + ".weather.com.cn\" target=\"_blank\" style=\"font-size:12px;\">" + provinceItem.p + "首页</a>");
			}else{
				$(".icons .province").html("<a href=\"http://" + provinceItem.n + ".weather.com.cn\" target=\"_blank\">" + provinceItem.p + "首页</a>");
			}
		}
	})
});