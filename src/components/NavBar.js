import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const NavBar = ({ authUser, users }) => (
  
  <header>
    <nav>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/addquestion">NEW QUESTION</Link>
            </li>
            <li>
              <Link to="/leaderboard">LEADERBOARD</Link>
            </li>
          </ul>
          <ul className="right">
            <li>
              {authUser === null ? (
                <Link to="/login">LOGIN</Link>
              ) : (
                <span>
                  <img src={users[authUser].avatarURL} alt="" />
                  <span>{users[authUser].name}</span>
                  <Link to="/logout">LOGOUT</Link>
                </span>
              )}
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/addquestion">NEW QUESTION</Link>
            </li>
            <li>
              <Link to="/leaderboard">LEADERBOARD</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

function mapStateToProps({ authUser, users }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps)(NavBar);
