export default {
    all() {
        let urlEndPoint = "http://localhost:3000";
        let ws = new Worker("components/mySection/wsMySection.js");
        loadData();
        let container = document.querySelector(".container");

        //Declaración de botones
        let buttonTodos = document.querySelector("#todos");
        let buttonMenores = document.querySelector("#menores");
        let buttonAntiguos = document.querySelector("#antiguos");

        //Eventos de escucha

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("deleteButton")) {
                let id = e.target.parentNode.parentNode.dataset.id;
                deleteU(id);
            }
        })

        buttonTodos.addEventListener("click", (e) => {
            loadData();
        })

        buttonMenores.addEventListener("click", (e) => {
            filtroMenores(container);
        })

        //Mensajes del worker

        ws.onmessage = (e) => {
            let { message, data } = e.data;
            if (message === "plantilla") {
                container.innerHTML = e.data.data;
                container.insertAdjacentHTML("beforeend", e.data.data)
            } else if (message === "menores") {
                container.innerHTML = "";
                container.insertAdjacentHTML("beforeend", e.data.data)
            } else if (message === "antiguos") {
                console.log("mensaje recibido")
                container.innerHTML = "";
            }
        }

        //Funciones
        function loadData() {
            try {
                ws.postMessage({ message: "api" });
            } catch (error) {
                console.error(error);
            }
        }

        async function deleteU(target) {
            try {
                const response = await fetch(`${urlEndPoint}/reclutas/${target}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        async function filtroMenores(container) {
            try {
                ws.postMessage({ message: "menores" });
            } catch (error) {
                console.error(error);
            }
        }

        async function filtroAntiguos() {
            try {
                ws.postMessage({ message: "antiguos" });

            } catch (error) {
                console.error(error);
            }
        }

    }
}