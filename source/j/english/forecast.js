// JavaScript Document
define(function(require){
	require('./common');

	$(function(){
		var index = parseInt(document.URL.substring(document.URL.indexOf('index=')+6))||1;console.log(index)
	})
})