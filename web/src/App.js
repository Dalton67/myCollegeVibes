import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Results from './pages/Results.js';
import Quiz from './pages/Quiz.js';
import Home from './pages/Home.js';
import $ from 'jquery'
export default function App() {
  function getQuestions()
  {
      var qbank;
      $.ajax({
        type:"GET",
        data:'genre',
        dataType: "json",
        async: false,
        url: `https://mycollegevibes-backend.herokuapp.com/`,
        success: function(data){
            qbank = Object.values(data)
        }
    })
    return qbank;
  }

  function getSpotifyID()
  {
    var spotifyIDNumber;
      $.ajax({
        type:"GET",
        dataType: "text",
        async: false,
        url: `http://localhost:5000/playlist/hardcoded`,
        success: function(data){
          //spotifyIDNumber = Object.values(data)
          spotifyIDNumber = data
        }
    })
    console.log(spotifyIDNumber)
    return spotifyIDNumber;

  }

  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>
            <Route path="/quiz">
              {
              /* <Quiz questions = {getQuestions()}/> */
              <Quiz spotifyIDNumber = {getSpotifyID()}/>
              }
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}