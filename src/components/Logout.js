import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";

class Logout extends Component {
  componentWillMount() {
    this.props.dispatch(setAuthUser(null));
  }

  render() {
    return <Redirect to="/login" />;
  }
}

function mapStateToProps({ authUser }) {
  return {
    logedin: authUser,
  };
}

export default connect(mapStateToProps)(Logout);
