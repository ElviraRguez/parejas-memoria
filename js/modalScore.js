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
    modalBody.id = "modal-body";
    modalBody.setAttribute("class", "modal-body");
    modalContent.appendChild(modalBody);
}