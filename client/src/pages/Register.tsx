import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import loadFormData from "../utils/loadFormData";
import useAuth from "../hooks/useAuth";

const Register = () => {
    const { errors, loading, onSubmit } = useAuth(
        REGISTER_USER_MUTATION,
        (result: Record<string, any>) => {
            console.log(result);
        }
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
                <ul>
                    {Object.entries(errors).map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
                </ul>
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
