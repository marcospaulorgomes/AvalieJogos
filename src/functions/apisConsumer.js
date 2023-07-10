//Consumir as API's
const igdb = require('igdb-api-node').default;
const client = 'aybfike88n8yqkudlkht30y2tjn8ks';
const token = 'rbrsebp3tp41al266j0abkezp6194y';


async function igdbArtwork(artworksId){
    const response = await igdb(client, token)
    .fields(['url'])
    .limit(1)
    .where(`id = ${artworksId}`)
    .request('/artworks');

console.log(response.data[0].url);
return response.data[0].url;
}

async function igdbConsumerSearch(gameName) {
    const response = await igdb(client, token)
        .fields(['artworks', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date'])
        .limit(1)
        .search(gameName)
        .request('/games');

    console.log(response.data);
    response.data[0].artworks = await igdbArtwork(response.data[0].artworks[0]);
    console.log(response.data);
    return response.data;
}

async function igdbConsumerHighlights(){
    const response = await igdb(client, token)
        .fields(['artworks', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date'])
        .limit(7) 
        .offset(5)
        .sort('name')
        .where(`total_rating > ${90}`)
        .request('/games');

    console.log(response.data);
    return response.data;
}

async function igdbConsumerGenre(genre){
    const response = await igdb(client, token)
        .fields(['artworks', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date'])
        .limit(100) 
        .sort('name')
        .where(`genres = ${genre}`)
        .request('/games');

    console.log(response.data);
    return response.data;
}

module.exports = {igdbConsumerGenre, igdbConsumerHighlights, igdbConsumerSearch};