import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logo from '../images/white-spotify-logo.png';
import Music1 from '../images/music-1.png';
import Music2 from '../images/music-2.png';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from "react-router";
import $ from "jquery"

class Home extends Component {
  constructor(props) {
    super(props);

    this.setState({ 
        clicked: false 
    })
}
  render() {
    return (
      <>
        <Container className="page home" fluid>
            <Row className="justify-right" noGutters>
              <Col xs="2" lg="6"/>
              <Col>
                <img src={Logo} class="logo" alt="logo"/>
              </Col>
            </Row>
            <Row className="title-text justify-center" noGutters>
              <Col>
                <p>myCollegeVibes</p>
              </Col>
            </Row>
            <Row className="justify-center" noGutters>
              <Col xs="4" lg="3" className="justify-right">
                <img src={Music2} alt=""/>
              </Col>
              <Col xs="4" lg="6">
                <Link to="/quiz" className="btn btn-to-quiz">what's my vibe?</Link>
              </Col>
              <Col xs="4" lg="3" className="justify-left">
                <img src={Music1} alt=""/>
              </Col>
            </Row>
            <Row className="justify-center description-text" noGutters>
              <Col xs="1" lg="2"/>
              <Col xs="10" lg="8">
                <p>you listen to music and we tell you what university is your best fit based on your preferences</p>
              </Col>
              <Col xs="1" lg="2"/>
            </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Home);