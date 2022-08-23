const { AuthenticationError } = require("apollo-server");
const checkAuth = require("../../utils/checkAuth");
const Post = require("./model");
const User = require("../user").UserModel;

module.exports = {
    createPost: async (_, { body }, context) => {
        const user = checkAuth(context);

        const newPost = new Post({
            body,
            createdAt: new Date().toISOString(),
            author: user.id,
        });

        const post = await newPost.save();

        return post.populate("author");
    },

    deletePost: async (_, { id }, context) => {
        const user = checkAuth(context);

        const post = await Post.findById(id).populate("author");

        if (!post) {
            throw new Error("Post not found");
        }

        if (post.author.username === user.username) {
            await post.delete();
            return "Post deleted successfully";
        }

        throw new AuthenticationError("Action not allowed");
    },

    createComment(parent, { postId, body }, context) {},
    deleteComment(parent, { postId, commentId }, context) {},
    likePost(parent, { postId }, context) {},
};
