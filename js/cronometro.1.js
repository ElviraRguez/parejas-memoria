let Centesimas = document.getElementById("Centesimas");
let Segundos = document.getElementById("Segundos");
let Minutos = document.getElementById("Minutos");
let Horas = document.getElementById("Horas");

class Cronometro {

    constructor() {
        this.centesimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.horas = 0;
    }

    inicio() {
        control = setInterval(this.cronometro(), 10);
    }

    parar() {
        clearInterval(control);
    }

    reinicio() {
        clearInterval(control);
        this.centesimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.horas = 0;

        //Centesimas.innerHTML = ":00";
        Segundos.innerHTML = ":00";
        Minutos.innerHTML = ":00";
        Horas.innerHTML = "00";
    }

    cronometro() {
        if (this.centesimas < 99) {
            this.centesimas++;
            //if (this.centesimas < 10) { this.centesimas = "0" + this.centesimas }
            //Centesimas.innerHTML = ":" + this.centesimas;
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
            Minutos.innerHTML = ":" + this.minutos;
        }
        if (this.minutos == 59) {
            this.minutos = -1;
        }
        if ((this.centesimas == 0) && (this.segundos == 0) && (this.minutos == 0)) {
            this.horas++;
            if (this.horas < 10) { this.horas = "0" + this.horas }
            Horas.innerHTML = this.horas;
        }
    }
}