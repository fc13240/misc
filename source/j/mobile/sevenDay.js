$(function(){
    var cityId = document.URL.match(/\w{9,}/);
    $('.yb_l dl').click(function(){
        var index = $(this).index()+1;
        window.open('http://61.4.184.147/fine/'+cityId+'.shtml?day='+index,'_self')
    })
})