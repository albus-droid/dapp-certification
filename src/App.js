import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Homepage from "./Components/Homepage";
import Services from "./pages/Services";
import IssueCertificate from "./pages/IssueCertificate";
import Verify from "./pages/Verify";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/services" component={Services} />
          <Route path="/issue-certificate" component={IssueCertificate} />
          <Route path="/verify-certificate" component={Verify} />
        </Switch>
      </div>
    );
  }
}

export default App;
