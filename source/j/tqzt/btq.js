// JavaScript Document
define(function(require){
$(function(){
$(".wqhgLi").click(function(){
	alert("aa");
        if ($('#wqhgBox').css("display") == "none") {  
            $('#wqhgBox').fadeIn('fast');
            $('.opact').show();
        }else{
            $('#wqhgBox').fadeOut('fast');
            $('.opact').hide();
        }
    });	
})

})