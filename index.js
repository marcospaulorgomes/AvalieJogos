const express = require('express');
const app = express();

const fs = require('fs');
/*
const ratingCalculador = require('./src/functions/ratingCalculator');
*/

const apiConsumers = require('./src/functions/apisConsumer');
const Review = require('./src/models/Review');

app.use(express.urlencoded({ extended: true })); //Necessário para extrair os dados de Forms vindos de uma requisição POST


app.get('/search/:gamename', async (req, res) => {
    const gameName = req.params.gamename;
    let game = '';

    if ((!gameName) || (gameName.length == '')) {
        game = 'Insira um titulo!';
    } else {
        game = JSON.stringify(await apiConsumers.igdbConsumerSearch(gameName));
    }
    res.send(game);
});


app.post('/review/:gameid', (req, res) => {
    const { email, name, rating, description } = req.body;
    const gameID = req.params.gameid;
    const reviews = JSON.parse(fs.readFileSync('./src/database/review.json', { encoding: 'utf8', flag: 'r' }));

    for (let savedReviews of reviews) {
        if (savedReviews.email === email) {
            return res.status(409).send(`Uma avaliação já foi escrita com o email ${email}.`);
        }
    }
    const review = new Review(reviews.length + 1, gameID, email, name, rating, description);
    reviews.push(review);
    fs.writeFileSync('./src/database/review.json', JSON.stringify(reviews, null, 2));
    res.send('Avaliação registrada com sucesso!');
});


app.get('/', async (req, res) => {
    const highlights = JSON.stringify(await apiConsumers.igdbConsumerHighlights());
    res.send(highlights);
});

app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre
    const games = JSON.stringify(await apiConsumers.igdbConsumerGenre(genre));
    res.send(games);
});


app.get('*', (req, res) => {
    res.send('Error Page');
});

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});