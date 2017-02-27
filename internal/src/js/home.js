'use strict';

var Home =  window.Home || (function() {

	return {

		initialize: function() {
			window.onload = function() {
				document.documentElement.className += " loaded";
				console.log("loaded!");
			}
		},

	};

}());

Home.initialize();