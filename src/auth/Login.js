import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPassword,
  signUp,
  insertProfile
} from "../providers/auth/login";
import "./auth.css";

function Login({ handleLogIn }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [displayError, setDisplayError] = useState("");

  const navigate = useNavigate();

  const handleLoginSignupToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        if (!email || !password) {
          console.warn("Please fill in all fields.");
          setDisplayError("Please fill in all fields.");
          return;
        }

        const { data, error } = await signInWithPassword(email, password);
        if (error) {
          console.log("Invalid email or password.");
          console.error("Error signing in:", error);
          setDisplayError("Invalid email or password");
        } else {
          console.log("Success! Logged In.");
          localStorage.setItem("userSessionData", JSON.stringify(data.session));
          localStorage.setItem("authToken", data.session.access_token);
          handleLogIn();
          navigate("/application");
        }
      } else {
        if (!firstname || !lastname || !email || !password || !phoneNumber) {
          console.warn("Please fill in all fields.");
          setDisplayError("Please fill in all fields.");
          return;
        }

        const { data, error } = await signUp(email, password, firstname, lastname);

        if (error) {
          console.error("Error signing up:", error);
          setDisplayError("User already exists.");
        } else {


          const capitalizeWords = (str) => {
            return str
              .toLowerCase() // Ensure the string is in lowercase
              .split(" ") // Split the string into words
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
              .join(" "); // Join the words back into a single string
          };

          const user = data.user;

          const { error: insertError } = await insertProfile(
            user.id,
            user.email,
            capitalizeWords(firstname.concat(" ").concat(lastname)),
            phoneNumber,
            "Community Member"
          );

          if (insertError) {
            console.error("Error adding profile:", insertError);
            setDisplayError("Error creating user profile.");
          } else {
            setIsLogin(true);
            setDisplayError("User registered successfully. Please login.");
          }


        }
      }
    } catch (error) {
      console.error("Error:", error);
      setDisplayError("An error occurred. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`login_signup`}>
      <div className="form_box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ color: "pink" }}>{displayError}</div>
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  value={firstname}
                  id="FirstName"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <label htmlFor="FirstName">First Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={lastname}
                  id="LastName"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
                <label htmlFor="LastName">Last Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={phoneNumber}
                  id="PhoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)} // Handle phone number input
                  required
                />
                <label htmlFor="PhoneNumber">Phone Number</label>
              </div>
            </>
          )}
          <div className="form-group">
            <input
              type="email"
              value={email}
              id="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="Password">Password</label>
            <div
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "black",
              }}
            />
          </div>
          <button type="submit">
            {isLogin ? "SIGN-IN" : "REGISTER"}
          </button>
        </form>
        <div onClick={() => { window.location.href = "/"; }} className="loginpage-right-back">
          Back
        </div>
        <p className="loginText">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={handleLoginSignupToggle}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
