import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logo from '../images/white-spotify-logo.png';
import Music1 from '../images/music-1.png';
import Music2 from '../images/music-2.png';
import { Container } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <>
        <Container class="page" fluid>
            <img src={Logo} class="logo" alt="logo"/>
            <div class="home">
              <p>myCollegeVibe</p>
              <img src={Music2} className="music2" alt=""/>
              <Link to="/quiz" className="btn btn-to-quiz">what's my vibe?</Link>
              <img src={Music1} className="music1" alt=""/>
              <p>you listen to music and we tell you what university is your best fit based on your preferences</p>
            </div>
        </Container>
      </>
    );
  }
}

export default Home;