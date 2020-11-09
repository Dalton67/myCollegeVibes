import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Results from './pages/Results.js';
import Quiz from './pages/Quiz.js';
import Home from './pages/Home.js';

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>
            <Route path="/quiz">
              <Quiz />
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