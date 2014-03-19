// JavaScript Document
$(function(){
	var $uSL = $("#ulStyle li");
	var colorNum = [0,3,4,7,8,11];
	
	for(var i=1;i<12;i+=2){
		$uSL.eq(i).addClass("ml");
	};
	for(var i=2;i<12;i++){
		$uSL.eq(i).addClass("mt");
	}
	for(var i=0;i<colorNum.length;i++){
		$uSL.eq(colorNum[i]).addClass('c');
	}
	//Local Time
	$("#weaUnit li").mouseenter(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
	})
	$('#lanType').hover(function(){
		$(this).next().show();
	},function(){
		$(this).next().hide();
	})
		$('#lanType').next().hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		})
	
	
	var $T=$("#localTime");
	function time(){
	  var date=new Date();
	  var weatherDate=date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+"&nbsp; "+date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate());
	  $T.html("Local Time &nbsp; "+weatherDate);
	}
	time();
	setInterval(time,60000);
})
//个位数补0
function date_0_9(n){
  if(n<10) return '0'+n;
	  else return n; 
}
