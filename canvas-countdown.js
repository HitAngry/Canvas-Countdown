
// Copyright (c) 2016 Simon Philouze

var countdown = function(canvasId,dateEnding){

	// Initialization
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext('2d');

	// Params 
	var posX = canvas.width / 2;
	var posY = canvas.height / 2;
	var lineWidth = 7;
	var radius = canvas.height / 2 - lineWidth;
	var counterClockWise = true;
	var lineColor = "#FF7C0A";
	var backgroundColor = "#F3F3F3";
	var fontColor = "#68696D";
	var marginRight = 10;

	var drawCircle = function(type, time, timeRatio, posX) {
		
		// Background
		context.beginPath();
		context.arc(posX, posY, radius-lineWidth/2, -90 * Math.PI / 180, (360 * Math.PI / 180) - 90 * Math.PI / 180, counterClockWise);
		context.fillStyle = backgroundColor;
		context.fill();

		// Text  
		context.font = '35pt Arial';
		context.textAlign = "center";
		context.fillStyle = fontColor;
		context.fillText(time,posX, canvas.height / 2);
		context.font = '12pt Arial';
		context.textAlign = "center";
		context.fillStyle = fontColor;
		context.fillText(type,posX, canvas.height / 1.5);

		// Border
		var degrees = -time * timeRatio
		context.beginPath();
		context.arc(posX, posY, radius, -90 * Math.PI / 180, (degrees * Math.PI / 180) - 90 * Math.PI / 180, counterClockWise);
		context.lineWidth = lineWidth;
		context.strokeStyle = lineColor;
		context.stroke();
	};

	var clearCanvas = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	var convertMS = function(ms) {
	  var d, h, m, s;
	  s = Math.floor(ms / 1000);
	  m = Math.floor(s / 60);
	  s = s % 60;
	  h = Math.floor(m / 60);
	  m = m % 60;
	  d = Math.floor(h / 24);
	  h = h % 24;
	  return {days:d, daysRatio:15, hours: h, hoursRatio:15, minutes:m, minutesRatio:6, seconds:s, secondsRatio:6};
	};

	this.update = function() {
		setInterval(function(){
			var now = new Date().getTime();
			var time = convertMS(dateEnding - now);
			clearCanvas();
			drawCircle("SECONDES", time.seconds, time.secondsRatio, (((canvas.width / 2 ) + marginRight) + ( radius * 3 )) + ( lineWidth * 2 ));
			drawCircle("MINUTES", time.minutes, time.minutesRatio, (((canvas.width / 2 ) + ( marginRight / 2 )) + radius ) + ( lineWidth / 2 ));
			drawCircle("HEURES", time.hours, time.hoursRatio, (((canvas.width / 2 ) - ( marginRight / 2 )) - radius ) - ( lineWidth / 2 ));
			drawCircle("JOURS", time.days, time.daysRatio, (((canvas.width / 2 ) - marginRight) - ( radius * 3 )) - ( lineWidth * 2 ));
		},1000);
	};
};