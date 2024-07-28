import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { noteContext } from "../../Context/NoteContext";

function Navbar() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(authContext);
  let { getAddModel } = useContext(noteContext);
  console.log(token);
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand  text-main" to="/">
            <i className="fa-solid fa-clipboard text-main"> </i> My Notes
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2  mb-lg-0 d-flex  justify-contect-center align-items-center ">
              <li className="nav-item text-main">
                <span>
                  <i className="fa-solid text-main fa-magnifying-glass"></i>{" "}
                  Search
                </span>
              </li>
              <li className="nav-item mx-2">
                <button
                  className=" btn bg-main text-white"
                  onClick={() => getAddModel(token)}
                >
                  <i className="fa-solid fa-plus "></i> NewNote
                </button>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={logOut}
                >
                  LogOut{" "}
                  <i className="fa-solid fa-right-from-bracket text-danger"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
