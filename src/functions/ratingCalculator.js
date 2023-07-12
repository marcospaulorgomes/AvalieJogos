const fs = require('fs');

//Function responsible for listing and calculating the average of the grades provided by users in the reviews.
function reviewRatingCalculator(gameName) {
    try{
        const reviews = JSON.parse(fs.readFileSync('./src/database/review.json', { encoding: 'utf8', flag: 'r' })); //Access to the archive composed of reviews.

        let ratingReviews = 0;
        let reviewCount = 0;
    
        for (let review of reviews) {
    
            if (review.gameName === gameName) { //The relationship between note and game is made using the name attribute.
                ratingReviews += Number(review.rating);
                reviewCount += 1;
            }
        }
    
        if (reviewCount != 0) { //Verification of occurrence of reviews about a given game.
            ratingReviews = ratingReviews / reviewCount; //Simple arithmetic mean of the reviews rating.
        }
    
        return ratingReviews;
    } catch(err){
        return err.message;
    }
}
//Function responsible for adjusting the game score according to the registered reviews and the data provided by the API.
function ratingCalculator(infoGame) {
    try {
        for (let result = 0; result < infoGame.length; result++) {

            let ratingReviews = reviewRatingCalculator(infoGame[result].name);

            if ((ratingReviews != 0) && (typeof (ratingReviews) === 'number')) { //Verification of occurrence of reviews for a given game and the type of value returned.
                infoGame[result].total_rating = (infoGame[result].total_rating + ratingReviews) / 2; //Simple arithmetic mean of the reviews rating and API rating.
            }
        }

        return infoGame; //Returns the list of games with updated ratings.
    } catch (err) {
        return err.message;
    }

}

module.exports = { ratingCalculator };