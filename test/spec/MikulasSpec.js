describe("Mikulas", function() {
  var clock;
  var callbackTest = null;

  beforeEach(function() {
    var hDiv = document.createElement('div');
    hDiv.id = 'h';
    document.getElementsByTagName('body')[0].appendChild(hDiv);
    var mDiv = document.createElement('div');
    mDiv.id = 'm';
    document.getElementsByTagName('body')[0].appendChild(mDiv);
    var sDiv = document.createElement('div');
    sDiv.id = 's';
    document.getElementsByTagName('body')[0].appendChild(sDiv);
    clock = new Mikulas("h", "m", "s", function() {
      callbackTest = true;
    });
  });

  it("should have a date property", function() {
    expect(clock.date).toBeDefined();
    expect(clock.date instanceof Date).toBe(true);
  });
  
  it("should return a number for the clock hand angles", function() {
    expect(typeof clock.getHoursAngle()).toBe("number");
    expect(typeof clock.getMinutesAngle()).toBe("number");
    expect(typeof clock.getSecondsAngle()).toBe("number");
  });
  
  it("should return the angle 0 for 00:00:00", function() {
    var d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    clock.setClockTime(d);
    
    expect(clock.getHoursAngle()).toBe(0);
    expect(clock.getMinutesAngle()).toBe(0);
    expect(clock.getSecondsAngle()).toBe(0);
  });
  
  it("should return the hours hand angle 180 for 06:00:00", function() {
    var d = new Date();
    d.setHours(6);
    d.setMinutes(0);
    d.setSeconds(0);
    clock.setClockTime(d);
    
    expect(clock.getHoursAngle()).toBe(180);
  });
  
  it("should return the minutes hand angle 90 for 12:15:00", function() {
    var d = new Date();
    d.setHours(12);
    d.setMinutes(15);
    d.setSeconds(0);
    clock.setClockTime(d);
    
    expect(clock.getMinutesAngle()).toBe(90);
  });
  
  it("should return the hours hand angle 98 for 03:15:00", function() {
    var d = new Date();
    d.setHours(3);
    d.setMinutes(15);
    d.setSeconds(0);
    clock.setClockTime(d);
    
    expect(clock.getHoursAngle()).toBe(98);
  });
  
  it("should be able to set the clock time manually", function() {
    var d = new Date();
    clock.setClockTime(d);
    
    expect(clock.date).toEqual(d);
  });
  
  it("should return elapsed minutes for the clock", function() {
    var d = new Date();
    d.setHours(3);
    d.setMinutes(15);
    d.setSeconds(0);
    clock.setClockTime(d);
    
    expect(typeof clock.getElapsedMinutes()).toBe("number");
    expect(clock.getElapsedMinutes()).toBe(195);
  });
  
  it("should be able to rotate elements", function() {
    var testDiv = document.createElement('div');
    var retrievedDiv;
    testDiv.id = 'test';
    document.getElementsByTagName('body')[0].appendChild(testDiv);
    retrievedDiv = document.getElementById("test");
    clock.rotateElement(retrievedDiv, 45);
    
    expect(retrievedDiv.style.webkitTransform).toEqual("rotate(45deg)");
    expect(retrievedDiv.style.MozTransform).toEqual("rotate(45deg)");
    expect(retrievedDiv.style.msTransform).toEqual("rotate(45deg)");
    expect(retrievedDiv.style.OTransform).toEqual("rotate(45deg)");
    expect(retrievedDiv.style.transform).toEqual("rotate(45deg)");
  });
  
  it("should call the callback when the clock gets update", function() {
    expect(callbackTest).toBeTruthy();
  });
  
  it("should thrown an error for an element id that doesn't exist", function() {
    expect(function() {
      var anotherClock = new Mikulas("hh", "m", "s");
    }).toThrowError("No element with the id 'hh'!");
  })
});
