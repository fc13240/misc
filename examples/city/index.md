# 城市三级联动
### 1. 以整个浏览器为容器 

<div class="example_container">
    <style class="example_css">
    </style>
    <div class="example_html">
        <select id="_province"></select>
        <select id="_city"></select>
        <select id="_county"></select>
        <input type="button" id="_getV" value="得到值"/>
        <span id="_result"></span>
    </div>
    <script class="example_js">
    W.use('j/m_city',function(City){
        var city = new City({
            'prov': $('#_province'),
            'city': $('#_city'),
            'county': $('#_county'),
            'selectedId': '101170202'
        });
        W(function(){
            $('#_getV').click(function(){
                $('#_result').text('您选的城市ID为：'+city.getValue());
            });
        })
    });
    </script>
</div>