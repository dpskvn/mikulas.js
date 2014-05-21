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
  this.date = new Date();
  this.callback = callback;
}

/**
* Retrieves the angle of the seconds hand for the currently set time
* @returns {Number}
*/

Mikulas.prototype.getSecondsAngle = function() {
  return this.date.getSeconds() * 6;
}

/**
* Retrieves the angle of the minutes hand for the currently set time
* @returns {Number}
*/

Mikulas.prototype.getMinutesAngle = function() {
  return this.date.getMinutes() * 6;
}

/**
* Retrieves the angle of the hours hand for the currently set time
* @returns {Number}
*/

Mikulas.prototype.getHoursAngle = function() {
  return this.date.getHours() * 30 + Math.round(this.date.getMinutes() / 2);
}

/**
* Retrieves the amount of minutes elapsed today
* @returns {Number}
*/

Mikulas.prototype.getElapsedMinutes = function() {
  return this.date.getHours() * 60 + this.date.getMinutes();
}

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
}

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
}

/**
* Starts the clock
*/

Mikulas.prototype.start = function () {
  this.interval = setInterval(function() {
    var date = new Date();
    this.setClockTime(date);
  }.bind(this), 1000);
}

/**
* Stops the clock
*/

Mikulas.prototype.stop = function () {
  clearInterval(this.interval);
}