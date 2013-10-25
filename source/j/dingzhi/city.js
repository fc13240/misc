define(function(require){
	require('jquery');
	require('../global');
	require('../plugs/jquery.placeholder.js');
	var cookie = W.util.cookie;
	var Suggest = require('../m_search_suggest');

	var STORAGE_NAME = 'f_city';//favorite city name
	var html = '<a class="btn_dele">X</a>'+
		          '<input type="text" class="location" placeholder="城市名、全拼、简拼、电话区号、邮编查询"/>'+
		          '<input type="text" class="alias" placeholder="自定义名称"/>'+
		          '<a class="btn_save">保存</a>'+
		          '<a class="btn_cancel">取消</a>';
	var STAT_NULL = 1;//空数据
	var STAT_INIT_FROM_COOKIE = 2;//从cookie得到值并初始化
	var STAT_MODIFYING = 3;//修改之前已验证过的数据
	var STAT_MODIFIED = 4;//修改验证完成

	W(function(){
		var $formContainer = $('.form-container');
		for(var i = 0;i<10;i++){
			$formContainer.eq(i<3?0:1).append($('<div>').addClass('form').html('<div></div>'));
		}
		var $forms = $formContainer.find('.form');
		//北京|101010100|,郑州|200000000|家
		var valInCookie = cookie.get(STORAGE_NAME);
		var cacheData = [];
		var initedNum = 0;
		if(valInCookie){
			var arr = valInCookie.split(',');
			$.each(arr,function(i,v){
				var val = v.split('|');
				cacheData[i] = val;
				addItem.apply(null,val);
			});
		}
		addItem();

		//保存数据
		function save(){
			if(cacheData.length > 0){
				var val = [];
				$.each(cacheData,function(i,v){
					val.push(v.join('|'));
				});
				cookie.set(STORAGE_NAME,val.join(','));
				var dzEvent = W.data['event.dz_city'];
				if(dzEvent){
					dzEvent.emit('modify');//通知外部更新
				}
			}
		}
		function addItem(cityname,cityid,aliasname){
			var $html = $(html);
			// $html.data('i',initedNum);
			var $btns = $html.filter('.btn_save,.btn_cancel');
			$html.filter('[placeholder]').placeholder().focus(function(){
				$btns.show();
				$(this).data('o_v',$(this).val());
			}).blur(function(){
				var status = $html.parent().data('s');
				if(status != STAT_MODIFYING){
					$btns.hide();
				}
			}).keyup(function(){
				isModifying($(this))
			})
			function isModifying($obj){
				if($obj.data('o_v') != $obj.val()){
					$html.parent().data('s',STAT_MODIFYING);
					$obj.data('o_v',$obj.val())
				}
			}
			$html.filter('.btn_dele').click(function(){
				if(confirm('确定要删除吗？')){
					var $container = $(this).parent();
					$container.children().remove();
					var removeIndex = $forms.index($container.parent());

					for(var i = removeIndex+1;i<$forms.length;i++){
						$forms.eq(i).find('div').data('i',i-1).children().appendTo($forms.eq(i-1).find('div'));
					}
					initedNum--;
					cacheData.splice(removeIndex,1);
					save();
				}
			});
			$html.filter('.btn_save').click(function(){
				if($location.val()){
					var index = $html.parent().data('i');
					var newId = $location.data('c_id');
					var newval = $location.val();
					var fn = function(){
						$btns.hide();
						if(initedNum < 10 && index == initedNum-1){
							addItem();
						}
						cacheData[index] = [newval,newId,$alias.val()];
						save();
					}

					var olddata = cacheData[index];
					if(!olddata || olddata[1] != newId ){
						var aa = setTimeout(function(){
							alert('输入的信息有误！');
						},1500)
						try{
							$.getJSON('/data/cityinfo/'+newId+'.html',function(data){
								clearTimeout(aa);
								fn();
							});
						}catch(e){
							alert('wrong');
						}
						
					}else{
						fn();
					}
				}
				
			});
			$html.filter('.btn_cancel').click(function(){
				var olddata = cacheData[$html.parent().data('i')];
				if(olddata){
					$location.data('c_id',olddata[1]).val(olddata[0]);
					$alias.val(olddata[2]);
				}
				$location.data('c_id',olddata?olddata[1]:'').val(olddata?olddata[0]:'');
				$alias.val(olddata?olddata[2]:'');

				$btns.hide();
				$html.parent().data('s',olddata?STAT_MODIFIED:STAT_NULL);

			});
			var $location = $html.filter('.location').data('c_id',cityid).val(cityname);
			var $alias = $html.filter('.alias').val(aliasname);
			new Suggest({
		        'textBox': $location
		        ,'bindEvent': true
		        ,'onSelect': function(data){
		        	$location.val(data[2]).data('c_id',data.length == 20?data[10]:data[0]);
		        	isModifying($location)
		        }
		    });

			$forms.eq(initedNum).find('div').data('s',(cityname && cityid)?STAT_INIT_FROM_COOKIE:STAT_NULL).data('i',initedNum).append($html);
			initedNum++;
		}
	});
});