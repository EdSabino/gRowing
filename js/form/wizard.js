(function() {

    this.Wizard = function() {
        this.target = null;
        const defaults = {
            target: "",
            autoExecute: false
        }

        if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

        this.target = setTarget.call(this);

        if (this.options.autoExecute == true) {
            this.execute();
        }
    }

    Wizard.prototype.execute = function() {
        buildUp.call(this);
    }

    function buildUp() {
        for (let i = 0; i < this.target.length; i++) {
            let target = this.target[i];
            let tabs = target.getElementsByClassName("tab");
            for (let j = 0; j < tabs.length; j++) {
                let tab = tabs[j];
                tab.style.width = "0";
                tab.style.height = "0";
            }
            tabs[0].style.width = "initial";
            tabs[0].style.height = "initial";
            target.getElementsByClassName("wiz-previous")[0].style.display = "none";
        }
    }

    function setTarget() {
        let target = this.options.target
        if (typeof target == "string") {
            if (target[0] == "#") {
                return [document.getElementById(target.slice(1))];
            }else if (target[0] == ".") {
                return document.getElementsByClassName(target.slice(1));
            }else {
                return document.getElementsByTagName(target);
            }
        }else if (typeof target == "object") {
            return target;
        }else {
            throw new Error('Deve se passar um alvo valido, seja ele um "node", ou um ID, ou uma classe');
        }
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
