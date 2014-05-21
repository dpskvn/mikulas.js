# mikulas.js

## Usage

Grab the library and create a new instance of the Mikulas object, passing the ids of clock hand elements. You can also pass an optional callback function which will get executed every time the clock is updated.

Check the demo for more info.

## Example

```javascript
var c = new Mikulas("h", "m", "s", function() {
  console.log("Clock updated!");
});
c.start();
```

## [Demo](http://www.dinopaskvan.com/mikulas.js/)

## License

mikulas.js has been released under the MIT license.

## Author

Dino Paskvan (http://www.dinopaskvan.com)