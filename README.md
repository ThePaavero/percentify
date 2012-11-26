Percentify
==========

##Helps you turn pixel based CSS into percentage based CSS##

##Usage Examples:##
###Default###
var P = new Percentifier(false);

...then look at your console.

###Can also be used to actually rewrite element styles###
var P = new Percentifier(true);

Just in emergency cases -- don't rely on JS to make your site responsive.

###Custom Selectors (jQuery style)###
var P = new Percentifier(false, 'div, a, form, article, aside');

The defaults are 'div, aside, article, img, h1, h2, h3, h4, p, span, form, a'

##Demo##
http://munfillari.com/temp/percentify/

(check the console)