(function() {

    this.ToolTip = function() {
        this.target = null;

        const defaults = {
            autoExecute: false,
            target: "",
            text: "",
            position: "right"
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

        if (this.options.autoExecute == true) {
            this.execute();
        }
    }

    ToolTip.prototype.execute = function() {
        setTarget.call(this);
        for (let i = 0; i < this.target.length; i++) {
            const target = this.target[i];
            buildToolTip.call(this, target);
        }
    }

    function buildToolTip(target) {
        const tooltip = document.createElement("span");
        tooltip.classList.add(this.options.position);
        tooltip.classList.add("tooltiptext");
        target.classList.add("tooltip");
        tooltip.innerHTML = this.options.text;
        target.appendChild(tooltip);
    }

    function setTarget() {
        let target = this.options.target;
        if (typeof target == "string") {
            if (target[0] == "#") {
                this.target = [document.getElementById(target.slice(1))];
            }else if (target[0] == ".") {
                this.target = document.getElementsByClassName(target.slice(1));
                this.multiple = true;
            } else {
                this.target = document.getElementsByTagName(target);
                this.multiple = true;
            }
        }else if (typeof target == "object") {
            this.target = [target];
        }else {
            throw new Error('Deve se passar um alvo valido, seja ele um "node", ou um ID, ou uma classe');
        }
    }

    function extendDefault(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

})();
