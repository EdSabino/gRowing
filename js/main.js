const carousel = new Carousel({
	target: '#carousel',
	imagesUrl: [
		'css/slide_show/img1.jpg',
		'css/slide_show/img2.jpg',
		'css/slide_show/img3.jpg'
	]
});

$("#trigger").on('click', function(){
	$("#content").modal();
});

$("#content").formFormat();
