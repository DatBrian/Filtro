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
            let teamId
            if (team.value === "apolo") {
                teamId = 1
            } else if (team.value === "Artemis") {
                teamId = 2
            } else if (team.value === "Sputnik") {
                teamId = 3
            }
            const fechaIngreso = new Date();
            const año = fechaIngreso.getFullYear();
            const mes = fechaIngreso.getMonth() + 1;
            const dia = fechaIngreso.getDate();

            let data = {
                nombre,
                edad,
                telefono,
                email,
                direccion,
                fechaNacimiento,
                team,
                teamId,
                fechaIngreso: `${año}-${mes}-${dia}`
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