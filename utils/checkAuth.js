const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = ({ req }) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split("Bearer ").pop().toString().trim();

        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            } catch (e) {
                throw new AuthenticationError(
                    "Your session expired. Sign in again."
                );
            }
        }

        throw new Error("Authentication token must be Bearer");
    }

    throw new Error("Authentication token must be provided");
};
