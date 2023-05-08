let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", "");
let urlEndPoint = "http://localhost:3000";

export default class mySection extends HTMLElement {
    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("Section funcionando");
    }

    async delete(target) {
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

        eliminarReclutas(target)
    }

    async filtroAntiguos() {
        try {

            let ws = new Worker("components/mySection/wsMySection.js");
            ws.postMessage({ message: "antiguos" });

        } catch (error) {
            console.error(error);
        }
    }

    async filtroMenores(container) {
        try {
            let ws = new Worker("components/mySection/wsMySection.js");
            ws.postMessage({ message: "menores" });
            ws.onmessage = (e) => {
                let { message, data } = e.data;
                if (message === "menores") {
                    console.log(container);
                    container.innerHTML = "";
                    container.insertAdjacentHTML("beforeend", e.data.data)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async loadData() {
        try {

            let ws = new Worker("components/mySection/wsMySection.js");
            ws.postMessage({ message: "api" });
            ws.onmessage = (e) => {
                let { message, data } = e.data;
                if (message === "plantilla") {
                    this.shadowRoot.querySelector(".container").insertAdjacentHTML("beforeend", e.data.data)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    connectedCallback() {
        Promise.resolve(mySection.components()).then(html => {
            this.shadowRoot.innerHTML = html;

            //Declaracion de botones
            this.buttonTodos = this.shadowRoot.querySelector("#todos");
            this.buttonAntiguos = this.shadowRoot.querySelector("#antiguos");
            this.buttonMenores = this.shadowRoot.querySelector("#menores");
            this.buttonReprobaron = this.shadowRoot.querySelector("#reprobaron");

            //Eventos de escucha
            this.buttonTodos.addEventListener("click", this.loadData());

            this.shadowRoot.addEventListener("click", (e) => {

                if (e.target.classList.contains("deleteButton")) {
                    let id = e.target.parentNode.parentNode.dataset.id;
                    this.delete(id);
                }
            })

        });
    }
}

customElements.define(name, mySection);