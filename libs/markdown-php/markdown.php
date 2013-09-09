<?php
header("Content-type: text/html; charset=utf-8"); 
error_reporting(E_ALL ^ E_NOTICE);
# This file passes the content of the Readme.md file in the same directory
# through the Markdown filter. You can adapt this sample code in any way
# you like.

# Install PSR-0-compatible class autoloader
spl_autoload_register(function($class){
	require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});

# Get Markdown class
use \Michelf\GithubMarkdown;
define("PROJECT_BASE_PATH", realpath(dirname(__FILE__) . "/../../"));
$arr = explode('?',$_GET['md']);
// var_dump($arr);
$filePath = $_GET['md'] ? PROJECT_BASE_PATH.'/'.$arr[0]: 'Readme.md';
// echo $filePath;
# Read file and pass content through the Markdown praser

if(!file_exists($filePath)){
	header("HTTP/1.1 404 Not Found");  
	header("Status: 404 Not Found");  
	exit;
}
$text = file_get_contents($filePath);
$html = GithubMarkdown::defaultTransform($text);
if($arr[1]){
	$param = array();
	$arr = explode('&', $arr[1]);
	foreach($arr as $val){
		$tempArr = explode('=', $val);
		$param[$tempArr[0]] = $tempArr[1];
	}
	if($param['ajax']){
		echo $html;
		echo "<script>W.use(W.data.base+'../../libs/js/m_show_code');</script>";
		exit();
	}
}
?>
<!DOCTYPE html>
<html>
    <head>
    	<meta charset='utf-8'>
        <title></title>
        <script src="/source/j/core.js"></script>
        <script>(function(){
        	var base = W.data.base;
        	W.css(base+'c/reset.css',base+'c/core.css',base+'../libs/css/markdown.css',base+'../libs/css/highlight.css');
        })();</script>
        <style>
        .main_container{width:980px;margin: 0 auto;border: 1px solid white;/*防止子元素margin影响*/}
        </style>
    </head>
    <body>
    	<div class="main_container">
		<?php
			# Put HTML content in the document
			echo $html;
		?>
		</div>
		<script type="text/javascript">
		W(function(){
			var base = W.data.base;
			W.use([base+'../libs/js/highlight.js',base+'../libs/css/markdown.css'],function(){
				hljs.tabReplace = '    ';
	  			hljs.initHighlightingOnLoad();
	  			$('title').html($('h1').html());
	  			$('body').trigger('initDown');
			});
		});
		</script>
    </body>
</html>
