import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NewPoll from "./NewPoll";

const Leaderboard = ({ users }) => (
  <div>
    <div>
      {Object.keys(users)
        .map((user) => {
          return {
            ...users[user],
            score:
              Object.keys(users[user].answers).length +
              users[user].questions.length,
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((user) => (
          <div key={user.id}>
            <NewPoll id={user.id} />
          </div>
        ))}
    </div>
  </div>
);

Leaderboard.propTypes = {
  users: PropTypes.object.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
