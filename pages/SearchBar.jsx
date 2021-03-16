import { TextField, Select, MenuItem, Grid, Button } from "@material-ui/core";
import { useState } from "react";
import Link from 'next/link'

const SearchBar = () => {
  const [selectedEntry, setSelectedEntry] = useState("Movie");
  const [search, setSearch] = useState("")

  const categoryChange = (event) => {
    setSelectedEntry(event.target.value);
  };


  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  console.log(search)


  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
      <Grid item spacing={1}>
        <Select
          onChange={categoryChange}
          labelId="label"
          id="select"
          value={selectedEntry}
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
          <Link href={{ pathname: `/${selectedEntry}`, query: { data: JSON.stringify(search) }}}><Button variant="outlined" color="primary">GO</Button></Link>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
