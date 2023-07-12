const express = require('express');
const app = express();
const fs = require('fs');

const ratingFunction = require('./src/functions/ratingCalculator');
const apiConsumers = require('./src/functions/apisConsumer');
const Review = require('./src/models/Review');

app.use(express.urlencoded({ extended: true }));

//Route responsible for searching for games with the name indicated in the URL.
app.get('/search/:gamename', async (req, res) => {
    const gameName = req.params.gamename;
    infoGames = await apiConsumers.igdbConsumerSearch(gameName);
    infoGames = JSON.stringify(ratingFunction.ratingCalculator(infoGames));
    res.send(infoGames);
});

//Route responsible for adding reviews to a given game.
app.post('/review/:gamename', (req, res) => {
    const { email, name, rating, description } = req.body;
    const gameName = req.params.gamename;

    try {
        const reviews = JSON.parse(fs.readFileSync('./src/database/review.json', { encoding: 'utf8', flag: 'r' })); //Access to the file composed of reviews.

        for (let savedReviews of reviews) {
            if (savedReviews.email === email) {
                return res.status(409).send(`Uma avaliação já foi escrita com o email ${email}.`); //Checking if the email has already been used in other game review.
            }
        }
        const review = new Review(reviews.length + 1, gameName, email, name, rating, description); //Building a new review-type object.
        reviews.push(review); //Adding new review to the list of reviews.
        fs.writeFileSync('./src/database/review.json', JSON.stringify(reviews, null, 2)); //Saving changes to file composed of reviews.
        res.send('Avaliação registrada com sucesso!');
    } catch (err) {
        res.send(err.message);
    }
});

//Initial route that will provide a list of featured games.
app.get('/', async (req, res) => {
    const highlights = JSON.stringify(await apiConsumers.igdbConsumerHighlights());
    res.send(highlights);
});

//Route responsible for listing games that belong to the given genre.
app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    const games = JSON.stringify(await apiConsumers.igdbConsumerGenre(genre));
    res.send(games);
});

//Route used when the called URL is not listed.
app.get('*', (req, res) => {
    res.send('Página não encontrada!');
});

 //Port used to make requests on local server.
app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});