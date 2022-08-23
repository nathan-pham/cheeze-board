const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model");
const validate = require("../../utils/validate");

const generateToken = (res) => {
    return jwt.sign(
        {
            id: res._id,
            username: res.username,
            email: res.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

module.exports = {
    loginUser: async (_, { username, password }) => {
        const { valid, errors } = validate.loginUser(username, password);
        if (!valid) {
            throw new UserInputError("Invalid input", { errors });
        }

        const user = await User.findOne({ username });
        if (!user) {
            errors.general = "User not found";
            throw new UserInputError(errors.general, { errors });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            errors.general = "Wrong credentials";
            throw new UserInputError(errors.general, { errors });
        }

        const token = generateToken(user);
        return {
            ...user._doc,
            id: user._id,
            token,
        };
    },

    // parent, args, ctx, info
    createUser: async (_, { username, password, confirmPassword, email }) => {
        // TODO: validate args
        const { valid, errors } = validate.createUser(
            username,
            password,
            confirmPassword,
            email
        );

        if (!valid) {
            throw new UserInputError("Invalid input", { errors });
        }

        // TODO: check if user exists
        const user = await User.findOne({ username });
        if (user) {
            throw new UserInputError(`Username ${username} is already taken`, {
                errors: {
                    username: "This username is already taken",
                },
            });
        }

        // hash password & create new user
        const newUser = new User({
            username,
            password: await bcrypt.hash(password, 12),
            email,
            createdAt: new Date().toISOString(),
        });

        const res = await newUser.save();

        // create jwt token
        const token = generateToken(res);

        return {
            ...res._doc,
            id: res._id,
            token,
        };
    },
};
