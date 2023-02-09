var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    review: String,
    writer: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, username: String
    }
});

module.exports = mongoose.model("Book", bookSchema);