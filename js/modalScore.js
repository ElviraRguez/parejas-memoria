class Partida {
    constructor(nombre, puntos, tiempo, fecha) {
        this._nombre = nombre;
        this._puntos = puntos;
        this._tiempo = tiempo;
        this._fecha = fecha;
    }

    set nombre (value) {
        return this._nombre = value;
    }

    get nombre () {
        return this._nombre;
    }

    set puntos (value) {
        return this._puntos = value;
    }

    get puntos () {
        return this._puntos;
    }

    set tiempo (value) {
        return this._tiempo = value;
    }

    get tiempo () {
        return this._tiempo;
    }

    set fecha (value) {
        return this._fecha = value;
    }

    get fecha () {
        return this._fecha;
    }
}

function scoreTable() {
    let modal = document.createElement('DIV');
    modal.id = "modalScore";
    modal.setAttribute("class", "modalDialog");
    document.getElementsByTagName('BODY')[0].appendChild(modal);

    let modalContent = document.createElement('DIV');
    modalContent.setAttribute("class", "modal-content");
    modal.appendChild(modalContent);

    let modalHeader = document.createElement('DIV');
    modalHeader.setAttribute("class", "modal-header");
    modalHeader.innerHTML = "Tabla de puntuaciones";
    modalContent.appendChild(modalHeader);

    let modalBody = document.createElement('DIV');
    modalBody.id = "modal-score-body";
    modalBody.setAttribute("class", "modal-score-body");
    modalContent.appendChild(modalBody);
}

function guardarPuntuacion(modal) {        
    modal.innerHTML = "<div class='tabla'><label class='titlePtos'>Nombre</label><label class='titlePtos'>Puntos</label><label class='titlePtos'>Tiempo</label></div>";

    /*let form = document.createElement('FORM');    
    form.setAttribute("class", "tabla");
    modal.appendChild(form);*/

    let cuerpoTabla = document.createElement('DIV');
    cuerpoTabla.setAttribute("class", "tabla");
    modal.appendChild(cuerpoTabla);

    let nuevaPartida = document.createElement("INPUT");
    nuevaPartida.setAttribute("type", "text");
    cuerpoTabla.appendChild(nuevaPartida);
    nuevaPartida.focus();

    let lblPuntos = document.createElement('LABEL');
    lblPuntos.innerHTML = document.getElementById("puntosValue").innerHTML;
    cuerpoTabla.appendChild(lblPuntos);

    let lblTiempo = document.createElement('LABEL');
    lblTiempo.innerHTML = document.getElementById("Minutos").innerHTML + "" + document.getElementById("Segundos").innerHTML;
    cuerpoTabla.appendChild(lblTiempo);

    modal.innerHTML += "<div class='tabla footer'><div></div><button id='guardarJugador' class='btn'>Guardar</button><button id='cancelar' class='btn'>Cancelar</button></div>";

    document.getElementById("guardarJugador").onclick = function() {
        //TODO recoger nombre jugador
        console.log(nuevaPartida);
        webStorage(new Partida(nuevaPartida.value, lblPuntos.innerHTML, lblTiempo.innerHTML, new Date()));
    };

    document.getElementById("cancelar").onclick = function() {
        document.getElementById("modalScore").style.display = "none";
    };
}

//LOCALSTORAGE
function webStorage(valor) {
    let clave = "partidas";
    let webStorage = JSON.parse(localStorage.getItem(clave));
    if (webStorage == null) {
        webStorage = [];
    }
    webStorage.push(valor);
    localStorage.setItem("partidas", JSON.stringify(webStorage));
}

function getHistorial() {
    let historial = JSON.parse(localStorage.getItem("partidas")).toString();
    let historialElement = document.getElementById("historial");
    historialElement.innerText = "";
    let comaPos = historial.indexOf(",");
    while (comaPos != -1) {
        historialElement.innerHTML += "<p>" + historial.substr(0, comaPos).replace(/\r?\n/g, "<br>") + "</p>";
        historial = historial.substr(comaPos + 1);
        comaPos = historial.indexOf(",");
    }
    historialElement.innerHTML += "<p>" + historial.replace(/\r?\n/g, "<br>") + "</p>";
}