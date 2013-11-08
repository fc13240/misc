define(function(require){
	require('jquery');
	require('../global');
	require('../plugs/jquery.placeholder.js');
	var Suggest = require('../m_search_suggest');
	var store = W.util.store;
	var ZS_COOKIE_NAME = 'zs';
	var zsList = {"co":"舒适度指数","zs":"中暑指数","lk":"路况指数","gm":"感冒指数","sg":"一句话提示指数","gj":"逛街指数","jt":"交通指数","ys":"雨伞指数","pl":"空气污染扩散条件指数","fs":"防晒指数","be":"海滨浴场","hc":"划船指数","mf":"美发指数","dy":"钓鱼指数","yd":"运动指数","cl":"晨练指数","tr":"旅游指数","yh":"约会指数","nl":"夜生活指数","uv":"紫外线强度指数","pk":"放风筝指数","ls":"晾晒指数","xq":"心情指数","ct":"穿衣指数","gz":"干燥指数","pp":"化妆指数","ac":"空调开启指数","pj":"啤酒指数","xc":"洗车指数","ag":"息斯敏过敏指数"};
	var defaultDingZhi = '101010100|北京||yd-uv-gj,101130101|上海||yd-uv-gj,101020100|北京2||yd-uv-gj';
	W(function(){
		var comp = function(a,b){
			return b[1].localeCompare(a[1]);
		}
		//101010100|北京||yd-uv-gj,101130101|上海||yd-uv-gj,101020100|北京2||yd-uv-gj
		var valInCookie = store.get(ZS_COOKIE_NAME) || defaultDingZhi;
		var cacheData = [];
		var itemArr = valInCookie.split(',');
		var $sele_left = $('.sele_left');
		var $sele_right = $('.sele_right');
		var $locations = $('.location').placeholder();
		var $aliases = $('.alias').placeholder();

		$.each(itemArr,function(index,v){
			var valArr = v.split('|');
			valArr[3] = valArr[3].split('-');
			initItem(index,valArr);
			var $location = $locations.eq(index);
			new Suggest({
		        'textBox': $location
		        // ,'url': 'http://localhost:8010/search'
		        ,'bindEvent': true
		        ,'onSelect': function(data){
		        	$location.val(data[2]).data('c_id',data.length == 20?data[10]:data[0]);
		        }
		    });
		});
		
		function initItem(index,valArr){
			var zsArr = valArr[3];
			var leftArr = [];
			var rightArr = [];
			for(var i in zsList){
				var val = [i,zsList[i]];
				($.inArray(i,zsArr) > -1?rightArr:leftArr).push(val);
			}
			var $left = $sele_left.eq(index);
			var $right = $sele_right.eq(index);
			initSelect($left,leftArr);
			initSelect($right,rightArr);

			$locations.eq(index).val(valArr[1]).data('c_id',valArr[0]);
			$aliases.eq(index).val(valArr[2]);
			cacheData[index] = valArr;
		}
		//初始化多选框数据
		function initSelect($select,dataArr){
			$select.find('option').remove();
			dataArr.sort(comp);
			$.each(dataArr,function(i,v){
				$select.append($('<option>').val(v[0]).text(v[1]));
			});
			//添加双击事件
			$select.find('option').dblclick(function(){
				var $parent = $(this).parent();

				var isLeft = $parent.hasClass('sele_left');
				var $srcSelect,$destSelect;
				var $srcSelect = $parent;
				var $destSelect = $parent.siblings(isLeft?'.sele_right':'.sele_left');
				move($srcSelect,$destSelect);
			});
		}
		//从选择框得到数据
		function getArrFromSelect($select){
			var result = [[],[]];
			$select.find('option').each(function(){
				var $this = $(this);
				var val = [$this.val(),$this.text()];
				var toIndex = $this.prop('selected')?0:1;
				result[toIndex].push(val);
			});
			return result;
		}
		//移动主函数
		function move($srcSelect,$destSelect){
			var srcResult = getArrFromSelect($srcSelect);
			if(srcResult[0].length == 0){
				alert('请先选择');
				return;
			}
			
			var destResult = getArrFromSelect($destSelect);
			var newDestArr = destResult[1].concat(srcResult[0]);
			var newSrcArr = srcResult[1];
			initSelect($srcSelect,newSrcArr);
			initSelect($destSelect,newDestArr);
		}
		//对左右箭头绑定事件
		$('.btns').each(function(){
			var moveBtns = $(this).find('a');
			moveBtns.eq(0).click(function(){
				var $item = $(this).closest('.item');
				move($item.find('.sele_left'),$item.find('.sele_right'));
			});
			moveBtns.eq(1).click(function(){
				var $item = $(this).closest('.item');
				move($item.find('.sele_right'),$item.find('.sele_left'));
			});
		});
		var $btn_cancels = $('.btn_cancel').click(function(){
			var $this = $(this);
			var index = $btn_cancels.index($this);
			initItem(index,cacheData[index]);
		});
		var $btn_saves = $('.btn_save').click(function(){
			var $this = $(this);
			var index = $btn_saves.index($this);
			var $item = $this.closest('.item');
			var $location = $item.find('.location');
			var $alias = $item.find('.alias');
			var zsArr = getArrFromSelect($item.find('.sele_right'));
			zsArr = zsArr[0].concat(zsArr[1]);

			var cityName = $location.val();
			var cityId = $location.data('c_id');
			if(!cityName || !cityId){
				alert('请选择正确的城市！');
				return;
			}
			if(zsArr.length != 3){
				alert('现只支持三个指数!');
				return;
			}
			var tempArr = [];
			$.each(zsArr,function(i,v){
				tempArr.push(v[0]);
			});
			cacheData[index] = [cityId,cityName,$alias.val()||'',tempArr];
			save()
		});
		function save(){
			var arr = [];
			$.each(cacheData,function(i,v){
				var temp = v.slice();//防止对cacheData数据的修改
				temp[3] = temp[3].join('-');
				arr.push(temp.join('|'));
			});
			store.set(ZS_COOKIE_NAME,arr.join(','));
			alert('保存成功');
		}
	})
})