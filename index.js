const express = require('express');
const app = express();

const fs = require('fs');

const ratingFunction = require('./src/functions/ratingCalculator');

const apiConsumers = require('./src/functions/apisConsumer');
const Review = require('./src/models/Review');

app.use(express.urlencoded({ extended: true }));

app.get('/search/:gamename', async (req, res) => {
    const gameName = req.params.gamename;
    let infoGames = '';

    if ((gameName === '') || (gameName.length === 0)) {
        infoGames = 'Insira um titulo!';
    } else {
        infoGames = await apiConsumers.igdbConsumerSearch(gameName);
        infoGames = JSON.stringify(ratingFunction.ratingCalculator(infoGames));
    }
    res.send(infoGames);
});


app.post('/review/:gamename', (req, res) => {
    const { email, name, rating, description } = req.body;
    const gameName = req.params.gamename;
    const reviews = JSON.parse(fs.readFileSync('./src/database/review.json', { encoding: 'utf8', flag: 'r' }));

    for (let savedReviews of reviews) {
        if (savedReviews.email === email) {
            return res.status(409).send(`Uma avaliação já foi escrita com o email ${email}.`);
        }
    }
    const review = new Review(reviews.length + 1, gameName, email, name, rating, description);
    reviews.push(review);
    fs.writeFileSync('./src/database/review.json', JSON.stringify(reviews, null, 2));
    res.send('Avaliação registrada com sucesso!');
});


app.get('/', async (req, res) => {
    const highlights = JSON.stringify(await apiConsumers.igdbConsumerHighlights());
    res.send(highlights);
});

app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    const games = JSON.stringify(await apiConsumers.igdbConsumerGenre(genre));
    res.send(games);
});


app.get('*', (req, res) => {
    res.send('Error Page');
});

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});