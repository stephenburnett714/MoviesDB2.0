import {Grid, Card, CardMedia, CardActionArea, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import { useEffect } from "react";
import { getSearchedInfo } from "./api/apihelper";
import moment from 'moment'
import Link from "next/link"


const useStyles = makeStyles((theme) => ({
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
}
}))


export default function movies(props) {
  const posterSize = "w200";
  console.log(props);

  async function fetchMovieData() {
    try {
    const movieData = await getSearchedInfo("movie", props.searchQueary)
    props.setMoviesList(movieData)
    } catch (e) {
      return 'error';
    }
  }

  let handleChange = (event, value) => {
    props.setPage(value)
    event => props.increment
  }

  useEffect(() => {
    fetchMovieData();
  }, [props.searchIncrement, props.page]);

  const classes = useStyles();

  return (
    <div>
      <Typography className="capital" style={{ paddingTop: 20 }} align="center">Search Results for {props.removeQuotes(props.searchQueary)}</Typography>
      {props.moviesList && props.moviesList.results ? (
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Grid py={4} container direction="row" spacing="2" justify="center">
            {props.moviesList && props.moviesList.results.map((movie, index) => (
              <Grid
              container
                direction="column"
                item
                xs={12}
                sm={6}
                md={3}
                xl={2}
                key={index}
                alignItems="center"
                justify="center"
              >
                 <Link href={`/movie/[movie]?id=${movie.id}`} as={`/movie/${movie.id}`}>
                <Card>
                  <Grid >
                    <div>
                  {movie.poster_path ? (
                    <img
                    className={classes.img}
                      src={`https://image.tmdb.org/t/p/${posterSize}${movie.poster_path}`}
                      alt=""
                    />
                  ) : (
                    <img className={classes.img} src="/images/ni2x3.png" alt="" />
                  )}
                  </div>
                </Grid>

                <Typography align="center">{movie.title}</Typography>
                <Typography align="center">{movie.release_date ? moment(movie.release_date).format('YYYY') : "Release Year: Unknown"}</Typography>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          
          
        </div>
      ) : (
        <div></div>
      )}
      <Pagination count={props.moviesList.total_pages} onChange={handleChange} shape="rounded" />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  let searchQuery = query.data;
  return { props: { searchQueary: searchQuery } };
}
