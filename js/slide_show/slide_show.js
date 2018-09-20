

(function() {
	var slideIndex = 0

	this.SlideShow = function(){

		var defaults = {
			target: '',
			imagesUrl: [],
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}

		this.execute();
	}

	SlideShow.prototype.execute = function() {
		buildOut.call(this);
		showSlides(0);
	}

	function buildOut() {
		var container = buildSlide.call(this);
		var dots = buildDots.call(this);
		var target = document.getElementsByClassName(this.options.target)[0];
		target.appendChild(container);
		target.appendChild(dots);
	}

	function buildDots() {
		var dots = document.createElement("div")
		dots.classList.add("dots");
		for (var i = 0; i < this.options.imagesUrl.length; i++) {
			var dot = document.createElement("span");
			dot.classList.add("dot");
			dot.dataset.position = i;
			dot.addEventListener('click', function() {
				currentSlide(this.dataset.position)
			});
			dots.appendChild(dot);
		}
		return dots
	}

	function buildSlide() {
		var container = document.createElement("div");
		var previus = document.createElement("a");
		var next = document.createElement("a");
		container.classList.add("slideshow-container");
		for (var i = 0; i < this.options.imagesUrl.length; i++) {
			var slide = document.createElement("div");
			var number = document.createElement("div");
			var image = document.createElement("img");
			slide.classList.add("mySlides");
			slide.classList.add("fade");
			number.classList.add("numbertext");
			number.innerHTML = (i+1) + "/" + this.options.imagesUrl.length;
			image.classList.add("img-wrap");
			image.setAttribute("src", this.options.imagesUrl[i])
			slide.appendChild(number);
			slide.appendChild(image);
			container.appendChild(slide);
		}
		
		previus.classList.add("prev");
		previus.innerHTML = "\&#10094;"
		previus.addEventListener('click', function() {
			plusSlides(-1);
		});
		next.classList.add("next");
		next.innerHTML = "\&#10095;"
		next.addEventListener('click', function() {
			plusSlides(1)
		});
		container.appendChild(previus);
		container.appendChild(next);
		return container
	}

	function extendDefault(source, properties) {
		var property;
		// vai rodar por todos os argumentos que foram passados em forma de objeto {}, se fr uma propriedade valida e suportavel, 
		// ela sera reescrita
		for (property in properties) {
			// aqui valida
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}



	// Next/previous controls
	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	// Thumbnail image controls
	function currentSlide(n) {
		showSlides(n);
	}

	function showSlides(position) {
		var slides = document.getElementsByClassName("mySlides");
		var dots = document.getElementsByClassName("dot");
		if (position < 0) {position = slides.length-1}
		if (position > slides.length-1) {position = 0}
		for (i = 0; i < slides.length; i++) {
			if (i != position) {
				slides[i].style.display = "none"; 
			} else {
				slides[i].style.display = "block"; 
			}
		}
		for (i = 0; i < dots.length; i++) {
			if (i != position) {
				dots[i].className = dots[i].className.replace(" active", "");
			} else {
				dots[i].classList.add("active")
			}
		}
		slideIndex = position
	}
})();