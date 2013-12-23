define(function(require) {
	require("./W");
	(function(global) {
		(function(aroundCity) {
			aroundCity.init = function(obj) {
				var that = this;
				this.obj = obj;
				this.oldIndex = -1;
				this.curIndex = 0;
				this.length = $(this.obj.el).length;
				this.timer = setInterval(function() {
					this.curIndex = W.createRandom(this.oldIndex, this.length);
					that.setTimer()
				}, 6000);
			},
			aroundCity.setTimer = function() {
				this.flip(this.oldIndex, this.curIndex);
				this.oldIndex = this.curIndex;
			},
			aroundCity.flip = function(oldIndex, curIndex) {
				if (oldIndex != -1) {
					$(this.obj.el).eq(oldIndex).find(this.obj.flipEl).stop().animate({
						top: -this.obj.height
					}, 500, "easeInOutQuint");
					$(this.obj.el).eq(oldIndex).removeClass(this.obj.onClass);
				}
				$(this.obj.el).eq(curIndex).addClass(this.obj.onClass);
				$(this.obj.el).eq(curIndex).find(this.obj.flipEl).stop().animate({
					top: 0
				}, 500, "easeInOutQuint");
			}
		})(global.aroundCity || (global.aroundCity = {}));
	})(this.W || (this.W = {}));

	//周边地区近日天气
	W.aroundCity.init({
		el: '#aroundCity ul li',
		flipEl: '.zs',
		onClass: 'on',
		height: 54
	});
	$("#aroundCity ul li").hover(function() {
			if ($(this).hasClass("on")) return;
			clearInterval(W.aroundCity.timer);
			W.aroundCity.timer = null;
			W.aroundCity.curIndex = $("#aroundCity ul li").index($(this));
			W.aroundCity.setTimer();
		},
		function() {
			W.aroundCity.timer = setInterval(function() {
				W.aroundCity.curIndex = W.createRandom(this.oldIndex, this.length);
				W.aroundCity.setTimer()
			}, 6000);
		})
})