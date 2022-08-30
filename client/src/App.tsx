import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Regsiter from "./pages/auth/Register";

import Navigation from "./components/Navigation";
import { AuthProvider } from "./components/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth">
                        <Route path="login" element={<Login />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="register" element={<Regsiter />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
