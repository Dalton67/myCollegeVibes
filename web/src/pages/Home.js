import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logo from '../images/white-spotify-logo.png';
import Music1 from '../images/music-1.png';
import Music2 from '../images/music-2.png';

class Home extends Component {
  render() {
    return (
        <div className="page">  
          <img src={Logo} className="logo"alt=""/>
          <div className="home">
            <h2>myCollegeVibe</h2>
            <img src={Music2} className="music2" alt=""/>
            <Link to="/quiz" className="btn btn-to-quiz">what's my vibe?</Link>
            <img src={Music1} className="music1" alt=""/>
            <p>you listen to music and we tell you what university is your best fit based on your preferences</p>
          </div>
        </div>
    );
  }
}

export default Home;