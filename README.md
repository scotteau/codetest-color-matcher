This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CodeTest - Color Matcher

Build a static website that finds similar colours for an inputted color.

## Tasks

-[ ] React.js & ES6
-[ ] Color Table
-[ ] Search Field
-[ ] Validation
-[ ] Warning message
-[ ] Conversion between different color formats
-[ ] Styling

## Resources

### [#HEX Color Validation](https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444)

```regexp
/^#[0-9A-F]{6}$/i.test('#AABBCC')

/^#([0-9A-F]{3}){1,2}$/i.test('#ABC')

```

```javascript
function isValidColor(str) {
    return str.match(/^#[a-f0-9]{6}$/i) !== null;
}
```


### [When using a word as color name](https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color)

```javascript
function isValidColor(strColor) {
  var s = new Option().style;
  s.color = strColor;

  // return 'false' if color wasn't assigned
  return s.color == strColor.toLowerCase();
}
```

## [Hex to RGB](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)

```javascript
function hex2rgb(hex){
	return{r:'0x'+hex[1]+hex[2]|0,g:'0x'+hex[3]+hex[4]|0,b:'0x'+hex[5]+hex[6]|0}
}
```

### [HEX to CMYK](http://www.javascripter.net/faq/hex2cmyk.htm)

```javascript
function hexToCMYK (hex) {
 var computedC = 0;
 var computedM = 0;
 var computedY = 0;
 var computedK = 0;

 hex = (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;

 if (hex.length != 6) {
  alert ('Invalid length of the input hex value!');   
  return; 
 }
 if (/[0-9a-f]{6}/i.test(hex) != true) {
  alert ('Invalid digits in the input hex value!');
  return; 
 }

 var r = parseInt(hex.substring(0,2),16); 
 var g = parseInt(hex.substring(2,4),16); 
 var b = parseInt(hex.substring(4,6),16); 

 // BLACK
 if (r==0 && g==0 && b==0) {
  computedK = 1;
  return [0,0,0,1];
 }

 computedC = 1 - (r/255);
 computedM = 1 - (g/255);
 computedY = 1 - (b/255);

 var minCMY = Math.min(computedC,Math.min(computedM,computedY));

 computedC = (computedC - minCMY) / (1 - minCMY) ;
 computedM = (computedM - minCMY) / (1 - minCMY) ;
 computedY = (computedY - minCMY) / (1 - minCMY) ;
 computedK = minCMY;

 return [computedC,computedM,computedY,computedK];
}
```

### [Color Difference](https://www.compuphase.com/cmetric.htm)

```c
typedef struct {
   unsigned char r, g, b;
} RGB;

double ColourDistance(RGB e1, RGB e2)
{
  long rmean = ( (long)e1.r + (long)e2.r ) / 2;
  long r = (long)e1.r - (long)e2.r;
  long g = (long)e1.g - (long)e2.g;
  long b = (long)e1.b - (long)e2.b;
  return sqrt((((512+rmean)*r*r)>>8) + 4*g*g + (((767-rmean)*b*b)>>8));
}
```

### [HTML Table](https://www.w3schools.com/html/html_tables.asp)

```html
<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th> 
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td> 
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td> 
    <td>94</td>
  </tr>
</table>
```


### [Array Sort](https://www.w3schools.com/js/js_array_sort.asp)

```javascript
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return b - a});

// [100,40,25,10,5,1]
```
