define(function(require){
	require('../english/jq-cookie');
	var Suggest = require('../m_search_suggest');
	
	var text = "搜索城市(中文/拼音)";
    var $textBox = $('#text_fuza').focus(function(){
        if($(this).val() == text){
            $(this).val('');
        }
    }).blur(function(){
        if(!$(this).val()){
            $(this).val(text)
        }
    });
    new Suggest({
        'url': 'http://toy1.weather.com.cn/search'
        ,'key': 'cityname'
        ,'cbName': 'callback'
        ,'textBox': $textBox
        ,'bindEvent': false
        ,'onSelect': function(data){
        	//添加cookie			
			var dataId = data[0];
			var citys = $.cookie('citys') || '';
			var arrCity = citys.split('/');
			var al = true;
			for (var i = arrCity.length - 1; i >= 0; i--) {
				if(parseInt(arrCity[i]) == dataId){
					var al=false;
					alert('该城市已添加过');
				}
			};
			if(al){
				var data = dataId+','+data[2];
				arrCity.push(data);
			}
			citys = arrCity.join('/');
			$.cookie('citys',citys,{expires:30,path: '/'});
            window.open('http://ljy.weather.com.cn/m/citmani.html','_self');
        }
        ,'maxnum': 6
    });
})