export default {
    all() {
        let form = document.querySelector("#form");
        form.addEventListener("submit", validacion)

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

            console.log(data);
        }

        function validacionCampos(obj) {
            return !Object.values(obj).every(element => element !== "");
        }

    }
}