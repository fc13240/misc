define(function(require){
	var STORAGE_NAME = 'zs';//favorite city name
	var dataUrl = "/data/zs/_id_.html";//加载城市指数信息地址
	// var cityUrl = '/weather/_id_.shtml';//显示城市的链接地址
	var zsUrl = '/zhishu/_zs_/_id_.shtml';//显示指数的链接地址
	var dingzhiUrl = '/profile/';//指数定制地址

	require('../global.js');
	var cookie = W.util.store;
	var havePageConf = {'ys':1,'xc':1,'uv':1,'tr':1,'pl':1,'gz':1,'fs':1,'ct':1,'co':1};
	W(function(){
		var $myZS = $('.myZS');
		var valInCookie = cookie.get(STORAGE_NAME) || '101010100|北京||ys-xc-uv,101020100|上海||tr-pl-gz,101280601|深圳||fs-ct-co';
		var $loading = $('.zs-loading');
		var $loadingh3 = $('.myZS h3');
		var arr = valInCookie.split(',');
		$.each(arr,function(i,v){
			var item = v.split('|');
			var cityId = item[0];
			
			$.getJSON(dataUrl.replace('_id_',cityId),function(data){
				$loading.remove();
				var zsData = data.zs;
				var zsTime = 0;
				var tempTime = '';	
				console.log(zsData.date);
				zsTime = parseInt(zsData.date.substr(8,2));
				console.log(zsTime);
				var html = '<dl>'+
						      '<dt>'+
						        '<a href="/weather/'+cityId+'.shtml">'+(item[2]||item[1])+'</a>'+
						        '<a class="btn-dz" href="'+dingzhiUrl+'">[定制]</a>'+
						      '</dt>'+
						      '<dd>';
				var zsArr = item[3].split('-');

				$.each(zsArr,function(ii,vv){
					var zsName = zsData[vv+'_name'];
					var hint = zsData[vv+'_hint'];
					var desc = zsData[vv+'_des'];
					html += '<a target="_blank" '+(havePageConf[vv]?'href="'+zsUrl.replace('_zs_',vv).replace('_id_',cityId)+'"':'')+' title="'+desc+'"><span>'+zsName+'</span><b>'+hint+'</b></a>';
				});
				$myZS.append($(html).fadeIn());
				$loadingh3.empty();
				console.log(zsTime);
				if(11<=zsTime<17){
					tempTime='11:00';
				}else if(17<=zsTime<=23 ){
					tempTime='18:00';  
				}else if(0<=zsTime<7){
					tempTime='18:00'; 
				}else if(7<=zsTime<11){
					tempTime='08:00'; 
				}else{
					tempTime='08:00'; 
				}
				$loadingh3.append('我的城市指数预报（'+tempTime+'更新）');


			});
		
					
					
					

				
		});
	})
});

