(function(){

    this.Validations = function() {
        this.formSubmit = null;
        this.fullMessages = "";

        const defaults = {
            form: "",
            validations: [{
                validationType: "",
                fields: []
            }],
            autoExecute: false,
            notify: false,
            notifyId: ""
        }

        if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

        this.formSubmit = setAttributes.call(this, this.options.form).querySelector('button[type="submit"]');
        if (this.options.autoExecute == true) {
            this.buildValidations();
        }
    }

    Validations.prototype.buildValidations = function() {
        let validations = this.options.validations;
        for (let i = 0; i < validations.length; i++){
            setValidations.call(this, validations[i]);
        }
    }

    function setValidations(type) {
        if (type.validationType == "presence") {
            addPresence.call(this, type);
        }
    }

    function setAttributes(attr) {
        let target = attr;
        if (typeof target == "string") {
            if (target[0] == "#") {
                return document.getElementById(target.slice(1))
            }
        }else if (typeof target == "object") {
            return target;
        }else {
            throw new Error('Deve se passar um alvo valido, seja ele um "node", ou um ID, ou uma classe');
        }
    }

    function addPresence(type) {
        let fields = type.fields;
        this.formSubmit.addEventListener("click", annFullMessage.bind(this));
        for (let i = 0; i < fields.length; i++) {
            let field = document.getElementById(fields[i].slice(1));
            this.formSubmit.addEventListener("click", validatePresence.bind(this, field));
        }
    }

    function annFullMessage() {
        debugger;
        this.fullMessages = "";
    }

    function validatePresence(field) {
        const parent = setParent(field);
        parent.getElementsByClassName("error")[0].remove();
        if (field.value == "") {
            event.preventDefault();
            let error = setErrorPresence.call(this, field);
            field.classList.add("error-input");
            parent.appendChild(error);
        }else {
            let div = document.createElement("div")
            div.classList.add("error");
            parent.appendChild(div);
        }
    }

    function setParent(field) {
        if (field.classList.contains("prepend") || field.classList.contains("append")) {
            return field.parentNode.parentNode;
        }else {
            return field.parentNode;
        }
    }

    function setErrorPresence(field) {
        let div = document.createElement("div")
        div.classList.add("error");
        div.innerHTML = capFirsLet(field.id) + " precisa ser preenchido";
        if (this.fullMessages != "") {
            this.fullMessages += ", ";
        }
        this.fullMessages += div.innerHTML;
        if (this.options.notify == true) {
            document.getElementById(this.options.notifyId.slice(1)).innerHTML = this.fullMessages;
        }
        return div;
    }

    function capFirsLet(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function extendDefault(source, properties) {
		let property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
    }

})();
