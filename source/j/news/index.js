W(function(){
	/*add to favorite, print, change font size*/
	$(".doctools").on("click","a",function(e) {
		e.preventDefault();
		var btnname = $(this).attr("class");
		switch (btnname) {
			case "fav":
				try {
				   typeof window.sidebar == "object" && typeof window.sidebar.addPanel == "function" ? window.sidebar.addPanel("中国天气", "http://www.weather.com.cn", "中国天气") : typeof window.external.msAddSiteMode != "undefined" ? window.external.msAddSiteMode() : window.external.AddFavorite("http://www.weather.com.cn", "中国天气")
				} catch (a) { }
				return !1;
			break;
			case "print":
				try {
					window.print();
				} catch (a) { }
				return !1;
			break;
			case "big":
				$(".content_doc").find("p").css("font-size", "16px");
				$(".doctools").find(".fontsize a").css("font-weight", "normal");
				$(".doctools").find(".big").css("font-weight", "bold");
			break;
			case "medium":
				$(".content_doc").find("p").css("font-size", "14px");
				$(".doctools").find(".fontsize a").css("font-weight", "normal");
				$(".doctools").find(".medium").css("font-weight", "bold");
				
			break;
			case "small":
				$(".content_doc").find("p").css("font-size", "12px");
				$(".doctools").find(".fontsize a").css("font-weight", "normal");
				$(".doctools").find(".small").css("font-weight", "bold");
				
			break;
		}
	});
	/* photo gallery */
	var photogallery = function(){
		var that = this;
		this.thumbnailcon = $(".thumbnail .thumbnailcon");
		this.nextbtn = $(".photothumbs .nextbtn");
		this.prevbtn = $(".photothumbs .prevbtn");
		this.thumbnails = this.thumbnailcon.find("li");
		this.bigphoto = $("#image_big");
		this.loading = $(".image_big .loading");
		this.currentnum = $(".image_big .currentnum");
		this.totalnum = $(".image_big .totalnum");
		this.ready = false;
		this.playinterval = null;
		this.playing = false;
		this.photonumber = this.thumbnails.length;
		this.cellwidth = this.thumbnails.outerWidth(true);
		this.pages = Math.floor(this.photonumber/4);
		this.lastpageitems = this.photonumber%4;
		this.dir = "tr";
		this.imgloading = false;
		if(this.lastpageitems>0){
			this.lastpageitems--;
		}
		this.page = 1;
		this.currentx = 0;
		this.animating = false;
		this.current = 0;
		this.config = {
			autoplay:true,
			interval:3000
		};
		this.ini = function(options){
			$.extend(true, this.config, options);
			this.thumbnailcon.find("ul").css({"width":this.cellwidth*this.photonumber});
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
			
			this.thumbnails.click(function(){
				var idx = that.thumbnails.index($(this));
				that.current = idx;
				var left = idx*that.cellwidth;
				//console.log(that.thumbnailcon.scrollLeft());
				//console.log(left);
				if(that.thumbnailcon.scrollLeft() == left){
					that.prev();
				}else if(that.thumbnailcon.scrollLeft() == left-4*that.cellwidth){
					that.next();
				}
				that.showphoto();
			});
			this.thumbnailcon.click(function(e,auto){
				if(!auto){
					that.pause();
				}
			});
			this.showphoto();
			if(this.config.autoplay){
				this.play();
			}
		};
		this.play_next = function(){
			if(this.current < this.photonumber-1){
				this.current++;
				this.thumbnails.eq(this.current).trigger("click",[true]);
			}
		};
		this.play_prev = function(){
			if(this.current > 0){
				this.current--;
			}
			this.thumbnails.eq(this.current).trigger("click",[true]);
		};
		this.play = function(){
			if(this.playing){
				this.pause();
			}else{
				this.playinterval = setInterval(function(){
					if(that.current == that.photonumber-1){
						that.pause();
					}else{
						that.playing = true;
						if(!that.imgloading){
							that.play_next();
						}
						
					}
				},this.config.interval);
			}
		};
		this.pause = function(){
			clearInterval(that.playinterval);
			this.playing = false;
		};
		this.replay = function(){
			this.current = 0;
			this.page = 1;
			that.thumbnailcon.scrollLeft(0);
			this.thumbnails.eq(this.current).trigger("click",[true]);
			this.play();
		};
		this.showphoto = function(){
			this.loading.show();
			this.imgloading = true;
			var currentthumb = this.thumbnails.eq(this.current);
			var thumbimg = currentthumb.find("img");
			var bigurl = thumbimg.data("big");
			that.thumbnails.removeClass("active");
			currentthumb.addClass("active");
			
			var bimg = new Image();
			bimg.onload =  function(){
				that.loading.hide();
				that.imgloading = false;
				that.ready = true;
				that.bigphoto.replaceWith($(bimg));
				that.bigphoto = $(bimg);
				
			};
			bimg.id = "image_big";
			bimg.src = bigurl;
			this.currentnum.html(this.current<9?"0"+(this.current+1):this.current+1);
		};
		this.next = function(){
			if(!that.animating && this.page<=this.pages){
				this.dir = "tr";
				this.prevbtn.removeClass("prevdisable");
				
				var to = this.page*this.cellwidth*4;
				if(this.page == this.pages){
					to = (this.page-1)*this.cellwidth*4+this.lastpageitems*this.cellwidth;
					this.nextbtn.addClass("nextdisable");
				}else if(this.page  == this.pages && this.lastpageitems == 0){
					this.nextbtn.addClass("nextdisable");
				}
				this.currentx = to;
				this.thumbnailcon.animate({scrollLeft:to},{
					complete:function(){
						that.animating = false;
						that.page++;
					},
					progress:function(){
						that.animating = true;
					}
				});
			}
			
		};
		this.prev = function(){
			if(!that.animating && this.page > 1){
				this.dir = "tl";
				this.nextbtn.removeClass("nextdisable");
				that.page--;
				var to = this.currentx - this.cellwidth*4;
				if(this.page == 1){
					to = 0;
				}
				this.currentx = to;
				this.thumbnailcon.animate({scrollLeft:to},{
					complete:function(){
						that.animating = false;
					},
					progress:function(){
						that.animating = true;
					}
				});
				if(this.page == 1){
					this.prevbtn.addClass("prevdisable");
				}
			}
			
		};
		
		
	};
	var pg = new photogallery();
	pg.ini({autoplay:false});
});
