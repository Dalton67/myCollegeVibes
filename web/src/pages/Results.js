import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

class Results extends Component {

  componentWillMount() {
    if (this.props.location && 
        this.props.location.state &&
        this.props.location.state.data) {
      this.setState({
        data: this.props.location.state.data
      })
    }
  }

  render() {
    if (!this.props.location.state) return <Redirect to="/" />
    else {
      return (
          <div>
            <h2> Results </h2>
          </div>
      );
    }
  }
}

export default withRouter(Results);