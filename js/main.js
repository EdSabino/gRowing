$("#slide_show").slide_show({
	auto: true,
	slideCount: false,
	dots: true
});

$("#trigger").on('click', function(){
	$("#message").notify({
		type: "green"
	});
});

$("#content").formFormat();

var mask = new Mask({
	autoExecute: false,
	format: "(00) 00000-0000",
	target: "name"
})