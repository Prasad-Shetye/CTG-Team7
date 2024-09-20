import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/LoginForm/SignUpForm';
import { BrowserRouter, Routes, Route, Linky} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/signup" element = {<SignUpForm />}> </Route>
      <Route path = "/login" element = {<LoginForm />}> </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
