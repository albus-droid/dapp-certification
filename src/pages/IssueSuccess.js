import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/success.gif";
import Certification from "../abis/Certification.json";
import Web3 from "web3";

const styles = (theme) => ({
  hidden: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      borderRadius: "5%",
      marginRight: 30,
    },
    [theme.breakpoints.up(1150)]: {
      marginLeft: 50,
      width: 500,
    },
    height: "25vh",
    backgroundColor: "#5a9327",
    color: "white",
    marginTop: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    height: 50,
    width: 50,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  media: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  imgstyles: {
    maxWidth: "80vw",
    maxHeight: "100vh",
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
});

class IssueSuccess extends Component {
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
      const certification = new web3.eth.Contract(
        Certification.abi,
        networkData.address
      );
      this.setState({ certification });
      console.log(certification.abi);
      console.log(networkData.address);
      let certID = await certification.methods._certID().call();
      this.setState({ certID });
      console.log({ certID });

      const certDetails = await certification.methods
        .certDetails(certID)
        .call();
      this.setState({ certDetails });
      console.log({ certDetails });

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

  constructor(props) {
    super(props);
    this.state = {
      certID: "",
    };
  }
  render() {
    const { classes } = this.props;
    let certID = this.state.certID;
    return (
      <div>
        <Grid  className="container3" container style={{ height: "100%" }}>
          {/* <Grid className={classes.hidden} item sm={false} md={8}>
            <img className={classes.imgstyles} src={ChainImage} alt="chain" />
          </Grid> */}
          <Grid className="grid1"  item sm={12} md={4}>
            <Paper className={classes.paper}>
              <h2  className="certigrid2">Certificate Issue Successfull</h2>
              <h4 className="certigrid2">
                <bd>Your certificate ID is <u>{certID}</u></bd>
                <i>
                  <u></u>
                </i><br></br>
                Save this ID for future verification
              </h4>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

IssueSuccess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssueSuccess);
