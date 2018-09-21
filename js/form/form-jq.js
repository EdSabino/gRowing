(function($) {
	$.fn.formFormat = function(options) {

		if (options == undefined || options.scope == undefined){
			var options = {}
			options.scope = this[0]
		}
		var opts = $.extend({
			autoExecute: true,
			scope: document
		}, options );

		var myForm = new FormFormat(opts);
	}
})(jQuery);
