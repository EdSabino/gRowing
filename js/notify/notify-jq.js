(function($) {
	$.fn.notify = function(options) {

		if (options == undefined){
			var options = {}
		}
		if (options.message == undefined) {
			options.message = this[0].innerHTML
		}
		var opts = $.extend({
			closeButton: true,
			type: "green",
			message: "",
			autoExecute: true,
			animation: "fade-n-drop",
			classMessage: "",
			position: "top",
			autoDissmiss: true,
			timeDissmiss: 5000,
		}, options );

		var myNotify = new Notify(opts);
	}
})(jQuery);
