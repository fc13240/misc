define(function(require){
	require('jquery');

	!function(){
		var $F = $('#sevenDay');
		var $fUl = $F.find('ul.f');
		var $fLi = $fUl.find('li');
		var arrTemH = [];
		var arrTemB = [];
		var maxT = 0;
		var minT = 100;

		for (var i = $fLi.length - 1; i >= 0; i--) {
			var tem1 = parseInt($fLi.eq(i).children('.t').text());
			var tem2 = parseInt($fLi.eq(i).children('.b').text());
			if(tem1<tem2){
				var tem = tem1;
				var tem1 = tem2;
				var tem2 = tem;
			}
			arrTemH.unshift(tem1);
			arrTemB.unshift(tem2);
			maxT = tem1 > maxT ? tem1 : maxT;
			minT = tem2 < minT ? tem2 : minT;
		};
		var lineT = Math.ceil(maxT/5)+1;
		var lineB = minT%5;
		var lineB = lineB > 3 ? Math.ceil(minT/5)-2:Math.floor(minT/5)-2;
		for (var i = $fLi.length - 1; i >= 0; i--) {
			var mt = (lineT*5-arrTemH[i])*12;
			$fLi.eq(i).css('marginTop',mt+'px').find('.zc').height(arrTemH[i]*12-arrTemB[i]*12-20);
			
			// arrTemB.unshift(hT);
			// arrTemH.unshift(bT);
			
		};
		var b1Li = '';
		var b2Li = '';
		for (var i = lineT; i >= lineB; i--) {
			b1Li += '<li></li>';
			b2Li += '<li>' + i*5 +'°C</li>';
		};
		
		var lineN = lineT-lineB;
		$F.children('ul.b1').empty().append(b1Li).children('li:last').css({'border-left':'none','border-right':'none'}).parent('ul').next().empty().append(b2Li);
		// alert($('#sevenDay ul.b li').eq(1).height())
		$F.children('ul.c').css('top',lineN*60-60+80+"px");
		$F.children('ul.d').css('top',lineN*60+80+"px");
	}()
})