(function() {

    this.SideBar = function() {
        this.buttonOpen = null;
        this.state = false;

        const defaults = {
			autoExecute: false
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

        if (this.options.autoExecute == true) {
            this.setListeners();
        }
    }

    SideBar.prototype.setListeners = function() {
        this.buttonOpen = document.getElementsByClassName("button-open-sidebar")[0];
        this.hoverPlace = document.getElementById("side-bar-open");
        this.navbar = document.getElementById("mySidenav");

        this.hoverPlace.addEventListener("mouseover", showButton.bind(this));
        this.hoverPlace.addEventListener("mouseout", hideButton.bind(this));
        this.navbar.addEventListener("mouseover", showButton.bind(this));
        this.navbar.addEventListener("mouseout", hideButton.bind(this));
        this.buttonOpen.addEventListener("click", controlNav.bind(this));
        setDropDowns.call(this);
    }

    function setDropDowns() {
        let dropDowns = this.navbar.getElementsByClassName("drop-down");
        for (let i = 0; i < dropDowns.length; i++) {
            let actual = dropDowns[i];
            actual.addEventListener("click", setDropDown.bind(this, actual));
        }
    }

    function setDropDown(actual) {
        actual.parentNode.getElementsByClassName("drop-down-content")[0].classList.toggle("hide")
    }

    function showButton(buttonOpen) {
        this.buttonOpen.classList.remove("hide");
    }

    function hideButton(buttonOpen) {
        this.buttonOpen.classList.add("hide");
    }

    function controlNav() {
        if (this.state == true) {
            this.navbar.style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            document.getElementById("side-button").classList.remove("ico-left");
            document.getElementById("side-button").classList.add("ico-right");
            this.hoverPlace.style.marginLeft = "0";
            this.state = false
        }else {
            this.navbar.style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
            document.getElementById("side-button").classList.add("ico-left");
            document.getElementById("side-button").classList.remove("ico-right");
            this.hoverPlace.style.marginLeft = "250px";
            this.state = true
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
