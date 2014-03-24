// JavaScript Document
$(function(){
	//"China Weather Conditions"变来变去的颜色样式,用jq来添加样式，确保html代码的一致性
	var $uCL = $("#nearCity li");
	var $uAL = $("#nearAttr li");
	var colorNum = [0,3,4,7,8];
	
	for(var i=1;i<12;i+=2){
		$uCL.eq(i).addClass("ml");
		$uAL.eq(i).addClass("ml");
	};
	for(var i=2;i<12;i++){
		$uCL.eq(i).addClass("mt");
		$uAL.eq(i).addClass("mt");
	}
	for(var i=0;i<colorNum.length;i++){
		$uCL.eq(colorNum[i]).addClass('c');
		$uAL.eq(colorNum[i]).addClass('c');
	}
	
	$(".wF").hide();
	
	$(".cityName span").hover(function(){
		var a=$(this).index();
		alert(a)
	})
})