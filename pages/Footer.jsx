import { GitHub, LinkedIn } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    footerContainer: {
      height: ".3vh",
      minHeight: "200px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      color: "white",
      display: "flex",
      marginTop: "10px",
      flexDirection: "column",
  },
    flexSpaceRow: {
        display: "flex",
        flexDirection: "row",
        minWidth: "150px",
        justifyItems: "space-between",
        justifyContent: "space-between",
        marginTop: "5px",
    },
  }))


const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footerContainer}>
            <Typography variant="h4">Movie Database</Typography>
            <div className={classes.flexSpaceRow}>
                <a href=""><GitHub style={{ fontSize: 45 }}/> </a>
                <LinkedIn style={{ fontSize: 50 }}/>
            </div>
        </div>
    );
}

export default Footer;