import { gql } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import Errors from "../../components/Errors";

const Register = () => {
    const { errors, loading, onSubmit } = useAuth(
        REGISTER_USER_MUTATION,
        "createUser"
    );

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <br />
                <input
                    placeholder="nathanpham.me@gmail.com"
                    type="email"
                    name="email"
                    autoComplete="off"
                    required
                />
                <br />
                <br />
                <label htmlFor="username">Username</label>
                <br />
                <input
                    placeholder="phamn23"
                    type="text"
                    name="username"
                    autoComplete="off"
                    required
                />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    placeholder="Super secret"
                    type="password"
                    name="password"
                    autoComplete="off"
                    required
                />
                <br />
                <br />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <input
                    placeholder="Super secret (again)"
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                    required
                />
                <br />
                <br />
                <button disabled={loading}>Register</button>
                <Errors errors={errors} />
            </form>
        </>
    );
};

export default Register;

const REGISTER_USER_MUTATION = gql`
    mutation CreateUser(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        createUser(
            username: $username
            password: $password
            confirmPassword: $confirmPassword
            email: $email
        ) {
            username
            token
        }
    }
`;
