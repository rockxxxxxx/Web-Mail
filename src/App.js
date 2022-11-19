import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./router/Navigation";
import Signup from "./component/signup/Signup";
import Login from "./component/login/Login";
import Contact from "./component/contact/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element=<Navigation />>
        <Route path="/" />
        <Route path="/signup" element=<Signup /> />
        <Route path="/login" element=<Login /> />
        <Route path="/contact" element=<Contact /> />
      </Route>
    </Routes>
  );
}

export default App;
