const fs = require('fs');

function reviewRatingCalculator(gameName) {
    try{
        const reviews = JSON.parse(fs.readFileSync('./src/database/review.json', { encoding: 'utf8', flag: 'r' }));

        let ratingReviews = 0;
        let reviewCount = 0;
    
        for (let review of reviews) {
    
            if (review.gameName === gameName) {
                ratingReviews += Number(review.rating);
                reviewCount += 1;
            }
        }
    
        if (reviewCount != 0) {
            ratingReviews = ratingReviews / reviewCount;
        }
    
        return ratingReviews;
    } catch(err){
        return err.message;
    }
}

function ratingCalculator(infoGame) {
    try {
        for (let result = 0; result < infoGame.length; result++) {

            let ratingReviews = reviewRatingCalculator(infoGame[result].name);

            if ((ratingReviews != 0) && (typeof (ratingReviews) === 'number')) {
                infoGame[result].total_rating = (infoGame[result].total_rating + ratingReviews) / 2;
            }
        }

        return infoGame;
    } catch (err) {
        return err.message;
    }

}

module.exports = { ratingCalculator };