import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse "
          id="navbarTogglerDemo01"
        >
          <NavLink to="/" className="navbar-brand">
            Spaceship Travel System
          </NavLink>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/show-spaceship"
                className="nav-link nav-link-hover-color"
                activeClassName="active"
              >
                Spaceships
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/show-crew-members"
                className="nav-link nav-link-hover-color"
                activeClassName="active"
              >
                Crew Members
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/show-missions"
                className="nav-link nav-link-hover-color"
                activeClassName="active"
              >
                Missions
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
