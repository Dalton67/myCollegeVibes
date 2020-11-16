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
    this.resultsPage = this.resultsPage.bind(this)
  }

  componentWillMount() {
    this.setState({
      questionList: [
        [ // Question 1
          {
            genre: "latin pop",
            playlistUri: this.getSpotifyID("latin pop")
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
            genre: "nova mpb",
            playlistUri: this.getSpotifyID("nova mpb")
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
        ],
      //   [ // Question 4
      //     {
      //       genre: "nova mpb",
      //       playlistUri: this.getSpotifyID("nova mpb")
      //     },
      //     {
      //       genre: "sevillanas",
      //       playlistUri: this.getSpotifyID("sevillanas")
      //     }
      //   ],
      //   [ // Question 5
      //     {
      //       genre: "belgian indie rock",
      //       playlistUri: this.getSpotifyID("belgian indie rock")
      //     },
      //     {
      //       genre: "abstract beats",
      //       playlistUri: this.getSpotifyID("abstract beats")
      //     }
      //   ],
      //   [ // Question 6
      //     {
      //       genre: "dark post-punk",
      //       playlistUri: this.getSpotifyID("dark post-punk")
      //     },
      //     {
      //       genre: "canadian contemporary country",
      //       playlistUri: this.getSpotifyID("canadian contemporary country")
      //     }
      //   ],
      //   [ // Question 7
      //     {
      //       genre: "alternative hip hop",
      //       playlistUri: this.getSpotifyID("alternative hip hop")
      //     },
      //     {
      //       genre: "hamburg indie",
      //       playlistUri: this.getSpotifyID("hamburg indie")
      //     }
      //   ],
      //   [ // Question 8
      //     {
      //       genre: "alternative hip hop",
      //       playlistUri: this.getSpotifyID("alternative hip hop")
      //     },
      //     {
      //       genre: "new age",
      //       playlistUri: this.getSpotifyID("new age")
      //     }
      //   ],
      //   [ // Question 9
      //     {
      //       genre: "japanese city pop",
      //       playlistUri: this.getSpotifyID("japanese city pop")
      //     },
      //     {
      //       genre: "noise pop",
      //       playlistUri: this.getSpotifyID("noise pop")
      //     }
      //   ],
      //   [ // Question 10
      //     {
      //       genre: "vintage french electronic",
      //       playlistUri: this.getSpotifyID("vintage french electronic")
      //     },
      //     {
      //       genre: "bass house",
      //       playlistUri: this.getSpotifyID("	bass house")
      //     }
      //   ],
      //   [ // Question 11
      //     {
      //       genre: "novo rock gaucho",
      //       playlistUri: this.getSpotifyID("novo rock gaucho")
      //     },
      //     {
      //       genre: "noise pop",
      //       playlistUri: this.getSpotifyID("noise pop")
      //     }
      //   ],
      //   [ // Question 12
      //     {
      //       genre: "deathstep",
      //       playlistUri: this.getSpotifyID("deathstep")
      //     },
      //     {
      //       genre: "noise pop",
      //       playlistUri: this.getSpotifyID("noise pop")
      //     }
      //   ],
      //   [ // Question 13
      //     {
      //       genre: "chilean hardcore",
      //       playlistUri: this.getSpotifyID("chilean hardcore")
      //     },
      //     {
      //       genre: "japanese trap",
      //       playlistUri: this.getSpotifyID("japanese traps")
      //     }
      //   ],
      //   [ // Question 14
      //     {
      //       genre: "alternative hip hop",
      //       playlistUri: this.getSpotifyID("alternative hip hop")
      //     },
      //     {
      //       genre: "latinx alternative",
      //       playlistUri: this.getSpotifyID("latinx alternative")
      //     }
      //   ],
      //   [ // Question 15
      //     {
      //       genre: "swiss singer-songwriter",
      //       playlistUri: this.getSpotifyID("swiss singer-songwriter")
      //     },
      //     {
      //       genre: "noise pop",
      //       playlistUri: this.getSpotifyID("noise pop")
      //     }
      //   ],
      //   [ // Question 16
      //     {
      //       genre: "alternative hip hop",
      //       playlistUri: this.getSpotifyID("alternative hip hop")
      //     },
      //     {
      //       genre: "noise pop",
      //       playlistUri: this.getSpotifyID("noise pop")
      //     }
      //   ],
      //   [ // Question 17
      //     {
      //       genre: "alternative hip hop",
      //       playlistUri: this.getSpotifyID("alternative hip hop")
      //     },
      //     {
      //       genre: "pagode novo",
      //       playlistUri: this.getSpotifyID("pagode novo")
      //     }
      //   ],
      //   [ // Question 18
      //     {
      //       genre: "chamber psych",
      //       playlistUri: this.getSpotifyID("	chamber psych")
      //     },
      //     {
      //       genre: "noise pop",
      //       playlistUri: this.getSpotifyID("noise pop")
      //     }
      //   ],
      //   [ // Question 19
      //     {
      //       genre: "alternative hip hop",
      //       playlistUri: this.getSpotifyID("alternative hip hop")
      //     },
      //     {
      //       genre: "folk punk",
      //       playlistUri: this.getSpotifyID("folk punk")
      //     }
      //   ],
      //   [ // Question 20
      //     {
      //       genre: "hungarian punk",
      //       playlistUri: this.getSpotifyID("hungarian punk")
      //     },
      //     {
      //       genre: "celtic rock",
      //       playlistUri: this.getSpotifyID("celtic rock")
      //     }
      //   ]
        
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
         else if(object[i]['answer'].split(' ').length == 2)
         {
            var elements = object[i]['answer'].split(' ')
            answers.push(elements[0] + "%20" + elements[1])
         }
         else if(object[i]['answer'].split(' ').length == 3)
         {
            var elements = object[i]['answer'].split(' ')
            answers.push(elements[0] + "%20" + elements[1] + "%20" + elements[2])
         }
      }
      var parameters = 'g1='+ answers[0] + '&g2=' + answers[1] + '&g3=' + answers[2]
      var route = 'https://mycollegevibes-backend.herokuapp.com/results?'+ parameters;
      // var parameters = 'g1='+ object[0]['answer'] + '&g2=' + object[1]['answer'] + '&g3=' + object[2]['answer'] + '&g4=' + object[3]['answer'] + '&g5=' + object[4]['answer']+ '&g6=' + object[5]['answer']+ '&g7=' + object[6]['answer']+ '&g8=' + object[7]['answer']+ '&g9=' + object[8]['answer']+ '&g10=' + object[9]['answer']
      $.ajax({
        type:"GET",
        async: false,
        url: 'https://mycollegevibes-backend.herokuapp.com/results?' + parameters,
        success: function(data){
          // console.log(data)
          results = JSON.parse(data.replace(/'/g, '"')) 
        }
    })
    // console.log(results)
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