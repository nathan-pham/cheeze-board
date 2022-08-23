const isValid = (errors) => Object.keys(errors).length < 1;

const createUser = (username, password, confirmPassword, email) => {
    const errors = {};

    if (password !== confirmPassword) {
        errors.confirmPassword = "Password and confirm password do not match";
    }

    if (username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters";
    }

    if (password.trim().length < 3) {
        errors.password = "Password must be at least 3 characters";
    }

    if (email.trim().length < 3) {
        errors.email = "Email must be at least 3 characters";
    }

    return {
        errors,
        valid: isValid(errors),
    };
};

const loginUser = (username, password) => {
    const errors = {};

    if (username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters";
    }

    if (password.trim().length < 3) {
        errors.password = "Password must be at least 3 characters";
    }

    return {
        errors,
        valid: isValid(errors),
    };
};

module.exports = {
    createUser,
    loginUser,
};
