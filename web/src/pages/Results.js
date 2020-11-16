import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Logo from '../images/white-spotify-logo.png';
import { Navbar, Image, Container, Col, Row, Tabs, Tab } from "react-bootstrap";
import { withRouter } from "react-router";

class Results extends Component {

  validLoad() {
    return (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.data
    );
  }

  componentWillMount() {
    if (this.validLoad()) {
      this.setState({
        data: this.props.location.state.data
      })
    }
  }

  render() {
    if (!this.validLoad()) return <Redirect to="/" />
    else {
      var answer = this.props.location.state.results
      console.log(answer)
      return (
        <>
          <Navbar bg="#14">
            <Container fluid>
              <Col lg="1" />
              <Col xs="4" lg="7">
                <p className="quiz-title-text justify-left">myCollegeVibes</p>
              </Col>
              <Col md="auto"/>
              <Col xs="8" lg="4">
                <img src={Logo} alt="logo" className="logo justify-left"/>
              </Col>
            </Container>
          </Navbar>
          <Container fluid>
            <Row className="quiz-header">
              <Col className="justify-center quiz-question-box">
                <p className="quiz-question-number">your results</p>
              </Col>
            </Row>
          </Container>
          <Tabs defaultActiveKey="user-answers">
            <Tab eventKey="user-answers" title="Your Answers">
            <Container className="justify-center" fluid>
              <Row className="results-header">
                <Col className="results-header-box">
                  <p className="results-header-text">Choice 1</p>
                </Col>
                <Col className="results-header-box">
                  <p className="results-header-text">Choice 2</p>
                </Col>
                <Col className="results-header-box">
                  <p className="results-header-text">Your choice</p>
                </Col>
              </Row>
              {
                this.state.data.map(question => (
                  <Row className="results-data">
                    <Col className="results-data-box">
                      {/* <p className="results-data-text">{question.choices[0].genre}</p> */}
                      <p className="results-data-text">{answer[1]['university_name']}</p>
                    </Col>
                    <Col className="results-data-box">
                      <p className="results-data-text">{question.choices[1].genre}</p>
                    </Col>
                    <Col className="results-data-box">
                      <p className="results-data-text">{question.answer}</p>
                    </Col>
                  </Row>
                ))
              }
            </Container>
            </Tab>
            <Tab eventKey="universities" title="Your Universities">
            </Tab>
          </Tabs>
        </>
      );
    }
  }
}

export default withRouter(Results);