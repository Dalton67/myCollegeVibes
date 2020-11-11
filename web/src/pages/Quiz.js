import React, { Component } from "react";
import Question from '../components/Question.js';
import Logo from '../images/white-spotify-logo.png';
import { Navbar, Image, Container, Col } from "react-bootstrap";
 
class Quiz extends Component {

  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentWillMount() {
    this.setState({
      questionList: [
        [ // Question 1
          {
            genre: "sovietwave",
            playlistUri: "4WQXurIqquq1yIaIbxWsSa"
          },
          {
            genre: "acid rock",
            playlistUri: "3H6YJ47QOQiC74hZNVUU2f"
          }
        ],
        [ // Question 2
          {
            genre: "experimental hip hop",
            playlistUri: "3bjbpsbl2mzaqFJcyQNGjE"
          },
          {
            genre: "digital hardcore",
            playlistUri: "2fqbzU1sBBZ3gW61Q7qYhp"
          }
        ]
      ],
      questionNumber: 1,
      questionAnswers: []
    })
  }

  nextQuestion(curQuestionAnswer) {
    const { questionAnswers, questionNumber } = this.state
    this.setState({
      questionAnswers: [...questionAnswers, curQuestionAnswer],
      questionNumber: questionNumber + 1
    })
  }

  render() {
    const { questionList, questionNumber } = this.state

    let curQuestion = questionList[questionNumber-1]
    console.log(curQuestion)
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
          <Question 
            choices={curQuestion}
            onSelect={this.nextQuestion}/>
        </>
    );
  }
}

export default Quiz;