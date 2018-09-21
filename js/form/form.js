(function(){
	var appends = document.getElementsByClassName("append");
	var prepends = document.getElementsByClassName("prepend");
	for (var i = 0; i < prepends.length; i++) {
		var content = document.createElement("div");
		var groupper = document.createElement("div");
		var group = document.createElement("div");
		var parent = prepends[i].parentNode;
		var node = prepends[i];
		content.innerHTML = prepends[i].dataset.cont;
		content.classList.add("content-prepend");
		groupper.classList.add("groupper-prepend");
		group.classList.add("input-group");
		groupper.appendChild(content);
		group.appendChild(groupper);
		parent.replaceChild(group, prepends[i]);
		group.appendChild(node)
	}

	for (var i = 0; i < appends.length; i++) {
		var content = document.createElement("div");
		var groupper = document.createElement("div");
		var group = document.createElement("div");
		var parent = appends[i].parentNode;
		var node = appends[i];
		content.innerHTML = appends[i].dataset.cont;
		content.classList.add("content-append");
		groupper.classList.add("groupper-append");
		group.classList.add("input-group");
		groupper.appendChild(content);
		parent.replaceChild(group, appends[i]);
		group.appendChild(node)
		group.appendChild(groupper);
	}
})();