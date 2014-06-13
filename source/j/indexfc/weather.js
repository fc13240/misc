define(function(require){
	require('jquery');
	require('../plugs/jquery.easing.1.3');
	var weather = weather || {};
	weather.createRandom = function(oldIndex, len) {
		var newIndex = parseInt(Math.random() * len);
		while (newIndex === oldIndex) {
			newIndex = parseInt(Math.random() * len);
		}
		return newIndex;
	};

	weather.ZS = function(obj) {
		this.Container = obj.Container;
		this.mask = obj.mask;
		this.height = obj.height;
	};
	weather.ZS.prototype = {
		ItemAnimate: function(old, current) {
			if (current != -1) {
				var temp_Dom = $(this.Container + ":eq(" + current + ")" + " " + this.mask);
				temp_Dom.children().last().insertBefore(temp_Dom.children().eq(0));
				temp_Dom.css("top", "-" + this.height + "px");
				temp_Dom.stop().animate({
					top: "0px"
				}, 500);
			}
			if (old != -1) {
				var temp_Dom = $(this.Container + ":eq(" + old + ")" + " " + this.mask);
				temp_Dom.children().last().insertBefore(temp_Dom.children().eq(0));
				temp_Dom.css("top", "-" + this.height + "px");
				temp_Dom.stop().animate({
					top: "0px"
				}, 1000, "easeInOutQuint");
			}
		}
	};
	//翻转效果
	weather.flip = function(settings) {
		var flipObj = {
			width: $(settings.current).width(),
			height: $(settings.current).height(),
			bgColor: settings.bgColor || $(settings.current).css("background-color"),
			toColor: settings.color || "#FFF",
			speed: settings.speed || 500,
			top: $(settings.current).offset().top,
			left: $(settings.current).offset().left,
			transparent: "transparent"
		};
		( /*@cc_on!@*/ false && (typeof document.body.style.maxHeight === "undefined")) && (flipObj.transparent = "#123456");
		var $clone = $(settings.current).removeClass('on')
			.clone(true)
			.appendTo("body")
			.html("")
			.css({
				position: "absolute",
				left: flipObj.left,
				top: flipObj.top,
				margin: 0,
				zIndex: 9999,
				"-webkit-box-shadow": "0px 0px 0px #FFF",
				"-moz-box-shadow": "0px 0px 0px #FFF"
			});
		var defaultStart = function() {
			return {
				backgroundColor: flipObj.transparent,
				fontSize: 0,
				lineHeight: 0,
				borderTopWidth: 0,
				borderLeftWidth: 0,
				borderRightWidth: 0,
				borderBottomWidth: 0,
				borderTopColor: flipObj.transparent,
				borderBottomColor: flipObj.transparent,
				borderLeftColor: flipObj.transparent,
				borderRightColor: flipObj.transparent,
				background: "none",
				borderStyle: 'solid',
				height: 0,
				width: 0
			};
		};
		var defaultVertical = function() {
			var waist = (flipObj.height / 100) * 25;
			var start = defaultStart();
			start.height = flipObj.height;
			return {
				"start": start,
				"first": {
					borderTopWidth: waist,
					borderLeftWidth: 0,
					borderRightWidth: 0,
					borderBottomWidth: waist,
					borderLeftColor: '#999999',
					borderRightColor: '#999999',
					top: flipObj.top - waist,
					left: flipObj.left + (flipObj.width / 2)
				},
				"second": {
					borderTopWidth: 0,
					borderLeftWidth: 0,
					borderRightWidth: 0,
					borderBottomWidth: 0,
					borderLeftColor: flipObj.transparent,
					borderRightColor: flipObj.transparent,
					top: flipObj.top,
					left: flipObj.left
				}
			};
		};
		var dirOption = (function() {
			var d = defaultVertical();
			d.start.borderLeftWidth = flipObj.width;
			d.start.borderLeftColor = flipObj.bgColor;
			d.second.borderRightWidth = flipObj.width;
			d.second.borderRightColor = flipObj.toColor;
			return d;
		})();
		( /*@cc_on!@*/ false && (typeof document.body.style.maxHeight === "undefined")) && (dirOption.start.filter = "chroma(color=" + flipObj.transparent + ")");
		$clone.queue(function() {
			$clone.css(dirOption.start);
			$clone.dequeue();
		});

		$clone.animate(dirOption.first, flipObj.speed);
		$clone.animate(dirOption.second, flipObj.speed);

		$clone.queue(function() {
			$(settings.content).addClass("on")
			$clone.remove();
			$clone.dequeue();
		});
	};
	weather.scroll = function(obj) {
		var index = 0;
		var container = obj.container;
		var el = obj.el;
		var flag = obj.flag;
		var num = $(container).find(el).length;
		var width = $(container).find(el).outerWidth();
		if (num > flag) {
			var whole_length = width * num;
			$(container).css({
				"width": whole_length
			});
		}
		return {
			go: function(step) {
				if (num <= flag) return;
				index = index + step;
				if (index + flag > num) {
					for (var i = 0; i < step; i++) {
						$(container).append($(container + " " + el).eq(0).clone());
						$(container + " " + el).eq(0).remove();
					}
					index = index - step;
					$(container).css({
						"marginLeft": -(index - step) * width
					});
				}
				if (index < 0) {
					for (var j = 0; j < Math.abs(step); j++) {
						$(container).prepend($(container + " " + el).eq(num - 1).clone());
						$(container + " " + el).eq(num).remove();
					}
					index = index - step;
					$(container).css({
						"marginLeft": -(index - step) * width
					});
				}
				$(container).animate({
					"marginLeft": -index * width
				}, 500);
			},
			reset: function() {
				index = 0;
				$(container).css({
					"marginLeft": 0
				});
			}

		};
	};
	//日常切换tab(上到下循环滚)
	weather.tabs = function(parameters) {
		this.containers = parameters.containers.split(",") || null;
		this.tabName = parameters.tabName || ".tabs ul li";
		this.content = parameters.content || ".tabs_content";
		this.heights = [];
		if (this.containers) {
			for (var i = 0; i < this.containers.length; i++) {
				var temp_container = this.containers[i];
				var temp_heights = [];
				with($(temp_container + " " + this.content).children()) {
					for (var j = 0; j < length; j++) {
						temp_heights.push(eq(j).outerHeight());
					}
					this.heights.push(temp_heights);
					$(temp_container + " .mask").css("height", this.heights[i][0]);
				}
			}
		}
	}
	weather.tabs.prototype.mouseAnimate = function() {
		for (var i = 0; i < this.containers.length; i++) {
			var temp_container = this.containers[i];
			var temp_content = this.content;
			var temp_tabName = this.tabName;
			var temp_heights = this.heights[i];
			$(temp_container + " " + temp_tabName).hover(function() {
				if ($(this).hasClass("on")) return;
				var temp_name = $(this).attr("name");
				var curr = $(temp_container + " " + temp_tabName).index($(this)[0]);
				var old = $(temp_container + " " + temp_tabName).index($(this).siblings(".on")[0]);
				var curr_height = temp_heights[curr];
				var old_height = temp_heights[old];
				$(this).addClass("on");
				$(this).siblings().removeClass("on");
				$(temp_container + " " + temp_content).children().each(function() {
					if ($(this).attr("name") == temp_name)
						$(this).insertBefore($(temp_container + " " + temp_content).children().eq(0));
					$(temp_container + " " + temp_content).css("top", "-" + temp_heights[curr] + "px");
					$(temp_container + " " + temp_content).stop().animate({
						top: "0px"
					}, 500);
					if (curr_height > old_height)
						$(temp_container + " .mask").stop().animate({
							height: curr_height
						}, 500);
					else
						$(temp_container + " .mask").css({
							height: curr_height
						});
				})

			})
		}
	}
	return weather;
});