//document.write("这里的文字是ajax加载的js动态生成的");
window.onload=function(){
var a = document.createElement('p');
a.innerHTML = '这里的文字是ajax加载的js动态生成的';
var b = document.getElementsByTagName('body')[0];

b.appendChild(a);
alert(11)
}