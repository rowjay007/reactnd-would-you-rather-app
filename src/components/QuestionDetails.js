import React, { Component } from "react";

// React Redux Connect function
import { connect } from "react-redux";

// React Router Redirect Component
import { Redirect } from "react-router-dom";

// handleAddNewQuestion Function
import { handleSaveAnswer } from "../actions/shared";

class QuestionDetails extends Component {
  handleVote = (e, qid, answer) => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(handleSaveAnswer(qid, answer));
  };

  render() {
    const {
      id,
      authorImg,
      question,
      optionOneSelected,
      optionOneVotePercentage,
      optionTwoSelected,
      optionTwoVotePercentage,
      loginUser,
    } = this.props;

    if (!loginUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              returnPath: "/questions/" + id,
            },
          }}
        />
      );
    }

    if (!question) {
      return (
        <div className="question-not-found-error">
          <h1 className="center">404 Error</h1>
          <p className="center">
            Oops... It appears the question you are trying to reach doesn't
            exist
          </p>
          <p className="center">
            Use the links above to view the question list or add the question to
            the list
          </p>
        </div>
      );
    }

    return (
      <div className="question-details">
        <h2 className="center">Would You Rather...?</h2>
        <div className="author-details">
          <img src={authorImg} alt="Author Avatar" className="user-avatar" />
          <h3>{question.author}</h3>
        </div>
        {optionOneSelected !== true && optionTwoSelected !== true && (
          <div className="options-details">
            <div className="option">
              <p className="center">{question.optionOne.text}</p>
              <button
                className="btn"
                onClick={(e) => this.handleVote(e, id, "optionOne")}
              >
                Vote
              </button>
            </div>
            <div className="option">
              <p className="center">{question.optionTwo.text}</p>
              <button
                className="btn"
                onClick={(e) => this.handleVote(e, id, "optionTwo")}
              >
                Vote
              </button>
            </div>
          </div>
        )}
        {(optionOneSelected === true || optionTwoSelected === true) && (
          <div className="options-details">
            <div className="option">
              <p className="center">{question.optionOne.text}</p>
              <p className="center">
                Vote Count: {question.optionOne.votes.length}
              </p>
              <p className="center">
                Vote Percentage: {optionOneVotePercentage}%
              </p>
              {optionOneSelected && <p className="center">Your Selection</p>}
            </div>
            <div className="option">
              <p className="center">{question.optionTwo.text}</p>
              <p className="center">
                Vote Count: {question.optionTwo.votes.length}
              </p>
              <p className="center">
                Vote Percentage: {optionTwoVotePercentage}%
              </p>
              {optionTwoSelected && <p className="center">Your Selection</p>}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, loginUser }, props) {
  const { id } = props.match.params;

  return {
    id,
    authorImg: questions[id] ? users[questions[id].author].avatarURL : null,
    question: questions[id] ? questions[id] : null,
    optionOneSelected: questions[id]
      ? questions[id].optionOne.votes.indexOf(loginUser) > -1
      : null,
    optionOneVotePercentage: questions[id]
      ? (questions[id].optionOne.votes.length /
          (questions[id].optionOne.votes.length +
            questions[id].optionTwo.votes.length)) *
        100
      : null,
    optionTwoSelected: questions[id]
      ? questions[id].optionTwo.votes.indexOf(loginUser) > -1
      : null,
    optionTwoVotePercentage: questions[id]
      ? (questions[id].optionTwo.votes.length /
          (questions[id].optionOne.votes.length +
            questions[id].optionTwo.votes.length)) *
        100
      : null,
    loginUser,
  };
}

export default connect(mapStateToProps)(QuestionDetails);
