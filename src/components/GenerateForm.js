import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "./SubmitAnimation";
import Certification from '../abis/Certification.json';
import Web3 from 'web3';

// import { generateCertificate } from "../Utils/apiConnect";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${theme
      .spacing.unit * 3}px`
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw"
    }
  },
  submitBtn: {
    marginLeft: "50px"
  }
});

class GenerateForm extends React.Component {
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
      submitData = event => {
        event.preventDefault();
        if (this.state.currentState === "validate") {
          return;
        }
        this.setState({ currentState: "load" });
        const {
          studentName,
          studentID,
          orgName,
          courseName,
          expireOn
          } =certification.methods.uploadCert().send()
       
        
      };
      
      
    } else {
      window.alert('Certification contract not deployed to detected network.')
    }
  }
  
  
  state = {
    studentName: "",
    studentID: "",
    orgName: "",
    courseName: "",
    expireOn: null,
   
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  

  render() {
    const { classes } = this.props;
    const {
      studentName,
      studentID,
      orgName,
      courseName,
      expireOn
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3" color="inherit">
              Certificate Generation Form
            </Typography>
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={this.submitData}
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  
                  id="student-name"
                  label="Student Name"
                  placeholder="Name of the student"
                  className={(classes.courseField, classes.textField)}
                  defaultValue={studentName}
                  onChange={this.handleChange("student-name")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  
                  id="student-id"
                  label="Student ID"
                  placeholder="ID of the student"
                  className={(classes.courseField, classes.textField)}
                  defaultValue={studentID}
                  onChange={this.handleChange("student-id")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="org-name"
                  label="Organization Name"
                  placeholder="Degree, skill or award.."
                  className={(classes.courseField, classes.textField)}
                  defaultValue={orgName}
                  onChange={this.handleChange("course-name")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  
                  id="course-name"
                  label="Course Name"
                  helperText="Any course name or skill for which the certificate is being given."
                  placeholder="Degree, skill or award.."
                  className={(classes.courseField, classes.textField)}
                  defaultValue={courseName}
                  onChange={this.handleChange("course-name")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  
                  id="expire-date"
                  label="Expire Date"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange("expire-date")}
                  className={classes.textField}
                  defaultValue={expireOn}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                
              </Grid>
              <Grid item xs={12} sm={12}>
                <SubmitAnimation
                  
                  className={classes.submitBtn}
                />
                
                  <Typography
                    variant="caption"
                    color="inherit"
                    className={classes.submitBtn}
                  >
                    
                  </Typography>
                
              </Grid>
              
            </form>
          </Paper>
        </Grid>
        
      </Grid>
    );
  }
}

GenerateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenerateForm);
