const fs = require('fs');

//Listar resultados da barra de pesquisa
function listarTitulos(tituloJogo){
    const data = JSON.parse(fs.readFileSync('../database/data.json', { encoding: 'utf8', flag: 'r' }));
    let listaTitulos = [];

    for(let titulo of data){
        if(titulo.nome === tituloJogo){
            listaTitulos.push(titulo);
        }
    }
    return listaTitulos;
}

//Disponibilizar titulo selecionado
function exibirTitulo(idTitulo){
    const data = JSON.parse(fs.readFileSync('../database/data.json', { encoding: 'utf8', flag: 'r' }));

    for(let titulo of data){
        if(titulo.id === idTitulo){
            return titulo;
        }
    }
}

//Função para listar jogos por gênero

//Função para listar os jogos mais bem avaliados para o carrossel de imagens

//Função para receber os dados da API 1

// Função para receber os dados da API 2

//Função para preencher os dados do JSON com os dados das API's

//Função para preencher o review do jogo