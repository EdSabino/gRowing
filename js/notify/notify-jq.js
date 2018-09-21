(function($) {
	$.fn.notify = function(options) {

		if (options == undefined || options.message == undefined){
			var options = {}
			options.message = this[0].innerHTML
		}
		var opts = $.extend({
			closeButton: true,
			type: "green",
			message: "",
			autoExecute: true,
			animation: "fade-n-drop"
		}, options );

		var myNotify = new Notify(opts);
	}
})(jQuery);
