function change_url(){
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	console.log(latitude);
	console.log(longitude);
			var url ='https://api.darksky.net/forecast/895ecdfe985d8c23e57c014da03eefc1/' + latitude + ',' + longitude; //Place your DarkSky API Call Here 
			$.ajax({url:url, dataType:"jsonp"}).then(function(data) {
				
				var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //This is a helper array to help convert the day of the week [0-7] to a named value [Sunday - Saturday]
	
				console.log(data);//Review all of the data returned
				console.log("Current Temp: " + data.currently.apparentTemperature);//View Today's Temp
				console.log("Tomorrow's High: " + data.daily.data[1].apparentTemperatureHigh);//View Tomorrow's High
				document.getElementById("temp_today").innerHTML = data.currently.temperature;
				var temp = Number(data.currently.temperature);
				console.log(temp);
				document.getElementById("thermometer_inner").style.height =  data.currently.temperature + "%";
				if(temp > "85"){
					document.getElementById("thermometer_inner").style.background = "red";
				}
				else if(temp < "65"){
					document.getElementById("thermometer_inner").style.background = "blue";
				}
				document.getElementById("image_today").src = "./img/" + data.currently.icon + ".png";
				document.getElementById("icon_today").innerHTML = data.currently.icon;
				document.getElementById("precip_today").innerHTML = data.currently.precipProbability * 100 + "%";
				document.getElementById("humidity_today").innerHTML = data.currently.humidity * 100 + "%";
				document.getElementById("wind_today").innerHTML = data.currently.windSpeed;
				document.getElementById("summary_today").innerHTML = data.currently.summary;
				var unix_time = data.currently.time;//Retrieve the current timestamp
				var javascript_time = new Date(unix_time * 1000);//Convert the unix time stamp to javascript
				var date = javascript_time.getDay() + 1;
				for (var i =0 ;i<6;i++){
					document.getElementById("image-today-" + i).src = "./img/" + data.daily.data[i].icon + ".png";
					document.getElementById("temperature-high-"+i).innerHTML = data.daily.data[i].temperatureHigh;
					document.getElementById("temperature-low-"+i).innerHTML = data.daily.data[i].temperatureLow;
					var c=date%7;
					document.getElementById("week-day-"+i).innerHTML = week_names[c];
					date++;;
				}  
			})
}