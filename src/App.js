import React, { useEffect, useState } from "react";
import Application from "./components/private_pages/Application/Application";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./components/public_pages/HomePage/HomePage"
import LoginPage from "./components/public_pages/LoginPage/LoginPage";
import ProtectedWarning from "./components/public_pages/ProtectedWarning/ProjectedWarning";

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  function handleLogIn() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("userSessionData");
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    window.location.href = "/";
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage handleLogIn={handleLogIn} />}></Route>
          <Route
            path="/application"
            element={
              <ProtectedRoute
                element={<Application handleLogOut={handleLogOut} />}
              />
            }
          />
          <Route path="/protected" element={<ProtectedWarning />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
