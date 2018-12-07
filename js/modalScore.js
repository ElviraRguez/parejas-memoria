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

    modal.innerHTML += "<div class='modal-body'><button class='btn'>Guardar</button><button class='btn'>Cancelar</button></div>";
}