// JavaScript Document
$(document).ready(function() {
	/*页面加载时的初始化的操作*/
	var isplay;
	//$("#gjz").html($(".lqPicListtu1 ul li").length);
	$("<img id='imghc' style=\"display:none;\" src=''/>").appendTo("body");


	$(".picchra h2").html($(".lqPicListtu1 ul li:frist").find("a").attr("title"));
	$("#lq_BigPic > img").load(function() {
		$("#lq_BigPic > img").fadeIn("slow");

		if ($("#lq_BigPic > img").width() > 1000) {
			$("#lq_BigPic > img").width(1000);
		}
		curhei = $("#lq_BigPic > img").height();
		$("#efpLeftArea").add("#efpRightArea").height(curhei);
		$("#lqendSelect").css("top", $("#lq_BigPic > img").height() / 14);
		//$("#lqendSelect").css("left",$(".picmid").width()/4);

		tabs = $(".lqPicListtu1 ul li").index($(".lqPicListtu1 ul li.move")) + 1;
		if (tabs != $(".lqPicListtu1 ul li").length) {
			$("#imghc").attr("src", $(".lqPicListtu1 ul li").eq(tabs).find("a").attr("href"));
		}



	}).error(function() {});
	$("#lq_BigPic > img").attr("src", $(".lqPicListtu1 ul li:frist").find("a").attr("href"));
	$(".lqPicListtu1 ul").width($(".lqPicListtu1 ul li").length * 160 + 10);
	$(".lqPicListtu1 ul li").eq(0).addClass("move");
	$(".lqPicListshang").click(function() {
		$(".lqPicListtu1").scrollLeft($(".lqPicListtu1").scrollLeft() - 280);
	});
	$(".lqPicListnext").click(function() {
		$(".lqPicListtu1").scrollLeft($(".lqPicListtu1").scrollLeft() + 280);
	});
	/*定义向上一张的函数*/

	function Prepic() {
		tab = $(".lqPicListtu1 ul li").index($(".lqPicListtu1 ul li.move"));
		if (tab == 0) {
			return false;
		} else {
			if ($("#lq_BigPic > img:animated").length <= 0) {

				$("#lq_BigPic > img").fadeOut("slow", function() {
					$("#lq_BigPic > img").attr("src", $(".lqPicListtu1 ul li").eq(tab - 1).find("a").attr("href"));
					$("#lqendSelect").hide();
					//$("#lq_BigPic > img").fadeIn("slow");
				});
				$(".lqPicListtu1 ul li").removeClass("move").eq(tab - 1).addClass("move");
				$("#djz").html(tab);
				$(".picchra h2").html($(".lqPicListtu1 ul li").eq(tab - 1).find("a").attr("title"));
				if (tab * 140 + 8 - $(".lqPicListtu1").scrollLeft() <= 120) {
					$(".lqPicListshang").trigger("click");
				}
				$zhi = tab * 140 + 140 - $(".lqPicListtu1").scrollLeft();

				if ($zhi < 20 || $zhi > 820) {
					$scrol = (tab) * 140;
					if ($scrol > 0) {
						$(".lqPicListtu1").scrollLeft($scrol);
					}
				}
			}
		}
	}
	/*定义向下一张的函数*/

	function Nextpic() {
		tab = $(".lqPicListtu1 ul li").index($(".lqPicListtu1 ul li.move"));
		if (tab == $(".lqPicListtu1 ul li").length - 1) {
			$(".pic_transition").show().siblings(".xian").hide();
			$("#tqtad").attr('src', 'http://www.weather.com.cn/m2/i/index/tqtad.jpg');
			return false;
		} else {
			if ($("#lq_BigPic > img:animated").length <= 0) {

				$("#lq_BigPic > img").fadeOut("slow", function() {
					$("#lq_BigPic > img").attr("src", $(".lqPicListtu1 ul li").eq(tab + 1).find("a").attr("href"));
					$("#lqendSelect").hide();
					//$("#lq_BigPic > img").fadeIn("slow");
				});
				$(".lqPicListtu1 ul li").removeClass("move").eq(tab + 1).addClass("move");
				$("#djz").html(tab + 2);
				$(".picchra h2").html($(".lqPicListtu1 ul li").eq(tab + 1).find("a").attr("title"));
				if (tab * 140 + 8 - 660 - $(".lqPicListtu1").scrollLeft() > 0) {
					$(".lqPicListnext").trigger("click");
				}
				$zhi = tab * 140 + 140 - $(".lqPicListtu1").scrollLeft();
				if ($zhi < 20 || $zhi > 820) {
					$scrol = (tab) * 140;
					if ($scrol > 0) {
						$(".lqPicListtu1").scrollLeft($scrol);
					}
				}
			}
		}
	}
	$("#picPrevious").add("#efpLeftArea").click(function() {
		Prepic();
	});
	$("#picNext").add("#efpRightArea").click(function() {
		Nextpic();
	});
	/*定义键盘上的方向键上一事件*/
	$(window.document).keydown(function(event) {
		if (event.keyCode == 39) {
			Nextpic(); //按右时显示下一张
		} else if (event.keyCode == 37) {
			Prepic(); //按左时显示上一张
		}
	});
	/*绑定滚动列表里第几张图片的事件  单击第几张跳到第几张*/
	$(".lqPicListtu1 ul li").click(function() {
		tab = $(".lqPicListtu1 ul li").index($(this));
		href = $(this).find("a").attr("href");
		$("#lq_BigPic > img").fadeOut("slow", function() {
			$("#lq_BigPic > img").attr("src", href);
			$("#lqendSelect").hide();
			// $("#lq_BigPic > img").fadeIn("slow");
		});
		$(".lqPicListtu1 ul li").removeClass("move").eq(tab).addClass("move");
		$("#djz").html(tab + 1);
		$(".picchra h2").html($(".lqPicListtu1 ul li").eq(tab).find("a").attr("title"));
		$zhi = tab * 140 + 8 - $(".lqPicListtu1").scrollLeft();
		if ($zhi <= 160) {
			$(".lqPicListshang").trigger("click");
		}
		if ($zhi > 680) {
			$(".lqPicListnext").trigger("click");
		}
		return false;
	});
	/*绑定单击播放 暂停按钮后的事件*/
	$(".picPlay").click(function() {
		if ($(this).hasClass("isplay")) {
			clearInterval(isplay);
			$(this).removeClass("isplay");
		} else {
			$(this).addClass("isplay");
			time = $("#playmiao").html() * 1000;
			isplay = setInterval("$.play()", time);
		}
	});
	$(".dListPic").mouseover(function() {
		$(".dListPic").removeClass("dListPic1");
		$(this).addClass("dListPic1");
		$("#djz").html($(".dListPic").index(this) + 1);
	});
	/*全屏查看*/
	$("#picFullScreen").click(function() {
		window.open($("#lq_BigPic > img:visible").attr("src"));
	});
	/*选择间隔时间的事件*/
	$("#piccontbtn").click(function() {
		$("#jishi").slideDown("200");
		$(this).css("background", "url(http://www.weather.com.cn/m2/i/imageset_3/la.gif)");
		$(this).css("background-repeat", "no-repeat");
		$(this).css("color", "#4A90ED");
	});

	$("#zizhen").mousedown(function() {
		$("#jishi").mousemove(function(e) {
			x = e.clientY - 225;


			if (e.clientY > 335 | e.clientY < 230) {

				$("#jishi").unbind("mousemove");
			} else {
				if (x < 135 | x > 40) {
					miao = Math.ceil(x / 12);

					$("#zizhen").css("margin-top", x + "px");
					$("#playmiao").html(miao);
				}
			}
		});
	});
	$("#jishi").add("#zizhen").mouseup(function(event) {
		$("#jishi").unbind("mousemove");
		time = $("#playmiao").html() * 1000;
		$("#jishi").slideUp("200");
		$("#piccontbtn").css("background-repeat", "no-repeat");
		$("#piccontbtn").css("color", "#fff");
		if (isplay != null) {
			clearInterval(isplay);
		}
		isplay = setInterval("$.play()", time);
		$(".picPlay").addClass("isplay");
		event.stopPropagation();
	});
	/*添加评论的块   好像已经不要这功能了耶！！
	  $("#picComm").add("#viewdg").click(function(){
			$(".lqcommit").slideToggle("slow");		
	  });*/
	/*关闭已经是最后一张的提示*/
	$("#endSelClose").click(function() {
		$("#lqendSelect").hide();
	});
	/*重新播放*/
	$("#lqPlayBut").click(function() {
		$(".pic_transition").hide();
		$(".xian").show();
		$(".picchra h2").html($(".lqPicListtu1 ul li").eq(0).find("a").attr("title"));
		$("#djz").html('1');
		$(".lqPicListtu1").scrollLeft(0);
		$(".lqPicListtu1 ul li").removeClass("move").eq(0).addClass("move");
		time = $("#playmiao").html() * 1000;
		isplay = setInterval("$.play()", time);
		$(".picPlay").addClass("isplay");
		return false;
		event.stopPropagation();
	});
	$.extend({
		play: function() {
			tab = $(".lqPicListtu1 ul li").index($(".lqPicListtu1 ul li.move"));
			if (tab == $(".lqPicListtu1 ul li").length - 1) {
				$("#lqendSelect").show();
				$("#tqtad").attr('src', 'http://www.weather.com.cn/m2/i/index/tqtad.jpg');
				clearInterval(isplay);
				$(".picPlay").css("background-position", "0px 0px");
				$(".picPlay").removeClass("isplay");
			} else {
				$("#lq_BigPic > img").fadeOut("slow", function() {
					$("#lq_BigPic > img").attr("src", $(".lqPicListtu1 ul li").eq(tab + 1).find("a").attr("href"));
					$("#lqendSelect").hide();
					//$("#lq_BigPic > img").fadeIn("slow");
				});
				$(".lqPicListtu1 ul li").removeClass("move").eq(tab + 1).addClass("move");
				$("#djz").html(tab + 2);
				$(".picchra h2").html($(".lqPicListtu1 ul li").eq(tab + 1).find("a").attr("title"));
				if (tab * 140 + 8 - 360 - $(".lqPicListtu1").scrollLeft() > 0) {
					$(".lqPicListnext").trigger("click");
				}
			}
		}
	});

	/*定义向页面传递参数(p)第几张时的显示第几张图片*/
	if ($.query.get("p") > 0 & $.query.get("p") <= $(".lqPicListtu1 ul li").length + 1) {
		$(".lqPicListtu1 ul li").eq($.query.get("p") - 1).trigger("click");
		scr = ($.query.get("p") - 4) * 140;
		$(".lqPicListtu1").scrollLeft(scr);
	}
});

function download() {
	$src = $("#lq_BigPic > img").attr("src");
	$("#downloadFrame").attr("src", "http://search.weather.com.cn/static/download.php?filename=" + $src);
}
