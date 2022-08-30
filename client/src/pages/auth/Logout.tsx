import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../components/AuthContext";

const Logout = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        context.logout();
        navigate("/");
    }, []);

    return <p>Logging out...</p>;
};

export default Logout;
