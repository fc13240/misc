# jiathis分享模块

<div class="example_container">
    <style class="example_css">
    #jia_result{
        position: relative;
        height: 300px;
    }
    </style>
    <div class="example_html">
        <div id="jia_result">
            <input type="button" id="btn_share" value="share"/>
        </div>
    </div>
    <script class="example_js">
    W.use('j/m_jia',function(jia){
        $('#btn_share').click(function(){
            $('#jia_result').append(jia.show())
        });
    });
    </script>
</div>