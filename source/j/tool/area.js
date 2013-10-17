(function(global) {
	(function(citysearch) {
		citysearch.ini = function() {
			$areaid = '101010100';
			$provid = $areaid.substr(0, 5);
			$districtid = $areaid.substr(5, 2);
			$cityid = $areaid.substr(7, 2);
			var baseUrl = '/data/city3jdata/';
			var stationUrl = baseUrl + 'station/';
			var $chinaURL = baseUrl+'china.html';
			var $provURL = stationUrl + $provid + '00.html';

			var initialized = [];
			var inidetect = setInterval(function() {
				if (initialized.length == 2) {
					clearInterval(inidetect);
					var opt = {
						theme: 'mac'
					};
					if ($.browser.msie && $.browser.version < 7) {

						opt = {
							theme: 'mac',
							effectOpen: "default",
							effectClose: "default"
						};
					}
					$('.skinned-select').Selectyze(opt);
				}
			}, 200)
			var $districtURL;
			if ($provid == '10101' || $provid == '10102' || $provid == '10103' || $provid == '10104') {
				$districtURL = stationUrl + $provid + $cityid + '.html';
				$cityid = '01';
			} else {
				$districtURL = stationUrl + $provid + $districtid + '.html';
			}

			$.ajax({
				type: 'GET',
				url: $chinaURL,
				async: true,
				dataType: 'json',
				success: function(data) {
					$("#prov").empty();
					$.each(data, function(i, items) {
						if (i == $provid) {
							$('<option selected="selected" value="' + i + '">' + items + '</option>').appendTo("#prov");
						} else {
							$('<option value="' + i + '">' + items + '</option>').appendTo("#prov");
						}
					})
					initialized.push("prov");
				}
			});
			$.ajax({
				type: 'GET',
				url: $provURL,
				async: true,
				dataType: 'json',
				success: function(data) {
					$("#district").empty();
					$.each(data, function(i, items) {
						if (i == $districtid) {
							$('<option selected="selected" value="' + i + '">' + items + '</option>').appendTo("#district");
						} else {
							$('<option value="' + i + '">' + items + '</option>').appendTo("#district");
						}
					})
					initialized.push("district");
				}
			});

			$("#prov").change(function() {
				var URL = baseUrl + '/provshi/' + $("#prov").val() + '.html';
				var provVal = $("#prov").val();
				if (provVal == '10101' || provVal == '10102' || provVal == '10103' || provVal == '10104') {
					URL = stationUrl + provVal + '00.html';
				}
				$.ajax({
					type: 'GET',
					url: URL,
					async: false,
					dataType: 'json',
					success: function(data) {
						var newSelect = $("<select id='district'></select>");

						var temp_data = [];
						$.each(data, function(i, items) {
							if (i == '01') {
								$('<option selected="selected" value="' + i + '">' + items + '</option>').appendTo(newSelect);
							} else {
								$('<option value="' + i + '">' + items + '</option>').appendTo(newSelect);
							}
						})
						newSelect.css({
							"display": "none",
							"zoom": 1
						});
						var skinnedSelect = $("#district").next(".DivSelectyze");
						$("#district").remove();
						skinnedSelect.replaceWith(newSelect);
						var opt = {
							theme: 'mac'
						};
						if ($.browser.msie && $.browser.version < 7) {
							opt = {
								theme: 'mac',
								effectOpen: "default",
								effectClose: "default"
							};
						}
						$('#district').Selectyze(opt);
					}
				});

			});
			$("#weatherselect").click(function() {
				$provid = $("#prov").val();
				$districtid = $("#district").val();
				$cityid = "01";
				var $realid;
				if ($provid == '10101' || $provid == '10102' || $provid == '10103' || $provid == '10104') {
					$realid = $provid + $districtid + "00";
				} else {
					$realid = $provid + $districtid + $cityid;
				}
				if ($cityid.length == 9) $realid = $cityid;
				if ($realid == '101340501') $realid = '101231001';
				$href = 'http://www.weather.com.cn/weather/' + $realid + '.shtml'; //判断是否为钓鱼岛

				//window.open($href , window.opener); 
				window.open($href);
			});
		};

	})(global.citysearch || (global.citysearch = {}));
})(this.W || (this.W = {}));