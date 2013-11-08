define(function(require) {
	require('./W');
	(function(global) {
		(function(hotZS) {
			//热点指数配置
			hotZS.config = [{
				"type": "life",
				"zs": [{
					"xc": "适宜|不宜"
				}, {
					"ct": "炎热|热|冷|寒冷"
				}, {
					"co": "舒适|暖|热|寒冷|十分寒冷"
				}, {
					"pl": "优|较差|很差"
				}, {
					"fs": "强|极强"
				}, {
					"ys": "不带伞"
				}]
			}, {
				"type": "trav",
				"zs": [{
					"tr": "很适宜|适宜|较不宜"
				}]
			}, {
				"type": "busi",
				"zs": [{
					"tr": "很适宜|适宜|较不宜"
				}, {
					"ct": "炎热|热|冷|寒冷"
				}, {
					"co": "舒适|暖|热|寒冷|十分寒冷"
				}, {
					"pl": "优|较差|很差"
				}, {
					"uv": "强|极强"
				}, {
					"ys": "不带伞"
				}]
			}, {
				"type": "male",
				"zs": [{
					"xc": "适宜|不宜"
				}, {
					"ct": "炎热|热|冷|寒冷"
				}, {
					"co": "舒适|暖|热|寒冷|十分寒冷"
				}, {
					"ys": "不带伞"
				}]
			}, {
				"type": "fema",
				"zs": [{
					"ct": "炎热|热|冷|寒冷"
				}, {
					"co": "舒适|暖|热|寒冷|十分寒冷"
				}, {
					"fs": "强|极强"
				}]
			}, {
				"type": "chil",
				"zs": [{
					"ct": "炎热|热|冷|寒冷"
				}, {
					"gz": "干燥|非常干燥"
				}, {
					"co": "舒适|暖|热|寒冷|十分寒冷"
				}, {
					"fs": "强|极强"
				}]
			}, {
				"type": "elde",
				"zs": [{
					"ct": "炎热|热|冷|寒冷"
				}, {
					"co": "舒适|暖|热|寒冷|十分寒冷"
				}, {
					"fs": "强|极强"
				}]
			}];
			//初始化
			hotZS.init = function(el, html, level, notice, mask) {
				hotZS.el = el;
				hotZS.level = level;
				hotZS.notice = notice;
				hotZS.height = $(el).height();
				hotZS.oldIndex = -1;
				hotZS.length = $(el).length;
				$(el).each(function() {
					$(this).append(html);
				})
				hotZS.selTab("all");
				hotZS.zs = new W.ZS({
					"Container": el,
					"mask": mask,
					"height": hotZS.height
				});
				hotZS.setAnimate();
			};
			//选择分类
			hotZS.selTab = function(type) {
				if (type == "all") {
					$(hotZS.el).show();
					$(hotZS.el).find(hotZS.notice).hide();
					return false;
				}
				for (var i = 0, ii = hotZS.config.length; i < ii; i++) {
					if (hotZS.config[i].type == type) {
						$(hotZS.el).hide();
						for (var key in hotZS.config[i].zs) {
							for (var result in hotZS.config[i].zs[key]) {
								$(hotZS.el + " ." + result).parent().show();
								var temp_level = hotZS.config[i].zs[key][result].split("|");
								for (var j = 0, jj = temp_level.length; j < jj; j++) {
									if ($(hotZS.el + " ." + result).find(hotZS.level).text() == temp_level[j]) {
										$(hotZS.el + " ." + result).parent().find(hotZS.notice).show();
										break;
									}
								}
							}
						}
						break;
					}
				}
			};
			//瓷片翻转
			hotZS.flip = function(num) {
				if (num !== hotZS.curIndex) {
					clearInterval(hotZS.timer);
					hotZS.timer = null;
					hotZS.curIndex = num;
				}
				hotZS.zs.ItemAnimate(hotZS.oldIndex, num);
				hotZS.oldIndex = num;
			};
			//动画效果
			hotZS.setAnimate = function() {
				hotZS.timer = setInterval(function() {
					hotZS.curIndex = W.createRandom(hotZS.oldIndex, hotZS.length);
					hotZS.zs.ItemAnimate(hotZS.oldIndex, hotZS.curIndex);
					hotZS.oldIndex = hotZS.curIndex;
				}, 6000);
			};
		})(global.hotZS || (global.hotZS = {}));
	})(this.W || (this.W = {}));

	//热点指数
	W.hotZS.init("#todayliving ul li", "<span class=\"notice\"></span>", ".detail b", ".notice", ".area");
	$("#todayliving .title span").click(function() {
		W.hotZS.selTab($(this).attr("data-role"));
		try{
		    W.util.adPos();//在广告之前加载并初始化完成的化，此方法为undefined
		}catch(e){}
	})
	$("#todayliving li").hover(function() {
		var index = $("#todayliving li").index($(this));
		W.hotZS.flip(index);
	}, function() {
		W.hotZS.setAnimate();
	})
})