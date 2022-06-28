import React from "react";
import logo from "../logo.svg";

function Homepage(props) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Block Chain Home Page
        <br />
      </p>
      <p className="text-style">
        <b>
          -A Decentralised Application for Certificate Issuing and Verification-
        </b>
      </p>
    </header>
  );
}

export default Homepage;
