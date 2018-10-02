(function() {

	this.Graph = function() {
        this.svgUrl = "http://www.w3.org/2000/svg";
        this.svg = null;
        this.target = null;
        this.canvas = null;

		const defaults = {
			target: "",
            graphTitle: ""
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefault(defaults, arguments[0]);
		}
        setTarget.call(this);
        this.buildOut();
	}

    Graph.prototype.buildOut = function() {
        this.svg = buildBase.call(this);
        this.title = buildTitle.call(this);
        this.canvas = buildCanvas.call(this);
    }

    function buildBase() {
        let svg = document.createElementNS(this.svgUrl, "svg");
        svg.classList.add("graph");
        svg.setAttribute("aria-labelledby", "title");
        svg.setAttribute("role", "img");
        return svg
    }

    function buildTitle() {
        let title = document.createElementNS(this.svgUrl, "title");
        let txt = document.createTextNode(this.options.graphTitle);
        title.appendChild(txt);
        return title
    }

    function buildCanvas() {
        // <g class="grid x-grid" id="xGrid">
        //     <line x1="90" x2="90" y1="5" y2="371"></line>
        // </g>
        // <g class="grid y-grid" id="yGrid">
        //     <line x1="90" x2="705" y1="370" y2="370"></line>
        // </g>
        // <g class="labels x-labels">
        //     <text x="100" y="400">2008</text>
        //     <text x="246" y="400">2009</text>
        //     <text x="392" y="400">2010</text>
        //     <text x="538" y="400">2011</text>
        //     <text x="684" y="400">2012</text>
        //     <text x="400" y="440" class="label-title">Year</text>
        // </g>
        // <g class="labels y-labels">
        //     <text x="80" y="15">15</text>
        //     <text x="80" y="131">10</text>
        //     <text x="80" y="248">5</text>
        //     <text x="80" y="373">0</text>
        //     <text x="50" y="200" class="label-title">Price</text>
        // </g>
        let verticalLine = buildLine.call(this)
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
