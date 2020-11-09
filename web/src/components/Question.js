import React, { Component } from "react";
import Answer from './Answer.js';
import { Container, Row, Col } from 'react-bootstrap';

 
class Question extends Component {
    render() {
        return (
            <Container fluid>
                <Row noGutters>
                    <Col xs="12" md="6" lg="6">
                        <Answer 
                            choice="sovietwave" 
                            playlistId="4WQXurIqquq1yIaIbxWsSa" 
                            answerClass="answer1"/>
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Answer 
                            choice="acid rock" 
                            playlistId="3H6YJ47QOQiC74hZNVUU2f"
                            answerClass="answer2"/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Question;