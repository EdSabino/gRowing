(function($) {
	$.fn.slide_show = function(options) {

		if (options == undefined){
			var options = {}
		}
		if (options.target == undefined) {
			options.target = this[0].id
		}

		var opts = $.extend({
			target: '',
			imagesUrl: [],
			auto: false,
			timeAuto: 3000,
			autoExecute: true,
			slideCount: true,
			mode: "slideShow",
		}, options );

		var mySlideShow = new SlideShow(opts);
	}
})(jQuery);
