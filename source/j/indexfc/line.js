(function(){
	var init = function(initObj,weather) {
		var color = initObj.color;
		var zstype = initObj.zstype;
		//每次显示的点数
		var step = 8,
			paper = null;
		var draw3hGraph = {
			data: null,
			path: null,
			row_num: 0,
			cellheight: 0,
			cellwidth: 0,
			start: 0,
			oldIndex: 0,
			step: 0,
			dots: [],
			rects: [],
			wLength: 0,
			init: function(data, num, cellwidth, cellheight) {
				var dl_items = "",
					date_items = "",
					sp_items = [],
					row_num = data.it.it4.length,
					col_num = data.it.it3.length,
					width = cellwidth * num,
					height = cellheight * row_num;
				//初始化画布
				paper = Raphael("svgArea", width, height);
				this.start = 0;
				this.dots.length = 0;
				this.rects.length = 0;
				this.path = paper.path();
				this.path.attr({
					stroke: "#94c05a",
					"stroke-width": 2,
					"stroke-linejoin": "round"
				});
				for (var i = 0; i < row_num; i++) {
					if (i == (Math.round(row_num / 2) - 1))
						dl_items += "<dl class='midline'><dt>" + data.it.it4[i].it41 + "</dt><dd></dd></dl>";
					else
						dl_items += "<dl><dt>" + data.it.it4[i].it41 + "</dt><dd></dd></dl>";
				}
				//初始化等级
				$("#forecast .dlArea").html(dl_items);
				for (var i = 0; i < col_num; i++) {
					var date = data.it.it3[i].it33;
					date_items += "<li>" + date.substring(6, 8) + "日" + date.substring(8, 10) + "时</li>";
					sp_items.push("<li style=\"background-color:" + color[data.it.it3[i].it34] + "\">" + data.it.it3[i].it31 + "</li>");
				}
				//初始化时间
				$("#forecast .items").eq(0).find(".time ul").html(date_items);
				//初始化色谱
				$(".items .sp ul").html(sp_items.join(""));
				//初始化点、线、柱体
				for (var i = this.start; i < this.start + num; i++) {
					var t = 0;
					for (var j = 0; j < row_num; j++) {
						if (data.it.it4[j].it41 === data.it.it3[i].it31) {
							t = j;
							break;
						}
					}
					var x = cellwidth * (i + 0.5) + 11;
					var y = cellheight * (t + 0.5);
					this.dots.push(paper.circle(x, y, 6).attr({
						fill: "#076ea8",
						stroke: "#94c05a",
						"stroke-width": 1
					}));
					this.rects.push(paper.rect(cellwidth * i + 11, 0, cellwidth, height).attr({
						stroke: "none",
						fill: "#fff",
						opacity: 0
					}));
				}
				this.data = data;
				this.step = num;
				this.wLength = col_num;
				this.cellheight = cellheight;
				this.cellwidth = cellwidth;
				this.row_num = row_num;
				//鼠标事件
				for (var i = 0; i < num; i++) {
					(function(i) {
						draw3hGraph.rects[i].hover(function() {
							draw3hGraph.hover(i);
						})
						draw3hGraph.dots[i].hover(function() {
							draw3hGraph.hover(i);
						})
					})(i)
				}
				//初始化路径
				draw3hGraph.draw(8);
				draw3hGraph.hover(0);
			},
			draw: function(num) {
				var end = this.start + num,
					start = end - this.step,
					line;
				for (var i = start, ii = 0; i < end; i++, ii++) {
					var t = 0,
						c = i,
						x = this.cellwidth * (ii + 0.5) + 11;
					y = 0;
					if (i < 0)
						c = this.wLength + i;
					if (i >= this.wLength)
						c = i % this.wLength;
					for (var j = 0; j < this.row_num; j++) {
						if (this.data.it.it4[j].it41 === this.data.it.it3[c].it31) {
							t = j;
							y = this.cellheight * (t + 0.5);
							break;
						}
					}
					this.dots[ii].animate({
						cy: y
					}, 500);
					if (i == start) {
						line = ["M", x, y, "L", x, y];
					} else {
						line = line.concat([x, y, x, y]);
					}
					this.start = c + 1;
				}
				this.path.animate({
					path: line
				}, 500);
			},
			hover: function(index) {
				var t, left,
					item_index = index;
				if (this.start - this.step < 0)
					item_index = (this.start - this.step + this.wLength + index) % this.wLength;
				else
					item_index = (this.start - this.step + index) % this.wLength;
				for (var j = 0; j < this.row_num; j++) {
					if (this.data.it.it4[j].it41 === this.data.it.it3[index].it31) {
						t = j;
						break;
					}
				}
				left = this.cellwidth * (index + 0.5) + 110;
				//$("#labelText span").css({"height":parseInt((this.data.it.it3[item_index].it31.length+this.data.it.it3[item_index].it32.length)/10)*28});
				$("#labelText span").css({
					"height": parseInt((this.data.it.it3[item_index].it31.length + this.data.it.it3[item_index].it32.length) / 10) * 25 + 30
				});

				$("#labelText b").html(this.data.it.it3[item_index].it31 + "&nbsp;:&nbsp;" + this.data.it.it3[item_index].it32);
				this.dots[index].attr({
					"r": 9,
					"stroke-width": 3
				});
				if (left > 450)
					left = this.cellwidth * (index + 0.5) - 115;
				$("#labelText").stop().animate({
					top: this.cellheight * t,
					left: left
				}).show();
				if (index != this.oldIndex) {
					this.dots[this.oldIndex].attr({
						"r": 6,
						"stroke-width": 1
					});
					this.oldIndex = index;
				}
			}

		}
		draw3hGraph.init(eval('(' + index3h_data[0] + ')'), step, 66, 37);
		var forecast_scroll = new weather.scroll({
			container: '#forecast .time ul',
			el: 'li',
			flag: step
		});
		var sp_scroll = new weather.scroll({
			container: '.items .sp ul',
			el: 'li',
			flag: step
		});
		var start = step;
		//左侧button事件
		$("#forecast .time .lBtn").click(function() {
			if (start - step < step) {
				var temp_step = start - step;
				forecast_scroll.go(-temp_step);
				sp_scroll.go(-temp_step);
				draw3hGraph.draw(-temp_step);
				draw3hGraph.hover(0);
				start = step;
				$(this).hide();
				return false;
			}
			forecast_scroll.go(-step);
			sp_scroll.go(-step);
			draw3hGraph.draw(-step);
			draw3hGraph.hover(0);
			start = start - step;
			if ($("#forecast .time .rBtn").is(":hidden"))
				$("#forecast .time .rBtn").show();
		})
		//右侧button事件
		$("#forecast .time .rBtn").click(function() {
			if (start + step > draw3hGraph.wLength) {
				var temp_step = draw3hGraph.wLength - start;
				forecast_scroll.go(temp_step);
				sp_scroll.go(temp_step);
				draw3hGraph.draw(temp_step);
				draw3hGraph.hover(0);
				start = draw3hGraph.wLength;
				$(this).hide();
				return false;
			}
			forecast_scroll.go(step);
			sp_scroll.go(step);
			draw3hGraph.draw(step);
			draw3hGraph.hover(0);
			start = start + step;
			if ($("#forecast .time .lBtn").is(":hidden"))
				$("#forecast .time .lBtn").show();
		})
		//以下为有子分类的指数特殊处理
		if (zstype == "ct")
			$("#forecast h3").prepend("<span class=\"kind\" style=\"background-color:#EABB4E\">男人</span><span class=\"kind\">儿童</span><span class=\"kind\">女人</span>&nbsp;&nbsp;");
		if (zstype == "gz")
			$("#forecast h3").prepend("<span class=\"kind\" style=\"background-color:#EABB4E\">男人</span><span class=\"kind\">女人</span><span class=\"kind\">老人</span>&nbsp;&nbsp;");
		$("#forecast .kind").click(function() {
			var index = $("#forecast .kind").index($(this));
			$("#forecast .kind").css("background-color", "#8ABB4A");
			$("#forecast .kind").eq(index).css("background-color", "#EABB4E");
			paper.remove();
			draw3hGraph.init(eval('(' + index3h_data[index] + ')'), step, 66, 37);
			forecast_scroll.reset();
			sp_scroll.reset();
		})
	}
	define(function(require){
		require('../tool/raphael');
		var initObj = require('./init');
		var weather = require('./weather');
		W(function(){
			init(initObj,weather);
		});
	});
})();