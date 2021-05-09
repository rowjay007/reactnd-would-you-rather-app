import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserCard from "./UserCard";

export class Home extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired,
  };
  render() {
    const { userQuestionData } = this.props;

    return <div panes={panes({ userQuestionData })}  />;
  }
}

const panes = (props) => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: "Unanswered",
      render: () => (
        <div>
          {userQuestionData.answered.map((question) => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </div>
      ),
    },
    {
      menuItem: "Answered",
      render: () => (
        <div>
          {userQuestionData.unanswered.map((question) => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </div>
      ),
    },
  ];
};

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered,
    },
  };
}

export default connect(mapStateToProps)(Home);
