function highlight(o) {
	document.getElementById(o).style.color='#FFFFFF';
}
function unhighlight(o) {
	document.getElementById(o).style.color='#FFC670';
}

function borderlight(o) {
	document.getElementById(o).style.borderColor='#FFFFFF';
}
function unborderlight(o) {
	document.getElementById(o).style.borderColor='#FFC670';
}

function absLight(o) {
	document.getElementById(o).style.color='#FFFFFF';
}
function unabsLight(o) {
	document.getElementById(o).style.color='#FFC670';
}

function handleAbstract(abstractId) {
	button = document.getElementById(abstractId+'Button');
	abstractDiv = document.getElementById(abstractId);
	if (button.innerHTML == 'show abstract') {
		//then show it
		button.innerHTML = 'hide abstract';
		abstractDiv.style.display='block';
	}
	else {
		//then hide it
		button.innerHTML = 'show abstract';
		abstractDiv.style.display='none';
	}
}
