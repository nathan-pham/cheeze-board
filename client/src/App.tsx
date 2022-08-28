import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Regsiter from "./pages/Register";

import Navigation from "./components/Navigation";

const App = () => {
    return (
        <BrowserRouter>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Regsiter />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
