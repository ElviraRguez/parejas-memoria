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

function guardarPuntuacion() {
    document.getElementById("modalScore").setAttribute("class", "modalDialog");
    let nuevaPartida = document.getElementById("nombreJugador");
    nuevaPartida.value = "";
    nuevaPartida.focus();

    let lblPuntos = document.getElementById("puntosPartida");
    lblPuntos.innerHTML = document.getElementById("puntosValue").innerHTML;

    let lblTiempo = document.getElementById("tiempoPartida");
    lblTiempo.innerHTML = document.getElementById("Minutos").innerHTML + "" + document.getElementById("Segundos").innerHTML;

    document.getElementById("guardarJugador").onclick = function () {
        let nombreJugador = document.getElementById("nombreJugador").value;
        let fechaActual = new Date();
        fechaActual = fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear();

        if(nombreJugador == "") {
            nombreJugador = "Sin nombre";
        }
        console.log(nombreJugador);
        webStorage(new Partida(nombreJugador, lblPuntos.innerHTML, lblTiempo.innerHTML, fechaActual));
        document.getElementById("modalScore").setAttribute("class", "hide");
        historialPartidas();
    };

    document.getElementById("cancelar").onclick = function () {
        document.getElementById("modalScore").setAttribute("class", "hide");
        historialPartidas();
    };
}

function historialPartidas() {
    document.getElementById("modalTableScore").setAttribute("class", "modalDialog");
    let historial = JSON.parse(localStorage.getItem("partidas"));

    if (historial != null) {
        historial = ordenar(historial);
        historial.forEach(partida => {
            getPartida(Object.values(partida).toString());
        });
    }

    document.getElementById("limpiar").onclick = function () {
        localStorage.clear();
        location.reload();
    };

    document.getElementById("cerrar").onclick = function () {
        location.reload();
    };
}

//LOCALSTORAGE HISTORIAL PARTIDAS GUARDADAS
function webStorage(valor) {
    let clave = "partidas";
    let webStorage = JSON.parse(localStorage.getItem(clave));
    if (webStorage == null) {
        webStorage = [];
    }
    webStorage.push(valor);
    localStorage.setItem("partidas", JSON.stringify(webStorage));
}

function getPartida(partida) {
    let contenedor = document.createElement('DIV');
    contenedor.setAttribute("class", "tPartidas");
    let comaPos = partida.indexOf(",");
    while (comaPos != -1) {
        contenedor.innerHTML += "<label>" + partida.substr(0, comaPos) + "</label>"
        partida = partida.substr(comaPos + 1);
        comaPos = partida.indexOf(",");
    }

    contenedor.innerHTML += "<label>" + partida + "</label>";
    document.getElementById("tPartidas").appendChild(contenedor);
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
                if (historial[i]._tiempo > historial[sig]._tiempo) {
                    intercambiar(historial, i, sig);
                }

                if (historial[i]._tiempo == historial[sig]._tiempo) {
                    let fecha = new Date(historial[i]._fecha);
                    let fechaSig = new Date(historial[sig]._fecha);
                    if (fecha.getTime() < fechaSig.getTime()) {
                        intercambiar(historial, i, sig);
                    }
                }
            }
        }
    }
    return historial;
}