Percentify
==========

##Helps you turn pixel based CSS into percentage based CSS##

Turns `padding-top: 20px;` into `padding-top: 1%;`

Turns `width: 640px;` into `width: 66%;`

---

##Usage Examples:##
###Default###
```javascript
var P = new Percentifier(false);
```

...then look at your console.

###Custom Selectors (jQuery style)###
```javascript
var P = new Percentifier(false, 'div, a, form, article, aside');
```

The defaults are 'div, aside, article, img, h1, h2, h3, h4, p, span, form, a'

###Can also be used to actually rewrite element styles###
```javascript
var P = new Percentifier(true);
```

*Only for demonstrational/testing purposes* -- This script is meant to help you with doing the boring calculating from pixels to percentages.

---

##Demo##
http://munfillari.com/temp/percentify/

(check the console)