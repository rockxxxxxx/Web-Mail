import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navigation from "./router/Navigation";
import Signup from "./component/signup/Signup";
import Login from "./component/login/Login";
import Contact from "./component/contact/Contact";
import Home from "./component/home/Home";

import { useSelector } from "react-redux";
import Compose from "./component/compose/Compose";
import Inbox from "./component/inbox/Inbox";
import Sent from "./component/sent/Sent";

function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element=<Navigation />>
        <Route
          path="/"
          element={!isLoggedIn ? <Navigate replace to="/login" /> : <Inbox />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate replace to="/inbox" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/inbox" /> : <Login />}
        />
        <Route path="/contact" element=<Contact /> />
        <Route
          path="/home"
          element={!isLoggedIn ? <Navigate replace to="/login" /> : <Home />}
        />
        <Route
          path="/composeMail"
          element={!isLoggedIn ? <Navigate replace to="/login" /> : <Compose />}
        />
        <Route
          path="/inbox"
          element={!isLoggedIn ? <Navigate replace to="/login" /> : <Inbox />}
        />

        <Route
          path="/sentMail"
          element={!isLoggedIn ? <Navigate replace to="/login" /> : <Sent />}
        />
      </Route>
    </Routes>
  );
}

export default App;
