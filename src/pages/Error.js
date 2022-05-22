import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/notver.png";

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
    height: "55vh",
    marginTop: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  imgstyles: {
    maxWidth: "30vw",
    maxHeight: "30vh",
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
  heading: {
    color: "red",
    maxWidth: "3000vw",
  },
});

class IssueSuccess extends Component {
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
                  This certificate is not block chain verified.
                </h1>
              </Grid>
              <Grid className={classes.hidden} item sm={false} md={8}>
                <img
                  className={classes.imgstyles}
                  src={ChainImage}
                  alt="chain"
                />
              </Grid>
              {/* <h2>Certificate Issue Successfull</h2>
              <h4>
                Your certificate ID is{" "}
                <i>
                  <u>ABC123</u>
                </i>
                , Save this ID for future verification.
              </h4> */}
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
