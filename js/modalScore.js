class Partida {
    constructor(nombre, puntos, tiempo, fecha) {
        this._nombre = nombre;
        this._puntos = puntos;
        this._tiempo = tiempo;
        this._fecha = fecha;
    }

    set nombre(value) {
        return this._nombre = value;
    }

    get nombre() {
        return this._nombre;
    }

    set puntos(value) {
        return this._puntos = value;
    }

    get puntos() {
        return this._puntos;
    }

    set tiempo(value) {
        return this._tiempo = value;
    }

    get tiempo() {
        return this._tiempo;
    }

    set fecha(value) {
        return this._fecha = value;
    }

    get fecha() {
        return this._fecha;
    }
}

function scoreTable(general, body) {
    let modal = document.createElement('DIV');
    modal.id = general;
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
    modalBody.id = body;
    modalBody.setAttribute("class", "modal-score-body");
    modalContent.appendChild(modalBody);
}

function guardarPuntuacion(modal) {
    modal.innerHTML = "<div class='tabla'><label class='titlePtos'>Nombre</label><label class='titlePtos'>Puntos</label><label class='titlePtos'>Tiempo</label></div>";

    let cuerpoTabla = document.createElement('DIV');
    cuerpoTabla.setAttribute("class", "tabla");
    modal.appendChild(cuerpoTabla);

    let nuevaPartida = document.createElement("INPUT");
    nuevaPartida.id = "nombreJugador";
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

    document.getElementById("guardarJugador").onclick = function () {
        let nombreJugador = document.getElementById("nombreJugador").value;
        let fechaActual = new Date();
        fechaActual = fechaActual.getDate() + "/" + (fechaActual.getMonth() +1) + "/" + fechaActual.getFullYear();
        webStorage(new Partida(nombreJugador, lblPuntos.innerHTML, lblTiempo.innerHTML, fechaActual));
        document.getElementById("modalScore").style.display = "none";
        historialPartidas();
    };

    document.getElementById("cancelar").onclick = function () {
        document.getElementById("modalScore").style.display = "none";
    };
}

function historialPartidas() {
    scoreTable("modalTableScore", "modalTableScoreBody");
    let historial = JSON.parse(localStorage.getItem("partidas"));
    let parentContent = document.getElementById("modalTableScoreBody");
    ordenar(historial);

    historial.forEach(partida => {
        getPartida(Object.values(partida).toString(), parentContent);
    });
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

function getPartida(partida, contentParent) {
    let contenedor = document.createElement('DIV');
    contenedor.setAttribute("class", "tPartidas");
    let comaPos = partida.indexOf(",");
    while (comaPos != -1) {
        contenedor.innerHTML += "<label>" + partida.substr(0, comaPos) + "</label>"
        partida = partida.substr(comaPos + 1);
        comaPos = partida.indexOf(",");
    }

    contenedor.innerHTML += "<label>" + partida + "</label>";
    contentParent.appendChild(contenedor);
}

function intercambiar(array, element1, element2) {
    var tmp = array[element1];
    array[element1] = array[element2];
    array[element2] = tmp;
    return array;
}

function ordenar(historial) {
    var size = historial.length;
    for (let partida = 1; partida < size; partida++) {
        for (let i = 0; i < (size - partida); i++) {
            var sig = i + 1;
            if (historial[i]._puntos < historial[sig]._puntos) {
                intercambiar(historial, i, sig);
            }

            if (historial[i]._puntos == historial[sig]._puntos) {
                if (historial[i]._tiempo > historial[sig]._tiempo){
                    intercambiar(historial, i, sig);
                }

                if(historial[i]._tiempo == historial[sig]._tiempo){
                    let fecha = new Date(historial[i]._fecha);
                    let fechaSig = new Date(historial[sig]._fecha);
                    if(fecha.getTime() < fechaSig.getTime()) {
                        intercambiar(historial, i, sig);
                    }
                }
            }
        }
    }
    return historial;
}