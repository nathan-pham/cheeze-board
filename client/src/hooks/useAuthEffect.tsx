import { useContext, useEffect, Context } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

// make routes inaccessible if you are logged in
const useAuthEffect = (
    effect: (context: AuthContextProps, navigate: NavigateFunction) => void
) => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        effect(context, navigate);
    }, []);
};

export default useAuthEffect;

export const useNoAuth = () => {
    useAuthEffect((context, navigate) => {
        if (context.user) {
            navigate("/");
        }
    });
};
