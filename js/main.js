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
		validationType: "presence",
		fields: ["#name", "#telefone", "#email"]
	}],
	autoExecute: true,
	notify: true,
	notifyId: "#message"
})

$("#trigger").on('click', function(){
	$("#content").modal();
});

$("#content").formFormat();


const sidebar = new SideBar({
	autoExecute: true
})

$("#slideshow").slide_show();

$("#trigger_message").on("click", function() {
	$("#message").notify({
		type: "red"
	});
});
