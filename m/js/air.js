// JavaScript Document
$(function(){
	 //获取城市ID
	var url=window.location.href;
	var urlA=url.split('.html');
	var areaid=urlA[0].substr(-9,9);
	var cityName="";
	$.ajax({
		type:"GET",
        url:"data/sk/"+areaid+".html",
		cache:false,
		async:false,
		data:{},
		dataType:"json",
		success:function(result){	
			cityName=result.sk_info.cityName;
		}
	})	
	$.ajax({
		type:"GET",
        url:"data/air/"+areaid+".html",
		cache:false,
		async:false,
		data:{},
		dataType:"json",
		success:function(result){	
			$pm2d5=result.k.k2;
			$aqi=result.k.k3;
			$aqiArr=result.k.k3.split("|");
			$publish_date=result.k.k4;
			//年
			$timeyear=$publish_date.substr(0,4);
			//月
			$timemonth=$publish_date.substr(4,2);
			//截取日期
			$timeday=$publish_date.substr(6,2);
			//截取小时
			$timehours=$publish_date.substr(8,2);
			$xData=new Array();
			$yData=new Array();
			j=Number($timehours);
			for(var i=0;i<=24;i++)
			{
				if(j>24)
				{
					j=1;
				}
				$xData.push(j);
				j=j+1;
				
			}
			$.each($aqiArr,function(i,v){
				
				if(v>0 && v<50)
				{
					$yData.push({y:Number(v),fillColor:'#3bb64f'});
				}
				else if(v>=50 && v<100)
				{
					$yData.push({y:Number(v),fillColor:'#ff9900'});
				}
				else if(v>=100 && v<150)
				{
					$yData.push({y:Number(v),fillColor:'#ff6000'});
				}
				else if(v>=150 && v<200)
				{
					$yData.push({y:Number(v),fillColor:'#f61c1c'});
				}
				else if(v>=200 && v<300)
				{
					$yData.push({y:Number(v),fillColor:'#bb002f'});
				}
				else
				{
					$yData.push({y:Number(v),fillColor:'#7e0808'});
				}
				
			})
			
			if($aqiArr[23]>0 && $aqiArr[23]<50)
			{
				$aqiC="优";
				$color="#3bb64f";
				$tsContent="空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！";
				$diannum="0.32";
				$jiaobiaocolor="0px;";
			}
			else if($aqiArr[23]>=50 && $aqiArr[23]<100)
			{
				$aqiC="良";
				$color="#ff9900";
				$tsContent="空气好，可以外出活动，除极少数对污染物特别敏感的人群以外，对公众没有危害！";
				$diannum="0.32";
				$jiaobiaocolor="-10px;";
			}
			else if($aqiArr[23]>=100 && $aqiArr[23]<150)
			{
				$aqiC="轻污染";
				$color="#ff6000";
				$tsContent="空气一般，老人、小孩及对污染物比较敏感的人群会感到些微不适！";
				$diannum="0.32";
				$jiaobiaocolor="-20px;";
			}
			else if($aqiArr[23]>=150 && $aqiArr[23]<=200)
			{
				$aqiC="不健康";
				$color="#f61c1c";
				$tsContent="空气较差，老人、小孩及对污染物比较敏感的人群会感到不适！";
				$diannum="0.32";
				$jiaobiaocolor="-30px;";
			}
			else if($aqiArr[23]>200 && $aqiArr[23]<=300)
			{
				$aqiC="危险";
				$color="#bb002f";
				$tsContent="空气差，适当减少外出活动，老人、小孩出门时需做好防范措施！";
				$diannum="0.267";
				$jiaobiaocolor="-40px;";
			}
			else
			{
				$aqiC="有毒";
				$color="#7e0808";
				$tsContent="空气很差，尽量不要外出活动";
				$diannum="0.26";
				$jiaobiaocolor="-50px;";
			}
			
			//alert($yData[24]["y"]);
			$("<span class='da' style=color:"+$color+">"+$aqiArr[23]+"</span><span class='mi' style=color:"+$color+">"+$aqiC+"</span>").appendTo("#AQInum");
			$(".yjh").html("温馨提示:<br />"+$tsContent);
			$("#city").html(cityName+"空气质量指数AQI("+$timemonth+"/"+$timeday+" "+$timehours+"时更新)");
			$("#quxian").html(cityName+"过去24小时空气质量曲线");
			$("#sec").html("<i class='op_pm25_i op_pm25_leveli3'  style='-moz-transform:rotate("+$aqiArr[23]+"deg);-webkit-transform:rotate("+$aqiArr[23]+"deg);'></i>");
			chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'line',
                backgroundColor:"",
                plotBorderColor:"#115aaa"
            },
            title: {
                text: "",
                floating:false,
               
            },
            xAxis: {
				categories:[$xData[0],$xData[3],$xData[6],$xData[9],$xData[12],$xData[15],$xData[18],$xData[21],$xData[24]+"(h)"],
				lineColor:"#115aaa",
				lineWidth:2
            },
            yAxis:{
            	title: {
                    text: ''
                },
            	labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false,
						formatter:function(){
						return this.y;
						}	
                    },
                    enableMouseTracking: false,
                    lineWidth: 2, 
                },
                
            },
			credits:{//版权信息,不显示
				    enabled:false,
			},
			legend:{
				enabled:false
			},
            series: [{
                data: [$yData[0],$yData[3],$yData[6],$yData[9],$yData[12],$yData[15],$yData[18],$yData[21],$yData[24]],
				color: '#89A54E',
				marker: {
                            radius: 4,  //曲线点半径，默认是4
                            symbol: 'circle' //曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
                        }
            }
			]
        });
		}
	})
})