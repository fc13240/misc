// JavaScript Document
define(function(require){	
	require('jquery');
	

	$(function(){
		
        


  


$(".nav ul li").removeClass('on');
  $(".nav ul li[id="+$("#colorid").val()+"]").addClass("on");
        


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
