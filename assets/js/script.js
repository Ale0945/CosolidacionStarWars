/* const url = 'https://swapi.dev/api/people'

const consultarAPI = (url) => {
    return new Promise((resolve, reject)=> {
        fetch(url).then(resp => resp.json()).then(data => resolve(data))
    }) 
}

function* generador1(){
    yield consultarAPI(`${url}/1?format=json`).then(resp => $("#lista1").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/2?format=json`).then(resp => $("#lista1").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/3?format=json`).then(resp => $("#lista1").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/4?format=json`).then(resp => $("#lista1").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/5?format=json`).then(resp => $("#lista1").append(`<div>${resp.name}</div>`));
}

function* generador2(){
    yield consultarAPI(`${url}/6?format=json`).then(resp => $("#lista2").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/7?format=json`).then(resp => $("#lista2").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/8?format=json`).then(resp => $("#lista2").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/9?format=json`).then(resp => $("#lista2").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/10?format=json`).then(resp => $("#lista2").append(`<div>${resp.name}</div>`));
}

function* generador3(){
    yield consultarAPI(`${url}/11?format=json`).then(resp => $("#lista3").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/12?format=json`).then(resp => $("#lista3").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/13?format=json`).then(resp => $("#lista3").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/14?format=json`).then(resp => $("#lista3").append(`<div>${resp.name}</div>`));
    yield consultarAPI(`${url}/15?format=json`).then(resp => $("#lista3").append(`<div>${resp.name}</div>`));
}

const g1 = generador1()
const g2 = generador2()
const g3 = generador3()

$(document).ready(function() {
    $("#card1").mouseenter(function() {
        g1.next()
    })
    $("#card2").mouseenter(function() {
        g2.next()
    })
    $("#card3").mouseenter(function() {
        g3.next()
    })
})
 */

const url = 'https://swapi.dev/api/people';

const consultarAPI = (url) => {
    return fetch(url).then(resp => resp.json());
};

function* generador(startIndex, count) {
    for (let i = startIndex; i < startIndex + count; i++) {
        yield consultarAPI(`${url}/${i}?format=json`);
    }
}

function construirCardContent(personaje) {
    return `
    <div class="col-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">Estatura: ${personaje.height} cm</p>
                <p class="card-text">Peso: ${personaje.mass} kg</p>
            </div>
        </div>
        </div>
    `;
}

function agregarNombresALista(generator, listaId, card, startIndex) {
    const lista = $(listaId);
    const generatorIterator = generator(startIndex, 5);

    $(card).mouseenter(function () {
        for (let i = 0; i < 5; i++) {
            const nextValue = generatorIterator.next().value;
            if (nextValue) {
                nextValue.then(resp => {
                    const cardContent = construirCardContent(resp);
                    lista.append(cardContent);
                });
            } else {
                break;
            }
        }
    });
}

$(document).ready(function () {
    agregarNombresALista(generador, "#lista1", "#card1", 1);
    agregarNombresALista(generador, "#lista2", "#card2", 6);
    agregarNombresALista(generador, "#lista3", "#card3", 11);
});
