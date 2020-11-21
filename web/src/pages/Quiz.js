import React, { Component } from "react";
import Question from '../components/Question.js';
import Logo from '../images/white-spotify-logo.png';
import { Navbar, Image, Container, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import $, { param } from 'jquery'

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this)
    this.getSpotifyID = this.getSpotifyID.bind(this)
    this.resultsPage = this.resultsPage.bind(this)
    this.getAllPlayListIds = this.getAllPlayListIds.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
  }

  componentWillMount() {
    var playListIds = this.getAllPlayListIds()
    var questions = this.getQuestions()
    console.log(questions)
    this.setState({
      questionList: [
        [ // Question 1
          {
            genre: "rio grande do sul indie",
            playlistUri: playListIds["rio grande do sul indie"]
          },
          {
            genre: questions["2"],
            playlistUri: playListIds[questions["2"]]
          }
        ],
        [ // Question 2
          {
            genre: "j-rock",
            playlistUri: playListIds["j-rock"]
          },
          {
            genre: questions["4"],
            playlistUri: playListIds[questions["4"]]
          }
        ],
        [ // Question 3
          {
            genre: questions["5"],
            playlistUri: playListIds[questions["5"]]
          },
          {
            genre: questions["6"],
            playlistUri: playListIds[questions["6"]]
          }
        ],
        [ // Question 4
          {
            genre: questions["7"],
            playlistUri: playListIds[questions["7"]]
          },
          {
            genre: questions["8"],
            playlistUri: playListIds[questions["8"]]
          }
        ],
        [ // Question 5
          {
            genre: questions["9"],
            playlistUri: playListIds[questions["9"]]
          },
          {
            genre: questions["10"],
            playlistUri: playListIds[questions["10"]]
          }
        ],
        [ // Question 6
          {
            genre: questions["11"],
            playlistUri: playListIds[questions["11"]]
          },
          {
            genre: questions["12"],
            playlistUri: playListIds[questions["12"]]
          }
        ],
        [ // Question 7
          {
            genre: questions["13"],
            playlistUri: playListIds[questions["13"]]
          },
          {
            genre: questions["14"],
            playlistUri: playListIds[questions["14"]]
          }
        ],
        [ // Question 8
          {
            genre: questions["15"],
            playlistUri: playListIds[questions["15"]]
          },
          {
            genre: questions["16"],
            playlistUri: playListIds[questions["16"]]
          }
        ],
        [ // Question 9
          {
            genre: questions["17"],
            playlistUri: playListIds[questions["17"]]
          },
          {
            genre: questions["18"],
            playlistUri: playListIds[questions["18"]]
          }
        ],
        [ // Question 10
          {
            genre: questions["19"],
            playlistUri: playListIds[questions["19"]]
          },
          {
            genre: questions["20"],
            playlistUri: playListIds[questions["20"]]
          }
        ],
        [ // Question 11
          {
            genre: questions["21"],
            playlistUri: playListIds[questions["21"]]
          },
          {
            genre: questions["22"],
            playlistUri: playListIds[questions["22"]]
          }
        ],
        [ // Question 12
          {
            genre: questions["23"],
            playlistUri: playListIds[questions["23"]]
          },
          {
            genre: questions["24"],
            playlistUri: playListIds[questions["24"]]
          }
        ],
        [ // Question 13
          {
            genre: questions["25"],
            playlistUri: playListIds[questions["25"]]
          },
          {
            genre: questions["26"],
            playlistUri: playListIds[questions["26"]]
          }
        ],
        [ // Question 14
          {
            genre: questions["27"],
            playlistUri: playListIds[questions["27"]]
          },
          {
            genre: questions["28"],
            playlistUri: playListIds[questions["28"]]
          }
        ],
        [ // Question 15
          {
            genre: questions["29"],
            playlistUri: playListIds[questions["29"]]
          },
          {
            genre: questions["30"],
            playlistUri: playListIds[questions["30"]]
          }
        ],
        [ // Question 16
          {
            genre: questions["31"],
            playlistUri: playListIds[questions["31"]]
          },
          {
            genre: questions["32"],
            playlistUri: playListIds[questions["32"]]
          }
        ],
        [ // Question 17
          {
            genre: questions["33"],
            playlistUri: playListIds[questions["33"]]
          },
          {
            genre: questions["34"],
            playlistUri: playListIds[questions["34"]]
          }
        ],
        [ // Question 18
          {
            genre: questions["35"],
            playlistUri: playListIds[questions["35"]]
          },
          {
            genre: questions["36"],
            playlistUri: playListIds[questions["36"]]
          }
        ],
        [ // Question 19
          {
            genre: questions["37"],
            playlistUri: playListIds[questions["37"]]
          },
          {
            genre: questions["38"],
            playlistUri: playListIds[questions["38"]]
          }
        ],
        [ // Question 20
          {
            genre: questions["39"],
            playlistUri: playListIds[questions["39"]]
          },
          {
            genre: questions["40"],
            playlistUri: playListIds[questions["40"]]
          }
        ],        
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
    return spotifyIDNumber;

  }

  getAllPlayListIds()
  {
    var spotifyPlayListIds;
      $.ajax({
        type:"GET",
        async: false,
        url: 'https://mycollegevibes-backend.herokuapp.com/playListIds',
        success: function(data){
          spotifyPlayListIds = data
        }
    })
    return spotifyPlayListIds
  }
  
  getQuestions()
  {
      var answerChoices;
      $.ajax({
        type:"GET",
        async: false,
        url: 'https://mycollegevibes-backend.herokuapp.com/',
        success: function(data){
          answerChoices = data
        }
    })
    return answerChoices
  }

  resultsPage(object)
  {
      var results;
      var answers = []
      for(var i = 0; i < object.length;i++)
      {
         if (object[i]['answer'].split(' ').length == 1)
         {
            answers.push(object[i]['answer'])
         }
         else
         {
            var elements = object[i]['answer'].split(' ')
            var format = ""
            for(var j = 0; j < elements.length;j++)
            {
              if(j < elements.length -1)
              {
                format = format + elements[j] + "%20"
              }
              else
              {
                format = format + elements[j]
              }
            }
            answers.push(format)
         }
      }
      var parameters = 'g1='+ answers[0] + '&g2=' + answers[1] + '&g3=' + answers[2] + '&g4=' + answers[3]+ '&g5=' + answers[4]+ '&g6=' + answers[5]+ '&g7=' + answers[6]+ '&g8=' + answers[7]+ '&g9=' + answers[8]+ '&g10=' + answers[9]+ '&g11=' + answers[10]+ '&g12=' + answers[11]+ '&g13=' + answers[12]+ '&g14=' + answers[13]+ '&g15=' + answers[14]+ '&g16=' + answers[15]+ '&g17=' + answers[16]+ '&g18=' + answers[17]+ '&g19=' + answers[18]+ '&g20=' + answers[19] 
      $.ajax({
        type:"GET",
        async: false,
        url: 'https://mycollegevibes-backend.herokuapp.com/results?' + parameters,
        success: function(data){
          results = JSON.parse(data.replace(/'/g, '"'))
        }
    })
    return results 
  }


  render() {
    const { questionList, questionNumber, questionAnswers } = this.state
    if (questionNumber > questionList.length) {
      var result = this.resultsPage(this.state.questionAnswers)
      return <Redirect 
        to = {{
          pathname: "/results",
          state: {data: questionAnswers, results: {...result}}
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