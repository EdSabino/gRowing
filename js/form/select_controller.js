(function() {

    this.Select = function() {
        this.targets = [];

        const defaults = {
        }

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefault(defaults, arguments[0]);
        }

        this.targets = getTarget.call(this);
        this.execute();
    }

    Select.prototype.execute = function() {
        for (let i = 0; i < this.targets.length; i++) {
            let select  = this.targets[i].getElementsByTagName("select")[0];
            let actual  = document.createElement("div");
            let options = document.createElement("div");
            actual.setAttribute("class", "select-selected ico-down-after");
            options.setAttribute("class", "select-options");
            actual.innerHTML = select.options[select.selectedIndex].innerHTML;
            this.targets[i].appendChild(actual);
            for (let j = 0; j < select.length; j++) {
                let option = document.createElement("div");
                option.innerHTML = select.options[j].innerHTML;
                option.addEventListener("click", setClickOption.bind(this, option));
                options.appendChild(option);
            }
            this.targets[i].appendChild(options);
            actual.addEventListener("click", function(e) {
                e.stopPropagation();
                closeAllSelect.call(this);
                this.nextSibling.classList.toggle("select-open");
                this.classList.toggle("ico-down-after");
                this.classList.toggle("ico-up-after");
            });
        }
        document.addEventListener("click", closeAllSelect);
    }

    function closeAllSelect() {
        let arrNo = [];
        let options = document.getElementsByClassName("select-items");
        let selected = document.getElementsByClassName("select-selected");
        for (let i = 0; i < selected.length; i++) {
            if (this == selected[i]) {
                arrNo.push(i)
            } else {
                selected[i].classList.add("ico-down-after");
                selected[i].classList.remove("ico-up-after");
            }
        }
        for (let i = 0; i < options.length; i++) {
            if (arrNo.indexOf(i)) {
                options[i].classList.remove("select-open");
            }
        }
    }

    function setClickOption(option) {
        let original_select = option.parentNode.parentNode.getElementsByTagName("select")[0];
        let sibling         = option.parentNode.previousSibling;
        for (let c = 0; c < original_select.length; c++) {
            if (original_select.options[c].innerHTML == option.innerHTML) {
                original_select.selectedIndex = c;
                sibling.innerHTML = option.innerHTML;
                old_select = option.parentNode.getElementsByClassName("same-as-selected");
                for (let k = 0; k < old_select.length; k++) {
                    old_select[k].removeAttribute("class");
                }
                option.setAttribute("class", "same-as-selected");
                break;
            }
        }
        sibling.click();
    }

    function getTarget() {
        return document.getElementsByClassName("select");
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
