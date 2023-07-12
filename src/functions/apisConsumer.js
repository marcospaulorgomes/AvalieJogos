//Consumir as API's
const igdb = require('igdb-api-node').default;
const client = 'aybfike88n8yqkudlkht30y2tjn8ks';
const token = 'rbrsebp3tp41al266j0abkezp6194y';


async function igdbHelper(data) {

    for (let result = 0; result < data.length; result++) {

        data[result].cover = await igdbCover(data[result].cover);

        for (let item = 0; item < data[result].platforms.length; item++) {
            data[result].platforms[item] = await igdbPlataforms(data[result].platforms[item]);
        }

        for (let item = 0; item < data[result].genres.length; item++) {
            data[result].genres[item] = await igdbGenres(data[result].genres[item]);
        }
    }
    return data;
}

async function igdbCover(coverId) {
    try {
        const response = await igdb(client, token)
            .fields(['url'])
            .limit(1)
            .where(`id = ${coverId}`)
            .request('/covers');

        return response.data[0].url;
    } catch (err) {
        return err.message;
    }
}

async function igdbPlataforms(platformsId) {
    try {
        const response = await igdb(client, token)
            .fields(['name'])
            .limit(1)
            .where(`id = ${platformsId}`)
            .request('/platforms');

        return response.data[0].name;
    } catch (err) {
        return err.message;
    }
}

async function igdbGenres(genreId) {
    try {
        const response = await igdb(client, token)
            .fields(['name'])
            .limit(1)
            .where(`id = ${genreId}`)
            .request('/genres');

        return response.data[0].name;
    } catch (err) {
        return err.message;
    }
}

async function igdbConsumerSearch(gameName) {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
            .limit(12)
            .search(gameName)
            .request('/games');

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

async function igdbConsumerHighlights() {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
            .limit(7)
            .offset(5)
            .sort('name')
            .where(`total_rating > ${90}`)
            .request('/games');

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

async function igdbConsumerGenre(genre) {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
            .limit(500)
            .sort('name')
            .where(`genres = ${genre}`)
            .request('/games');

        //response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

module.exports = { igdbConsumerGenre, igdbConsumerHighlights, igdbConsumerSearch };