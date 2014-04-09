// JavaScript Document
define(function(require){	
	require('jquery');
	require('./jpages.js');

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


       $(".ci ul li a[iname="+document.URL.substr(-2, 2)+"]").addClass("move").siblings(".box1").css("display","none");
	   $(".defaults[iname="+document.URL.substr(-2, 2)+"]").addClass("move").siblings(".defaults").css("display","none");
	   $(".yingc[iname="+document.URL.substr(-2, 2)+"]").css("display","block").siblings(".box1").css("display","none");

       $(".forcem .local ul li a[iname="+document.URL.substr(-2, 2)+"]").addClass("move").siblings(".local ul li").removeClass("move");



         $("div.holder").jPages({
      containerID  : "itemContainer",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder1").jPages({
      containerID  : "itemContainer1",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder2").jPages({
      containerID  : "itemContainer2",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder3").jPages({
      containerID  : "itemContainer3",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder4").jPages({
      containerID  : "itemContainer4",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder5").jPages({
      containerID  : "itemContainer5",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder6").jPages({
      containerID  : "itemContainer6",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder7").jPages({
      containerID  : "itemContainer7",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder8").jPages({
      containerID  : "itemContainer8",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder9").jPages({
      containerID  : "itemContainer9",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder10").jPages({
      containerID  : "itemContainer10",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder11").jPages({
      containerID  : "itemContainer11",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder12").jPages({
      containerID  : "itemContainer12",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder13").jPages({
      containerID  : "itemContainer13",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder14").jPages({
      containerID  : "itemContainer14",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder15").jPages({
      containerID  : "itemContainer15",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder16").jPages({
      containerID  : "itemContainer16",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	
	$("div.holder17").jPages({
      containerID  : "itemContainer17",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder18").jPages({
      containerID  : "itemContainer18",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder19").jPages({
      containerID  : "itemContainer19",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder20").jPages({
      containerID  : "itemContainer20",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder21").jPages({
      containerID  : "itemContainer21",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder22").jPages({
      containerID  : "itemContainer22",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder23").jPages({
      containerID  : "itemContainer23",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder24").jPages({
      containerID  : "itemContainer24",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder25").jPages({
      containerID  : "itemContainer25",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder26").jPages({
      containerID  : "itemContainer26",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder27").jPages({
      containerID  : "itemContainer27",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });$("div.holder28").jPages({
      containerID  : "itemContainer28",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder29").jPages({
      containerID  : "itemContainer29",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });
	$("div.holder30").jPages({
      containerID  : "itemContainer30",
      perPage      : 24,
      startPage    : 1,
      startRange   : 1,
      midRange     : 5,
      endRange     : 1
    });






 
	})
	
	
})
