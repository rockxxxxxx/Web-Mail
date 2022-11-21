import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./navigation.css";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducer/authReducer";

export default function Navigation() {
  //checking user is already logged in
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const dispatch = useDispatch();
  const unread = useSelector((data) => data.mail.unreadCount);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid ">
          <NavLink className="navbar-brand" to="/">
            Web Mail
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ">
              {!isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                {!isLoggedIn && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to={"/login"}
                  >
                    Login
                  </NavLink>
                )}
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to="/inbox"
                  >
                    Inbox ({unread})
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item" onClick={() => dispatch(logout())}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to="/composeMail"
                  >
                    Compose
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item" onClick={() => dispatch(logout())}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navLinkActive"
                        : "nav-link active"
                    }
                    to="/sent"
                  >
                    Sent
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active navLinkActive"
                      : "nav-link active"
                  }
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="hrNav" />
      <Outlet />
      <div className="fixed-bottom">Made with love❤️ in India</div>
    </div>
  );
}
