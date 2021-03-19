import { Theaters } from "@material-ui/icons";
import { Grid, Box } from "@material-ui/core"
import { spacing } from '@material-ui/system'



const Header = () => {


  return (
    <Grid  container direction="row" justify="center" alignItems="center">
      <Box style={{ color: "grey", fontSize: "36px" }}>
      <Theaters fontSize="large" style={{ color: "grey" }} /> Movie Database
      </Box>
    </Grid>
  );
};

export default Header;
