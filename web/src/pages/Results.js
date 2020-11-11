import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

class Results extends Component {
  render() {
    if (!this.props.location.state) return <Redirect to="/" />
    return (
        <div>
          <h2> Results </h2>
        </div>
    );
  }
}

export default withRouter(Results);