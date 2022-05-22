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
import Verify from "./pages/Verify";
import Certification from "./abis/Certification.json";
import Web3 from "web3";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Certification.networks[networkId];
    if (networkData) {
      console.log(Certification.abi);
      console.log(networkData.address);

      // this.setState({ decentragram })
      // const imagesCount = await decentragram.methods.imageCount().call()
      // this.setState({ imagesCount })
      // // Load images
      // for (var i = 1; i <= imagesCount; i++) {
      //   const image = await decentragram.methods.images(i).call()
      //   this.setState({
      //     images: [...this.state.images, image]
      //   })
      // }
      // // Sort images. Show highest tipped images first
      // this.setState({
      //   images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      // })
      // this.setState({ loading: false})
    } else {
      window.alert("Certification contract not deployed to detected network.");
    }
  }

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
          <Route path="/verify-certificate" component={Verify} />
        </Switch>
      </div>
    );
  }
}

export default App;
