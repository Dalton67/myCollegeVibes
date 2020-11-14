import React, { Component } from "react";
import $ from "jquery"
import Results from "../pages/Results";
 
class Answer extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const{ onClick, choice } = this.props
        onClick(choice)
    }

    render() {
        const { choice, playlistUri, answerClass } = this.props
        let playlistLink = "https://open.spotify.com/embed/playlist/" + playlistUri

        return (
            <div class={answerClass}>
                <a 
                    href="javascript:void(0)" 
                    onClick={this.handleClick} 
                    className="answer-header"> 
                        {choice} 
                </a>
                <iframe
                    src={playlistLink} 
                    width="80%" 
                    height="380" 
                    frameborder="0"
                    allowtransparency="true" 
                    allow="encrypted-media" 
                    className="playlist"/>
            </div>
        );
    }
}

export default Answer;