# gRowing

As coisas ainda estão em desenvolvimento, por tanto documentarei tudo aqui

Todos os modulos podem ser usados tanto com JavaScript puro quanto com jQuery
Atualmente ha quatro modulos, ainda em expansão, são eles:
	Slides
	Modal
	Notify
	Form

Slides
	O modulo de slides por enquanto possui somente um modo, o banner,
	suas opções são:
			
			//=> indica em qual div deve ser colocado os slides
			target:       

			//=> caminho das imagens
			imagesUrl:    
			
			//=> se os slides devem passar automaticamente
			auto:         
			
			//=> a cada quanto tempo os slides devem mudar em milisegundos (1000 é igual a 1 segundo)
			timeAuto:     
			
			//=> indica se deve executar após estanciar a classe
			autoExecute:  
			
			//=> diz se deve ter o contador de slides
			slideCount:   

			//=> indica se deve ter as bolinahs em baixo
			dots:         

	Seu uso em JavaScript puro é mais ou menos assim:
		var mySlide = new SlideShow({
				//aqui se passa as opções
			});

	E em jQuery:
		$("#slide_show").slide_show({
			// Aqui vem as opções
		});
		onde #slide_show é o destino
	

	Se nenhuma url for passada(como nos exemplos acima), ele vai buscar nos filhos da div destino 
	pelas imagens, e usar as que estão la

Notify
	O modulo de notificação gera notificações verdes e vermelhas, ele pode ser usado tanto como notificação flutuante
	como fixa

	Para usa-la fixa deve ser utilizado em HTML:

	<div class="green-notify float-notify box-notify">
			<div class="message-notify-float">
				Mensagem
			</div>
	</div>

	A notificação flutuante precisa ser utilizada em JavaScript, ou jQuery, suas opções são:

		//=> Diz se deve ou não ter um botão para fechar
		closeButton: true,

		//=> Informa o tipo, atualmente ou green, ou red
		type: "green",

		//=> A mensagem que deve estar dentro da notificação
		message: "",

		//=> Indica se deve ser executado quando extancia a classe
		autoExecute: false,

		//=> O tipo da animação, atualmente a unica disponivel é fade-n-drop
		animation: "fade-n-drop",

		//=> alguma classe especial para ser adicionada na mensagem
		classMessage: "",

		//=> A posição da notificação, as opções são: "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right"
		position: "top",
		//=> Se ela deve sumir sozinha
		autoDissmiss: true,
		//=> Em quanto tempo ela deve sumir
		timeDissmiss: 5000,
		
	Usando com jQuery:

		$("#message").notify({
			type: "red"
		});

		Onde #message é o que deve estar na mensagem

	Usando com JavaScript

		var myNotify = new Notify({
			message: "algo"
		});

		myNotify.open();