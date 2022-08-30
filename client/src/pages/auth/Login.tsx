import { gql } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import Errors from "../../components/Errors";
import { useNoAuth } from "../../hooks/useAuthEffect";

const Login = () => {
    useNoAuth();

    const { errors, loading, onSubmit } = useAuth(
        LOGIN_USER_MUTATION,
        "loginUser"
    );

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <br />
                <input
                    placeholder="phamn23"
                    type="text"
                    name="username"
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
                    required
                />

                <br />
                <br />

                <button disabled={loading}>Login</button>
                <Errors errors={errors} />
            </form>
        </>
    );
};

export default Login;

const LOGIN_USER_MUTATION = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            username
            token
        }
    }
`;
