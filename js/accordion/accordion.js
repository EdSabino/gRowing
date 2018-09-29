// accord-title
(function() {

    this.Accordion = function() {
        this.target = null
        this.multiple = false

		const defaults = {
            target: "",
			autoExecute: false,
            onlyOne: false
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}
        this.execute();
	}

    Accordion.prototype.execute = function() {
        setTarget.call(this);
        setListeners.call(this);
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

    function setTarget() {
        let target = this.options.target;
        if (typeof target == "string") {
            if (target[0] == "#") {
                this.target = document.getElementById(target.slice(1));
            }else if (target[0] == ".") {
                this.target = document.getElementsByClassName(target.slice(1));
                this.multiple = true;
            } else {
                this.target = document.getElementsByTagName(target);
                this.multiple = true;
            }
        }else if (typeof target == "object") {
            this.target = target;
        }else {
            throw new Error('Deve se passar um alvo valido, seja ele um "node", ou um ID, ou uma classe');
        }
    }

    function setListeners() {
        const onlyOne = this.options.onlyOne;
        if (this.multiple == true) {

        }else {
            let elements = this.target.getElementsByClassName("accord-title");
            for (let i = 0; i < elements.length; i++) {
                let actual = elements[i];
                actual.addEventListener("click", function() {
                    if (this.parentNode.getElementsByClassName("accord-text")[0].classList.contains("hide")) {
                        if (onlyOne == true) {
                            let groups = this.parentNode.parentNode.getElementsByClassName("accord-group")
                            for (let j = 0; j < groups.length; j++) {
                                let title = groups[j].getElementsByClassName("accord-title")[0]
                                title.classList.add("close");
                                title.parentNode.getElementsByClassName("accord-text")[0].classList.add("hide")
                            }
                        }
                    }
                    this.classList.toggle("close");
                    this.parentNode.getElementsByClassName("accord-text")[0].classList.toggle("hide");
                });
            }
        }
    }

})();
