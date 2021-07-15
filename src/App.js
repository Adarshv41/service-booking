import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route} from "react-router-dom";

import Navbar from './components/navbar.component';
import User from './components/user.component';
import Admin from './components/admin.component';
import Signup from './components/signup.component';
function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/user" exact component={User}/>
      <Route path="/admin" exact component={Admin}/>
      <Route path="/signup" exact component={Signup}/>
    </Router>
    
  );
}

export default App;
