<?php
header("Content-type: text/html; charset=utf-8");
if(!empty($_POST)){
	$type = $_POST['release-type'];
	$shellName = ($type == 1?'release-misc.sh':'release-web.sh');
	$command = '/bin/bash '.$_SERVER['DOCUMENT_ROOT'].'/shell/'.$shellName;
	echo $command.'<br/>';
	passthru ($command,$res);
	var_dump($res);
	echo '<br/><a href="">发布成功</a>';
	exit();
}
?>

<form method="POST">
	<input type="hide" name="release-type" value="1"/>
	<input type="submit" value="release-misc" style="width:150px;"/>
</form>
<form method="POST">
	<input type="hide" name="release-type" value="2"/>
	<input type="submit" value="release-web" style="width:150px;"/>
</form>