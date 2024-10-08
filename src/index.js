import React, {StrictMode} from 'react'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import {createRoot} from "react-dom/client";
import NavigationBar from "./components/Navbar";
import HomePage from "./components/Home";
import SignUpPage from "./components/SignUp";
import LoginPage from "./components/Login";
import CreateRecipePage from "./components/CreateRecipe";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

const App = () => {

    return (
        <Router>
            <div className="">
                <NavigationBar/>
                <Routes>
                    <Route path="/create_recipe" element={<CreateRecipePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    )
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);