// define(function(require){
// 	var Suggest = require('../m_search_suggest.js');
// 	require('../plugs/jquery.placeholder');
// 	require("http://www.weather.com.cn/m2/j/public/dltotw.js");
// 	var COOKIE_NAME = 'exponent';
// 	var dataUrl = '/data/zs/';//'http://cms.weather.com.cn/n/j/index/';
// 	var zsList = {"co":"舒适度指数","zs":"中暑指数","lk":"路况指数","gm":"感冒指数","sg":"一句话提示指数","gj":"逛街指数","jt":"交通指数","ys":"雨伞指数","pl":"空气污染扩散条件指数","fs":"防晒指数","be":"海滨浴场","hc":"划船指数","mf":"美发指数","dy":"钓鱼指数","yd":"运动指数","cl":"晨练指数","tr":"旅游指数","yh":"约会指数","nl":"夜生活指数","uv":"紫外线强度指数","pk":"放风筝指数","ls":"晾晒指数","xq":"心情指数","ct":"穿衣指数","gz":"干燥指数","pp":"化妆指数","ac":"空调开启指数","pj":"啤酒指数","xc":"洗车指数","ag":"息斯敏过敏指数"};
// 	$(function(){
// 		$('[placeholder]').placeholder();
// 		var defaultExponent = [['101010100','北京','','yd-uv-gj'],['101130101','乌鲁木齐','','yd-uv-gj'],['101020100','上海','','yd-uv-gj']]
// 		//101010100|北京||yd-uv-gj,101130101|上海||yd-uv-gj,101020100|北京2||yd-uv-gj
// 		var cookie_val = getCookie(COOKIE_NAME);
// 		var zs_arr = cookie_val.split(',');
// 		if(zs_arr.length != 3){
// 			zs_arr = defaultExponent;
// 		}else{
// 			$.each(zs_arr,function(i,v){
// 				zs_arr[i] = v.split('|');
// 			});
// 		}
// 		var hotCitiesindex = $('.hotCitiesindex');
// 		var citynameindex = hotCitiesindex.find('.citynameindex');
// 		var nickindex = hotCitiesindex.find('.nickindex')
// 		new Suggest({
// 	        'url': 'http://toy1.weather.com.cn/search',
// 	        'textBox': citynameindex
// 	        ,'bindEvent': false
// 	        ,'onSelect': function(data){
// 	        	var name = data[2],code;
// 	            if(data.length == 20){
// 	                // alert('您选择了一个省，默认帮您选择省会');
// 	                // name = data[12];
// 	                code = data[10];
// 	            }else{
// 	                 // name = data[2];
// 	                 code = data[0];
// 	            }
// 	            citynameindex.val(name);
// 	            citynameindex.data('id',code);
// 	        }
// 	    });
// 		//保存按钮
// 		hotCitiesindex.find('.saveindex').click(function(){
// 			var name = citynameindex.val();
// 			var id = citynameindex.data('id');
// 			if(!name || !id){
// 				alert('请选择城市');
// 				return;
// 			}
// 			var zsObj = $(':checkbox:checked');
// 			if(zsObj.length > 3){
// 				alert('最多可以选3个！');
// 				return;
// 			}
// 			var zs_val = [];
// 			var zs_info_arr = [];
// 			zsObj.each(function(i,v){
// 				zs_val.push($(this).val());
// 				zs_info_arr.push([$(this).val(),$(this).next().text()]);
// 			});
// 			var dl = hotCitiesindex.data('current_btn').closest('dl');
// 			dl.data('v',{'i':[id,name,nickindex.val(),zs_val.join('-')],'zs':zs_info_arr});
// 			//保存cookie并初始化???
// 			var cookie_val = [];
// 			myZS.find('dl').each(function(i,v){
// 				var data = $(this).data('v');
// 				cookie_val.push(data.i.join('|'));
// 				zs_arr[i] = data.i;
// 			});
// 			initZs();
// 			cookie_val = cookie_val.join(',');
// 			setCookie(COOKIE_NAME,cookie_val);
// 			hotCitiesindex.hide();
// 		});
// 	    //取消按钮
// 		hotCitiesindex.find('.cancelindex').click(function(){
// 			hotCitiesindex.hide();
// 		});
// 		//清除按钮
// 		hotCitiesindex.find('p label.btn').click(function(){
// 			hotCitiesindex.val('').removeData('id');
// 			hotCitiesindex.find('.nickindex').val('');
// 		});
// 		//定制按钮
// 		var myZS = $('.myZS').delegate('.btn-dz','click',function(){
// 			var val = ($(this).closest('dl').data('v'));
// 			var info = val['i'];
// 			var zs = val['zs'];
// 			hotCitiesindex.data('current_btn',$(this));
// 			hotCitiesindex.find('.citynameindex').val(info[1]).data('id',info[0]);
// 			hotCitiesindex.find('.nickindex').val(info[2]);
// 			hotCitiesindex.find(':checkbox').each(function(i,v){
// 				var $this = $(this);
// 				var val = $(this).val();
// 				var isChecked = false;
// 				$.each(zs,function(j,vv){
// 					if(vv[0] == val){
// 						isChecked = true;
// 					}
// 				});
// 				$this.prop('checked',isChecked);
// 			});
// 			hotCitiesindex.show();
// 		});
// 		var loading = myZS.find('.zs-loading');
// 		//初始化
// 		function initZs(){
// 			myZS.find('dl').remove();
// 			$.each(zs_arr,function(i,v){
// 				var item = v;
// 				var zs = item[3].split('-');
// 				var id = item[0];
// 				$.getJSON(dataUrl+id+'.html',function(data){
// 					var html = '<dl>'+
// 						      '<dt>'+
// 						        '<a href="/weatherfc/'+id+'.shtml">'+(item[2]||item[1])+'</a>'+
// 						        '<a class="btn-dz" data-id="'+id+'" data-name="'+item[1]+'">[定制]</a>'+
// 						      '</dt>'+
// 						      '<dd>';
// 						      var select_zs = [];
// 						      var zs_val = data.zs;
// 						      $.each(zs,function(j,vv){
// 						      	var val = zs_val[vv+'_name'];
// 						      	select_zs.push([vv,val]);
// 						      	var desc = zs_val[vv+'_name'];
// 						      	html += '<a href="/indexfc/'+vv+'/'+id+'.shtml"><span title="'+desc+'">'+desc+'</span><b>'+zs_val[vv+'_hint']+'</b></a>';
// 						      });
// 					html += '</dd>'+
// 						    '</dl>';
// 					loading.remove();
// 					myZS.append($(html).data('v',{'i':item,'zs':select_zs}));
// 				});
// 			});
// 		}
// 		initZs();
// 	});
// })
