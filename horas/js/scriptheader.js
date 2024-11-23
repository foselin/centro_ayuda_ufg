//java del header y navegacion de pestañas//


  // Cargar contenido inicial al cargar la página
window.onload = function() {
      cargarContenido('pages/plataforma-uvirtual.html');
    };
  
  // Manejar los clics en las pestañas para cambiar contenido
  document.getElementById('nav-tabs').addEventListener('click', function(event) {
      event.preventDefault();
      if (event.target.tagName === 'A') {
          cargarContenido(event.target.getAttribute('data-content'));
      }
  });
  
  // Función para cargar contenido dinámico según la pestaña seleccionada
  function cargarContenido(url) {
      fetch(url)
          .then(response => response.text())
          .then(data => {
              const contenido = document.getElementById('contenido');
              contenido.innerHTML = data;
  
              // cargar contenido de manuales y videos//
             // Ejecutar scripts internos del contenido cargado
              const scripts = contenido.querySelectorAll('script');
              scripts.forEach(script => {
                  const newScript = document.createElement('script');
                  if (script.src) {
                      newScript.src = script.src; // Cargar scripts con src
                  } else {
                      newScript.textContent = script.textContent; // Ejecutar scripts inline
                  }
                  document.body.appendChild(newScript);
                  document.body.removeChild(newScript); 
              });
  
              // Agregar listeners a los enlaces después de cargar contenido
              const links = document.querySelectorAll('.nav-link');
              links.forEach(link => {
                  link.addEventListener('click', function(e) {
                      e.preventDefault();
                      const contentId = this.getAttribute('data-content');
                      const contentElement = document.getElementById('content');
                      contentElement.innerHTML = contentMap[contentId] || `
                          <h4>Contenido no disponible</h4>
                          <p>El contenido seleccionado no está disponible en este momento.</p>`;
                  });
              });
          })
          .catch(error => console.error('Error cargando el contenido:', error));
  }
  

  // manuales y videos//
  // Objeto con el contenido para cada opcion de las preguntas//
  const contentMap = {
      'contenido-virtual': `
          <h4>¿Qué es el contenido virtual?</h4>
          <div style="position: relative; width: 100%; height: 0; padding-top: 129.4118%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">
              <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;" src="https://www.canva.com/design/DAGVLOkvw74/p_o8VbeiZHa_rQEgv6WRUA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>
          </div>`,
      'descargar-app': `
          <h4>Cambiar imagen de perfil</h4>
          <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">
              <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;" src="https://www.canva.com/design/DAGRmc8vrIk/wYgyHVXOU0QoGo6ZwXZJLg/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>
          </div>`
  };
  
  
  ///cambiar titulo de cada pestaña seleccionada en el banner///
  const tabs = document.querySelectorAll('.tab');
          const headerTitle = document.getElementById('header-title');
  
          tabs.forEach(tab => {
              tab.addEventListener('click', function() {
                  tabs.forEach(t => t.classList.remove('active'));
                  this.classList.add('active');
                  headerTitle.textContent = this.getAttribute('data-title');
              });
          });
  
  
  
  
  
  