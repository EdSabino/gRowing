(function(){

    this.Validations = function() {
        this.formSubmit = null;

        const defaults = {
            form: "",
            byData: false,
            validations: [{
                validationType: "",
                fields: []
            }],
            autoExecute: false
        }

        if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

        this.formSubmit = setAttributes.call(this, this.options.form).querySelector('button[type="submit"]');
        if (this.options.autoExecute == true) {
            buildValidations.call(this);
        }
    }

    function buildValidations() {
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
        debugger;
        for (let i = 0; i < fields.length; i++) {
            let field = document.getElementById(fields[i].slice(1));
            this.formSubmit.addEventListener("click", validatePresence.bind(this, field));
        }
    }

    function validatePresence(field) {
        if (field.value == "") {
            event.preventDefault();
            let error = setErrorPresence();
            debugger;
            field.parentNode.appendChild(error);
        }
    }

    function setErrorPresence() {
        let div = document.createElement("div")
        div.classList.add("error");
        div.innerHTML = "Esse campo precisa ser preenchido";
        return div;
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
