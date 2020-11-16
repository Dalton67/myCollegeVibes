import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Logo from '../images/white-spotify-logo.png';
import { Navbar, Image, Container, Col, Row, Tabs, Tab } from "react-bootstrap";
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
      var answers = this.props.location.state.results
      console.log(answers)
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
                <p className="quiz-question-number">Results</p>
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
                      <p className="results-data-text">{answers[1]['university_name']}</p>
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
            <Container className="justify-center" fluid>
              <Row className="results-header">
                <Col className="results-header-box" lg="1">
                  <p className="results-header-text">Rank</p>
                </Col>
                <Col className="results-header-box">
                  <p className="results-header-text">University Name</p>
                </Col>
                <Col className="results-header-box" lg="1">
                  <p className="results-header-text">Popularity</p>
                </Col>
                <Col className="results-header-box">
                  <p className="results-header-text">Spotify Link</p>
                </Col>
              </Row>
              {
                Object.keys(answers).map(rank => (

                  <Row className="results-data">
                    <Col className="results-data-box" lg="1">
                      <p className="results-data-text">{rank}</p>
                    </Col>
                    <Col className="results-data-box">
                      <p className="results-data-text">{answers[rank]['university_name']}</p>
                    </Col>
                    <Col className="results-data-box" lg="1">
                      <p className="results-data-text">{answers[rank]['popularity']}</p>
                    </Col>
                    <Col className="results-data-box">
                     <div className="results-data-text mt-4"> <a target="_blank" href={answers[rank]['spotify_link']}>{answers[rank]['spotify_link']}</a></div>
                    </Col>
                  </Row>
                ))
              }
            </Container>
            </Tab>
          </Tabs>
        </>
      );
    }
  }
}

export default withRouter(Results);