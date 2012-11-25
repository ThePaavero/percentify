/**
 * Percentify! Converts pixels to percentages for a more responsive layout.
 * Either shows[1] the percentages or actually modifies the CSS properties
 *
 * [1] Also creates CSS syntax for you to copy.
 *     It's shown in the browser's console.
 *
 * @package Percentify
 * @uses jQuery
 *
 * @param {boolean} modify          Actually modify rules or just help you
 * @param {string} custom_selectors jQuery style selector string, i.e. 'div, a'
 */
var Percentifier = function(modify, custom_selectors) {

	/*global $, console*/
	'use strict';

	var default_selectors = [
		'div',
		'aside',
		'article',
		'img',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'p',
		'span',
		'form',
		'a',
		'footer'
	].join(', ');
	var selectors        = custom_selectors || default_selectors;
	var css_syntax       = '';
	var createdSelectors = {};

	// Modify the CSS properties of the elements? If not, just show them
	modify = modify || false;

	// -----------------------------------------------------------------------

	/**
	 * Run this thing
	 * @return void
	 */
	this.init = function()
	{
		traverse(selectors, modify);
	};

	// -----------------------------------------------------------------------

	/**
	 * Traverse elements
	 * @param  {string} s jQuery selector string
	 * @return void
	 */
	var traverse = function(s, modify)
	{
		$(s).each(function()
		{
			var percentages = doElement($(this));

			if(modify === true)
			{
				modifyCSS($(this), percentages);
			}
			else
			{
				$(this).data('percentages', percentages);
				showPercentages($(this), percentages);
				createCSSsyntax($(this));
			}
		});

		if(modify === false)
		{
			console.log('Percentify gives you CSS code to copy and paste:');
			console.log(css_syntax);
		}
	};

	/**
	 * Calculate the percentages for an element
	 * @param  {object} el HTML element
	 * @return {object}
	 */
	var doElement = function(el)
	{
		var my_width          = $(el).outerWidth();
		var my_height         = $(el).outerHeight();
		var my_parent         = $(el).parent();
		var my_padding_top    = parseInt($(el).css('padding-top'), 10);
		var my_padding_bottom = parseInt($(el).css('padding-bottom'), 10);
		var my_padding_left   = parseInt($(el).css('padding-left'), 10);
		var my_padding_right  = parseInt($(el).css('padding-right'), 10);

		var parent_width  = $(my_parent).width();
		var parent_height = $(my_parent).height();

		console.log(my_padding_top + ' vs. ' + parent_height);

		var percentages = {
			width          : (my_width / parent_width) * 100,
			height         : (my_height / parent_height) * 100,
			padding_top    : (my_padding_top / parent_height) * 100,
			padding_bottom : (my_padding_bottom / parent_height) * 100,
			padding_left   : (my_padding_left / parent_width) * 100,
			padding_right  : (my_padding_right / parent_width) * 100
		};

		return percentages;
	};

	/**
	 * Do the visual stuff
	 * @param  {object} el          HTML element
	 * @param  {object} percentages
	 * @return void
	 */
	var showPercentages = function(el, percentages)
	{
		var indicator = document.createElement('div');
			indicator.className = 'percentages_indicator';
			indicator.innerHTML = percentages.width + ' * ' + percentages.height;
			indicator.innerHTML += '<br/>width: ' + percentages.width + '%;';

		$(indicator).css({
			'position'   : 'absolute',
			'font-size'  : '10px',
			'padding'    : '2px',
			'background' : '#007ec2',
			'color'      : '#fff',
			'opacity'    : '.1'
		});

		$(indicator).mouseenter(function()
		{
			$(indicator).css({
				'opacity' : '1'
			});
		});

		$(indicator).mouseleave(function()
		{
			$(indicator).css({
				'opacity' : '.1'
			});
		});

		$(el).prepend(indicator);
	};

	/**
	 * Modify the width of given element
	 * @param  {object} el          HTML element
	 * @param  {object} percentages
	 * @return void
	 */
	var modifyCSS = function(el, percentages)
	{
		console.log(percentages);
		$(el).css({
			'width' : percentages.width + '%'
		});
	};

	/**
	 * Create CSS styntax for given element
	 * @param  {object} el HTML element
	 * @return void
	 */
	var createCSSsyntax = function(el)
	{
		var p          = $(el).data('percentages');
		var selector   = '';
		var id         = $(el).attr('id');
		var class_name = $(el).className;
		var tag_type   = $(el).prop('tagName').toLowerCase();

		if(id !== undefined)
		{
			selector = '#' + id;
		}
		else if(class_name !== undefined)
		{
			selector = '.' + class_name;
		}
		else if(tag_type !== undefined)
		{
			selector = tag_type;
		}

		if(createdSelectors[selector])
		{
			// Already done this selector, don't want duplicates
			return false;
		}

		// Remember that we've already done this selector
		createdSelectors[selector] = true;

		css_syntax += selector + ' {\n';

		css_syntax += createCSSproperty('width', p.width);
		css_syntax += createCSSproperty('padding-top', p.padding_top);
		css_syntax += createCSSproperty('padding-bottom', p.padding_bottom);
		css_syntax += createCSSproperty('padding-left', p.padding_left);
		css_syntax += createCSSproperty('padding-right', p.padding_right);

		css_syntax += '}\n\n';
	};

	/**
	 * Create a CSS property line
	 * @param  {string} property i.e. 'padding-bottom'
	 * @param  {integer} value   i.e. 20.30020
	 * @return {string}          CSS syntax, i.e. 'padding-bottom: 10%;'
	 */
	var createCSSproperty = function(property, value)
	{
		var my_string = '';

		value = parseInt(value, 10);

		if(value > 0 && isFinite(value))
		{
			my_string =  '\t' + property + ': ' + value + '%;\n';
		}

		return my_string;
	};

	// -----------------------------------------------------------------------

	// Auto-initiate
	this.init();

}; // End Percentifier

// EOF