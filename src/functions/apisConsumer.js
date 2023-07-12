const igdb = require('igdb-api-node').default; //A Node.js wrapper for the IGDB API.

//Access credentials used to consume the IGDB APIs.
const client = 'aybfike88n8yqkudlkht30y2tjn8ks'; 
const token = 'rbrsebp3tp41al266j0abkezp6194y';

//Function used to fetch the actual values of the data received by the IGBD API.
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

//Function used to search through the id, the url of the game image.
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

//Function used to search through the array of id's, the name of platforms which the game is available on.
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

//Function used to search through the array of id's, the name of genres which the game belongs.
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

//Function used to search a list of games by name.
async function igdbConsumerSearch(gameName) {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary']) //Expected fields of the game data.
            .limit(12) //Maximum number of games data.
            .search(gameName)
            .request('/games'); //IGDB API Route.

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

//Function used to search for a list of games that have a high total_rating.
async function igdbConsumerHighlights() {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
            .limit(7)
            .offset(5) //Minimum number of games data.
            .sort('name') //Sorted by game name.
            .where(`total_rating > ${95}`) //Returns only those games that have a score higher than the given value.
            .request('/games');

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

//Function used to search for a list of games that have a certain genre.
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