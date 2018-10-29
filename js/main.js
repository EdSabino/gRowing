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
const mask = new Mask({
	autoExecute: true,
	format: "(00) 0000-0000",
	target: "#telefone"
});


$("#trigger").on('click', function(){
	$("#content").modal({form: true});
});

$(".image-icon").on('click', function(){
	$(this).modal({image: true});
});
const form = new FormFormat({
	scope: "#content",
	autoExecute: true,
	validate: true,
	validation: {
		form: "#form",
		validations: [{
			validationType: "presence",
			fields: ["#name", "#telefone", "#email"]
		}],
		autoExecute: true,
		notify: true,
		notifyId: "#message"
	},
	autoComplete: true,
	autoCompleteVars: {
		target: "#name",
		variables: ["eduardo", "sabino", "da", "silva"],
		autoExecute: true
	},
	select: true
});

const wizardValidation = new Validations({
	form: "#form-wizard",
	validations: [{
		validationType: "presence",
		fields: ["#login", "#password"]
	}],
	autoExecute: false,
	notify: false,
	notifyId: ""
});

const wizard = new Wizard({
	target: "#form-wizard",
	autoExecute: true
});


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
