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
