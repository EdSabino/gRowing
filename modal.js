(function() {

	this.Modal = function() {

		this.closeButton = null;
		this.modal = null;
		this.overlay = null;
		// define a transicao
		this.transitionEnd = transitionSelect();

		// propriedades aceitaveis
		var defaults = {
			autoOpen: false,
			className: 'fade-n-drop',
			closeButton: true,
			closeButtonClass: 'close-btn',
			content: "",
			maxWidth: 600,
			minWidth: 280,
			overlay: true
		}


		// refaz props
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

		if(this.options.autoOpen === true) {
			this.open();
		}
	}

	Modal.prototype.open = function() {
		var temp_class;

		// builda o modal
		buildOut.call(this);

		// seta os eventos
		initializeEvents.call(this);

		// força o dom a reconehcer as mudanças e reagir a elas, como por exemplo, animações
		window.getComputedStyle(this.modal).height;

		// Caso o tamanho do modal seja maior que o tamanho da janela vms ancorar ele mais pra baixo pela classe
		if (this.modal.offsetHeight > window.innerHeight) {
			temp_class = " modal-open ancorado"
		} else {
			temp_class = " modal-open"
		}

		// adiciona a classe de abertura ao modal e ao overlay
		this.modal.className = this.modal.className + temp_class;
		this.overlay.className = this.overlay.className + " modal-open"
	}

	Modal.prototype.close = function() {
		that = this;

		// retira as classes de abertura
		this.modal.className = this.modal.className.replace(" modal-open", "");
		this.overlay.className = this.overlay.className.replace(" modal-open", "");

		// Ok, essa parte é doida, não podemos fechar tudo antes da animação acabar, entao vms fazer um 
		// listener pra descobrir quando ela acaba
		this.modal.addEventListener(this.transitionEnd, function() {
			that.modal.parentNode.removeChild(that.modal);
		});
		this.overlay.addEventListener(this.transitionEnd, function() {
			if (that.overlay.parentNode) {
				that.overlay.parentNode.removeChild(that.overlay);
			}
		});
	}

	function extendDefault(source, properties) {
		var property;
		// vai rodar por todos os argumentos que foram passados em forma de objeto {}, se fr uma propriedade valida e suportavel, 
		// ela sera reescrita
		for (property in properties) {
			// aqui valida
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	function buildOut() {
		// É no docFrag que o modal é construido, é ele que é colocado na tela, content, é o content neh
		var content, contentHolder, docFrag;

		// Ok, basicamente, se o content for uma string, é soa adicionar, se for um html vai adicionar os filhos do mesmo
		if (typeof this.options.content === "string") {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}

		// cria o fragmento
		docFrag = document.createDocumentFragment();

		// Cria o modal propriamente dito, com tudo que precisa
		this.modal = document.createElement("div");
		this.modal.className = "modal " + this.options.className;
		this.modal.style.maxWidth = this.options.maxWidth + "px";
		this.modal.style.minWidth = this.options.minWidth + "px";

		// cria o botão de fechar e o adicionar ao modal
		if (this.options.closeButton === true) {
			this.closeButton = document.createElement("button");
			this.closeButton.className = this.options.closeButtonClass;
			this.closeButton.innerHTML = "x";
			// adiciona ao modal
			this.modal.appendChild(this.closeButton);
		}

		// Cria a tela escura no fundo do modal
		if (this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.overlay.className = "overlay " + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		// Cria um holder para guardar o conteudo
		// e adiciona o content holder no this.modal
		contentHolder = document.createElement("div");
		contentHolder.className = "holder";
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		// adiciona o this.modal ao fragmento
		docFrag.appendChild(this.modal);
		
		// coloca o fragmento no body
		document.body.appendChild(docFrag);
	}

	// Listeners

	function initializeEvents() {
		if (this.closeButton) {
			// No buildOut foi definido que this.closeButton é um botao, quando ele for clicado ativa o this.close.bind(this)
			this.closeButton.addEventListener('click', this.close.bind(this));
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}
	}

	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return "transitionend";
	}

}());
