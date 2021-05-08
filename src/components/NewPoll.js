import React from "react";
import { connect } from "react-redux";

const NewPoll = ({ name, avatar, answers, questions }) => {
  if (this.props === null) {
    return <p>This question does not exist.</p>;
  } else {
    return (
      <div>
        <div>
          <div>
            <div>
              <img src={avatar} alt="" />
            </div>
            <div>
              <h2>{name}</h2>
              <p>
                Answered questions <span>{answers}</span>
              </p>
              <hr />
              <p>
                Created questions <span>{questions}</span>
              </p>
            </div>
            <div>
              <h3>Score</h3>
              <span>{answers + questions}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
function mapStateToProps({ users }, { id }) {
  const user = users[id];

  return {
    name: user.name,
    avatar: user.avatarURL,
    answers: Object.keys(user.answers).length,
    questions: user.questions.length,
  };
}

export default connect(mapStateToProps)(NewPoll);
