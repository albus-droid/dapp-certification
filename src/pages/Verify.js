import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/verify.png";
import VerifySuccess from "./VerifySuccess";
import Error from "./Error";

const styles = (theme) => ({
  hidden: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      borderRadius: "5%",
      //   marginRight: 30,
    },
    [theme.breakpoints.up(1150)]: {
      //   marginLeft: 500,
      width: 500,
    },
    height: "35vh",
    marginTop: theme.spacing.unit * 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  imgstyles: {
    maxWidth: "70vw",
    maxHeight: "70vh",
    marginLeft: 100,
    marginTop: 100,
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
});

class Verify extends Component {
  state = {
    certificate_id: "",
    verify_status: "",
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  verifyCertificate = () => {
    if (this.state.certificate_id == "") {
      alert("Please enter your certificate ID");
      return;
    }
    alert("Your Certificate ID Is : " + this.state.certificate_id);
  };

  //Sample for show success & Err page
  showSuccess = () => {
    this.setState({ verify_status: "success" });
  };
  showErr = () => {
    this.setState({ verify_status: "error" });
  };
  //#End
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.verify_status === "" ? (
          <Grid container style={{ height: "100%" }}>
            <Grid className={classes.hidden} item sm={false} md={4}>
              <img className={classes.imgstyles} src={ChainImage} alt="chain" />
            </Grid>
            <Grid item sm={12} md={8}>
              <Paper className={classes.paper}>
                <h2>Verify Certificate</h2>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Copy The Certificate ID Here"
                    className={classes.textField}
                    fullWidth
                    onChange={this.handleChange("certificate_id")}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.verifyCertificate}
                  >
                    Verify
                  </Button>
                </Grid>
              </Paper>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.showSuccess}
              >
                Success
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.showErr}
              >
                Err
              </Button>
            </Grid>
          </Grid>
        ) : this.state.verify_status === "success" ? (
          <VerifySuccess />
        ) : (
          <Error />
        )}
      </div>
    );
  }
}

Verify.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Verify);
