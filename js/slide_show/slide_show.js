(function() {
	var slideIndex = 0

	this.SlideShow = function(){

		const defaults = {
			target: '',
			imagesUrl: [],
			auto: false,
			timeAuto: 3000,
			autoExecute: false,
			slideCount: true,
			mode: "slideShow"
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}
		if (this.options.imagesUrl.length == 0) {
			findBySons.call(this);
		}
		if (this.options.autoExecute == true) {
			this.execute();
		}
	}

	SlideShow.prototype.execute = function() {
		buildOutSlides.call(this);
		showSlides(0);
		if (this.options.auto == true) {
			setSlideTime.call(this);
		}
	}

	function buildOutSlides() {
		const container = buildSlide.call(this);
		const bottomPart = buildBottomPart.call(this);
		var target = document.getElementById(this.options.target);
		target.appendChild(container);
		target.appendChild(bottomPart);
	}

	function buildBottomPart() {
		if (this.options.mode == "slideShow"){
			return buildDots.call(this);
		}else if (this.options.mode == "slideShowGallery"){
			return buildGallery.call(this);
		}else {
			return document.createElement("div");
		}
	}

	function buildGallery() {
	  let images = document.createElement("div");
	  images.classList.add("gallery");
	  for (let i = 0; i < this.options.imagesUrl.length; i++) {
		  let imageContent = document.createElement("div");
		  let image = document.createElement("img")
		  imageContent.classList.add("gallery-image");
		  imageContent.classList.add("botton");
		  imageContent.style.width = 100/this.options.imagesUrl.length + "%";
		  imageContent.dataset.position = i;
		  imageContent.addEventListener('click', function() {
			  currentSlide(parseInt(this.dataset.position))
		  });
		  image.classList.add("img-wrap");
		  image.setAttribute("src", this.options.imagesUrl[i]);
		  imageContent.appendChild(image);
		  images.appendChild(imageContent);
	  }
	  return images
	}

	function buildDots() {
		let dots = document.createElement("div")
		dots.classList.add("dots");
		for (let i = 0; i < this.options.imagesUrl.length; i++) {
			var dot = document.createElement("span");
			dot.classList.add("dot");
			dot.classList.add("botton");
			dot.dataset.position = i;
			dot.addEventListener('click', function() {
				currentSlide(parseInt(this.dataset.position))
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
			if (this.options.slideCount) {number.innerHTML = (i+1) + "/" + this.options.imagesUrl.length;}
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

	function findBySons() {
		var target = document.getElementById(this.options.target);
		var images = target.getElementsByTagName("img")
		for (var i = 0; i < images.length; i++) {
			this.options.imagesUrl.push(images[i].getAttribute("src"))
		}
		while (target.firstChild) {
			target.removeChild(target.firstChild);
		}
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
		let slides = document.getElementsByClassName("mySlides");
		let dots = document.getElementsByClassName("botton");
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

	function setSlideTime() {
		var that = this
		setTimeout(function() {
			plusSlides(1)
			setSlideTime.call(that)
		}, that.options.timeAuto);
	}

})();
