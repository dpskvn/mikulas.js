// Grab the shadow element
var shadow = document.getElementById("shadow");

// Custom function to calculate the shadow data from a Mikulas instance
function getShadowData(clock) {
  var opacity = 0.2, // default opacity/angle values
      angle = -45;
  if (clock.getElapsedMinutes() < 1140 && clock.getElapsedMinutes() > 300) {
    // calculate opacity based on minutes elapsed today
    opacity = (Math.sin((clock.getElapsedMinutes() / 4 - 90) * Math.PI / 180)).toFixed(2); // opacity best described by a sine function
    opacity = opacity < 0.2 ? 0.2 : opacity; // we don't want the shadow opacity to be less than 0.2
    // the angle varies from -90 to +90 during the "day"
    angle = (((1 - (clock.getElapsedMinutes() - 300) / 840) * 180) - 90).toFixed(2);
  }
  return {
    opacity: opacity,
    angle: angle
  };
}

// Custom function to set the shadow data
function setShadow(data, clock) {
  clock.rotateElement(shadow, data.angle);
  shadow.style.opacity = data.opacity;
}

// Custom function to set the background
function setBackground(minutes) {
  var r = 76,
      g = 107,
      b = 169,
      angle = minutes / 4 - 90, // used to calculate bg color variation
      p = Math.sin(angle * Math.PI / 180), // yay! trigonometry again!
      body = document.getElementsByTagName("body")[0], // grab the body element
      rgbvalue = "rgb(" + Math.floor(r + 25 * p) + ',' + Math.floor(g + 36 * p) + ',' + Math.floor(b + 58 * p) + ")"; // calculate the rgb value based on the percentage (result of the sine function)
  body.style.background = rgbvalue; // apply the value to the body element
}


// Create a new instance of Mikulas with a callback to change
// the background and the shadow on clock updates
var c = new Mikulas("hours", "minutes", "seconds", function() {
  setBackground(this.getElapsedMinutes());
  setShadow(getShadowData(this), this);
});
c.start();

// Another clock, this one made of divs
var c2 = new Mikulas("h", "m", "s", function() {
  console.log("Clock updated!");
});
c2.start();