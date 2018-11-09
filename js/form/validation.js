(function(){

    this.Validations = function() {
        this.formSubmit = null;
        this.fullMessages = "";

        const defaults = {
            form: "",
            validations: [{
                validationType: "",
                fields: [
                    {
                        name: "field_name",
                        value: "when necessary, use to identify"
                    }
                ]
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
        }else if (type.validationType == "minLength") {
            addMinLength.call(this, type);
        }else if (type.validationType == "maxLength") {
            addMaxLength.call(this, type)
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

    function addMinLength(type) {
        let fields = type.fields;
        this.formSubmit.addEventListener("click", annFullMessage.bind(this));
        for (let i = 0; i < fields.length; i++) {
            let field = document.getElementById(fields[i].name.slice(1));
            field.addEventListener("change", validateMinLength.bind(this, field, fields[i]));
            this.formSubmit.addEventListener("click", validateMinLength.bind(this, field, fields[i]));
        }
    }

    function validateMinLength(field, valField) {
        const parent = setParent(field);
        parent.getElementsByClassName("error")[0].remove();
        if (field.value.length < parseFloat(valField.value)) {
            event.preventDefault();
            let error = setErrorLength.call(this, field, valField, "maior");
            field.classList.add("error-input");
            parent.appendChild(error);
        }else {
            let div = document.createElement("div");
            field.classList.remove("error-input");
            div.classList.add("error");
            parent.appendChild(div);
        }
    }

    function addMaxLength(type) {
        let fields = type.fields;
        this.formSubmit.addEventListener("click", annFullMessage.bind(this));
        for (let i = 0; i < fields.length; i++) {
            let field = document.getElementById(fields[i].name.slice(1));
            field.addEventListener("change", validateMaxLength.bind(this, field, fields[i]));
            this.formSubmit.addEventListener("click", validateMaxLength.bind(this, field, fields[i]));
        }
    }

    function validateMaxLength(field, valField) {
        const parent = setParent(field);
        parent.getElementsByClassName("error")[0].remove();
        if (field.value.length > parseFloat(valField.value)) {
            event.preventDefault();
            let error = setErrorLength.call(this, field, valField, "menor");
            field.classList.add("error-input");
            parent.appendChild(error);
        }else {
            let div = document.createElement("div");
            field.classList.remove("error-input");
            div.classList.add("error");
            parent.appendChild(div);
        }
    }

    function setErrorLength(field, valField, message) {
        let div = document.createElement("div")
        div.classList.add("error");
        div.innerHTML = capFirsLet(field.id) + " deve ter " + message + " que " + valField.value + " caracteres";
        if (this.fullMessages != "") {
            this.fullMessages += ", ";
        }
        this.fullMessages += div.innerHTML;
        if (this.options.notify == true) {
            document.getElementById(this.options.notifyId.slice(1)).innerHTML = this.fullMessages;
        }
        return div;
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

    function annFullMessage() {
        this.fullMessages = "";
    }

    function setParent(field) {
        if (field.classList.contains("prepend") || field.classList.contains("append")) {
            return field.parentNode.parentNode;
        }else {
            return field.parentNode;
        }
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
