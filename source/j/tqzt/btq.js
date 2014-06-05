// JavaScript Document
define(function(require){
	require('jquery');
$(function(){
$(".wqhgLi").click(function(){
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