import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";
import PropTypes from "prop-types";

class Question extends Component {
  state = {
    option: "",
    submit: true,
  };

  handleSelection = (option) => {
    this.setState(() => ({
      option,
      submit: false,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submit: true });
    const { option } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAnswerQuestion(this.props.match.params.question_id, option));
    this.props.history.push(
      `/questions/${this.props.match.params.question_id}`
    );
  };

  getPercent = (numberVotes, totalVotes) => {
    let percent = 0;
    if (numberVotes > 0) {
      percent = Math.round((numberVotes / totalVotes) * 100);
    }
    return percent;
  };

  render() {
    const { authUser, questions, users } = this.props;
    const question = questions[this.props.match.params.question_id];
    if (!question) {
      return <Redirect to="/404" />;
    }
    const totalVoteNum =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    const questionOneVotePercent = this.getPercent(
      question.optionOne.votes.length,
      totalVoteNum
    );
    const questionTwoVotePercent = this.getPercent(
      question.optionTwo.votes.length,
      totalVoteNum
    );

    if (
      question.optionOne.votes.indexOf(authUser) !== -1 ||
      question.optionTwo.votes.indexOf(authUser) !== -1
    ) {
      return (
        <div >
          <div >
            <div >
              <div >
                <h6 >
                  {users[question.author].name} asks:
                </h6>
              </div>
              <div >
                <div >
                  <div >
                    <img
                      src={users[question.author].avatarURL}
                      alt=""
                    />
                  </div>
                  <div >
                    <h1>Results</h1>

                    <div >
                      <h3>{question.optionOne.text}</h3>
                      {question.optionOne.votes.indexOf(authUser) !== -1 ? (
                        <span >Your choice</span>
                      ) : (
                        false
                      )}
                      <div >
                        <div
                          
                          style={{ width: `${questionOneVotePercent}%` }}
                        />
                      </div>
                      <span >{questionOneVotePercent} %</span>
                      <span >
                        {question.optionOne.votes.length} out of {totalVoteNum}{" "}
                        {totalVoteNum > 1 ? "votes" : "vote"}
                      </span>
                    </div>

                    <div >
                      <h3>{question.optionTwo.text}</h3>
                      {question.optionTwo.votes.indexOf(authUser) !== -1 ? (
                        <span >Your choice</span>
                      ) : (
                        false
                      )}
                      <div >
                        <div
                          style={{ width: `${questionTwoVotePercent}%` }}
                        />
                      </div>
                      <span >{questionTwoVotePercent} %</span>
                      <span >
                        {question.optionTwo.votes.length} out of {totalVoteNum}{" "}
                        {totalVoteNum > 1 ? "votes" : "vote"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div >
        <div >
          <div >
            <div >
              <h6 >
                {users[question.author].name} asks:
              </h6>
            </div>
            <div >
              <div >
                <div >
                  <img
                    src={users[question.author].avatarURL}
                    alt=""
                    
                  />
                </div>
                <div >
                  <h1>Would You Rather ...</h1>
                  <form onSubmit={this.handleSubmit}>
                    <p>
                      <label>
                        <input
                          name="options"
                          type="radio"
                          onChange={() => this.handleSelection("optionOne")}
                          checked={this.state.option === "optionOne"}
                        />
                        <span>{question.optionOne.text}</span>
                      </label>
                    </p>

                    <p>
                      <label>
                        <input
                          name="options"
                          type="radio"
                          onChange={() => this.handleSelection("optionTwo")}
                          checked={this.state.option === "optionTwo"}
                        />
                        <span>{question.optionTwo.text}</span>
                      </label>
                    </p>

                    <button
                      
                      disabled={this.state.submit}
                    >
                      SUBMIT YOUR ANSWER{" "}
                      <i >arrow_right</i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  authUser: PropTypes.string.isRequired,
};

function mapStateToProps({ questions, users, authUser }) {
  return {
    authUser,
    questions,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
