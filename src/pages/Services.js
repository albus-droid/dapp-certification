import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Link from "react-router-dom/Link";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/certi.svg";

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
      width: 300,
    },
    height: "13vh",
    color: "white",
    backgroundColor: "#4d0057",
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
    height: 100,
    width: 100,
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
    maxWidth: "60vw",
    maxHeight: "60vh",
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
});

class Services extends Component {
  render() {
    const { classes } = this.props;
    return (
      
      <div className='hero-container'>
      
      <h1 className="text-style1">Issue and Verify Certificate with Etherium Blockchain</h1>
      <p className="text-style1">Here you GO!</p>
      <div className='hero-btns'>
      <Link to="/issue-certificate">
//      <button className="button1">
//           <b >ISSUE CERTIFICATE</b>
//      </button>
//  </Link>
      
         
//        <Link to="/verify-certificate">
//      <button className="button2">
//      <b >VERIFY CERTIFICATE</b>
//      </button>
//  </Link>
        {/* <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
//       <div className="container11">
        
//            <Link to="/issue-certificate">
//      <button className="button1">
//           <b >ISSUE CERTIFICATE</b>
//      </button>
//  </Link>
      
         
//        <Link to="/verify-certificate">
//      <button className="button2">
//      <b >VERIFY CERTIFICATE</b>
//      </button>
//  </Link>
       






        // {/* <Grid container style={{ height: "100%" }}>
        //   <Grid className={classes.hidden} item sm={false} md={1} xs={6}  >
        //     <img className={classes.imgstyles} src={ChainImage} alt="chain" />
        //   </Grid>
        //   <Grid className="grid1" xs={6} sm={3}>
        //     <Paper className={classes.paper}>
        //       <Link to="/issue-certificate">
        //         <h3>Issue Certificate</h3>
        //       </Link>
        //     </Paper>
        //     <Paper className={classes.paper}>
        //       <Link to="/verify-certificate">
        //         <h3>Verify Certificate</h3>
        //       </Link>
        //     </Paper>
        //   </Grid>
        // </Grid> */}
      // </div>
    );
  }
}

Services.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Services);
