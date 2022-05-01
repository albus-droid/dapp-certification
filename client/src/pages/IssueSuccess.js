import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Link from "react-router-dom/Link";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/success.gif";

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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container style={{ height: "100%" }}>
          <Grid className={classes.hidden} item sm={false} md={8}>
            <img className={classes.imgstyles} src={ChainImage} alt="chain" />
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper className={classes.paper}>
              <h2>Certificate Issue Successfull</h2>
              <h4>
                Your certificate ID is{" "}
                <i>
                  <u>ABC123</u>
                </i>
                , Save this ID for future verification.
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
