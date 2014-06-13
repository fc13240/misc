<?php 
session_start();
?>
<!doctype html>
<html>
<head>
<meta charset='utf-8'>
</head>
<body style="width:800px;margin: 10px auto;">
<?php
$isShowForm = true;
if(!empty($_POST)){
	if($_SESSION['flag'] != $_POST['flag']){
		echo '<script>alert("请不要重复发布！");location.href=""</script>';
	}else{
		$isShowForm = false;
		$type = $_POST['release-type'];
		$shellName = ($type == 1?'release-misc.sh':'release-web.sh');
		$command = '/bin/bash '.$_SERVER['DOCUMENT_ROOT'].'/shell/'.$shellName;
		echo $command.'<br/>';
		passthru ($command,$res);
		echo '<br/>';
		var_dump($res);
		echo '<br/><a href="">发布成功,点击刷新</a>';
		$_SESSION['flag'] = time();
	}
}else{
	$_SESSION['flag'] = time();
}
if($isShowForm){
?>
	<style>
	form.clearfix{display: block;}
	</style>
	<form method="POST" action="/release.php" class="clearfix">
		<input type="hidden" name="flag" value="<?php echo $_SESSION['flag'];?>"/>
		<input type="hidden" name="release-type" value="1"/>
		<input type="submit" value="发布前端网站" style="width:150px;float:left;margin-right:10px;"/>
		<p>发布前端网站资源,会压缩CSS及JS,更改版本号(更新misc.weather.com.cn的资源)</p>
	</form>
	<form method="POST" action="/release.php" class="clearfix">
		<input type="hidden" name="flag" value="<?php echo $_SESSION['flag'];?>"/>
		<input type="hidden" name="release-type" value="2"/>
		<input type="submit" value="发布前端资源" style="width:150px;float:left;margin-right:10px;"/>
		<p>会把source和min下文件同步到生产服务器(i.tq121.com.cn)</p>
	</form>
<?php }?>
<script type="text/javascript">
if(~document.body.innerHTML.indexOf('*** error ***')){
	alert('压缩出现了几个错误,再不处理打屁股！');
}
</script>
</body>