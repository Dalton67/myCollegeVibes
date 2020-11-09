import React, { Component } from "react";
 
class Answer extends Component {

    constructor(props) {
        super(props);

        this.setState({ 
            clicked: false 
        })
    }

    render() {
        const { choice, playlistId, answerClass } = this.props
        let playlistLink = "https://open.spotify.com/embed/playlist/" + playlistId;
        return (
            <div class={answerClass}>
                <a 
                    href="javascript:void(0)" 
                    onclick="this.setState({ clicked: true }" 
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
                    class="playlist"/>
            </div>
        );
    }
}

export default Answer;