$(document).ready(function() {
	/*
	 * 图片浏览
	 * */
	$(".desc_btn").click(function() {
		$(this).next(".desc").animate({
			width: 'toggle'
		}, "normal");
	});

	var thumbnailScroll = function() {
		var that = this;
		this.thumbnailcon = $(".thumbnail .thumbnailcon");
		this.nextbtn = $(".thumbnail .nextbtn");
		this.prevbtn = $(".thumbnail .prevbtn");
		this.nextpic = $(".image_btns .next a,.image_big .next");
		this.prevpic = $(".image_btns .prev a,.image_big .prev");
		this.playpic = $(".image_btns .play_pause a,.slides_end_replay");
		this.thumbnails = this.thumbnailcon.find("li");
		this.bigphoto = $("#image_big");
		this.loading = $(".image_big .loading");
		this.description = $("#photo_desc");
		this.currentnum = $(".currentnum");
		this.totalnum = $(".totalnum");
		this.ready = false;
		this.playinterval = null;
		this.nextgroupInterval = null;
		this.playing = false;
		this.photonumber = this.thumbnails.length;
		this.cellwidth = this.thumbnails.outerWidth(true);
		this.pages = Math.floor(this.photonumber / 5);
		this.lastpageitems = this.photonumber % 5;
		this.dir = "tr";
		this.imgloading = false;
		if (this.lastpageitems > 0) {
			this.lastpageitems--;
		}
		this.page = 1;
		this.currentx = 0;
		this.animating = false;
		this.current = 0;
		this.config = {
			autoplay: true,
			interval: 3000
		};
		this.ini = function(options) {
			$.extend(true, this.config, options);
			this.thumbnailcon.find("ul").css({
				"width": this.cellwidth * this.photonumber
			});
			this.totalnum.html(this.photonumber);
			this.prevbtn.addClass("prevdisable");
			this.nextbtn.click(function(e) {
				e.preventDefault();
				that.next();
			});
			this.prevbtn.click(function(e) {
				e.preventDefault();
				that.prev();
			});

			this.thumbnails.click(function() {
				var idx = that.thumbnails.index($(this));
				that.current = idx;
				var left = idx * that.cellwidth;
				//console.log(that.thumbnailcon.scrollLeft());
				//console.log(left);
				if (that.thumbnailcon.scrollLeft() == left) {
					that.prev();
				} else if (that.thumbnailcon.scrollLeft() == left - 5 * that.cellwidth) {
					that.next();
				}
				that.showphoto();
			});
			this.nextpic.click(function(e) {
				e.preventDefault();
				that.pause();
				that.play_next();
			});
			this.prevpic.click(function(e) {
				e.preventDefault();
				that.pause();
				that.play_prev();
			});
			this.playpic.click(function(e) {
				e.preventDefault();
				if (that.current == that.photonumber - 1) {
					that.replay();
				} else {
					that.play();
				}

			});
			this.thumbnailcon.click(function(e, auto) {
				if (!auto) {
					that.pause();
				}
			});
			this.showphoto();
			if (this.config.autoplay) {
				this.play();
			}
		};
		this.play_next = function() {
			if (this.current < this.photonumber - 1) {
				this.current++;
				this.thumbnails.eq(this.current).trigger("click", [true]);
			} else {
				this.end();
			}
		};
		this.play_prev = function() {
			if (this.current > 0) {
				this.current--;
			}
			this.thumbnails.eq(this.current).trigger("click", [true]);
		};
		this.play = function() {
			if (this.playing) {
				this.pause();
			} else {
				that.playpic.parent().removeClass("play");
				that.playpic.parent().addClass("pause");
				this.playinterval = setInterval(function() {
					if (that.current == that.photonumber - 1) {
						that.pause();
						that.end();
					} else {
						that.playing = true;
						if (!that.imgloading) {
							that.play_next();
						}

					}
				}, this.config.interval);
			}
		};
		this.pause = function() {
			that.playpic.parent().removeClass("pause");
			that.playpic.parent().addClass("play");
			clearInterval(that.playinterval);
			this.playing = false;
		};
		this.replay = function() {
			this.current = 0;
			this.page = 1;
			that.thumbnailcon.scrollLeft(0);
			$("#slides_end").hide();
			$(".image_big,.image_desc,.image_pager").show();
			clearInterval(this.nextgroupInterval);
			$("#next_delay").html("10");
			this.thumbnails.eq(this.current).trigger("click", [true]);
			this.play();
		};
		this.showphoto = function() {
			this.loading.show();
			this.imgloading = true;
			var currentthumb = this.thumbnails.eq(this.current);
			var thumbimg = currentthumb.find("img");
			var bigurl = thumbimg.data("big");
			var desc = thumbimg.data("desc");
			that.thumbnails.removeClass("active");
			currentthumb.addClass("active");

			var bimg = new Image();
			bimg.onload = function() {
				that.loading.hide();
				that.imgloading = false;
				$(".image_big .prev,.image_big .next,.image_big").height(this.height);
				that.ready = true;
				that.bigphoto.replaceWith($(bimg));
				that.bigphoto = $(bimg);
				if (that.ready == true && that.bigphoto.offset().top < $(window).scrollTop()) {
					$('html, body').animate({
						scrollTop: that.bigphoto.offset().top
					}, "normal");
				}
				if ($.browser.msie && $.browser.version < 7) {
					$(".image_desc").css("position", "relative").css("position", "absolute");
				}
			};
			bimg.id = "image_big";
			bimg.src = bigurl;
			$(".download > a").attr("href", "http://search.weather.com.cn/static/download.php?filename=" + bigurl);
			this.description.html(desc);
			//this.currentnum.html(this.current < 9 ? "0" + (this.current + 1) : this.current + 1);
			this.currentnum.html(this.current);
		};
		this.next = function() {
			if (!that.animating && this.page <= this.pages) {
				this.dir = "tr";
				this.prevbtn.removeClass("prevdisable");

				var to = this.page * this.cellwidth * 5;
				if (this.page == this.pages) {
					to = (this.page - 1) * this.cellwidth * 5 + this.lastpageitems * this.cellwidth;
					this.nextbtn.addClass("nextdisable");
				} else if (this.page == this.pages && this.lastpageitems == 0) {
					this.nextbtn.addClass("nextdisable");
				}
				this.currentx = to;
				this.thumbnailcon.animate({
					scrollLeft: to
				}, {
					complete: function() {
						that.animating = false;
						that.page++;
					},
					progress: function() {
						that.animating = true;
					}
				});
				/*console.log("------");
				console.log("page:"+this.page);
				console.log("pages:"+this.pages);
				console.log("lastpageitems:"+this.lastpageitems);
				console.log("current_x:"+this.currentx);*/
			}

		};
		this.end = function() {
			$("#slides_end").show();
			$(".image_big,.image_desc,.image_pager").hide();
			if (this.nextgroupInterval) {
				clearInterval(this.nextgroupInterval);
			}
			this.nextgroupInterval = setInterval(function() {
				var countdown = parseInt($("#next_delay").html(), 10);
				if (countdown > 0) {
					countdown--;
					$("#next_delay").html(countdown);
				} else {
					window.location.href = $("#nextgrouplink").attr("href");
				}
			}, 1000);

		};
		this.prev = function() {
			if (!that.animating && this.page > 1) {
				this.dir = "tl";
				this.nextbtn.removeClass("nextdisable");
				that.page--;
				var to = this.currentx - this.cellwidth * 5;
				if (this.page == 1) {
					to = 0;
				}
				this.currentx = to;
				this.thumbnailcon.animate({
					scrollLeft: to
				}, {
					complete: function() {
						that.animating = false;
					},
					progress: function() {
						that.animating = true;
					}
				});
				if (this.page == 1) {
					this.prevbtn.addClass("prevdisable");
				}
			}
			/*console.log("------");
			console.log("page:"+this.page);
			console.log("pages:"+this.pages);
			console.log("lastpageitems:"+this.lastpageitems);
			console.log("current_x:"+this.currentx);*/
		};


	};
	var thb = new thumbnailScroll();
	thb.ini({
		autoplay: false
	});

	/*jiathis*/
	$("#sharebtn").click(function(e) {
		e.preventDefault();
		$("#jiathis").load("./jiathis.html").show();
	});

	$(".morephoto_list li").mouseleave(function(){
  			/*$nowThis = $(this);
  			$nowThis.find("p").fadeOut("fast");
  			$nowThis.find("div").fadeOut("fast");*/
  			$(this).find("p").fadeOut("fast").next("div").fadeOut("fast");

	});

	$(".morephoto_list li").mouseenter(function(){
  			/*$nowThis = $(this);
  			$nowThis.find("p").fadeIn("fast");
  			$nowThis.find("div").fadeIn("fast");*/
  			$(this).find("p").fadeIn("fast").next("div").fadeIn("fast");

	});

});