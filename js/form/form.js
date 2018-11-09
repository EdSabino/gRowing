(function(){

	this.FormFormat = function() {
		this.appends = null
		this.prepends = null

		var defaults = {
			autoExecute: false,
			scope: document,
			validate: false,
			validation: {
				form: "#form",
				validations: [{
					validationType: "presence",
					fields: []
				}],
				autoExecute: true,
				notify: true,
				notifyId: "#message"
			},
			autoComplete: false,
			autoCompleteVars: {
				target: "#name",
				variables: ["Brazil", "USA", "Japan", "England"],
				autoExecute: true
			},
			select: false
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}
		if (typeof this.options.scope === "string") {
			if (this.options.scope[0] == "#") {
				this.options.scope = document.getElementById(this.options.scope.slice(1));
			} else if (this.options.scope == ".") {
				this.options.scope = document.getElementsByClassName(this.options.scope.slice(1))[0];
			}
		}

		if (this.options.autoExecute) {
			this.getElements();
			if (this.options.validate == true){
				const validations = new Validations({
					form: this.options.validation.form,
					validations: this.options.validation.validations,
					autoExecute: this.options.validation.autoExecute,
					notify: this.options.validation.notify,
					notifyId: this.options.validation.notifyId
				});
			}
			if (this.options.autoComplete == true){
				const validations = new AutoComplete({
					target: this.options.autoCompleteVars.target,
					variables: this.options.autoCompleteVars.variables,
					autoExecute: this.options.autoCompleteVars.autoExecute
				});
			}

			if (this.options.select == true){
				const validations = new Select();
			}
		}
	}

	FormFormat.prototype.getElements = function() {
		this.appends = this.options.scope.getElementsByClassName("append");
		this.prepends = this.options.scope.getElementsByClassName("prepend");
		this.buidAppend();
		this.buildPreppend();
	}

	FormFormat.prototype.buidAppend = function() {
		for (var i = 0; i < this.prepends.length; i++) {
			var content = document.createElement("div");
			var groupper = document.createElement("div");
			var group = document.createElement("div");
			var parent = this.prepends[i].parentNode;
			var node = this.prepends[i];
			content.innerHTML = this.prepends[i].dataset.cont;
			content.classList.add("content-prepend");
			groupper.classList.add("groupper-prepend");
			group.classList.add("input-group");
			groupper.appendChild(content);
			group.appendChild(groupper);
			parent.replaceChild(group, this.prepends[i]);
			group.appendChild(node)
		}
	}

	FormFormat.prototype.buildPreppend = function() {
		for (var i = 0; i < this.appends.length; i++) {
			var content = document.createElement("div");
			var groupper = document.createElement("div");
			var group = document.createElement("div");
			var parent = this.appends[i].parentNode;
			var node = this.appends[i];
			content.innerHTML = this.appends[i].dataset.cont;
			content.classList.add("content-append");
			groupper.classList.add("groupper-append");
			group.classList.add("input-group");
			groupper.appendChild(content);
			parent.replaceChild(group, this.appends[i]);
			group.appendChild(node)
			group.appendChild(groupper);
		}
	}

	function getScope() {
		if (typeof this.options.scope == "string"){
			if (this.options.scope[0] == "#") {
				this.options.scope = document.getElementById(this.options.scope.slice(1))
			}else {

			}
		}
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

})();
