export default {
    all() {
        let url = "http://localhost:3000/reclutas"
        let form = document.querySelector("#form");
        form.addEventListener("submit", validacion);

        //Funciones

        //Obtener datos
        function validacion(e) {
            e.preventDefault();
            let nombre = document.querySelector("#nombre").value;
            let edad = document.querySelector("#edad").value;
            let telefono = document.querySelector("#telefono").value;
            let email = document.querySelector("#email").value;
            let direccion = document.querySelector("#direccion").value;
            let fechaNacimiento = document.querySelector("#fechaNacimiento").value;
            let team = document.querySelector("#team").value;

            let data = {
                nombre,
                edad,
                telefono,
                email,
                direccion,
                fechaNacimiento,
                team
            }

            // if (validacionCampos(data)) {
            //     alert("Todos los campos son obligatorios");
            //     return
            // }

            nuevoRecluta(data);
        }

        //Validar que los campos no estén vacios
        function validacionCampos(obj) {
            return !Object.values(obj).every(element => element !== "");
        }

        //Enviar nuevo recluta a la base de datos

        let nuevoRecluta = async (data) => {
            try {
                await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                window.location.href = "../../index.html";
            } catch (error) {
                console.error(error);
            }
        }

    }
}