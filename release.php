<?php
$type = $_POST['release-type'];
if($type == 1){
	echo 'release-misc';
}else if($type == 2){
	echo 'release-web';
}
?>
<form method="POST">
	<input type="release-type" value="1"/>
	<input type="submit" value="release-misc"/>
</form>
<form method="POST">
	<input type="release-type" value="2"/>
	<input type="submit" value="release-web"/>
</form>