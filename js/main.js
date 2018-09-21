$("#slide_show").slide_show({
	auto: true,
	slideCount: false,
	dots: true
});

$("#trigger").on('click', function(){
	$("#message").notify();
});
