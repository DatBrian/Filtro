export default {
    all() {
        let urlEndPoint = "http://localhost:3000";
        let ws = new Worker("components/mySection/wsMySection.js");
        loadData();
        let container = document.querySelector(".container");
        let title = document.querySelector("#title");
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
            location.reload();
        })

        buttonMenores.addEventListener("click", (e) => {
            filtroMenores(container);
        })

        buttonAntiguos.addEventListener("click", (e) => {
            filtroAntiguos();
        })

        //Mensajes del worker

        ws.onmessage = (e) => {
            let { message, data } = e.data;
            if (message === "plantilla") {
                container.insertAdjacentHTML("beforeend", e.data.data)
            } else if (message === "menores") {
                console.log(data);
                (data = []) ? (container.innerHTML = "", title.innerHTML = "Not Found")
                    : container.insertAdjacentHTML("beforeend", e.data.data)
            } else if (message === "antiguos") {
                (data = []) ? (container.innerHTML = "", title.innerHTML = "Not Found")
                    : container.insertAdjacentHTML("beforeend", e.data.data)
            }
        }

        //Funciones
        async function loadData() {
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