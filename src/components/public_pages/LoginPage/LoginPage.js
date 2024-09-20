import "./loginpage.css";
import Login from "../../../auth/Login";

function LoginPage({ handleLogIn }) {


    return <>
        <div className="loginpage">
            <div className="loginpage-content">
                <div className="loginpage-right">
                    <Login
                        handleLogIn={handleLogIn}
                        className="form-container"
                    />
                </div>
            </div>
        </div>
    </>
}

export default LoginPage;