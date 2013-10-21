define(function(require){
	require('jquery');
	var defaultConfig = {
		'prov': null,
		'city': null,
		'county': null,
		'selectedId': ''
	}
	var dataUrl = '/data/city3jdata/';
	var CODE_RE = /^(\d{5})(\d{2})(\d{2})$/
	function City(config){
		this._conf = config = $.extend({},defaultConfig,config);
		var $province = config.prov;
		if($province){
			var selectedId = config.selectedId;
			var m;
			var selectedProvId = selectedCityId = selectedCountyId = null;
			if((m = selectedId.match(CODE_RE))){
				selectedProvId = m[1];
				selectedCityId = m[2];
				selectedCountyId = m[3];
			}
			var $city = config.city;
			var $county = config.county;
			var initNum = 0;
			var _initCity = function(){
				_initData(dataUrl+'provshi/'+$province.val()+'.html',$city,selectedCityId,_initCounty);
			}
			var _initCounty = function(){
				_initData(dataUrl+'station/'+$province.val() + $city.val()+'.html',$county,selectedCountyId);
			}
			_initData(dataUrl+'china.html',$province,selectedProvId,_initCity);
			$province.change(_initCity);
			
			$city.change(_initCounty);
		}
	}
	var cache = {};
	var _initData = function(url,$obj,selectedId,callback){
		var _data = cache[url];
		if($obj.data('_f')){
			selectedId = null;
		}else{
			$obj.data('_f',true);
		}
		var fn = function(data){
			$obj.empty();
			for(var i in data){
				$('<option value="' + i + '"'+(selectedId == i?' selected':'')+'>' + data[i] + '</option>').appendTo($obj);
			}
			callback && callback();
		}
		if(_data){
			fn(_data);
		}else{
			$.getJSON(url,function(data){
				cache[url] = data;
				fn(data);
			});
		}
	}

	var cityProp = City.prototype;
	cityProp.getValue = function(){
		var config = this._conf;
		var provId = config.prov.val();
		var cityId = config.city.val();
		var countyId = config.county.val();
		var returnVal = '';
		if(/^1010[1-4]$/.test(provId)){
			returnVal = provId + countyId + cityId;
		}else{
			returnVal = provId + cityId + countyId;
		}
		return returnVal;
	}
	return City;
})