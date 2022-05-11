import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/verf.png";
import Verify from "./Verify";

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
      width: 1400,
    },
    height: "auto",
    marginTop: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  imgstyles: {
    maxWidth: "20vw",
    maxHeight: "20vh",
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
  heading: {
    color: "green",
    maxWidth: "3000vw",
  },
});

class VerifySuccess extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container style={{ height: "100%" }}>
          {/*  */}
          <Grid item sm={12} md={4}>
            <Paper className={classes.paper}>
              <Grid className={classes.hidden} item sm={false} md={12}>
                <h1 className={classes.heading}>
                  Certificate Verification Successfull !
                </h1>
              </Grid>
              <Grid className={classes.hidden} item sm={false} md={8}>
                <img
                  className={classes.imgstyles}
                  src={ChainImage}
                  alt="chain"
                />
              </Grid>
              <h3>Your certificate details are: </h3>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">ID</th>
                    <td>{this.props.certdetails[0]}</td>
                  </tr>
                  <tr>
                    <th scope="row">NAME</th>
                    <td>{this.props.certdetails[1]}</td>
                  </tr>
                  <tr>
                    <th scope="row">ORGANISATION</th>
                    <td>{this.props.certdetails[2]}</td>
                  </tr>
                  <tr>
                    <th scope="row">COURSE</th>
                    <td>{this.props.certdetails[3]}</td>
                  </tr>
                  <tr>
                    <th scope="row">LINK</th>
                    <td>{this.props.certdetails[4]}</td>
                  </tr>
                  <tr>
                    <th scope="row">CertID</th>
                    <td>{this.props.certdetails[5]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Expire Date</th>
                    <td>{this.props.certdetails[6]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Issue Date</th>
                    <td>{this.props.certdetails[7]}</td>
                  </tr>
                </tbody>
              </table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

VerifySuccess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifySuccess);
