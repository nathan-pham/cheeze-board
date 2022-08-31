const { AuthenticationError, UserInputError } = require("apollo-server");
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

    createComment: async (_, { postId, body }, context) => {
        const user = checkAuth(context);

        if (!body.trim().length) {
            throw new UserInputError("Body must not be empty", {
                errors: {
                    body: "Body must not be empty",
                },
            });
        }

        const post = await Post.findById(postId);

        if (post) {
            post.comments.unshift({
                body,
                createdAt: new Date().toISOString(),
                author: user.id,
            });

            await post.save();
            return post.populate("author comments.author likes.author");
        } else {
            throw new UserInputError("Post not found");
        }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
        const user = checkAuth(context);

        const post = await Post.findById(postId);

        if (post) {
            const comment = (
                await post.populate({
                    path: "comments",
                    match: { _id: commentId },
                    populate: {
                        path: "author",
                        select: "username",
                    },
                })
            ).comments.id(commentId);

            if (comment.author.username === user.username) {
                comment.remove();
                await post.save();
                return post;
            } else {
                throw new AuthenticationError("Action not allowed");
            }
        } else {
            throw new UserInputError("Post not found");
        }
    },

    likePost: async (_, { postId }, context) => {
        const user = checkAuth(context);
        const post = await Post.findById(postId).populate("likes");
        if (post) {
            // already liked, so remove user id
            if (post.likes.find((like) => like.username === user.username)) {
                post.likes = post.likes.filter(
                    (like) => like.username !== user.username
                );
            } else {
                post.likes.push(user.id);
            }

            await post.save();
            return post.populate("likes");
        } else {
            throw new UserInputError("Post not found");
        }
    },
};
