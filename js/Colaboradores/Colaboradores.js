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
  async function registrarUsuario(idpersona){
      const params = new FormData();
      params.append("operacion", "add");
      params.append("idpersona", idpersona);
      params.append("nomusuario", document.querySelector("#nomusuario").value);
      params.append("passusuario", document.querySelector("#passusuario").value);


      const options = {
          method: "POST",
          body: params
      }

      const idcolaborador = await fetch(`../../controllers/colaborador.controller.php`, options);
      return idcolaborador.json();
  }


    async function buscarDNI(){
        const ruc = $("#nrodocumento").value;

        if(ruc.length == 8){
        const response = await fetch(`../../Api/api.buscarDNI.php?dni=${ruc}`, { method: 'GET' });
        const data = await response.json();
        
            console.log(data);
        if (data.hasOwnProperty("message")){
            $("#nombres").value = '';
            $("#apepaterno").value = '';
            $("#apematerno").value = '';
        }else{
            $("#nombres").value = data['nombres'];
            $("#apepaterno").value = data['apellidoPaterno'];
            $("#apematerno").value = data['apellidoMaterno'];
        }
        return data;
        }
    }


  //Función asíncrona de buscar el documento por DNI 
  async function buscarDocumento(){
      const params = new URLSearchParams();
      params.append("operacion", "searchByDoc");
      params.append("nrodocumento", nrodocumento.value);

      const response = await fetch(`../../controllers/colaborador.controller.php?${params}`);
      return response.json();
  }

  //Esta función será utilizada desde el evento click - keypress usando buscarDocumento()
  async function validarDocumento(response){
      if(response.length == 0){
        const nrodocumento = document.querySelector("#nrodocumento").value;
        let data = null  
        if(nrodocumento.length == 8){
            data = await buscarDNI();
            adUsuario(true);
            return data;
          }else{
            //Activar el formulario para poder registrarse
          adPersona(true);
          adUsuario(true);
          //El usuario debe completar los datos de persona y registrarse 
          datosNuevos = true;
          //idpersona obtiene el valor de "response1"
          idpersona = -1;
          document.querySelector("#apepaterno").focus();
          }
          
      }else{
          //Mostrar datos de la persona
          datosNuevos = false;
          idpersona = response[0].idpersona;
          document.querySelector("#apepaterno").value = response[0].apepaterno;
          document.querySelector("#apematerno").value = response[0].apematerno;
          document.querySelector("#nombres").value = response[0].nombres;

          //Se encontró a la persona
          //Bloqueamos los controles porque ya está registrado
          adPersona(false);

          //Preguntar si podemos crear la cuenta
          if(response[0].idcolaborador === null){
              //Registrada como persona, NO como Usuario
              adUsuario(true);
          }else{
              //Registrada como Persona y como Usuario (NO SE PUEDE HACER NADA MÁS)
              adUsuario(false);
              showToast("Persona ya Registrada", "ERROR", 1500);
          }
      }
  }

  //Buscador del documento al pulsar Enter #01
  nrodocumento.addEventListener("keypress", async (event) => {
      if(event.keyCode == 13){
          event.preventDefault();
          const response = await buscarDocumento();
          await validarDocumento(response);
      }
  });

  //Buscador del documento al hacer click #02
  document.querySelector("#buscar-nrodocumento").addEventListener("click", async () => {
      const response = await buscarDocumento();
      validarDocumento(response);
  });

  //Método para habilitar/deshabilitar el formulario de personas
  function adPersona(sw = false){
      if(!sw){
          document.querySelector("#apepaterno").setAttribute("disabled", true);
          document.querySelector("#apematerno").setAttribute("disabled", true);
          document.querySelector("#nombres").setAttribute("disabled", true);
      }else{
          document.querySelector("#apepaterno").removeAttribute("disabled");
          document.querySelector("#apematerno").removeAttribute("disabled");
          document.querySelector("#nombres").removeAttribute("disabled");
      }
  }

  //Método para habilitar/deshabilitar el formulario de usuarios
  function adUsuario(sw = false){
      if(!sw){
          document.querySelector("#nomusuario").setAttribute("disabled", true);
          document.querySelector("#passusuario").setAttribute("disabled", true);
          document.querySelector("#registrar-colaborador").setAttribute("disabled", true);
      }else{
          document.querySelector("#nomusuario").removeAttribute("disabled");
          document.querySelector("#passusuario").removeAttribute("disabled");
          document.querySelector("#registrar-colaborador").removeAttribute("disabled");
      }
  }



  document.querySelector("#form-registro-usuarios").addEventListener("submit", async (event) => {
    event.preventDefault();

    if(await ask("¿Está seguro de registrar al Colaborador?", "Colaboradores")){
        let response1;
        let response2;

        if(datosNuevos){
            response1 = await registrarPersona();
            idpersona = response1.idpersona;
        }

        if(idpersona == -1){
            showToast("Error en Registrar al Usuario", "ERROR", 1500);
        }else{
            response2 = await registrarUsuario(idpersona);
            if(response2.idcolaborador == -1){
                showToast("Error en Registrar al Usuario", "ERROR", 1500);
            }else{
                showToast("Colaborador Registrado", "SUCCESS", 1500);
                adPersona();  
                adUsuario();
                document.querySelector("#form-registro-usuarios").reset();
                
                // Actualizar la tabla
                if (typeof window.cargarUsuarios === 'function') {
                    await window.cargarUsuarios();
                }
            }
        }
    }
});

  //Cancelar 
  document.querySelector("#cancelar").addEventListener("click", async () => {
    showToast("Operación Cancelada", "ERROR", 1500);
      adPersona();
      adUsuario();
  });

  //Método de Inicio
  adPersona();  
  adUsuario();
})