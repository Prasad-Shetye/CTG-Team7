import "./loginpage.css";
import Login from "../../../auth/Login";

function LoginPage({ handleLogIn }) {
    return (
        <div className="loginpage">
            <div className="loginpage-content">
                <div className="loginpage-right">
                    <h1 className="loginpage-title">Welcome to Our Community</h1>
                    <Login
                        handleLogIn={handleLogIn}
                        className="form-container"
                    />
                    <div className="login-back">
                        Need help? Contact support
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;