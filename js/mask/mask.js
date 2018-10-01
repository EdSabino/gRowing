(function() {

	this.Mask = function() {
		this.format = "";
		this.count = 0;
		this.firstDigit = "";
		this.formats = [];
		this.target = null;

		const defaults = {
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
		let date = this.target.value;
		if (this.target.value.length <= this.options.format.length) {
			if ( new RegExp(this.formats[0].substring(0, this.formats[0].length - 2) ).test(date))	 {
				this.target.value += this.formats[0][this.formats[0].length-1];
				this.formats.splice(0,1);
				if (this.formats[0][this.formats[0].length-4] == "0") {
					this.replaceCheck();
				}
			}else {
				if (this.formats.length == 1) {
					if (new RegExp(this.formats[0] ).test(date)) {
						this.completed = true;
					}
				}
			}
		}else {
			this.target.value = this.target.value.substring(0, this.target.value.length - 1)
		}
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
		var value = "\\w{0}"
		value = value.replace("0", this.count);
		return value
	}

	function setListener() {
		const that = this
		this.target = document.getElementById(this.options.target.slice(1));
		this.target.addEventListener('focus', firstLetter.bind(this));
		this.target.addEventListener('keyup', function() {
			let key = event.keyCode || event.charCode;
    		if( key == 8 || key == 46 ){
				defaultVars.call(that);
				that.findFormat();
			}
			that.replaceCheck();
		});
	}

	function defaultVars() {
		this.format = "";
		this.count = 0;
		this.formats = [];
		this.target.value = "";
	}

	function firstLetter() {
		if (this.target.value == "") {
			if (this.formats[0][3] == "0") {
				this.target.value = this.formats[0][6];
				this.formats.splice(0,1);
			}
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
