let parejasAcertadas = [];
let numImgVisibles = 0;
let puntos = 0;
let partidaIniciada = false;
window.onload = grid;

function grid() {
	cargarImagenes();
	scorePartida();

	//NIVEL DIFICULTAD
	let modal = document.getElementById("modal-body");
	let buttons = modal.childNodes;
	buttons.forEach(button => {
		button.onclick = dificultad;
	});
}

function dificultad() {
	let baraja = document.getElementById("wrapper");
	switch (this.id) {
		case "facil":
			baraja.classList.add("facil");
			generarCartas(4, 8, frutas);
			break;
		case "medio":
			baraja.classList.add("medio");
			generarCartas(6, 18, pokemon);
			break;
		case "dificil":
			baraja.classList.add("dificil");
			generarCartas(8, 32, coches);
			break;
		case "tablaPuntuaciones":
			historialPartidas();
			break;
	}
	document.getElementById("modal").style.display = "none";
	//guardarPuntuacion();
}

function generarCartas(valorDificultad, numImg, tematica) {	
	cronometrar();
	let parentElement = document.getElementById("wrapper");
	let numElements = valorDificultad * valorDificultad;
	let listaImagenes = imagenes(numImg, tematica);

	for (let i = 0; i < numElements; i++) {
		let item = document.createElement('DIV');
		item.setAttribute("class", "grid-item");
		parentElement.appendChild(item);

		//IMG		
		let img = document.createElement('INPUT');
		img.setAttribute("type", "image");
		img.setAttribute("src", reverso);
		img.setAttribute("visible", false);		
		img.onclick = function () {			
			if (img.getAttribute("visible") == "false") {
				img.setAttribute("src", listaImagenes[i]);
				img.setAttribute("visible", true);
				numImgVisibles++;
			}

			comprobarParejas();
			scorePartida();
			
			if(parejasAcertadas.length == numImg) {
				cronometrar();
				guardarPuntuacion();
			}
		}
		item.appendChild(img);
	}

	parentElement.style.setProperty('--rowNum', valorDificultad);
	parentElement.style.setProperty('--colNum', valorDificultad);
}

function imagenes(numImg, tematica) {
	let imagenes = [];
	let i = 0;
	while (i < numImg) {
		let nuevaImagen = tematica[getAleatorio(tematica)];
		if (!imagenes.includes(nuevaImagen)) {
			imagenes[i] = nuevaImagen;
			i++;
		}
	}
	return mezclarImagenes(imagenes, numImg);
}

function mezclarImagenes(imagenes, numImg) {
	let baraja = [];
	baraja.length = numImg * 2;

	let i = 0
	while (i < baraja.length) {
		let nuevaImagen = imagenes[getAleatorio(imagenes)];
		if (!baraja.includes(nuevaImagen) || contarRepeticiones(baraja, nuevaImagen) < 2) {
			baraja[i] = nuevaImagen;
			i++;
		}
	}
	return baraja;
}

function contarRepeticiones(lista, imagen) {
	let repeticiones = 0;
	for (let i = 0; i < lista.length; i++) {
		if (lista[i] == imagen) {
			repeticiones++;
		}
	}
	return repeticiones;
}

function comprobarParejas() {
	if (numImgVisibles == 2) {
		bloquearPanel(true);
		cronometrar();

		let parejas = [];
		numImgVisibles = 0;

		let imagenes = document.getElementsByTagName("INPUT");
		for (let i = 0; i < imagenes.length; i++) {
			if (!parejasAcertadas.includes(imagenes[i].getAttribute("src")) & imagenes[i].getAttribute("visible") == "true") {
				parejas.push(imagenes[i]);
			}
		}

		if (parejas[0].getAttribute("src") != parejas[1].getAttribute("src")) {
			if (puntos != 0)
				puntos--;

			setTimeout(
				function () {
					parejas[0].setAttribute("src", reverso);
					parejas[0].setAttribute("visible", false);
					parejas[1].setAttribute("src", reverso);
					parejas[1].setAttribute("visible", false);
					bloquearPanel(false);
					cronometrar();
				},
				1000
			);
		}
		else {
			parejasAcertadas.push(parejas[0].getAttribute("src"));
			puntos += 10;
			bloquearPanel(false);
			cronometrar();
		}
	}
}

function getAleatorio(tematica) {
	return Math.floor(Math.random() * (tematica.length - 0));
}

function ocultarImagenes(parejas) {
	parejas[0].setAttribute("src", reverso);
	parejas[1].setAttribute("src", reverso);
}

function bloquearPanel(bloquear) {
	let imagenes = document.getElementsByTagName("INPUT");
	for (let i = 0; i < imagenes.length; i++) {
		imagenes[i].disabled = bloquear;
	}
}

function scorePartida() {
	let divScore = document.getElementById("puntosValue");
	divScore.innerHTML = puntos;
}

//CRONOMETRO(EL EL FICHERO CRONOMETRO.JS)
function cronometrar() {
	if(partidaIniciada) {
		partidaIniciada = false;
		parar();
	}
	else {		
		partidaIniciada = true;
		inicio();
	}
}