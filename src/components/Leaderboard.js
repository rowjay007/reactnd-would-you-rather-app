import React, { Component } from "react";

// React Redux Connect function
import { connect } from "react-redux";

// React Router Redirect Component
import { Redirect } from "react-router-dom";

class Leaderboard extends Component {
  render() {
    if (!this.props.loginUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              returnPath: "/leaderboard",
            },
          }}
        />
      );
    }

    return (
      <div className="leaderboard">
        <h3 className="center">Leaderboard</h3>
        {this.props.users.map((user, index) => (
          <div key={user.id} className="leaderboard-row">
            <div className="leaderboard-details">
              <div className="user-details">
                <img
                  src={user.avatarURL}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <h3>
                  {index + 1}. {user.name}
                </h3>
              </div>
              <div className="user-stat">
                <p>
                  <b>Questions Asked:</b> {user.questions.length}
                </p>
              </div>
              <div className="user-stat">
                <p>
                  <b>Questions Answered:</b> {Object.keys(user.answers).length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users, loginUser }) {
  return {
    users: Object.keys(users)
      .sort(
        (a, b) =>
          users[b].questions.length +
          Object.keys(users[b].answers).length -
          (users[a].questions.length + Object.keys(users[a].answers).length)
      )
      .map((user) => users[user]),
    loginUser,
  };
}

export default connect(mapStateToProps)(Leaderboard);
