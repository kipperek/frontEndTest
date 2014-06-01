var scale = "celcius";
var weatherData;

function changeScaleClick(){
	$('.scale').removeClass('active_scale');
	$(this).addClass('active_scale');
	scale = $(this).attr('id');
	if(weatherData)
		setWeather();
}

function setCurrentWeather(){
	var current = weatherData.current_condition[0];
	$('#currentIcon').css('background-image',"url("+current.weatherIconUrl[0].value+")");
	
	var temp;
	if(scale === "celcius")
		temp = current.temp_C + "°C";
	else
		temp = current.temp_F + "°F";

	var desc ="<div id='cTemp'>"+temp+"</div>";
	desc += "<div id='cDesc'>"+current.weatherDesc[0].value+"</div>";
	$('#currentDesc').html(desc);

	var details = "<table><tr><td class='left'>Pressure</td><td>" +current.pressure+" hPa</td></tr>";
	details +="<tr><td class='left'>Humidity</td><td>" +current.humidity+"%</td></tr>";
	var wind = "";
	if(scale === "celcius")
		wind += current.windspeedKmph + " km/h ";
	else
		wind += current.windspeedMiles + " mph ";

	wind += current.winddir16Point;

	details +="<tr><td class='left'>Wind</td><td>" +wind+ "</td></tr>";
	details +="<tr><td class='left'>Precipitation</td><td>" +current.precipMM + " mm</td></tr>";
	details += "</table>";
	$("#currentDetails").html(details);
}

function setForecast(){
	var forecasting = weatherData.weather;
	$("#forecast").html("");

	$.each(forecasting,function(i,el){
		var newDiv = "<div class='forecastDay' id='"+el.date+"'>";
		newDiv += "<div class='dateForecast'>"+el.date+"</div>";
		newDiv += "<div class='wIcon' style='background-image: url("+el.weatherIconUrl[0].value+")'></div>";
		var avg, maxT, minT;
		if(scale==="celcius"){
			maxT = parseFloat(el.tempMaxC);
			minT = parseFloat(el.tempMinC);
			avg = (maxT + minT) /2 + "°C";
			maxT += "°C";
			minT += "°C";
		}else{
			maxT = parseFloat(el.tempMaxF);
			minT = parseFloat(el.tempMinF);
			avg = (maxT + minT) /2 + "°F";
			maxT += "°F";
			minT += "°F";
		}
		newDiv += "<div class='forecastAvg'>"+avg+"</div>";
		newDiv += "<div class='forecastTemps'><table><tr><td class='leftTemp'>Min</td><td>Max</td></tr><tr><td class='leftTemp'>"+minT+"</td><td>"+maxT+"</td></tr></table></div>";
		newDiv += "</div>";

		//DESCRIPTION ON HOVER // THERE is lack of pressure and humidity for forecast in json
		var newDetails = "<div class='forecastDetails'  id='details"+el.date+"'><div class='fdesc'>"+el.weatherDesc[0].value+"</div><table>";
		var newWind = "";
		if(scale === "celcius")
			newWind += el.windspeedKmph + " km/h ";
		else
			newWind += el.windspeedMiles + " mph ";

		newWind += el.winddir16Point;

		newDetails +="<tr><td class='left'>Wind</td><td>" +newWind+ "</td></tr>";
		newDetails +="<tr><td class='left'>Precipitation</td><td>" +el.precipMM + " mm</td></tr>";
		newDetails += "</table><div class='fdescArrow'></div></div>";

		$('#forecast').append(newDiv);
		$("#"+el.date).append(newDetails);
	});
	
	$('.forecastDetails').mouseover(function(){
		$(this).hide();
	});
	
	$('.forecastDay').hover(function(){
		$("#" +$(this).attr('id')+ " .forecastDetails").show();
	},function(){
		$("#" +$(this).attr('id')+ " .forecastDetails").hide();
	});
}

function setWeather(){
	//set header
	$('#weatherPlace').text(weatherData.request[0].query);
	//set Current weather
	setCurrentWeather();
	//set Forecast
	setForecast();
}

function showWeather(){
	$('#content').load("contents/weather.html",function(){
		shown = true;
		checkIfChanged();

		$('#content').fadeIn(300);

		//timeout to show loading for 0.3 sek
		setTimeout(function(){
		//GET WEATHER //COULD'T LOAD FROM http://www.smart4aviation.aero/zadania/weather.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. 
			$.get( "js/weather.json", function(data) {
				weatherData = data.data
				var weatherWrap = $("<div id='weatherWrap'></div>");
				weatherWrap.load("contents/weather_data.html",function(){
					$('#wWrap1').html(weatherWrap.html());
					setWeather();
					$('#load_div').fadeOut(300,function(){
						$('#wWrap1').fadeIn(300);
					});
					//CHANGE SCALE
					$('.scale').click(changeScaleClick);
				});
			}).fail(function(data) {
			    //TODO
			    console.log("fail");
			});
		 },300);
	});
}