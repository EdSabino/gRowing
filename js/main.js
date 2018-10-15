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

const mask = new Mask({
	autoExecute: true,
	format: "(00) 0000-0000",
	target: "#telefone"
});

const select = new Select();

$("#trigger").on('click', function(){
	$("#content").modal({form: true});
});

$(".image-icon").on('click', function(){
	$(this).modal({image: true});
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
const autoComplete = new AutoComplete({
	target: "#name",
	variables: ["eduardo", "sabino", "da", "silva"],
	autoExecute: true
})
// graph = new Graph({
// 	target: "#graph",
// 	graphTitle: "Esse é um grafico",
// 	categories: [
// 		"banana",
// 		"maças",
// 		"uvas?"
// 	],
// 	series: [
// 		{
// 			values: [1,2,3],
// 			color: "red",
// 			label: "homem"
// 		},
// 		{
// 			values: [3,4,5],
// 			color: "red",
// 			label: "mulher"
// 		},
// 		{
// 			values: [3,4,5],
// 			color: "red",
// 			label: "mulher"
// 		},
// 		{
// 			values: [3,4,5],
// 			color: "red",
// 			label: "mulher"
// 		}
// 	],
// 	type: "point"
// })
