import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navigation = () => {
    const location = useLocation();
    const context = useContext(AuthContext);

    const routes = context.user
        ? {
              "/": "Home",
              "/auth/logout": "Logout",
          }
        : {
              "/": "Home",
              "/auth/login": "Login",
              "/auth/register": "Register",
          };

    return (
        <header>
            <nav>
                <h1>🧀 Cheese Board</h1>
                <p>
                    A horrendously cheesy social media made with next-gen
                    technologies
                </p>
                {Object.entries(routes)
                    .map<React.ReactNode>(([path, name]) => {
                        const link = (
                            <Link to={path} key={path}>
                                {name}
                            </Link>
                        );

                        // if path is current path, bold
                        if (path === location.pathname) {
                            return <strong key={path}>{link}</strong>;
                        }

                        return link;
                    })
                    .reduce((acc, curr) => [acc, " | ", curr])}
            </nav>
        </header>
    );
};

export default Navigation;
