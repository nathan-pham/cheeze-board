import { createContext, useReducer, ReactNode } from "react";

/* AuthContext types  */
interface AuthContextProps {
    user?: any;
    login: Function;
    logout: Function;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {},
});

/* AuthProvider types  */
interface AuthProviderProps {
    children: ReactNode;
}

interface Action {
    type: "LOGIN" | "LOGOUT";
    payload?: Record<string, any>;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    const login = (user: Record<string, string>) =>
        dispatch({
            type: "LOGIN",
            payload: user,
        });

    const logout = () =>
        dispatch({
            type: "LOGOUT",
        });

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/* manage user states  */
const authReducer = (state: any, action: Action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

export { AuthContext, AuthProvider };
