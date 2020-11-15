import React, { Component } from "react";
import Question from '../components/Question.js';
import Logo from '../images/white-spotify-logo.png';
import { Navbar, Image, Container, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import $ from 'jquery'

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this)
    this.getSpotifyID = this.getSpotifyID.bind(this)
  }

  componentWillMount() {
    this.setState({
      questionList: [
        [ // Question 1
          {
            genre: "sovietwave",
            playlistUri: this.getSpotifyID("sovietwave")
          },
          {
            genre: "acid rock",
            playlistUri: this.getSpotifyID("acid rock")
          }
        ],
        [ // Question 2
          {
            genre: "experimental hip hop",
            playlistUri: this.getSpotifyID("experimental hip hop")
          },
          {
            genre: "digital hardcore",
            playlistUri: this.getSpotifyID("digital hardcore")
          }
        ],
        [ // Question 3
          {
            genre: "alternative hip hop",
            playlistUri: this.getSpotifyID("alternative hip hop")
          },
          {
            genre: "noise pop",
            playlistUri: this.getSpotifyID("noise pop")
          }
        ]
      ],
      questionNumber: 1,
      questionAnswers: []
    })
  }

  nextQuestion(curQuestionAnswer) {
    const { questionAnswers, questionNumber, questionList } = this.state
    this.setState({
      questionAnswers: [...questionAnswers, curQuestionAnswer],
      questionNumber: questionNumber + 1,
    })
  }

  getSpotifyID(musicgenre)
  {
    var spotifyIDNumber;
      $.ajax({
        type:"GET",
        dataType: "text",
        async: false,
        url: `https://mycollegevibes-backend.herokuapp.com/playlist/` + musicgenre,
        success: function(data){
          spotifyIDNumber = data
        }
    })
    // console.log(spotifyIDNumber)
    return spotifyIDNumber;

  }


  render() {
    const { questionList, questionNumber, questionAnswers } = this.state
    if (questionNumber > questionList.length) {
      return <Redirect 
        to = {{
          pathname: "/results",
          state: {data: questionAnswers}
        }}
      />
    } else {
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
              <Row className="quiz-header" noGutters>
                <Col xs="1" lg="1" />
                <Col xs="2" lg="2" className="quiz-question-box justify-center">
                  <p className="quiz-question-number">#{questionNumber}</p>
                </Col>
                <Col xs="1" lg="1" />
                <Col xs="8" lg="auto" className="justify-left">
                  <p className="quiz-question-text">which genre do you prefer</p>
                </Col>
              </Row>
            </Container>
            <Question 
              choices={questionList[questionNumber-1]}
              onSelect={this.nextQuestion}
            />
          </>
      );
    }
  }
}

export default withRouter(Quiz);