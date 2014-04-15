// JavaScript Document
define(function(require) {

	require('jquery');
	

	$(function(){

		var htmlIndex = parseInt(document.URL.substring(document.URL.indexOf('?index=') + 7)) || 1;
		switch (htmlIndex) {
			case 1:
				$(".forcem .local ul li").removeClass("move");
				$(".forcem .local ul li").eq(0).addClass("move");
				$(".jqd").hide();
				break;
			case 2:
				$(".forcem .local ul li").removeClass("move");
				$(".forcem .local ul li").eq(2).addClass("move");
				$(".box1").hide();
				$(".box1").eq(2).show();
				break;
			case 3:
				$(".forcem .local ul li").removeClass("move");
				$(".forcem .local ul li").eq(1).addClass("move");
				$(".box1").hide();
				$(".jqd").show();
				break;
			case 4:
				$(".forcem .local ul li").removeClass("move");
				$(".forcem .local ul li").eq(1).addClass("move");
				$(".box1").hide();
				$(".jqd").show();
				break;
			case 5:
				$(".forcem .local ul li").removeClass("move");
				$(".forcem .local ul li").eq(1).addClass("move");
				$(".box1").hide();
				$(".jqd").show();
				$(".jqd .ming").hide();
				$(".jqd .ming").eq(1).show();
				$(".jqd .nat ul li").removeClass("move");
				$(".jqd .nat ul li").eq(1).addClass("move");
				break;
			case 6:
				$(".forcem .local ul li").removeClass("move");
				$(".forcem .local ul li").eq(1).addClass("move");
				$(".box1").hide();
				$(".jqd").show();
				$(".jqd .ming").hide();
				$(".jqd .ming").eq(2).show();
				$(".jqd .nat ul li").removeClass("move");
				$(".jqd .nat ul li").eq(2).addClass("move");
				break;
			case 7:
				$(".one .ming").hide();
				$(".one .ming").eq(0).show();
				$(".jqd").hide();
				$(".one .nat ul li").removeClass("move");
				$(".one .nat ul li").eq(0).addClass("move");
				break;
			case 8:
				$(".one .ming").hide();
				$(".one .ming").eq(1).show();
				$(".jqd").hide();
				$(".one .nat ul li").removeClass("move");
				$(".one .nat ul li").eq(1).addClass("move");
				break;
			case 9:
				$(".one .ming").hide();
				$(".one .ming").eq(2).show();
				$(".jqd").hide();
				$(".one .nat ul li").removeClass("move");
				$(".one .nat ul li").eq(2).addClass("move");
				break;
		}

     //中英文切换
		$('#lanType').hover(function(){
			$(this).addClass('down').next().show();
		},function(){
			$(this).removeClass('down').next().hover(function(){
				$('#lanType').addClass('down');
				$(this).show();
			},function(){
				$(this).hide();
				$('#lanType').removeClass('down');
			})
			$(this).next().hide();
		})
		
	$(".ming ul li:odd").css("background-color", "#fff");
	$(".nav ul li").removeClass('on');
	$(".nav ul li[id=" + $("#colorid").val() + "]").addClass("on");







})

		var $T=$("#localTime");
		function time(){
		  var date=new Date();
		  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
		  $T.html("Local Time in China &nbsp; "+weatherDate);
		}
		time();
		setInterval(time,60000);

		function date_0_9(n){
	  if(n<10) return '0'+n;
		  else return n; 
	}

})