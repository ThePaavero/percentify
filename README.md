Percentify
==========

##Helps you turn pixel based CSS into percentage based CSS##

##Usage Examples:##
###Default###
&lt;script type='text/javascript'&gt;
var P = new Percentifier(false);
&lt;/script&gt;

...then look at your console.

###Can also be used to actually rewrite element styles###
&lt;script type='text/javascript'&gt;
var P = new Percentifier(true);
&lt;/script&gt;

Just in emergency cases -- don't rely on JS to make your site responsive.

###Custom Selectors (jQuery style)###
&lt;script type='text/javascript'&gt;
var P = new Percentifier(false, 'div, a, form, article, aside');
&lt;/script&gt;

The defaults are 'div, aside, article, img, h1, h2, h3, h4, p, span, form, a'

##Demo##
http://munfillari.com/temp/percentify/

(check the console)