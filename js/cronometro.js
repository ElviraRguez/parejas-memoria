var centesimas = 0;
var segundos = 0;
var minutos = 0;
var control;


function inicio() {
    control = setInterval(cronometro, 10);
}

function parar() {
    clearInterval(control);
}

function reinicio() {
    clearInterval(control);
    this.centesimas = 0;
    this.segundos = 0;
    this.minutos = 0;

    Segundos.innerHTML = ":00";
    Minutos.innerHTML = "00";
}

function cronometro() {
    if (this.centesimas < 99) {
        this.centesimas++;
    }
    if (this.centesimas == 99) {
        this.centesimas = -1;
    }
    if (this.centesimas == 0) {
        this.segundos++;
        if (this.segundos < 10) { this.segundos = "0" + this.segundos }
        Segundos.innerHTML = ":" + this.segundos;
    }
    if (this.segundos == 59) {
        this.segundos = -1;
    }
    if ((this.centesimas == 0) && (this.segundos == 0)) {
        this.minutos++;
        if (this.minutos < 10) { this.minutos = "0" + this.minutos }
        Minutos.innerHTML = this.minutos;
    }
    if (this.minutos == 59) {
        this.minutos = -1;
    }
}
