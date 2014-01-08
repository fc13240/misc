$(function(){
	  //ajax获取数据	
	  var url="http://www1.weather.com.cn/data/cityinfo/"+id+".html";
	  $.getJSON(url, function(data){
		   $(".weaArea .weaArea_f").html(data.weatherinfo.city);
		   $(".weaImg .img1").attr('src','img/'+data.weatherinfo.img1);
		   $(".weaImg .img2").attr('src','img/'+data.weatherinfo.img2);
		   $(".weaTem .Tem").html(parseInt(data.weatherinfo.temp1)+"~"+data.weatherinfo.temp2);
		   $(".weaTem .wea").html(data.weatherinfo.weather);
	  });
	  
	  //获取时间并显示
	  var $T=$("#weatherPlug .localTime");
	  function time(){
		  var date=new Date();
		  var weatherDate=date.getFullYear()+"-"+date_0_9(date.getMonth()+1)+"-"+date_0_9(date.getDate())+" "+date_0_9(date.getHours())+":"+date_0_9(date.getMinutes())+":"+date_0_9(date.getSeconds());
		  $T.html(weatherDate);
	  }
	  time();
	  setInterval(time,1000);
	  //个位数补0
	  function date_0_9(n){
		  if(n<10) return '0'+n;
			  else return n; 
	  }
})
	
