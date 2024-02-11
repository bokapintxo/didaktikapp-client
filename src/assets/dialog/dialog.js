alert('Hola, soy un mensaje de JavaScript');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded se ha disparado correctamente');
    let indiceConversacion = 0;
    let escribiendo = false; // Variable para controlar si se está escribiendo

    function mostrarConversacion(conversacion) {
      if (escribiendo) {
        return; // Si se está escribiendo, salir de la función
      }

      escribiendo = true; // Bloquear el click mientras se escribe

      const linea = conversacion[indiceConversacion];
      const personajeElement = document.getElementById('personaje');
      const mensajeElement = document.getElementById('mensaje');

      personajeElement.innerText = linea.personaje;
      mensajeElement.innerHTML = ''; // Limpiar el contenido anterior

      const mensajeTexto = linea.mensaje.split('');
      let i = 0;

      function agregarCaracter() {
        if (i < mensajeTexto.length) {
          if (mensajeTexto[i] === '\n') {
            mensajeElement.innerHTML += '<br>';
          } else {
            mensajeElement.innerHTML += mensajeTexto[i];
          }

          i++;
          setTimeout(agregarCaracter, 20);
        } else {
          // Desbloquear el click cuando la escritura ha terminado
          escribiendo = false;
        }
      }

      agregarCaracter();
    }

    fetch('dialog.json')
      .then(response => response.json())
      .then(conversacion => {
        console.log('Conversación cargada correctamente:', conversacion);
        mostrarConversacion(conversacion);

        document.getElementById('personaje-mensaje').addEventListener('click', function() {
          if (!escribiendo) {
            indiceConversacion++;

            if (indiceConversacion === conversacion.length) {
              indiceConversacion = 0;
            }

            mostrarConversacion(conversacion);
          }
        });
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
