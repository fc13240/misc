// JavaScript Document
 W.use('j/m_search_suggest_tourism',function(Suggest){
    var text = "Enter Your City,ST or ZIP Code";
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
             var cityName = data[5];
             alert(cityname);
              $("#text_fuza").val(cityName);
             var toUrl = '';
                 if(data.length == 20){                              
                      toUrl += 'http://www.weather.com.cn/'+data[0]+'/index.shtml';

                }else{
                    toUrl += 'http://en.weather.com.cn/weather/'+data[0]+'.shtml';
                }

                 $("#text_fuza").data('url',toUrl);
                window.open(toUrl);
        }
        ,'maxnum': 6
    });
      var $btnSubmit=$(".button");
     if($btnSubmit && $btnSubmit.length){
            $btnSubmit.click(function(){
                var toUrl = $("#text_fuza").data('url');
                if(toUrl){
                    window.open(toUrl);
                }else{
                

                    //alert('Enter Your City,ST or ZIP Code');
                    $("#text_fuza").focus();
                }
            });
        }
});

