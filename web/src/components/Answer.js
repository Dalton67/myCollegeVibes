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
        console.log("clicked")
    }
    // handleClick(){
    //     this.setState({
    //         clicked: true
    //     })
    //     $.ajax({
    //         type:"GET",
    //         data:'genre',
    //         url: `https://mycollegevibes-backend.herokuapp.com/${this.props.choice}`,
    //         success: function(data){
    //             console.log(data);
    //         }
    //     })
    // }

    render() {
        const { choice, playlistUri, answerClass } = this.props
        let playlistLink = "https://open.spotify.com/embed/playlist/" + playlistUri
        console.log( (playlistLink) )
        // let playlistLink = "https://open.spotify.com/search/" + playlistUri

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