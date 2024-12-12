document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const collapsibleContent = document.getElementById("collapsibleContent");
    const searchAndContact = document.querySelector(".search-and-contact");
    const contenido = document.getElementById("contenido"); // Contenedor principal para pestañas
    const headerTitle = document.getElementById("header-title");
    const tabs = document.querySelectorAll(".tab");
    let isContentVisible = false; // Estado de visibilidad colapsado

    // Configurar estado inicial
    collapsibleContent?.classList.remove("show");
    searchAndContact?.classList.add("d-none");

    // Manejar clics en el botón de colapsado
    navbarToggler?.addEventListener("click", function () {
        isContentVisible = !isContentVisible; // Cambiar estado

        if (isContentVisible) {
            collapsibleContent?.classList.add("show");
            searchAndContact?.classList.remove("d-none");
        } else {
            collapsibleContent?.classList.remove("show");
            searchAndContact?.classList.add("d-none");
        }
    });

    // en pantallas grandes sean siempre visibles
    function checkScreenSize() {
        if (window.innerWidth >= 992) {
            collapsibleContent?.classList.add("show");
            searchAndContact?.classList.remove("d-none");
        } else if (!isContentVisible) {
            collapsibleContent?.classList.remove("show");
            searchAndContact?.classList.add("d-none");
        }
    }

    // detectar cambios de tamaño de pantalla
    window.addEventListener("resize", checkScreenSize);

    // iniciar estado en función del tamaño de pantalla
    checkScreenSize();

    // Manejar clics en las pestañas
    tabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();

            // Cambiar pestaña activa
            tabs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");

            // Cambiar el título del encabezado
            headerTitle.textContent = this.getAttribute("data-title");

            // Cargar contenido dinámico de la pestaña
            const contentUrl = this.getAttribute("data-content");
            cargarContenido(contentUrl);

            // Ocultar barra en pantallas móviles
            if (window.innerWidth < 992) {
                collapsibleContent?.classList.remove("show");
                searchAndContact?.classList.add("d-none");
                isContentVisible = false;
            }
        });
    });

    // Función para cargar contenido dinámico desde archivos externos
    function cargarContenido(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el contenido: ${response.statusText}`);
                }
                return response.text();
            })
            .then((data) => {
                contenido.innerHTML = data;

                // Reasignar eventos a las preguntas dinámicas dentro del archivo cargado
                asociarEventosPreguntas();
            })
            .catch((error) => {
                contenido.innerHTML = `
                    <p class="text-danger">No se pudo cargar el contenido. Intenta nuevamente más tarde.</p>
                    <p>Error: ${error.message}</p>
                `;
                console.error("Error cargando el contenido dinámico:", error);
            });
    }

    // Asociar eventos a las preguntas dinámicas
    function asociarEventosPreguntas() {
        const links = contenido.querySelectorAll(".nav-link");
        links.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();

                const contentId = this.getAttribute("data-content");
                cargarPregunta(contentId);
            });
        });
    }

    // Función para cargar contenido dinámico de preguntas dentro del contenedor `content`
    function cargarPregunta(contentId) {
        const contentElement = document.getElementById("content"); 
        if (!contentElement) {
            console.error("No se encontró el contenedor con ID 'content' dentro del contenido cargado.");
            return;
        }

        const content = contentMap[contentId] || `
            <h4>Contenido no disponible</h4>
            <p>El contenido seleccionado no está disponible en este momento.</p>
        `;
        contentElement.innerHTML = content; // Insertar el contenido dinámico en `content`
    }

    // Mapa de contenidos para las preguntas
    const contentMap = {

        //PAGINA PLATAFORMA UVIRTUAL //
        
        //primeros pasos

        "entorno-virtual": `
            <h4>Entorno y perfil de la Uvirtual</h4>
            <div style="position: relative; width: 100%; height: 0; padding-top: 56.25%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">
                <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;" 
                    src="https://www.canva.com/design/DAGRmc8vrIk/wYgyHVXOU0QoGo6ZwXZJLg/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
                </iframe>
            </div>
        `,

        "cambiar-imagen": `
            <h4>Cambiar imagen de perfil de la Uvirtual</h4>
            <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
           padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
          border-radius: 8px; will-change: transform;">
         <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
          src="https://www.canva.com/design/DAGWlplbuek/ztnOYTvVrz3l9dEtlxbCJA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
         </iframe>
         </div>
        `,

        "mensaje-docentes": `
            <h4>Envio de mensaje a docentes</h4>
            <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
            padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
            border-radius: 8px; will-change: transform;">
           <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
           src="https://www.canva.com/design/DAGWliOP3zA/Yj1h437yBY0n26v-u2C4Kw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
          </iframe>
          </div>
        `,

        "contenido-virtual": `
            <h4>¿Qué es el contenido virtual?</h4>
            <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
            padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
           border-radius: 8px; will-change: transform;">
          <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
          src="https://www.canva.com/design/DAGWlpLg6sc/m3J5dlggPQzFZ76ESRAbug/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
         </iframe>
        </div>
        `,

        "cursos-virtual": `
            <h4>Requisitos técnicos para tomar cursos en la Uvirtual</h4>
            <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
           padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
           border-radius: 8px; will-change: transform;">
           <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
           src="https://www.canva.com/design/DAGWlqJr7QM/G2gXzqMbP7Knk76gQRKzbA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
          </iframe>
          </div>
        `,

        // Seccion preguntas frecuentes

        "dos-grupos": `
            <h4>¿Por qué aparezco en dos grupos de una misma asignatura en la Uvirtual?</h4>
            <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
           padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
         border-radius: 8px; will-change: transform;">
         <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
          src="https://www.canva.com/design/DAGWlnngfRI/PwusA7O7mKM23d3jfSptQw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
          </iframe>
          </div>
        `,

        "no-visualizar": `
            <h4>No puedo visualizar asignaturas en la Uvirtual</h4>
            <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
           padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
         border-radius: 8px; will-change: transform;">
         <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
          src="https://www.canva.com/design/DAGWltiAz3M/UeP39vbQH-WqpkwDNV34dA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
          </iframe>
         </div>
        `,

    "no-pdf": `
        <h4>Inconvenientes para visualizar archivos en formato PDF</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
        border-radius: 8px; will-change: transform;">
       <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
       src="https://www.canva.com/design/DAGWli6kpfo/e6Q5mMFBGgiG0QWrJ992ug/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
      </iframe>
      </div>
    `,

    //Sección de avtividades y evaluaciones

    "participar-foro": `
        <h4>¿Cómo participar en un foro en la Uvirtual?</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
      border-radius: 8px; will-change: transform;">
      <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
      src="https://www.canva.com/design/DAGWlrAFoy4/hVAEMiy6mJ2zcXsLxAAHVw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
      </iframe>
     </div>
    `,

    "subir-archivos": `
        <h4>¿Cómo subir archivos de tareas en la Uvirtual?</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
        border-radius: 8px; will-change: transform;">
     <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
      src="https://www.canva.com/design/DAGWljr-Dfw/6_WO-bOkClHXuHhK6o0gqg/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
     </iframe>
     </div>
    `,

    "subir-onedrive": `
        <h4>Alojar tarea mediante un enlace de OneDrive</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
       padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
      border-radius: 8px; will-change: transform;">
     <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
      src="https://www.canva.com/design/DAGWllfofcU/qITbCETtXP4QF7-ceQbCsg/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
     </iframe>
     </div>
    `,

    "realizar-examenes": `
        <h4>Lineamientos para realizar exámenes en la Uvirtual</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
       padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
       border-radius: 8px; will-change: transform;">
      <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
      src="https://www.canva.com/design/DAGWlhjUZz8/ziwvCxz6OML0xtTrk9DrMA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
      </iframe>
      </div>
    `,

    //Seccion app uvirtual

    "descargar-app": `
        <h4>Instalación de la App Uvirtual UFG</h4>
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
         padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
        border-radius: 8px; will-change: transform;">
        <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
       src="https://www.canva.com/design/DAGWlrwrdNg/HArHceohSY3645X73AGyXQ/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
      </iframe>
     </div>
    `,

    "no-reconoce-credenciales": `
        <h4>App Uvirtual UFG no reconoce mis credenciales</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
         border-radius: 8px; will-change: transform;">
        <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
        src="https://www.canva.com/design/DAGWls1y4X4/UlOhLV4AG2jkNrDCY_y0RA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
       </iframe>
      </div>
    `,

    // PESTAÑA MICROSFT 365//

    //Seccion Correo institucional UFG

    "intro-correo": `
        <h4>Introducción al correo Office 365</h4>
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
        border-radius: 8px; will-change: transform;">
        <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
        src="https://www.canva.com/design/DAGOhbMgu3c/ve-Z-_5--8Y_9TvXwCyQjw/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
       </iframe>
       </div>
    `,

    "instalar-office": `
        <h4>Guía básica para instalar Office 365 ProPlus</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
       padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
      border-radius: 8px; will-change: transform;">
       <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
      src="https://www.canva.com/design/DAGW8SPgX5Q/lc4XdrfQJVBMzXkJyy4UOQ/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
      </iframe>
     </div>
    `,

    "recuperar-credenciales": `
        <h4>Pasos para recuperar tus credenciales de Office 365</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
         padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
        border-radius: 8px; will-change: transform;">
        <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
        src="https://www.canva.com/design/DAGW8cExRpA/JwNskkV42HOXMaLpER7XGg/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
       </iframe>
      </div>
    `,

    "cambiar-contra": `
        <h4>Cambiar contraseña del correo electrónico desde Office 365</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
       padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
      border-radius: 8px; will-change: transform;">
     <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
     src="https://www.canva.com/design/DAGW8Xdu5GA/tgKtRxASHumgx-R5hlrmNA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
      </iframe>
    </div>
    `,

    "reenviar-correos": `
        <h4>Reenviar los correos de mi cuenta Microsoft 365 a mi correo personal</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
      border-radius: 8px; will-change: transform;">
      <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
      src="https://www.canva.com/design/DAGW8cCWmhQ/f7beWefAkJXk9SKTpi0EFw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
     </iframe>
     </div>
    `,

    //seccion Microsoft Teams

    "uso-teams": `
        <h4>Uso básico de Microsoft Teams</h4>
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGO_Ja-Rdg/pJVzw3CQrLddWmxTDqFowg/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    "descargar-teams": `
        <h4>Guía para descargar e instalar Microsoft Teams</h4>
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGNvwZuupM/FmpxB-QDvHejziFx26c6fQ/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    "entorno-teams": `
        <h4>Entorno Microsoft Teams</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGV0Uv7QXk/YVx8gNHdI48YybJIIwrAfw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    "buscar-en-teams": `
        <h4>Buscar usuario, opciones del chat y crear chat grupal</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGV0TXG_uw/I760J7Vmnk7d87At7ZtTBw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    // PESTAÑA WEB-DESTOK//

    //seccion preguntas frecuentes

    "cambiar-clave": `
        <h4>Cambiar clave de webdesktop</h4>
       <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGW8dCbAAQ/lF2eiCbNAX5fH7ZzTw3Q9g/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    "no-iconos": `
        <h4>Qué hacer si no observo algunos iconos en el webdesktop</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGVvXSUFXA/8EZ2iVaX4-MNHxb7snYVsQ/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    "no-acceso": `
        <h4>No puedo acceder al webdesktop desde mi dispositivo iphone, ipad o mac de apple</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGVvbKCpuk/XnDiJJ9q3arYE1m8P_eIDQ/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,

    "ventanas-emergentes": `
        <h4>Como habilitar ventanas emergentes en mi navegador web</h4>
        <div style="position: relative; width: 75%; height: 0; padding-top: 75%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGVvVRRWb0/7DO9PYtAObBxM_ebA6rd5g/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
    `,


        // Agregar más contenidos dinámicos aquí
    };

    // Cargar contenido inicial
    cargarContenido("pages/plataforma-uvirtual.html");
});
    