# 文本框搜索提示模块

## 普通搜索提示
> * 文本框得到焦点时自动显示
> * 选择省会时进行提示自动选择省会

<style class="example_css">
body{
    font-family: "SimSun","宋体","Arial","HELVETICA","sans-serif";
    color: #000;
}
.example_html input {
    margin: 40px;
}
.mt20{
    margin-top: 20px;
}
</style>
<div class="example_container mt20">
    <style class="example_css">
    #text_simple{
        width: 400px;
    }
    </style>
    <div class="example_html">
        <input type="text" id="text_simple"/>
    </div>
    <script class="example_js">
    W.use('j/m_search_suggest',function(Suggest){
        var $textBox = $('#text_simple');
        new Suggest({
            1:1
            // 'url': 'http://toy1.weather.com.cn/search'
            ,'textBox': $textBox
            ,'bindEvent': false
            ,'onSelect': function(data){
                if(data.length == 20){
                    alert('您选择了一个省，默认帮您选择省会');
                    $textBox.val(data[12]+data[10]);
                }else{
                    $textBox.val(data[2]+data[0]);
                }
                
            }
        });
    });
    </script>
</div>

## 搜索提示事件示例
> * 不绑定文本框得到焦点事件，进行自定义
> * 模拟placeholder

<div class="example_container mt20">
    <style class="example_css">
    #text_fuza{
        width: 400px;
    }
    </style>
    <div class="example_html" style="position:relative">
        <input type="text" id="text_fuza" value="请输入内容"/>
    </div>
    <script class="example_js">
    W.use('j/m_search_suggest',function(Suggest){
        var text = "请输入内容";
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
                $textBox.val(data[2]+data[0]);
            }
            // ,'maxnum': 6
            ,'isShowForeign': false
            ,isShowScenic: false
        });
    });
    </script>
</div>