// const carousel = new Carousel({
// 	target: '#carousel',
// 	imagesUrl: [
// 		'css/slide_show/img1.jpg',
// 		'css/slide_show/img2.jpg',
// 		'css/slide_show/img3.jpg'
// 	]
// });

const accordion = new Accordion({
	target: "#accordion",
	autoExecute: true,
	onlyOne: true
});

const validation = new Validations({
	form: "#form",
	validations: [{
		validationType: "minLength",
		fields: [{
			name: "#name",
			value: 12
		}, {
			name: "#telefone",
			value: 5
		}, {
			name: "#email",
			value: 7
		}]
	}],
	autoExecute: true,
	notify: true,
	notifyId: "#message"
})

const mask = new Mask({
	autoExecute: true,
	format: "(00) 0000-0000",
	target: "#telefone"
});

$("#trigger").on('click', function(){
	$("#content").modal();
});

$("#content").formFormat();


const sidebar = new SideBar({
	autoExecute: true
})

$("#slideshow").slide_show({
	mode: "slideShowGallery"
});

$("#trigger_message").on("click", function() {
	$("#message").notify({
		type: "yellow"
	});
});

graph = new Graph({
	target: "#graph"
})
