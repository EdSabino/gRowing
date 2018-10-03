(function() {

	this.Graph = function() {
        this.svgUrl = "http://www.w3.org/2000/svg";
        this.svg = null;
        this.target = null;

		const defaults = {
			target: "",
			graphTitle: "",
            graphTitle: "",
            categories: [],
			series: [
				{
					values: [1,2,3],
					color: "red",
					label: "homem"
				}
			],
			type: "point"
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}
        setTarget.call(this);
        this.buildOut();
	}

    Graph.prototype.buildOut = function() {
        this.svg = buildBase.call(this);
        let title = buildTitle.call(this);
		this.svg.appendChild(title);
        buildCanvas.call(this);
		buildGraph.call(this);
        this.target.appendChild(this.svg);
    }

	function buildGraph() {
		let point = document.createElementNS(this.svgUrl, "circle");
	}

    function buildBase() {
        let svg = document.createElementNS(this.svgUrl, "svg");
        svg.classList.add("graph");
        svg.setAttribute("aria-labelledby", "title");
        svg.setAttribute("role", "img");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        return svg
    }

    function buildTitle() {
        let title = document.createElementNS(this.svgUrl, "title");
        let txt = document.createTextNode(this.options.graphTitle);
		title.id = "title";
        title.appendChild(txt);
        return title
    }

    function buildCanvas() {
        let verticalLine = buildLine.call(this, "10", "10", "20", "90");
        let horizontalLine = buildLine.call(this, "10", "100", "90", "90");
        let xLabel = buildLabelX.call(this);
        this.svg.appendChild(verticalLine);
        this.svg.appendChild(horizontalLine);
        this.svg.appendChild(xLabel);
    }

    function buildLabelX() {
        let g = document.createElementNS(this.svgUrl, "g");
        let sizes = this.svg.getBBox();
        let xSize = 100/this.options.categories.length;
        let x = 15;
        for (let i = 0; i < this.options.categories.length; i++) {
            let text = document.createElementNS(this.svgUrl, "text");
			let txt = document.createTextNode(this.options.categories[i]);
			this.svg.appendChild(buildLine.call(this, x, x, "20", "90"));
            text.setAttribute("y", "95%");
            text.setAttribute("x", (x + "%"));
            x += xSize;
			text.appendChild(txt);
            g.appendChild(text);
        }
        return g
    }

    function buildLine(x1, x2, y1, y2) {
        let g = document.createElementNS(this.svgUrl, "g");
        let line = document.createElementNS(this.svgUrl, "line");
        g.classList.add("grid");
        g.classList.add("x-grid");
        g.setAttribute("id", "xGrid");
        line.setAttribute("x1", (x1 + "%"));
        line.setAttribute("x2", (x2 + "%"));
        line.setAttribute("y1", (y1 + "%"));
        line.setAttribute("y2", (y2 + "%"));
        g.appendChild(line)
        return g
    }

    function setTarget() {
        this.target = document.getElementById(this.options.target.slice(1));
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

}());
