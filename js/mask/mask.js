// (00) 00000 0000
(function() {

	this.Mask = function() {
		this.format = "/^";
		this.count = 0;
		this.firstDigit = "";
		this.formats = [];
		this.target = null;

		var defaults = {
			autoExecute: false,
			format: "",
			target: ""
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

		this.findFormat();
		setListener.call(this);
	}

	Mask.prototype.findFormat = function() {
		for (var i = 0; i < this.options.format.length; i++) {
			if (this.options.format[i] == "0") {
				this.count += 1
			}else {
				this.firstDigit = this.options.format[i]
				this.format += buildRegex.call(this);
				this.formats.push(this.format);
			}
		}
		if (this.count > 0) {
			this.format += buildValue.call(this);
			this.formats.push(this.format);
		}
		this.format += "$/"
	}

	Mask.prototype.replaceCheck = function() {
		var date = this.target.value;
		debugger;
	}

	function buildRegex() {
		var value = buildValue.call(this)
		var digit = "\\a"
		var format = ""
		digit = digit.replace("a", this.firstDigit)
		value = value.replace("0", this.count);
		format += value
		format += digit
		this.count = 0
		this.firstDigit = ""
		return format
	}

	function buildValue() {
		var value = "\\d{0}"
		value = value.replace("0", this.count);
		return value
	}

	// var date = this.value;
	// if (date.match(/^\d{4}$/) !== null) {
	// 	this.value = date + '-';
	// } else if (date.match(/^\d{4}\-\d{2}$/) !== null) {
	// 	this.value = date + '-';
	// }

	function setListener() {
		const that = this
		this.target = document.getElementById(this.options.target);
		this.target.addEventListener('keyup', function() {
			that.replaceCheck();
		});
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