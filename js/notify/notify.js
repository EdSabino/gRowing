(function() {

	this.Notify = function() {
		this.holder = null
		this.message = null
		this.closeButton = null

		this.transitionEnd = transitionSelect();

		var defaults = {
			closeButton: true,
			type: "green",
			message: "",
			autoExecute: false,
			animation: "fade-n-drop"
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

		if (this.options.autoExecute) {
			this.open();
		}
	}

	Notify.prototype.open = function() {
		var that = this;
		buildNotify.call(this);
		setListener.call(this);
		window.setTimeout( function() { that.holder.classList.add("notify-open"); }, 100 );
	}

	Notify.prototype.close = function() {
		var that = this;
		that.holder.classList.remove("notify-open");
		this.holder.addEventListener(this.transitionEnd, function() {
			that.holder.parentNode.removeChild(that.holder);
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

	function buildNotify() {
		this.holder = buildHolder.call(this);
		this.message = buildMessage.call(this);
		this.closeButton = buildClose.call(this);
		this.holder.appendChild(this.message);
		this.holder.appendChild(this.closeButton);
		document.body.appendChild(this.holder);
	}

	function buildHolder() {
		var holder = document.createElement("div");
		holder.className = this.options.animation + " box-notify float-notify"
		holder.classList.add(this.options.type + "-notify");
		return holder
	}

	function buildMessage() {
		var message = document.createElement("div");
		message.classList.add("message-notify-float");
		message.innerHTML = this.options.message
		return message
	}

	function buildClose() {
		var closeButton = document.createElement("div");
		closeButton.setAttribute("class", "close-notify");
		closeButton.innerHTML = "\&times;"
		return closeButton
	}

	function setListener() {
		this.closeButton.addEventListener("click", this.close.bind(this))
	}

	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return "transitionend";
	}

})();