import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const QuestionBox = (props) => {
  const viewPoll = (id) => {
    props.history.push(`questions/${id}`);
  };

  if (props === null) {
    return <p>This question does not exist.</p>;
  }

  const { name, avatar, text, id } = props;

  return (
    <div >
      <div >
        <h6 >{name} asks:</h6>
      </div>
      <div >
        <div >
          <div >
            <img src={avatar} alt={name} />
          </div>
          <div >
            <h4>Would you rather...</h4>
            <p>
              ...
              {text}
              ...
            </p>
            <button
              onClick={(e) => viewPoll(id)}
            >
              View poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];

  return {
    name: users[question.author].name,
    text: question.optionOne.text,
    avatar: users[question.author].avatarURL,
    id: question.id,
  };
}
export default withRouter(connect(mapStateToProps)(QuestionBox));
