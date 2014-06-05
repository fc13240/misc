// JavaScript Document
$(function(){
jQuery('.wqhgLi').click(function(){
        if (jQuery('#wqhgBox').css("display") == "none") {  
            jQuery('#wqhgBox').fadeIn('fast');
            jQuery('.opact').show();
        }else{
            jQuery('#wqhgBox').fadeOut('fast');
            jQuery('.opact').hide();
        }
    });	
})