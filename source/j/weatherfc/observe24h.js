define(function() {
	//绘制表格
	Raphael.fn.drawGrid = function(x, y, w, h, hv, color) {
		color = color || "#000";
		var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5],
			rowHeight = h / hv;
		for (var i = 1; i < hv; i++) {
			path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
		}
		return this.path(path.join(",")).attr({
			stroke: color,
			fill: "#fff"
		});
	};
	//多边形定义
	Raphael.fn.polygon = function(x, y, s) {
		var path = ["M", x, y, "L", x - s * Math.sin(15), y + Math.sin(15) * s * Math.sqrt(3), x, y - s * Math.sin(15) * 2, x + s * Math.sin(15), y + Math.sin(15) * s * Math.sqrt(3), "z"];
		return this.path(path.join(","));
	}

	var rowNum = 6,
		paper = null;
	//分析数据
	var isInvalid = function(val,isWind){
		//风数据为0是为不合法
		return val == '' || val == 'null' || isWind && val == 0;
	}
	var adjustData = {
		length: 0,
		date: [],
		temperature: [],
		humidity: [],
		rain: [],
		rainSum: 0,
		windLevel: [],
		windAngle: [],
		windDirection: [],
		flagData: {
			temperature: {
				max: 0,
				min: 0
			},
			humidity: {
				max: 0,
				min: 0
			},
			rain: {
				max: 0,
				min: 0
			},
			wind: {
				max: 0,
				min: 0
			}
		},
		min: {
			temperature: 0,
			humidity: 0,
			rain: 0,
			wind: 0
		},
		max: {
			temperature: 0,
			humidity: 0,
			rain: 0,
			wind: 12
		},
		step: {
			temperature: 1,
			humidity: 1,
			rain: 1,
			wind: 2
		},
		invalid: {
			temperature: [],
			humidity: [],
			rain: [],
			wind: []
		},
		init: function(data) {
			this.length = data.od.od2.length;
			for (var i = this.length - 1; i >= 0; i--) {
				var d = data.od.od2[i];
				this.date.push(d.od21); //时间
				if (isInvalid(d.od22)){
					this.invalid.temperature.push(i); //温度无效数据
				}
				this.temperature.push(d.od22); //温度
				if (isInvalid(d.od27)){
					this.invalid.humidity.push(i); //湿度无效数据
				}
				this.humidity.push(d.od27); //湿度
				if (isInvalid(d.od26)){
					this.invalid.rain.push(i); //降雨无效数据
				}	
				this.rain.push(d.od26); //降雨
				if (isInvalid(d.od25,true)){
					this.invalid.wind.push(i); //风力无效数据
				}
				this.windLevel.push(d.od25); //风力
				this.windAngle.push(d.od23); //风向（角度）
				this.windDirection.push(d.od24); //风向（描述）
				this.rainSum += parseFloat(d.od26);
			}
			//过滤不合法数据
			//zk modify,加默认值，防止"null"等不合法数据影响
			var formateNumArr = function(arr,defaultVal){
				var a = [];
				$.each(arr,function(i,v){
					if(!isNaN(v)){
						a.push(v);
					}else{
						a.push(defaultVal);
						arr[i] = '';//对不合法数据进行清空处理
					}
				});
				return a;
			}

			var MAX = adjustData.max,
				MIN = adjustData.min;
			var _getMin = function(arr){
				return Math.min.apply(Math,arr);
			}	
			var _getMax = function(arr){
				return Math.max.apply(Math,arr);
			}
			var _getFloor = function(val){
				return Math.floor(val);
			}
			var _getCeil = function(val){
				return Math.ceil(val);
			}
			var _flagData = adjustData.flagData;
			_flagData.temperature.min = _getMin( formateNumArr(adjustData.temperature,MIN.temperature)); //温度最小值
			_flagData.temperature.max = _getMax( formateNumArr(adjustData.temperature,MAX.temperature)); //温度最大值
			_flagData.rain.min = _getMin( formateNumArr(adjustData.rain,MIN.rain)); //降水量最小值
			_flagData.rain.max = _getMax( formateNumArr(adjustData.rain,MAX.rain)); //降水量最大值
			_flagData.humidity.min = _getMin( formateNumArr(adjustData.humidity,MIN.humidity)); //湿度最小值
			_flagData.humidity.max = _getMax( formateNumArr(adjustData.humidity,MAX.humidity)); //湿度量最大值
			_flagData.wind.min = _getMin( formateNumArr(adjustData.windLevel,MIN.wind)); //风力最小值
			_flagData.wind.max = _getMax( formateNumArr(adjustData.windLevel,MAX.wind)); //风力最大值

			adjustData.min.temperature = _getFloor(adjustData.flagData.temperature.min); //温度最小值
			adjustData.min.rain = _getFloor(adjustData.flagData.rain.min); //降水量最小值
			adjustData.min.humidity = _getFloor(adjustData.flagData.humidity.min); //湿度最小值
			adjustData.max.temperature = _getCeil(adjustData.flagData.temperature.max); //温度最大值
			adjustData.max.rain = _getCeil(adjustData.flagData.rain.max); //降水量最大值
			adjustData.max.humidity = _getCeil(adjustData.flagData.humidity.max); //湿度最大值

			//设置step
			adjustData.min.temperature = adjustData.min.temperature - adjustData.step.temperature;
			if (adjustData.min.humidity - adjustData.step.humidity >= 0)
				adjustData.min.humidity -= adjustData.step.humidity;
			if (adjustData.min.rain - adjustData.step.rain >= 0)
				adjustData.min.rain -= adjustData.step.rain;
			if ((adjustData.max.temperature - adjustData.min.temperature) / rowNum > adjustData.step.temperature) {
				adjustData.step.temperature = _getCeil((adjustData.max.temperature - adjustData.min.temperature) / rowNum);
			}
			if ((adjustData.max.humidity - adjustData.min.humidity) / rowNum > adjustData.step.humidity) {
				adjustData.step.humidity = _getCeil((adjustData.max.humidity - adjustData.min.humidity) / rowNum);
			}
			if ((adjustData.max.rain - adjustData.min.rain) / rowNum > adjustData.step.rain) {
				adjustData.step.rain = _getCeil((adjustData.max.rain - adjustData.min.rain) / rowNum);
			}
			adjustData.max.temperature = adjustData.min.temperature + adjustData.step.temperature * rowNum;
			adjustData.max.humidity = adjustData.min.humidity + adjustData.step.humidity * rowNum;
			//设置湿度极大值为100%
			if (adjustData.max.humidity > 100) {
				adjustData.max.humidity = 100;
				adjustData.min.humidity = adjustData.max.humidity - adjustData.step.humidity * rowNum;
			}
			adjustData.max.rain = adjustData.min.rain + adjustData.step.rain * rowNum;
		}
	};
	adjustData.init(observe24h_data);

	var observe24hGraph = {
		width: 0,
		height: 0,
		leftgutter: 0,
		bottomgutter: 0,
		topgutter: 0,
		rightgutter: 0,
		rowNum: 0,
		colNum: 0,
		cellHeight: 0,
		cellWidth: 0,
		grid: null,
		rects: null,
		shap: null,
		path: null,
		pathStyle: {
			stroke: "#94c05a",
			"stroke-width": 2,
			"stroke-linejoin": "round"
		},
		init: function(obj) {
			var temp_Label = [];
			this.width = obj.width;
			this.height = obj.height;
			this.leftgutter = obj.leftgutter;
			this.bottomgutter = obj.bottomgutter;
			this.topgutter = obj.topgutter;
			this.rightgutter = obj.rightgutter;
			this.rowNum = obj.rowNum;
			this.colNum = obj.colNum;
			this.cellHeight = (this.height - this.topgutter - this.bottomgutter) / this.rowNum;
			this.cellWidth = (this.width - this.leftgutter - this.rightgutter) / this.colNum;
			paper = Raphael(obj.container, observe24hGraph.width, observe24hGraph.height);
			this.grid = paper.drawGrid(observe24hGraph.leftgutter, observe24hGraph.topgutter, observe24hGraph.width - observe24hGraph.leftgutter - observe24hGraph.rightgutter, observe24hGraph.height - observe24hGraph.topgutter - observe24hGraph.bottomgutter, observe24hGraph.rowNum, "#d9d9d9");
			this.rects = paper.set();
			this.shap = paper.set();
			//绘制柱状区域和横坐标
			for (var i = 0, ii = this.colNum; i < ii; i++) {
				//绘制柱状区域
				observe24hGraph.rects.push(paper.rect(observe24hGraph.leftgutter + observe24hGraph.cellWidth * i, observe24hGraph.topgutter, observe24hGraph.cellWidth, observe24hGraph.height - observe24hGraph.bottomgutter - observe24hGraph.topgutter).attr({
					stroke: "none",
					fill: "#fff",
					opacity: 0
				}));
				//绘制横坐标
				temp_Label.push("<span>" + obj.date[i] + "</span>");
			}
			$(".xLabel").html(temp_Label.join(""));
		},
		drawGraph: function(obj) {
			//绘制y坐标
			var temp_labels = [],
				step = obj.step,
				unit = obj.unit,
				max = obj.max,
				min = obj.min,
				cellWidth = this.cellWidth,
				cellHeight = this.cellHeight,
				topgutter = this.topgutter,
				leftgutter = this.leftgutter,
				height = this.height - topgutter - this.bottomgutter;
			for (var i = 0; i <= this.rowNum; i++) {
				temp_labels.unshift("<span>" + (min + i * step) + unit + "</span>");
			}
			$(obj.container).html(temp_labels.join(""));
			//zk modify,不处理不合法数据
			if(obj.data.length == obj.invalid.length){
				return;
			}
			var leftgutter = this.leftgutter,
				cellWidth = this.cellWidth,
				r = obj.r || 0,
				y0 = this.height - this.bottomgutter;
			var _event = function(){
				//鼠标事件
				(function(i, x, y, d,desc) {
					var $container = $(obj.dataContainer);
					var _show = function(){
						crossLine.attr({
							path: ["M", x, 0, "V", observe24hGraph.height, "M", 0, y + 0.5, "H", observe24hGraph.width]
						}).show();
						$container.html(desc+d + unit);
						var _width = $container.width();
						var _left = x + 10;
						if(_width + x > 660){
							_left = x - _width - 20;
						}
						$container.css({
							"top": y,
							"left": _left
						}).show();
					}
					var _hide = function(){
						crossLine.hide();
						$(obj.dataContainer).hide();
					}
					if (d != "") {
						observe24hGraph.rects[i].hover(_show, _hide)
					}
					observe24hGraph.shap[i].hover(_show, _hide)
					// observe24hGraph.shap[i].hover(function() {
					// 	crossLine.attr({
					// 		path: ["M", x, 0, "V", observe24hGraph.height, "M", 0, y + 0.5, "H", observe24hGraph.width]
					// 	}).show();
					// 	$(obj.dataContainer).html(desc+d + unit).css({
					// 		"top": y,
					// 		"left": x + 10
					// 	}).show();
					// }, function() {
					// 	crossLine.hide();
					// 	$(obj.dataContainer).hide();
					// })
				})(i, x, y, obj.data[i],obj.desc && obj.desc[i]||'');
			}
			switch (obj.shap) {
				case 'rect':
					var rectStyle = [];
					for (var i = 0, ii = this.colNum; i < ii; i++) {
						var x = Math.round(leftgutter + cellWidth * (i + .5)) + 0.5,
							y = Math.round(cellHeight * ((max - obj.data[i]) / step) + topgutter);
						if (obj.data[i] < 10) {
							rectStyle.push({
								stroke: "#d9d9d9",
								"stroke-width": 1.5,
								fill: "#6600CC"
							});
						} else if (obj.data[i] >= 10 && obj.data[i] <= 25) {
							rectStyle.push({
								stroke: "#d9d9d9",
								"stroke-width": 1.5,
								fill: "#0000FF"
							});
						} else if (obj.data[i] > 25 && obj.data[i] <= 50) {
							rectStyle.push({
								stroke: "#d9d9d9",
								"stroke-width": 1.5,
								fill: "#008000"
							});
						} else if (obj.data[i] > 50 && obj.data[i] <= 100) {
							rectStyle.push({
								stroke: "#d9d9d9",
								"stroke-width": 1.5,
								fill: "#FFCC00"
							});
						} else if (obj.data[i] > 100 && obj.data[i] <= 250) {
							rectStyle.push({
								stroke: "#d9d9d9",
								"stroke-width": 1.5,
								fill: "#FF6600"
							});
						} else if (obj.data[i] > 250) {
							rectStyle.push({
								stroke: "#d9d9d9",
								"stroke-width": 1.5,
								fill: "#FF0000"
							});
						}
						this.shap.push(paper.rect((x - cellWidth * 0.5), y0, cellWidth, 0).attr(rectStyle[i]));
						this.shap[i].animate({
							height: (height - y + topgutter),
							transform: ["t0," + (-y0 + y)]
						}, 500);
						//鼠标事件
						(function(i, x, y, d) {
							if (d != "" && d != 0) {
								observe24hGraph.rects[i].hover(function() {
									observe24hGraph.shap[i].attr({
										fill: "#94c05a"
									});
									$(obj.dataContainer).html(d + unit).css({
										"top": y,
										"left": x + 10
									}).show();
								}, function() {
									observe24hGraph.shap[i].attr(rectStyle[i]);
									$(obj.dataContainer).hide();
								})
								observe24hGraph.shap[i].hover(function() {
									observe24hGraph.shap[i].attr({
										fill: "#94c05a"
									});
									$(obj.dataContainer).html(d + unit).css({
										"top": y,
										"left": x + 10
									}).show();
								}, function() {
									observe24hGraph.shap[i].attr(rectStyle[i]);
									$(obj.dataContainer).hide();
								})
							}
						})(i, x, y, obj.data[i]);
					}
					break;
				default:
					var Style = [],
						crossLine = paper.path().attr({
							stroke: "#076ea8",
							"stroke-width": 1
						}),
						pathCount = obj.invalid.length + 1,
						initPath = new Array(pathCount),
						path = new Array(pathCount),
						pathIndex = 0;
					this.path = new Array(pathCount);

					for (var i = 0, ii = this.colNum; i < ii; i++) {
						var x = Math.round(leftgutter + cellWidth * (i + .5)) + 0.5,
							y = Math.round(cellHeight * ((max - obj.data[i]) / step) + topgutter),
							initY = Math.round(cellHeight * ((max - min) / step) + topgutter);

						if (obj.data[i] == "")
							pathIndex++;
						else {
							if (i == 0 || obj.data[i - 1] == "") {
								path[pathIndex] = ["M", x, y, "L", x, y];
								initPath[pathIndex] = ["M", x, initY, "L", x, initY];
							}
							if (i != 0 && obj.data[i + 1] != "" && obj.data[i - 1] != "") {
								var Y0 = Math.round(cellHeight * (max - obj.data[i - 1]) / step + topgutter),
									X0 = Math.round(leftgutter + cellWidth * (i - .5)),
									Y2 = Math.round(cellHeight * (max - obj.data[i + 1]) / step + topgutter),
									X2 = Math.round(leftgutter + cellWidth * (i + 1.5));
								path[pathIndex] = path[pathIndex].concat(X0, Y0, x, y, X2, Y2);
								initPath[pathIndex] = initPath[pathIndex].concat(X0, initY, x, initY, X2, initY);
							}

						}

						if (obj.shap == 'dot') {
							if (unit == "℃") {
								if (obj.data[i] < 0) {
									Style.push({
										fill: "#6600CC",
										stroke: "#6600CC",
										"stroke-width": 1
									});
								} else if (obj.data[i] >= 0 && obj.data[i] <= 5) {
									Style.push({
										fill: "#0000FF",
										stroke: "#0000FF",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 5 && obj.data[i] <= 10) {
									Style.push({
										fill: "#00CCFF",
										stroke: "#00CCFF",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 10 && obj.data[i] <= 15) {
									Style.push({
										fill: "#008000",
										stroke: "#008000",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 15 && obj.data[i] <= 24) {
									Style.push({
										fill: "#FFCC00",
										stroke: "#FFCC00",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 24 && obj.data[i] <= 32) {
									Style.push({
										fill: "#FF6600",
										stroke: "#FF6600",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 32) {
									Style.push({
										fill: "#FF0000",
										stroke: "#FF0000",
										"stroke-width": 1
									});
								}
							} else {
								if (obj.data[i] < 26) {
									Style.push({
										fill: "#6600CC",
										stroke: "#6600CC",
										"stroke-width": 1
									});
								} else if (obj.data[i] >= 26 && obj.data[i] <= 51) {
									Style.push({
										fill: "#008000",
										stroke: "#008000",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 51 && obj.data[i] <= 75) {
									Style.push({
										fill: "#FF6600",
										stroke: "#FF6600",
										"stroke-width": 1
									});
								} else if (obj.data[i] > 75) {
									Style.push({
										fill: "#FF0000",
										stroke: "#FF0000",
										"stroke-width": 1
									});
								}
							}
							this.shap.push(paper.circle(x, y0, r).attr(Style[i]));
						} else {
							if (i == 0)
								Style.push({
									fill: "#6600CC",
									stroke: "#6600CC",
									"stroke-width": 1
								});
							this.shap.push(paper.polygon(x, y0, r).attr(Style[0]));
						}
						if (obj.data[i] == "")
							this.shap[i].hide();
						if (obj.shap == 'dot') {
							this.shap[i].animate({
								cy: y
							}, 500).attr({
								cy: y
							});
						} else {
							this.shap[i].animate({
								transform: ["t0," + (-y0 + y) + "r" + (obj.angle[i]-180)]//处理角度
							}, 500);
						}
						
					}
					for (var p = 0; p < pathCount; p++) {
						if(!initPath[p]){
							continue;
						}
						this.path[p] = paper.path(initPath[p]);
						this.path[p].attr(this.pathStyle).hide();
						this.path[p].animate({
							path: path[p]
						}, 470).show();
					}
					for (var d = 0, dd = this.colNum; d < dd; d++) {
						if(!this.shap[d]){
							continue;
						}
						this.shap[d].toFront();
					}
					break;
			}

		}

	}
	var dataConf = {
		"width": 670,
		"height": 300,
		"leftgutter": 40,
		"bottomgutter": 40,
		"topgutter": 10,
		"rightgutter": 10,
		"rowNum": rowNum,
		"colNum": adjustData.length,
		"container": "hourHolder",
		"date": adjustData.date
	}
	var graphConf = {
		"shap": "dot",
		"container": ".yLabel",
		"dataContainer": ".showData",
		"min": adjustData.min.temperature,
		"max": adjustData.max.temperature,
		"data": adjustData.temperature,
		"unit": "℃",
		"invalid": adjustData.invalid.temperature,
		"step": adjustData.step.temperature,
		"r": 4
	}
	//初始化温度图表
	observe24hGraph.init(dataConf);
	observe24hGraph.drawGraph(graphConf);
	function getNewestData(dataArr){
		return dataArr.slice(-1)[0];
	}
	var dataLen = adjustData.length;
	function isEmpty(invalidDataArr){
		return invalidDataArr.length == dataLen;
	}
	//观察台
	$("#platform").html(observe24h_data.od.od1);
	var $currHour = $("#currHour");
	var $detailHour = $("#detailHour");
	var $result = $("#hourHolder .result");
	var newTemperature = getNewestData(adjustData.temperature);
	if (newTemperature == "") {
		$currHour.html("最新整点实况气温:暂无数据");
	} else {
		$currHour.html("最新整点实况气温:" + newTemperature + "℃");
	}
	if (adjustData.invalid.temperature.length == adjustData.length) {
		$detailHour.html("暂无数据");
	} else {
		$detailHour.html("最高" + adjustData.flagData.temperature.max + "℃,最低" + adjustData.flagData.temperature.min + "℃");
	}
	$("#weatherChart .tabs ul li").click(function() {
		if ($(this).hasClass("on")) return;
		var prev = $(this).siblings(".on");
		var data_role = $(this).attr("data-role");
		var prev_data_role = prev.attr("data-role");
		prev.attr("class", prev.attr("class").replace("_on", "")).removeClass("on");
		$(this).attr("class", $(this).attr("class") + "_on").addClass("on");
		$result.hide();
		var invalidData = adjustData.invalid;
		var _graphConf;
		switch (data_role) {
			case 'humidity':
				var newestVal = getNewestData(adjustData.humidity);
				if (isNaN(newestVal) || newestVal == '') {
					$currHour.html("最新整点相对湿度:暂无数据");
				} else {
					$currHour.html("最新整点相对湿度:" + newestVal + "%");
				}
				if (isEmpty(invalidData.humidity)) {
					$detailHour.html("暂无数据");
					$result.html("24小时内无湿度数据").show();
				} else {
					$detailHour.html("最大相对湿度:" + adjustData.flagData.humidity.max + "%");
				}
				_graphConf = $.extend({},graphConf,{
					"min": adjustData.min.humidity,
					"max": adjustData.max.humidity,
					"data": adjustData.humidity,
					"unit": "%",
					"invalid": invalidData.humidity,
					"step": adjustData.step.humidity
				});
				break;
			case 'temperature':
				var newestVal = getNewestData(adjustData.temperature);
				if (isNaN(newestVal) || newestVal == '') {
					$currHour.html("最新整点实况气温:暂无数据");
				} else {
					$currHour.html("最新整点实况气温:" + newestVal + "℃");
				}
				if (isEmpty(invalidData.temperature)) {
					$detailHour.html("暂无数据");
					$result.html("24小时内无温度数据").show();
				} else {
					$detailHour.html("最高" + adjustData.flagData.temperature.max + "℃,最低" + adjustData.flagData.temperature.min + "℃");
				}
				break;
			case 'rain':
				var newestVal = getNewestData(adjustData.rain);
				if (!isNaN(newestVal) && newestVal > 0) {
					$currHour.html("最新1小时降水量:" + newestVal + "mm");
				} else {
					$currHour.html("最新1小时降水量:暂无数据");
				}
				var rainSum = adjustData.rainSum;
				if (!isNaN(rainSum)) {
					$detailHour.html("总降水量:" + adjustData.rainSum + "mm");
				}
				
				if (isNaN(rainSum) || rainSum == 0 || isEmpty(invalidData.rain) ) {
					$detailHour.html("总降水量:暂无数据");
					$result.html("24小时内无降水数据").show();
				}
				_graphConf = $.extend({},graphConf,{
					"shap": "rect",
					"min": adjustData.min.rain,
					"max": adjustData.max.rain,
					"data": adjustData.rain,
					"unit": "mm",
					"step": adjustData.step.rain,
					"invalid": invalidData.rain,
				});
				break;
			case 'wind':
				var newestVal = getNewestData(adjustData.windLevel);
				if (!isNaN(newestVal) && newestVal > 0) {
					$currHour.html("最新整点实况风力:" + newestVal + "级");
				} else {
					$currHour.html("最新整点实况风力:暂无数据");
				}
				if (isEmpty(invalidData.wind)) {
					$detailHour.html("暂无数据");
					$result.html("24小时内无风力数据").show();
				} else {
					$detailHour.html("最大风力:" + adjustData.flagData.wind.max + "级");
				}
				_graphConf = $.extend({},graphConf,{
					"shap": "polygon",
					"min": adjustData.min.wind,
					"max": adjustData.max.wind,
					"data": adjustData.windLevel,
					"angle": adjustData.windAngle,
					"direction": adjustData.windDirection,
					'desc': adjustData.windDirection, // .windDirection
					"unit": "级",
					"invalid": invalidData.wind,
					"step": adjustData.step.wind,
					"r": 8
				})
				break;
		}
		paper.remove();
		observe24hGraph.init(dataConf);
		observe24hGraph.drawGraph(_graphConf || graphConf);
		$("#weatherChart .chart .detail").removeClass("detail");
		$("#weatherChart .chart").find("." + data_role).addClass("detail");
	})
	// .first().removeClass('on').click();
})