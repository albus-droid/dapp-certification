import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "../Components/SubmitAnimation";
import { generateCertificate } from "../Utils/apiConnect";
import orgLogo from "../Images/header.png";
import IssueSuccess from "./IssueSuccess";
import App from "../App";
import { loadBlockchainData } from "../App";
import Certification from "../abis/Certification.json";
import Web3 from "web3";
import * as allExports from "../App";
import html2canvas from "html2canvas";
import ReactPDF from "@react-pdf/renderer";
import jsPDF from "jspdf";
import Error from "./Error";
import { FormatItalic } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import Loading from "./loading";



const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 550 },
    [theme.breakpoints.down("sm")]: { width: 200 },
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`,
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${
      theme.spacing.unit * 3
    }px`,
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2,
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw",
    },
  },
  submitBtn: {
    marginLeft: "50px",
  },
});

class IssueCertificate extends React.Component {
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

  state = {
    componentLoad: "new",
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitData = (event) => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const { student_id, student_name, organization, year, coursename } =
      this.state;
    console.log("student id : " + student_id);
    console.log("student name : " + student_name);
    console.log("organization : " + organization);
    console.log("year : " + year);
    console.log("coursename: " + coursename);
    console.log(allExports);
    this.setState({ currentState: "normal" });
    this.setState({ componentLoad: "success" }); //State change for load success page
    this.setState({ loading: true });
    this.state.certification.methods
      .uploadCert(
        student_id,
        student_name,
        organization,
        coursename,
        year,
        "www"
      )
      .send({ from: this.state.account })
      .on("confirmation", (reciept) => {
        this.setState({ loading: false });
      });

    // generateCertificate(
    //   candidateName,
    //   coursename,
    //   organization,
    //   assignDate,
    //   emailId
    // )
    //   .then((data) => {
    //     if (data.data !== undefined)
    //       this.setState({
    //         currentState: "validate",
    //         certificateId: data.data.certificateId,
    //       });
    //   })
    //   .catch((err) => console.log(err));

    //#END
  };

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [10, 6],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, 10, 6);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    const { classes } = this.props;
    const {
      student_id,
      student_name,
      organization,
      coursename,
      year,
      currentState,
    } = this.state;
    return (
      <Grid className="container2" container>
        {this.state.componentLoad === "new" ? (
          <>
            <Grid  item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h3" color="inherit">
                 <b>  <br>
                 </br>Certificate Issue Form</b> 
                </Typography>
                <form
                  className={classes.container}
                  autoComplete="off"
                  onSubmit={this.submitData}
                >
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      label="Student ID"
                      className={classes.textField}
                      value={student_id}
                      onChange={this.handleChange("student_id")}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      required
                      label="Student Name"
                      className={classes.textField}
                      value={student_name}
                      onChange={this.handleChange("student_name")}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      label="Organization Name"
                      className={classes.textField}
                      defaultValue={organization}
                      onChange={this.handleChange("organization")}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      required
                      label="Course Name"
                      className={(classes.courseField, classes.textField)}
                      defaultValue={coursename}
                      onChange={this.handleChange("coursename")}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      label="Valid Year"
                      type="text"
                      margin="normal"
                      variant="outlined"
                      defaultValue={year}
                      onChange={this.handleChange("year")}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <SubmitAnimation
                      currentState={currentState}
                      className={classes.submitBtn}
                    />
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid className="certigrid" item xs={12} sm={6}>
              <Paper className={classes.rightpaper}>
                <div id="divToPrint" style={{ maxWidth: "90%", color:"black",fontStyle:"bold"}}>
                  <img
                    src={orgLogo}
                    alt="org-logo"
                    style={{ maxWidth: "100%" }}
                  />
                  {/* <Typography variant="h5" color="inherit" noWrap>
                   
                  </Typography> */}
                  <p>
                    <b>Student ID : </b>{" "}
                    {this.state.student_id
                      ? this.state.student_id
                      : "------------------"}{" "}
                    &nbsp;&nbsp; <b>Student Name : </b>{" "}
                    {this.state.student_name
                      ? this.state.student_name
                      : "----------------"}{" "}
                  </p>
                  <p>
                    <b>Organization Name : </b>{" "}
                    {this.state.organization
                      ? this.state.organization
                      : "----------------------------------------------"}{" "}
                  </p>
                  <p>
                    <b>Course Name : </b>{" "}
                    {this.state.coursename
                      ? this.state.coursename
                      : "--------------------------"}{" "}
                    <b>Valid Year : </b>{" "}
                    {this.state.year ? this.state.year : "-------------"}{" "}
                  </p>
                </div>
                <button className="button3" onClick={this.printDocument}>Download</button>
                <div />
              </Paper>
            </Grid>
          </>
        ) : this.state.loading == true ? (
          <Loading />
        ) : (
          <IssueSuccess />
        )}
      </Grid>
    );
  }
}

IssueCertificate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssueCertificate);
