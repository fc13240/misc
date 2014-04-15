// JavaScript Document
define(function(require){	
	require('jquery');

	$(function(){
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
		$(".nav ul.navlink li").removeClass('on');
		$(".nav ul.navlink li[id="+$("#colorid").val()+"]").addClass("on");    
		//摄氏度和华氏度切换
		$('.wF').hide();
		$("#weaUnit li").click(function(){
			var that = $(this);
			var index = that.index()
			hoverClass(that,'li');
			switch(index){
				case 0:$(".wF").hide();$('.wC').fadeIn("slow");break;
				case 1:$(".wC").hide();$('.wF').fadeIn("slow");break;
			}
		})
		//头部推荐的三个城市切换
		$('.searchBox p a.rollRight').click(function(){
			$('.searchBox p a:lt(4)').hide();
			$('.searchBox p a:gt(3)').show();
		})
		$('.searchBox p a.rollLeft').click(function(){
			$('.searchBox p a:lt(4)').show();
			$('.searchBox p a:gt(3)').hide();
		})
		//Local Time
		var $T=$("#localTime");
		function time(){
		  var date=new Date();
		  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
		  $T.html("Local Time in China &nbsp; "+weatherDate);
		}
		time();
		setInterval(time,60000);
	})
})
//个位数补0
function date_0_9(n){
  if(n<10) return '0'+n;
	  else return n; 
}
//mouse hover function
function hoverClass(that,obj){
	that.siblings(obj).removeClass('on');
	that.addClass('on')
}
