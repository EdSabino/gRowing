(function(){

	this.FormFormat = function() {
		this.appends = null
		this.prepends = null
		var defaults = {
			autoExecute: false,
			scope: document
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

		if (typeof this.options.scope === "string") {
			if (this.options.scope[0] == "#") {
				this.options.scope == document.getElementById(this.options.scope);
			} else if (this.options.scope == ".") {
				this.options.scope == document.getElementsByClassName(this.options.scope)[0];
			}
		}

		if (this.options.autoExecute) {this.getElements();}
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
