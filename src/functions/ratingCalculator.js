const fs = require('fs');
const { igdbConsumerSearch } = require('../functions/apisConsumer');

function ratingCalculador(gameName) {
    const reviews = JSON.parse(fs.readFileSync('./database/reviews.json', { encoding: 'utf8', flag: 'r' }));
    const infoGame = igdbConsumerSearch(gameName);

    rating = 0;
    reviewCount = 0;

    for (let review of reviews) {
        if (review.gameName === gameName) {
            rating += review.score;
            reviewCount += 1;
        }
    }

    rating = rating / reviewCount;

    if (infoGame.name === gameName) {
        rating += infoGame.total_rating;
    }

    return rating / 2;
}