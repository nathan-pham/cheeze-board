import { FormEvent } from "react";
import { gql, useMutation } from "@apollo/client";

const Register = () => {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // jsonify form data
        const formData = new FormData(e.target as HTMLFormElement);
        const variables: Record<string, string> = {};
        for (const [key, value] of formData) {
            variables[key.toString()] = value.toString();
        }

        addUser({ variables });
    };

    const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
        update(proxy, result) {
            console.log(result);
        },
    });

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
                <button>Register</button>
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
            id
            email
            username
            createdAt
            token
        }
    }
`;

// mutation register(
//     $username: String!
//     $password: String!
//     $confirmPassword: String!
//     $email: String!
// ) {
//     register($username, $password, $confirmPassword, $email) {
//         author
//     }
// }
