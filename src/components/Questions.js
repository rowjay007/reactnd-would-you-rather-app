import React, { Component } from "react";
import { connect } from "react-redux";
import PollBox from "./PollBox";
import PropTypes from "prop-types";


class Questions extends Component {
  state = {
    activeTab: "unanswered",
  };

  handleTabChange = (tab) => {
    this.setState(() => ({
      activeTab: tab,
    }));
  };

  render() {
    const { orderedQuestions } = this.props;

    return ( 
      <div>
        <div>
          <div>
            <ul>
              <li>
                <a
                  href="#!"
                  onClick={() => this.handleTabChange("unanswered")}
                  className={`${
                    this.state.activeTab === "unanswered" ? "active" : ""
                  }`}
                >
                  Unanswered Questions
                </a>
              </li>
              <li className="tab col s6">
                <a
                  onClick={() => this.handleTabChange("answered")}
                  className={`tab-nav ${
                    this.state.activeTab === "answered" ? "active" : ""
                  }`}
                  href="#!"
                >
                  Answered Questions
                </a>
              </li>
            </ul>

            <div
              className={`unanswered tab ${
                this.state.activeTab === "unanswered" ? "active" : ""
              }`}
            >
              {orderedQuestions
                .filter(
                  (question) =>
                    question.optionOneAnswered !== true &&
                    question.optionTwoAnswered !== true
                )
                .map((question) => {
                  return (
                    <div  key={question.id}>
                      <PollBox id={question.id} />
                    </div>
                  );
                })}
            </div>

            <div
              className={`answered tab ${
                this.state.activeTab === "answered" ? "active" : ""
              }`}
            >
              {orderedQuestions
                .filter(
                  (question) =>
                    question.optionOneAnswered === true ||
                    question.optionTwoAnswered === true
                )
                .map((question) => {
                  return (
                    <div  key={question.id}>
                      <PollBox id={question.id} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  orderedQuestions: PropTypes.array.isRequired,
};

function mapStateToProps({ questions, authUser }) {
  return {
    orderedQuestions: Object.keys(questions)
      .map((question) => {
        return {
          ...questions[question],
          optionOneAnswered:
            questions[question].optionOne.votes.indexOf(authUser) === -1
              ? false
              : true,
          optionTwoAnswered:
            questions[question].optionTwo.votes.indexOf(authUser) === -1
              ? false
              : true,
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp),
  };
}

export default connect(mapStateToProps)(Questions);
