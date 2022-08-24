const Post = require("./model");

module.exports = {
    getPosts: async () => {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
    },
    getPost: async (_, { id }) => {
        const post = await Post.findById(id).populate(
            "author comments.author likes"
        );

        if (post) {
            return post;
        }

        throw new Error("Post not found");
    },
};
