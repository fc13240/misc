// JavaScript Document
function printXps(oper) {
	if (oper < 10)
	 {
		bdhtml = window.document.body.innerHTML;
		bodyColor = window.document.body.style.backgroundColor;
		sprnstr = "<!--startprint" + oper + "-->";
		eprnstr = "<!--endprint" + oper + "-->";
		prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18);
		prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
		window.document.body.style.backgroundColor="#fff";
		window.document.body.innerHTML = prnhtml;
		window.print();
		window.document.body.innerHTML = bdhtml;
		window.document.body.style.backgroundColor=bodyColor;
	} else {
		window.print();
	}
}