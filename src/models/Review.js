class Review {

    constructor(id, gameName, email, name, rating, description) {
        this.id = id;
        this.gameName = gameName;
        this.email = email;
        this.name = name;
        this.rating = rating;
        this.description = description;
    }
}

module.exports = Review;