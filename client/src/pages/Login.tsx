import { FormEvent } from "react";

const Login = () => {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
    };

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

                <button>Login</button>
            </form>
        </>
    );
};

export default Login;
