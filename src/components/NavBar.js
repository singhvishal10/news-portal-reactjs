import React, { useRef }  from "react";
import { Link } from "react-router-dom";
import logo from './newsylandLogo.gif';
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {

  const navigate = useNavigate();
  const textInput = useRef(null);
  
  const searchNews = (event) => {
    event.preventDefault();
    let searchQueryValue = (textInput.current.value === "" || textInput.current.value === " " || textInput.current.value === null || textInput.current.value === undefined) ?  "*" : textInput.current.value;
    props.setSearchQuery(searchQueryValue);
    navigate("/search");
    toggleCollapseButton();
  };

  const onSearchBarChange = () => {
    if(textInput.current.value === "")
    props.setSearchQuery("*");
  };

  const toggleCollapseButton = () => {
      var menuToggle = document.getElementById('navbarSupportedContent');
      menuToggle.className = "collapse navbar-collapse";
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{ backgroundColor : '#4A06A2' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="45" height="30" className="me-2 align-text-center"/>
            News Nest
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                size="50"
                placeholder="Search for news with keyword"
                aria-label="Search"
                ref={textInput}
                onChange={onSearchBarChange}
              />
              <button className="btn btn-outline-primary" type="submit" onClick={searchNews}>
                Find
              </button>
            </form>
            <ul className="navbar-nav ms-auto w-100 justify-content-end">
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/economics">
                  Economics
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/politics">
                  Politics
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/travel">
                  Travel
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/music">
                  Music
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/food">
                  Food
                </Link>
              </li>
              <li className="nav-item" onClick={toggleCollapseButton}>
                <Link className="nav-link" to="/gaming">
                  Gaming
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
