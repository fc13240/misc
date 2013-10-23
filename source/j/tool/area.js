(function(global) {
	(function(citysearch) {
		citysearch.ini = function() {
			$areaid = '101010100';
			$provid = $areaid.substr(0, 5);
			$districtid = $areaid.substr(5, 2);
			$cityid = $areaid.substr(7, 2);
			var baseUrl = '/data/city3jdata/';
			var stationUrl = baseUrl + 'station/';
			var $chinaURL = baseUrl + 'china.html';
			var $provURL = baseUrl +'provshi/' + $provid + '.html';
			var $districtURL;
			if ($provid == '10101' || $provid == '10102' || $provid == '10103' || $provid == '10104') {
				$districtURL = stationUrl + $provid + $cityid + '.html';
			} else {
				$districtURL = stationUrl + $provid + $districtid + '.html';
			}
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

			$.ajax({

				type: 'GET',
				url: $districtURL,
				async: true,
				dataType: 'json',
				success: function(data) {
					$("#city").empty();
					$.each(data, function(i, items) {
						if (i == $cityid) {
							$('<option selected="selected" value="' + i + '">' + items + '</option>').appendTo("#city");
						} else {
							$('<option value="' + i + '">' + items + '</option>').appendTo("#city");
						}
					})
					initialized.push("city");
				}
			});

			$("#district").change(function() {
				var URL = stationUrl + $("#prov").val() + $("#district").val() + '.html';
				$.ajax({
					type: 'GET',
					url: URL,
					async: true,
					dataType: 'json',
					success: function(data) {
						$("#city").empty();
						var newSelect = $("<select id='district'></select>");
						$.each(data, function(i, items) {
							$('<option value="' + i + '">' + items + '</option>').appendTo("#city");
						})
						newSelect.css({
							"display": "none",
							"zoom": 1
						});
						var skinnedSelect = $("#city").next(".DivSelectyze");
						$("#city").remove();
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
						$('#city').Selectyze(opt);
					}

				});
			});



			$("#prov").change(function() {
				var URLDitrict = baseUrl + 'provshi/' + $("#prov").val() + '.html';
				var URLStation = stationUrl + $("#prov").val() + $("#district").val() + '.html';
				/*var provVal = $("#prov").val();
				if (provVal == '10101' || provVal == '10102' || provVal == '10103' || provVal == '10104') {
					URL = stationUrl + provVal + '00.html';
				}*/
				$.ajax({
					type: 'GET',
					url: URLDitrict,
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

				$.ajax({
					type: 'GET',
					url: URLStation,
					async: true,
					dataType: 'json',
					success: function(data) {
						$("#city").empty();
						var newSelect = $("<select id='district'></select>");
						$.each(data, function(i, items) {
							$('<option value="' + i + '">' + items + '</option>').appendTo("#city");
						})
						newSelect.css({
							"display": "none",
							"zoom": 1
						});
						var skinnedSelect = $("#city").next(".DivSelectyze");
						$("#city").remove();
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
						$('#city').Selectyze(opt);
					}
				});

			});


			$("#weatherselect").click(function() {
				$provid = $("#prov").val();
				$districtid = $("#district").val();
				$cityid = $("#city").val();
				var $realid;
				if ($provid == '10101' || $provid == '10102' || $provid == '10103' || $provid == '10104') {
					$realid = $provid + $cityid + $districtid;
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