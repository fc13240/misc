define(function(require){
	require('jquery');

	!function(){
		var $F = $('#sevenDay');
		var $fUl = $F.find('ul.f');
		var $fLi = $fUl.find('li');
		var arrMaxT = [];
		var arrMinT = [];
		var maxT = 0;
		var minT = 100;

		for (var i = $fLi.length - 1; i >= 0; i--) {
			var highTem = parseInt($fLi.eq(i).children('.t').text());
			arrMaxT.unshift(highTem);
			var lowTem = parseInt($fLi.eq(i).children('.b').text());
			arrMinT.unshift(lowTem);
			maxT = highTem > maxT ? highTem : maxT;
			minT = lowTem < minT ? lowTem : minT;
		};

		
		var lineT = Math.ceil(maxT/5);
		var lineB = minT%5;
		var lineB = lineB > 3 ? Math.ceil(minT/5)-2:Math.floor(minT/5)-2;
		for (var i = $fLi.length - 1; i >= 0; i--) {
			var mt = (lineT*5-arrMaxT[i])*12;
			$fLi.eq(i).css('marginTop',mt+'px').children('.n').height(arrMaxT[i]*12-arrMinT[i]*12);
			
			// arrMinT.unshift(hT);
			// arrMaxT.unshift(bT);
			
		};
		
		
		var b1Li = '';
		var b2Li = '';
		for (var i = lineT; i >= lineB; i--) {
			b1Li += '<li></li>';
			b2Li += '<li>' + i*5 +'°C</li>';
		};
		var lineN = lineT-lineB;
		$F.children('ul.b1').empty().append(b1Li).next().empty().append(b2Li);
		// alert($('#sevenDay ul.b li').eq(1).height())
		$F.children('ul.c').css('top',lineN*60-60+80+"px");
		$F.children('ul.d').css('top',lineN*60+80+"px");
	}()
})