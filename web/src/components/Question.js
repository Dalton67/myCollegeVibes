import React, { Component } from "react";
import Answer from './Answer.js';
import { Container, Row, Col } from 'react-bootstrap';

 
class Question extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(answer) {
        const { choices, onSelect } = this.props
        const choicesPlusAnswer = {choices, answer}
        onSelect(choicesPlusAnswer)
    }

    render() {
        const { choices } = this.props
        return (
            <Container fluid>
                <Row noGutters>
                    <Col xs="12" md="6" lg="6">
                        <Answer 
                            choice={choices[0].genre}
                            playlistUri={choices[0].playlistUri}
                            answerClass="answer1"
                            onClick={this.handleClick}/>
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Answer 
                            choice={choices[1].genre}
                            playlistUri={choices[1].playlistUri}
                            answerClass="answer2"
                            onClick={this.handleClick}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Question;