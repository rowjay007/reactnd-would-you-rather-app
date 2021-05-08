import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";

import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Questions from "./components/Questions";
import Question from "./components/Question";
import Leaderboard from "./components/Leaderboard";
import NoMatch from "./components/NoMatch";
import Logout from "./components/Logout";
import NewQuestion from "./components/NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <>
          <NavBar />

          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Questions} />
            <PrivateRoute
              exact
              path="/questions/:question_id"
              component={Question}
            />
            <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
            <PrivateRoute exact path="/newquestion" component={NewQuestion} />
            <Route exact path="/logout" component={Logout} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    );
  }
}

const PrivateRoute = connect(
  mapStateToProps
)(({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser !== null ? (
        <Component {...props} />
      ) : (
        <Redirect push to="/login" />
      )
    }
  />
));

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps)(App);
