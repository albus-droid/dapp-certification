import React from "react";
import logo from "../logo.svg";

function Homepage(props) {
  
  
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="text-style">
        Dapp-Certification
        <br />
      </p>
      <p className="text-style"><b>-A Blockchain based certificate Issuing and Validating system-</b></p>
    </header>
  );
}

export default Homepage;
