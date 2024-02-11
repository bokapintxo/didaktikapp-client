import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor() { }
/*
  test indiceConversacion 
    0 -> lehenengo geralekua
    7 -> bigarren geralekua
    19 -> hirugarren geralekua
    38 -> laugarren geralekua
    52 -> bostgarren geralekua
    69 -> seigarren geralekua
    107 -> zazpigarren geralekua
    129 -> agurra 
*/
  private indiceConversacion = 0;
  private escribiendo = false;

  mostrarConversacion(conversacion: any[], callback: Function, index:number): number {
    
    if (this.escribiendo) {
      return 0;
    }

    if (this.indiceConversacion > 500) {
      this.indiceConversacion = index;
    }
    
    this.escribiendo = true;

    const linea = conversacion[this.indiceConversacion];
    
    if(linea.personaje == 'MAPA') {
      let mapa:number = Number.parseInt(linea.mensaje);
      index = 800 + mapa;
    } else if(linea.personaje == 'JOKOA') {
      let jokoa:number = Number.parseInt(linea.mensaje);
      index = 900 + jokoa;
    }

    if(index > this.indiceConversacion) {
      this.indiceConversacion = index;
    }

    const personajeElement = document.getElementById('personaje');
    const mensajeElement = document.getElementById('mensaje');

    if (!personajeElement || !mensajeElement) {
      console.error("No se pudo encontrar uno o ambos elementos en el DOM.");
      this.escribiendo = false;
      return -1;
    }

    console.log(index + " input index");
    console.log(this.indiceConversacion + " indiceConversacion")
    
  
    personajeElement.innerText = linea.personaje;
    mensajeElement.innerHTML = '';

    console.log(this.indiceConversacion + " indiceConversacion (corrected)")

    const mensajeTexto = linea.mensaje.split('');
    let i = 0;

    // Almacenar referencia al servicio para evitar problemas con 'this'
    const self = this;

    function agregarCaracter() {
      if (i < mensajeTexto.length) {
        const mensajeElement = document.getElementById('mensaje');

        if (mensajeElement) {
          if (mensajeTexto[i] === '\n') {
            mensajeElement.innerHTML += '<br>';
          } else {
            mensajeElement.innerHTML += mensajeTexto[i];
          }

          i++;
          setTimeout(agregarCaracter, 20);
        } else {
          console.error("El elemento 'mensaje' no se encontró en el DOM.");
          self.escribiendo = false;
          return;
        }
      } else {
        self.indiceConversacion++;

        if (self.indiceConversacion === conversacion.length) {
          self.indiceConversacion = 0;
        }

        setTimeout(() => {
          self.escribiendo = false;
          callback();
        }, 20);
      }
    }

    agregarCaracter();
    return this.indiceConversacion;
  }
}
