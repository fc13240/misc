<?php

# This file passes the content of the Readme.md file in the same directory
# through the Markdown filter. You can adapt this sample code in any way
# you like.

# Install PSR-0-compatible class autoloader
spl_autoload_register(function($class){
	require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});

# Get Markdown class
use \Michelf\Markdown;

# Read file and pass content through the Markdown praser
$text = file_get_contents('Readme.md');
$html = Markdown::defaultTransform($text);

?>
<!DOCTYPE html>
<html>
    <head>
        <title>PHP Markdown Lib - Readme</title>
        <script src="../../source/j/core.js"></script>
    </head>
    <body>
		<?php
			# Put HTML content in the document
			echo $html;
		?>
		<script type="text/javascript">
		W(function(){
			var base = W.data.base;
			W.use([base+'../libs/js/highlight.js',base+'../libs/css/markdown.css'],function(){
				hljs.tabReplace = '    ';
	  			hljs.initHighlightingOnLoad();
			});
		});
		</script>
    </body>
</html>
