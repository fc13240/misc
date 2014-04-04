// JavaScript Document
define(function(require){	
	require('jquery');
	

	$(function(){
		
         function _htmlIndex(){
			htmlIndex = parseInt(document.URL.substring(document.URL.indexOf('?index=')+7)) || 1;
		
			switch(htmlIndex){
				case 1:$(".forcem .local ul li").removeClass("move");$(".forcem .local ul li").eq(0).addClass("move");$(".jqd").hide();break;
				//case 2:$(".forcem .local ul li").removeClass("move");$(".forcem .local ul li").eq(htmlIndex-1).addClass("move");$(".box1").hide();$(".box1").eq(1).show();break;
				case 3:$(".forcem .local ul li").removeClass("move");$(".forcem .local ul li").eq(1).addClass("move");$(".box1").hide();$(".jqd").show();break;
				case 4:$(".forcem .local ul li").removeClass("move");$(".forcem .local ul li").eq(1).addClass("move");$(".box1").hide();$(".jqd").show();break;
				case 5:$(".forcem .local ul li").removeClass("move");$(".forcem .local ul li").eq(1).addClass("move");$(".box1").hide();$(".jqd").show();$(".jqd .ming").hide();$(".jqd .ming").eq(1).show();$(".jqd .nat ul li").removeClass("move");$(".jqd .nat ul li").eq(1).addClass("move");break;
				case 6:$(".forcem .local ul li").removeClass("move");$(".forcem .local ul li").eq(1).addClass("move");$(".box1").hide();$(".jqd").show();$(".jqd .ming").hide();$(".jqd .ming").eq(2).show();$(".jqd .nat ul li").removeClass("move");$(".jqd .nat ul li").eq(2).addClass("move");break;
				case 7:$(".one .ming").hide();$(".one .ming").eq(0).show();$(".jqd").hide();$(".one .nat ul li").removeClass("move");$(".one .nat ul li").eq(0).addClass("move");break;
				case 8:$(".one .ming").hide();$(".one .ming").eq(1).show();$(".jqd").hide();$(".one .nat ul li").removeClass("move");$(".one .nat ul li").eq(1).addClass("move");break;
				case 9:$(".one .ming").hide();$(".one .ming").eq(2).show();$(".jqd").hide();$(".one .nat ul li").removeClass("move");$(".one .nat ul li").eq(2).addClass("move");break;
			}
		}_htmlIndex();	


  
$(".ming ul li:odd").css("background-color","#fff");

$(".nav ul li").removeClass('on');
  $(".nav ul li[id="+$("#colorid").val()+"]").addClass("on");
        


	})
	
	
})
