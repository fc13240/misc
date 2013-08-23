# 目录及文件介绍

<div id="tree-container"></div>
<script>
(function(){
	var treeData = [{
		'name': '/',
		'des': '网站根目录',
		'sub': [
			{
				'name': 'docs',
				'des': '文档',
				'sub': []
			},
			{
				'name': 'examples',
				'des': '示例（包括代码及其它）',
				'sub': [
					{
						'name': 'markdown',
						'des': 'markdown用法示例',
						'sub': [
							{
								'name': 'code.md',
								'des': 'code用法示例',
								'isFolder': false
							},
							{
								'name': 'extra.md',
								'des': '特殊用法示例',
								'isFolder': false
							},
							{
								'name': 'index.md',
								'des': '标准用法示例',
								'isFolder': false
							},
							{
								'name': 'list.md',
								'des': 'list用法示例',
								'isFolder': false
							}
						]
					},
					{
						'name': 'tree',
						'des': '树形菜单',
						'sub': [
							{
								'name': 'index.html',
								'des': '树形菜单用法示例',
								'isFolder': false
							}
						]
					},
					{
						'name': 'highlight.html',
						'des': 'highlight用法示例',
						'isFolder': false
					},
					{
						'name': 'prettify.html',
						'des': 'prettify用法示例',
						'isFolder': false
					}
				]
			},
			{
				'name': 'libs',
				'des': '库文件',
				'sub': []
			},
			{
				'name': 'shell',
				'des': 'shell脚本',
				'sub': []
			},
			{
				'name': 'source',
				'des': '前端资源文件',
				'sub': []
			},
			{
				'name': 'tests',
				'des': '测试',
				'sub': []
			}
		]
	}];
	W.use('j/m_tree',function(a){
		var dFTree = a.dFTree;
		var dNode = a.dNode;
		tree = new dFTree({name: 'tree',useIcons:true, icondir:'/source/i/tree/'});
		function addItem(conf,pid,url){
			conf['id'] = treeIndex;
			if(url){
				conf['url'] = url;
			}
			tree.add(new dNode(conf),isNaN(pid)?-1:pid);
			return treeIndex++;
		}
		var treeIndex = 0;
		function parseData(nodeArr,pid,pHref){
			if(!($.isArray(nodeArr) && nodeArr.length > 0)){
				return;
			}
			nodeArr.sort(function(a,b){
				return !a.isFolder?-1: a.name.localeCompare(b.name);
			});
			for(var i = 0,j=nodeArr.length;i<j;i++){
				var item = nodeArr[i];
				var conf = {'caption':item['name']+' —— '+item['des']};
				var url = item['url'];
				if(url){
					conf['url'] = url;
				}
				var isFolder = item['isFolder'];
				if(typeof isFolder != 'undefined'){
					conf['isFolder'] = isFolder;
				}else{
					isFolder = true;
				}
				var cHref = pHref+item['name']+(isFolder && pid != -1?'/':'');
				conf['url'] = cHref;
				conf['target'] = '_blank';
				var id = addItem(conf,pid);//root node
				parseData(item['sub'],id,cHref);
			}
		}
		parseData(treeData,-1,'');
		W.use('jquery',function(){
			tree.draw(function(rootHtml){
				$('#tree-container').append($(rootHtml));
			})
		});
	});
})();
</script>