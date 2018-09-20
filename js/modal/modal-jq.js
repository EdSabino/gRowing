(function($) {
	$.fn.modal = function(options) {

		if (options == undefined){
			var options = {}
			options.content = this[0]
		}else {
			if (options.content == undefined) {
				options.content = this[0]	
			} else{
				if (options.content instanceof jQuery) {
					options.content = options.content[0];
				} else if (typeof options.content === "string") {
					if (options.content[0] == "#" || options.content[0] == ".") {
						options.content = $(options.content)[0]
					}
				}
			}
		}
		if (typeof options.content === "object") {
			cloneNode = $(options.content).clone();
			if (cloneNode.is(":hidden")) {
				cloneNode[0].style.display = "block"
			}
			options.content = cloneNode[0];
		}
		var opts = $.extend({
			autoOpen: true,
			className: 'fade-n-drop',
			closeButton: true,
			closeButtonClass: 'close-btn',
			content: "",
			maxWidth: 600,
			minWidth: 280,
			overlay: true
		}, options );

		var myModal = new Modal(opts);
	}
})(jQuery);
