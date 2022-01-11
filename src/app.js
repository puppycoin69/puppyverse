import React from 'react';
import './styles/globals.scss';
// import './styles/.scss';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import Welcome from './screens/welcome';
import ScrollToTop from './lib/scrolltotop';

const FallBack = (props) => {
  return (
    <div id="fallbackcontainer">
      <div id="fallbacktext">URL Not Found</div>
      <NavLink id="fallbackbutton" to="/">Go Back Home</NavLink>
    </div>
  );
};

const App = (props) => {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route component={FallBack} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
