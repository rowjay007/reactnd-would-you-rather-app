import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    user: "none",
  };

  changeUser = (e) => {
    const user = e.target.value;
    this.setState(() => ({ user }));
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthUser(this.state.user));
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <div>
          <h1>Welcome to the Would You Rather App!</h1>
        </div>

        <div>
          <div>
            <div>
              <div>
                <span>Please sign in to continue</span>
                <form onSubmit={this.handleLogin}>
                  <select onChange={this.changeUser} value={this.state.user}>
                    <option value="none" disabled>
                      Choose user
                    </option>
                    {this.props.userIds.map((userId) => (
                      <option key={userId} value={userId}>
                        {this.props.users[userId].name}
                      </option>
                    ))}
                  </select>

                  <button disabled={this.state.user === "none"}>
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users),
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
