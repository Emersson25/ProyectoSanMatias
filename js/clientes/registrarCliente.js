document.addEventListener("DOMContentLoaded", () => {
            
    //Función de referencia GLOBAL
    function $(object = null) {
        return document.querySelector(object);
      }

  //Referencia a la caja de texto DNI
  const nrodocumento = document.querySelector("#nrodocumento");
  //Variable de persona que indicará negativo (persona no identificada)
  let idpersona = -1;
  //Bandera
  let datosNuevos = true;

  //Función Asíncrona para registrar la persona
  async function registrarPersona(){
      //Datos a Enviar
      const params = new FormData();
      params.append("operacion", "add");
      params.append("apepaterno", document.querySelector("#apepaterno").value);
      params.append("apematerno", document.querySelector("#apematerno").value);
      params.append("nombres", document.querySelector("#nombres").value);
      params.append("nrodocumento", document.querySelector("#nrodocumento").value);
      //Objeto de Configuración
      const options = {
          method: "POST",
          body: params
      };

      //Enviamos la Petición
      const idpersona = await fetch(`../../controllers/persona.controller.php`, options)
      return idpersona.json();
  }

  //Función registrar Usuario (se obtiene le idpersona)
  async function registrarCliente(idpersona){
      const params = new FormData();
      params.append("operacion", "add");
      params.append("idpersona", idpersona);
      params.append("tipodocumento", document.querySelector("#tipodocumento").value);
      params.append("telefono", document.querySelector("#telefono").value);
      params.append("razonsocial", document.querySelector("#razonsocial").value);
      params.append("direccion", document.querySelector("#direccion").value);
      params.append("email", document.querySelector("#email").value);


      const options = {
          method: "POST",
          body: params
      }

      const idcolaborador = await fetch(`../../controllers/Clientes.controller.php`, options);
      return idcolaborador.json();
  }

  //Función asíncrona de buscar el documento por DNI 
  async function buscarDocumento(){
      const params = new URLSearchParams();
      params.append("operacion", "searchByDoc");
      params.append("nrodocumento", nrodocumento.value);

      const response = await fetch(`../../controllers/Clientes.controller.php?${params}`);
      return response.json();
  }

nrodocumento.addEventListener("input", async (event) => {
    event.preventDefault();
    const response = await buscarDocumento();


    if ( response.length != 0) {
       // console.log(response);

        showToast("Usuario ya registrado", "ERROR", 1500);
        document.querySelector("#nrodocumento").focus();
        adUsuario(false);
        
    } else if(response == 0){
        adUsuario(true);
        if(nrodocumento.value.length == 8){
            document.querySelector("#registrar-cliente").removeAttribute("disabled");
            document.querySelector("#direccion").removeAttribute("disabled");
        }else if(nrodocumento.value.length == 11){
            document.querySelector("#registrar-cliente").removeAttribute("disabled");
        }
        
    }
});





  //Método para habilitar/deshabilitar el formulario de usuarios
  function adUsuario(sw = false){
      if(!sw){
          document.querySelector("#telefono").setAttribute("disabled", true);
          document.querySelector("#email").setAttribute("disabled", true);
      }else{
          document.querySelector("#telefono").removeAttribute("disabled");
          document.querySelector("#email").removeAttribute("disabled");

      }
  }

// In registrarCliente.js - Modify the submit event listener:

document.querySelector("#form-registro-clientes").addEventListener("submit", async (event) => {
    event.preventDefault();

    if(await ask("¿Estás seguro de registrar al Cliente?")){
        let response1;
        let response2;

        if(datosNuevos){
            response1 = await registrarPersona();
            idpersona = response1.idpersona;
        }

        if(idpersona == -1){
            showToast("Error en Registrar al Cliente", "ERROR", 1500);
        }else{
            response2 = await registrarCliente(idpersona);
            if(response2.idcliente == -1){
                showToast("Error en Registrar al Cliente", "ERROR", 1500);
            }else{
                showToast("Cliente Registrado", "SUCCESS", 1500);
                document.querySelector("#form-registro-clientes").reset();
                adUsuario();
                
                // Refresh table after successful registration
                if (typeof window.initDataTable === 'function') {
                    await window.initDataTable();
                }
            }
        }
    }
});



  //Método de Inicio

    adUsuario();
});