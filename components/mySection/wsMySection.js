const urlEndPoint = "http://localhost:3000";

const obtenerReclutas = async () => {
    try {
        const response = await fetch(`${urlEndPoint}/reclutas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const reclutas = await response.json();
        return reclutas;
    }
    catch (err) {
        console.log(err);
    }
}

const createCards = async () => {
    try {
        const reclutas = await obtenerReclutas();
        let index = 0;
        reclutas.forEach(recluta => {
            index++;
            let plantilla = `
                <div class="card" data-id="${recluta.id}">
                    <div class="title">
                        <h3>Recluta# ${index}</h3>
                    </div>
                    <div class="info">
                        <h4>Nombre: ${recluta.nombre}</h4>
                        <h4>ID: ${recluta.id}</h4>
                        <h4>Edad: ${recluta.edad}</h4>
                        <h4>Team: ${recluta.team}</h4>
                        <h4>Teléfono: ${recluta.telefono}</h4>
                        <h4>Email: ${recluta.email}</h4>
                        <h4>Dirección: ${recluta.direccion}</h4>
                        <h4>Fecha de nacimiento: ${recluta.fechaNacimiento}</h4>
                        <h4>Fecha en la que ingresó: ${recluta.fechaIngreso}</h4>
                    </div>
                    <div class="buttons">
                        <button class="deleteButton">
                            <img src="resources/imagenes/hombre.png" alt="">
                        </button>
                    </div>
                </div>
            `;
            self.postMessage({ message: "plantilla", data: plantilla });
        });
    } catch (error) {
        console.error(error);
    }
}

// const obtenerAntiguos = async () => {
//     try {
//         let reclutas = await obtenerReclutas();
//         let filtrados = [];
//         reclutas.forEach((recluta) => {
//             let fecha = new Date(recluta.fechaIngreso);
//             let dosMeses = 60 * 60 * 24 * 30 * 2 * 1000;

//             if (Date.now() - fecha.getTime() > dosMeses) {
//                 filtrados.push(recluta);
//             }


//         });
//         let index = 0;
//         filtrados.forEach((filtrado) => {
//             index++;
//             let plantilla = `
//                 <div class="card" data-id="${filtrado.id}">
//                     <div class="title">
//                         <h3>Recluta# ${index}</h3>
//                     </div>
//                     <div class="info">
//                         <h4>Nombre: ${filtrado.nombre}</h4>
//                         <h4>ID: ${filtrado.id}</h4>
//                         <h4>Edad: ${filtrado.edad}</h4>
//                         <h4>Team: ${filtrado.team}</h4>
//                         <h4>Teléfono: ${filtrado.telefono}</h4>
//                         <h4>Email: ${filtrado.email}</h4>
//                         <h4>Dirección: ${filtrado.direccion}</h4>
//                         <h4>Fecha de nacimiento: ${filtrado.fechaNacimiento}</h4>
//                         <h4>Fecha en la que ingresó: ${filtrado.fechaIngreso}</h4>
//                     </div>
//                     <div class="buttons">
//                         <button class="deleteButton">
//                             <img src="resources/imagenes/hombre.png" alt="">
//                         </button>
//                     </div>
//                 </div>
//             `;
//             self.postMessage({ message: "antiguos", data: plantilla });
//         })
//     } catch (error) {
//         console.error(error);
//     }
// };

const obtenerMenores = async () => {
    try {
        let reclutas = await obtenerReclutas();
        console.log(reclutas);
        let filtrados = reclutas.filter(recluta => recluta.edad >= 18);
        let index = 0;
        filtrados.forEach(filtrado => {
            index++;
            let plantilla = `
                <div class="card" data-id="${filtrado.id}">
                    <div class="title">
                        <h3>Recluta# ${index}</h3>
                    </div>
                    <div class="info">
                        <h4>Nombre: ${filtrado.nombre}</h4>
                        <h4>ID: ${filtrado.id}</h4>
                        <h4>Edad: ${filtrado.edad}</h4>
                        <h4>Team: ${filtrado.team}</h4>
                        <h4>Teléfono: ${filtrado.telefono}</h4>
                        <h4>Email: ${filtrado.email}</h4>
                        <h4>Dirección: ${filtrado.direccion}</h4>
                        <h4>Fecha de nacimiento: ${filtrado.fechaNacimiento}</h4>
                        <h4>Fecha en la que ingresó: ${filtrado.fechaIngreso}</h4>
                    </div>
                    <div class="buttons">
                        <button class="deleteButton">
                            <img src="resources/imagenes/hombre.png" alt="">
                        </button>
                    </div>
                </div>
            `;
            self.postMessage({ message: "menores", data: plantilla });
        });
    } catch (error) {
        console.error(error);
    }
}

self.addEventListener("message", async (e) => {
    let { message } = e.data;
    if (message === "api") {
        await createCards();
    } else if (message === "antiguos") {
        // await obtenerAntiguos();
    } else if (message === "menores") {
        await obtenerMenores();
    }
})
