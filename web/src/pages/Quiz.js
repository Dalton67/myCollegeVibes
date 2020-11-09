import React, { Component } from "react";
import Question from '../components/Question.js';
import Logo from '../images/white-spotify-logo.png';
import { Navbar, Image, Container, Col } from "react-bootstrap";
 
class Quiz extends Component {
  render() {
    return (
        <>
          <Navbar bg="#14">
            <Container fluid>
              <Col xs="4" lg="8">
                <h2><span class="navbar-text"><div class="green-text">myCollegeVibes</div></span></h2>
              </Col>
              <Col md="auto"/>
              <Col xs="8" lg="4">
                <img src={Logo} alt="logo" class="logo"i/>
              </Col>
            </Container>
          </Navbar>
          <Question />
        </>
    );
  }
}

export default Quiz;