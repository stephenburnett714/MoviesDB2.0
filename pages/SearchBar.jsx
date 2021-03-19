import { TextField, Select, MenuItem, Grid, Button } from "@material-ui/core";
import Link from 'next/link'

const SearchBar = ({selectedEntry, setSelectedEntry, search, setSearch, increment}) => {

  const categoryChange = (event) => {
    setSelectedEntry(event.target.value);
  };


  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        
      <Grid item >
        <Select
          onChange={categoryChange}
          labelId="label"
          id="select"
          value={selectedEntry}
          defaultValue={"movies"}
        >
          <MenuItem value="movies">Movie</MenuItem>
          <MenuItem value="shows">Show</MenuItem>
          <MenuItem value="people">Person</MenuItem>
        </Select>
      </Grid>
      
      <Grid item spacing={1}>
      <TextField onChange={handleChange} id="outlined-basic" label="Search..." variant="outlined" />
      
      </Grid>
      <Grid justify="center" item spacing={1}>
          <Link href={{ pathname: `/${selectedEntry}`, query: { data: JSON.stringify(search)}}}><Button onClick={increment} variant="outlined" color="primary">GO</Button></Link>
      </Grid> 
    </Grid>
  );
};

export default SearchBar;
