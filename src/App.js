import React, { Component } from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Homepage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import Services from "./pages/Services";
import GenerateForm from "./Components/GenerateForm";
import IssueCertificate from "./pages/IssueCertificate";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={SignIn} />
          <Route path="/generate-certificate" component={GenerateForm} />
          <Route path="/display/certificate/:id" component={Dashboard} />
          <Route path="/services" component={Services} />
          <Route path="/issue-certificate" component={IssueCertificate} />
        </Switch>
      </div>
    );
  }
}

export default App;
