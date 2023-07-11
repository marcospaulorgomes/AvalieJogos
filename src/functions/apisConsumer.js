//Consumir as API's
const igdb = require('igdb-api-node').default;
const client = 'aybfike88n8yqkudlkht30y2tjn8ks';
const token = 'rbrsebp3tp41al266j0abkezp6194y';


async function igdbHelper(data){

    data[0].cover = await igdbCover(data[0].cover);

    for (let i = 0; i < data[0].platforms.length; i++) {
        data[0].platforms[i] = await igdbPlataforms(data[0].platforms[i]);
    }

    for (let i = 0; i < data[0].genres.length; i++) {
        data[0].genres[i] = await igdbGenres(data[0].genres[i]);
    }

    return data;
}

async function igdbCover(coverId) {
    const response = await igdb(client, token)
        .fields(['url'])
        .limit(1)
        .where(`id = ${coverId}`)
        .request('/covers');

    return response.data[0].url;
}

async function igdbPlataforms(platformsId) {
    const response = await igdb(client, token)
        .fields(['name'])
        .limit(1)
        .where(`id = ${platformsId}`)
        .request('/platforms');

    return response.data[0].name;
}

async function igdbGenres(genreId) {
    const response = await igdb(client, token)
        .fields(['name'])
        .limit(1)
        .where(`id = ${genreId}`)
        .request('/genres');

    return response.data[0].name;
}

async function igdbConsumerSearch(gameName) {
    const response = await igdb(client, token)
        .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
        .limit(1)
        .search(gameName)
        .request('/games');

        response.data = await igdbHelper(response.data);

    console.log(response.data);
    return response.data;
}

async function igdbConsumerHighlights() {
    const response = await igdb(client, token)
        .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
        .limit(7)
        .offset(5)
        .sort('name')
        .where(`total_rating > ${90}`)
        .request('/games');

        response.data = await igdbHelper(response.data);

    console.log(response.data);
    return response.data;
}

async function igdbConsumerGenre(genre) {
    const response = await igdb(client, token)
        .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
        .limit(500)
        .sort('name')
        .where(`genres = ${genre}`)
        .request('/games');

        response.data = await igdbHelper(response.data);

    console.log(response.data);
    return response.data;
}

module.exports = { igdbConsumerGenre, igdbConsumerHighlights, igdbConsumerSearch };