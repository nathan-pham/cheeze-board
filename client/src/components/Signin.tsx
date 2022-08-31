import { Link } from "react-router-dom";

interface SigninProps {
    to: string;
}

const Signin = ({ to }: SigninProps) => {
    return (
        <Link to="/auth/login">
            <button>Signin to {to}</button>
        </Link>
    );
};

export default Signin;
