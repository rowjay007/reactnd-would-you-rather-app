import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { withRouter } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    questionOne: "",
    questionTwo: "",
  };

  handleQuestionOne = (e) => {
    const questionOne = e.target.value;
    this.setState(() => ({
      questionOne,
    }));
  };

  handleQuestionTwo = (e) => {
    const questionTwo = e.target.value;
    this.setState(() => ({
      questionTwo,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { questionOne, questionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(questionOne, questionTwo));

    this.setState(() => ({
      questionOne: "",
      questionTwo: "",
    }));

    this.props.history.push("/");
  };

  render() {
    return (
      <div >
        <div >
          <h1 >Create New Question</h1>
        </div>

        <div >
          <div >
            <div >
              <div >
                <div >
                  <h6>Complete the question:</h6>
                </div>
                <div >
                  <h1>Would you rather...</h1>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      placeholder="Enter option one "
                      value={this.state.questionOne}
                      onChange={this.handleQuestionOne}
                    />
                    <center>or</center>
                    <input
                      type="text"
                      placeholder="Enter option two "
                      value={this.state.questionTwo}
                      onChange={this.handleQuestionTwo}
                    />
                    <button
                      disabled={
                        this.state.questionOne === "" ||
                        this.state.questionTwo === ""
                      }
                    >
                      SUBMIT QUESTIONS
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

export default withRouter(connect()(NewQuestion));
