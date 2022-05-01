import Certification from '../abis/Certification.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
// import Main from './Main'
import Web3 from 'web3';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
// import Dashboard from './Dashboard';
import GenerateForm from './GenerateForm';
import logo from "../logo.svg";


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component 
{

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Certification.networks[networkId]
    if(networkData) {
      const certification = new web3.eth.Contract(Certification.abi, networkData.address)
      this.setState({ certification })
      const certID = await certification.methods._certID().call()
      this.setState({ certID })
      
    } else {
      window.alert('Certification contract not deployed to detected network.')
    }
  }
  
  

  

  constructor(props) 
  {
    super(props)
    this.state = {
      account: '',
      certification: null,
      loading: true
    }

    
  }

  render() 
  {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <Navbar account={this.state.account} />
        {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        This is the homepage of Certification webpage.
        <br />
      </p>
    </header> */}
    <Switch>
          <Route exact path="/home" component={Homepage} />
         
          <Route path="/generate-certificate" component={GenerateForm} />
         
        </Switch>
        
      </div>
    );
  }
}

export default App;