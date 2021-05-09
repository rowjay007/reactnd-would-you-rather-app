import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { logoutUser } from "../actions/loginUser";

class Nav extends Component {
  // Dispatch the logoutUser Action
  logoutUser = () => {
    const { dispatch } = this.props;

    dispatch(logoutUser());
    
  };

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Questions
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" exact activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li className="user-details">
            <img
              src={this.props.avatarURL}
              className="nav-user-avatar"
              alt=""
            />
            <span onClick={this.logoutUser}>
              <IoIosLogOut size={30} />
            </span>
          </li>
        </ul>
        <hr />
      </nav>
    );
  }
}

function mapStateToProps({ users, loginUser }) {
  return {
    avatarURL: users[loginUser].avatarURL,
  };
}

export default connect(mapStateToProps)(Nav);
