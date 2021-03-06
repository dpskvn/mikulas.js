//            _  _         _              _
//    ._ _ _ <_>| |__ _ _ | | ___  ___   <_> ___
//    | ' ' || || / /| | || |<_> |<_-< _ | |<_-<
//    |_|_|_||_||_\_\`___||_|<___|/__/<_>| |/__/
//                                      <__'
// mikulas.js
// Version: 0.2.0
// Author: Dino Paskvan
// Mail: dpaskvan@gmail.com
// Web: http://www.dinopaskvan.com
// Copyright (c) 2014 Dino Paskvan
// Licence : MIT

/**
* Creates a new Mikulas object
* @param {String} h The id of the hours clock hand element
* @param {String} m The id of the minutes clock hand element
* @param {String} s The id of the seconds clock hand element
* @param {Function} callback The function to be called every time the clock is updated (optional)
*/

function Mikulas(h, m, s, callback) {
  this.h = document.getElementById(h);
  this.m = document.getElementById(m);
  this.s = document.getElementById(s);
  if (this.h === null) {
    throw new Error("No element with the id '" + h + "'!");
  }
  if (this.m === null) {
    throw new Error("No element with the id '" + m + "'!");
  }
  if (this.s === null) {
    throw new Error("No element with the id '" + s + "'!");
  }
  this.setTransformOrigin();
  this.date = new Date();
  this.callback = callback;
}

/**
* Sets transform-origin to "bottom" for hand elements
*/

Mikulas.prototype.setTransformOrigin = function () {
  this.h.style.webkitTransformOrigin = "bottom";
  this.h.style.MozTransformOrigin = "bottom";
  this.h.style.msTransformOrigin = "bottom";
  this.h.style.OTransformOrigin = "bottom";
  this.h.style.transformOrigin = "bottom";
  this.m.style.webkitTransformOrigin = "bottom";
  this.m.style.MozTransformOrigin = "bottom";
  this.m.style.msTransformOrigin = "bottom";
  this.m.style.OTransformOrigin = "bottom";
  this.m.style.transformOrigin = "bottom";
  this.s.style.webkitTransformOrigin = "bottom";
  this.s.style.MozTransformOrigin = "bottom";
  this.s.style.msTransformOrigin = "bottom";
  this.s.style.OTransformOrigin = "bottom";
  this.s.style.transformOrigin = "bottom";
};

/**
* Retrieves the angle of the seconds hand for the currently set time
* @returns {Number}
*/

Mikulas.prototype.getSecondsAngle = function() {
  return this.date.getSeconds() * 6;
};

/**
* Retrieves the angle of the minutes hand for the currently set time
* @returns {Number}
*/

Mikulas.prototype.getMinutesAngle = function() {
  return this.date.getMinutes() * 6;
};

/**
* Retrieves the angle of the hours hand for the currently set time
* @returns {Number}
*/

Mikulas.prototype.getHoursAngle = function() {
  return this.date.getHours() * 30 + Math.round(this.date.getMinutes() / 2);
};

/**
* Retrieves the amount of minutes elapsed today
* @returns {Number}
*/

Mikulas.prototype.getElapsedMinutes = function() {
  return this.date.getHours() * 60 + this.date.getMinutes();
};

/**
* Rotates the specified element by the amount passed
* @param {Object} el The element to be rotated
* @param {Number} amount The rotation angle (expressed in deg)
*/

Mikulas.prototype.rotateElement = function(el, amount) {
  el.style.webkitTransform = "rotate(" + amount + "deg)";
  el.style.MozTransform = "rotate(" + amount + "deg)";
  el.style.msTransform = "rotate(" + amount + "deg)";
  el.style.OTransform = "rotate(" + amount + "deg)";
  el.style.transform = "rotate(" + amount + "deg)";
};

/**
* Sets the clock time to the date passed
* @param {Date} date The date we want to set the clock to
*/

Mikulas.prototype.setClockTime = function(date) {
  this.date = date;
  this.rotateElement(this.s, this.getSecondsAngle());
  this.rotateElement(this.m, this.getMinutesAngle());
  this.rotateElement(this.h, this.getHoursAngle());
  if (typeof this.callback === 'function') {
    this.callback();
  }
};

/**
* Starts the clock
*/

Mikulas.prototype.start = function () {
  this.interval = setInterval(function() {
    var date = new Date();
    this.setClockTime(date);
  }.bind(this), 1000);
};

/**
* Stops the clock
*/

Mikulas.prototype.stop = function () {
  clearInterval(this.interval);
};