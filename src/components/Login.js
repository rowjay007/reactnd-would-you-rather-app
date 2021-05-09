import React, { Component } from "react";

// React Redux Connect function
import { connect } from "react-redux";

// React Router Redirect Component
import { Redirect } from "react-router-dom";

// loginUser Function
import { loginUser } from "../actions/loginUser";

class Login extends Component {
  state = {
    username: "",
    loginFail: false,
  };

  // Used for the Controlled Component
  handleChange = (e) => {
    const username = e.target.value;

    this.setState(() => ({
      username,
    }));
  };

  showHelp = (e) => {
    e.preventDefault();

    const { usernames } = this.props;

    // Display the proper usernames to be used on login
    window.alert(
      "Login Help:\nUse one of the following usernames to login...\n\n" +
        usernames.join(", ")
    );
  };

  handleLogin = (e) => {
    e.preventDefault();

    const { username } = this.state;
    const { dispatch, usernames } = this.props;

    // Check if the given Username matches an existing User
    if (usernames.indexOf(username) > -1) {
      // Dispatch the LOGIN_USER action
      dispatch(loginUser(username));

      // Reset the component State
      this.setState({
        username: "",
        loginFail: false,
      });
    } else {
      // Set the component State for a failed login
      this.setState({
        username: "",
        loginFail: true,
      });
    }
  };

  render() {
    const { username } = this.state;

    if (this.props.loginUser) {
      return <Redirect to={this.props.location.state.returnPath} />;
    }

    return (
      <div className="login">
        <h2 className="center">Would You Rather...?</h2>
        <form className="login-form" onSubmit={this.handleLogin}>
          <input
            id="username-input"
            className="input"
            type="text"
            placeholder="Who are you?"
            value={username}
            onChange={this.handleChange}
          />
          {this.state.loginFail && (
            <p className="login-error">Invalid Username. Try again.</p>
          )}
          <div className="btn-login-group">
            <button className="btn" type="submit">
              Login
            </button>
            <button className="btn" type="button" onClick={this.showHelp}>
              Help
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Map the usernames to the Component props
function mapStateToProps({ users, loginUser }) {
  return {
    usernames: Object.keys(users),
    loginUser,
  };
}

export default connect(mapStateToProps)(Login);
