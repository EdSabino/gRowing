$("#trigger").on('click', function(){
	$("#content").modal();
});

var mySlideShow = new SlideShow({
	target: "slide_show",
	imagesUrl: ["css/slide_show/img1.jpg", "css/slide_show/img2.jpg", "css/slide_show/img3.jpg"]
})