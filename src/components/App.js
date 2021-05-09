import React, { Component, Fragment } from "react";

// React Redux Connect function
import { connect } from "react-redux";

// React Router Components
import { BrowserRouter as Router, Route } from "react-router-dom";

// React Redux Loading Component
import LoadingBar from "react-redux-loading";

// Handle Initial Data Action Creator
import { handleInitialData } from "../actions/shared";

// Components
import Nav from "./Nav";
import Login from "./Login";
import QuestionList from "./QuestionList";
import QuestionDetails from "./QuestionDetails";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          {!this.props.showLogin && <Nav />}
          <LoadingBar
            style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "1px" }}
          />
          <div className="container">
            <div>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={QuestionList} />
              <Route path="/questions/:id" component={QuestionDetails} />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route path="/add" exact component={NewQuestion} />
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ loginUser }) {
  return {
    showLogin: loginUser === null,
  };
}

export default connect(mapStateToProps)(App);
