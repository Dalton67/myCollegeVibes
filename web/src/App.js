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

  
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>
            <Route path="/quiz">
              {
              <Quiz/>
              }
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}