class Review {

    constructor(id, idGame, email, name, score, description) { //Como vincular o idGame ao model game?
        this.id = id;
        this.idGame = idGame;
        this.email = email;
        this.name = name;
        this.score = score;
        this.description = description;
    }
}

module.exports = Review;