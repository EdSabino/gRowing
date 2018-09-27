(function() {

	this.Carousel = function() {

		// propriedades aceitaveis
		const defaults = {
			target: '',
			imagesUrl: [],
			counter: 3
		}


		// refaz props
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

		if(this.options.autoOpen === true) {
			this.execute();
		}
	}

	Carousel.prototype.execute = function() {
		buildOut.call(this);
	}

	function findTarget() {
		if (typeof this.options.target == "string") {
			if (this.options.target[0] == "#") {
				return document.getElementById(this.options.target);
			}
		}
	}

	function buildOut() {
		const target = findTarget.call(this);
	}


	function extendDefault(source, properties) {
		let property;
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
}());