import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const routes = {
    "/": "Home",
    "/login": "Login",
    "/register": "Register",
};

const Navigation = () => {
    const location = useLocation();

    return (
        <header>
            <nav>
                <p>🧀 Cheese Board</p>
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
