<?php
if(!empty($_POST)){
	$type = $_POST['release-type'];
	if($type == 1){
		// echo 'release-misc';
	}else if($type == 2){
		//echo 'release-web';
	}
	header("Content-type: text/html");
	$shellName = ($type == 1?'release-misc.sh':'release-web.sh');
	$command = dirname(__FILE__).'/shell/'.$shellName;
	passthru ($command,$res);
	var_dump($res);
	echo '<br/><a href="">back</a>';
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