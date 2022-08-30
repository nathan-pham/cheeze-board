import { createContext, useReducer, ReactNode } from "react";
import jwtDecode from "jwt-decode";

const initialState: Partial<{ [key in keyof AuthContextProps]: any }> = {};
const initialToken = localStorage.getItem("token");
if (initialToken) {
    const decodedToken = jwtDecode(initialToken) as { exp: number };

    // token has expired, remove it
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    }

    // otherwise save the user
    else {
        initialState.user = decodedToken;
    }
}

/* AuthContext types  */
export interface AuthContextProps {
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
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user: Record<string, string>) => {
        localStorage.setItem("token", user.token);
        dispatch({
            type: "LOGIN",
            payload: user,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({
            type: "LOGOUT",
        });
    };

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
