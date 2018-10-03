(function() {

    this.AutoComplete = function() {
        this.target = null;
        this.arr = [];
        this.currentFocus = 0;
        this.content = null;

        const defaults = {
            target: "",
            variables: [],
            autoExecute: false
        }

        if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

        this.target = getTarget.call(this);
        this.arr = this.options.variables;

        if (this.options.autoExecute == true) {
            listToType.call(this);
            listToKeys.call(this);
        }
    }

    function listToType() {
        this.target.addEventListener("input", callAll.bind(this));
    }

    function callAll() {
        closeAllList.call(this);
        buildOptions.call(this);
    }

    function listToKeys() {
        this.target.addEventListener("keydown", resolveKeys.bind(this));
    }

    function buildOptions() {
        this.content = document.createElement("div");
        this.content.setAttribute("id", (this.target.id + "autocomplete"));
        this.content.setAttribute("class", "autocomplete-box");
        this.target.classList.add("with-autocomplete")
        this.target.parentNode.insertBefore(this.content, this.target.nextSibling);
        for (let i = 0; i < this.arr.length; i++) {
            let field = this.arr[i];
            populateList.call(this, field);
        }
        addActive.call(this, this.content.childNodes)
    }

    function populateList(field) {
        let value = this.target.value;
        if (value.toUpperCase() == field.substr(0, value.length).toUpperCase()) {
            this.content.appendChild(createItemList.call(this, field, value));
        }
    }

    function createItemList(field, value) {
        let item = document.createElement("div");
        item.setAttribute("class", "autocomplete-items");
        item.innerHTML = "<strong>" + field.substr(0, value.length) +"</strong>";
        item.innerHTML += field.substr(value.length);
        item.innerHTML += "<input type='hidden' value='" + field + "'>";
        item.addEventListener("click", setNewValue.bind(this, item));
        return item
    }

    function setNewValue(item) {
        this.target.value = item.getElementsByTagName("input")[0].value
        closeAllList.call(this);
    }

    function getTarget() {
        return document.getElementById(this.options.target.slice(1));
    }

    function resolveKeys() {
        let list = document.getElementById(this.target.id + "autocomplete");
        if (list) {
            list = list.getElementsByTagName("div")
        }
        if (event.keyCode == 40) {
            this.currentFocus++;
            addActive.call(this, list);
        }else if (event.keyCode == 38) {
            this.currentFocus--;
            addActive.call(this, list);
        }else if (event.keyCode == 13) {
            event.preventDefault();
            if (this.currentFocus > -1) {
                if (list) {
                    list[this.currentFocus].click();
                }
            }
        }
    }

    function addActive(list) {
        if (!list) return false;
        removeActive.call(this, list);
        if (this.currentFocus >= list.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (list.length - 1);
        debugger;
        list[this.currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(list) {
        for (var i = 0; i < list.length; i++) {
            list[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllList() {
        let list = document.getElementsByClassName("autocomplete-box");
        if (list.length > 0) {
            list[0].parentNode.removeChild(list[0]);
        }
        this.target.classList.remove("with-autocomplete");
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
