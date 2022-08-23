const { model, Schema } = require("mongoose");

const postSchema = new Schema({
    body: String,
    createdAt: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            body: String,
            createdAt: Date,
            author: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = model("Post", postSchema);
