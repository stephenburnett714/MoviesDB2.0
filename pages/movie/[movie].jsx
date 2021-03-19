import Link from "next/link"
import {useEffect} from 'react'
import {getMovieAndCredits} from "../api/apihelper"
import moment from "moment"
import { Grid, Container } from '@material-ui/core';
// import { maxWidth } from  '@material-ui/system'

export default function movie(props) {


    const moviePosterSize = "w400"

    async function fetchMovieData() {
        let response = await getMovieAndCredits(props.movieId)
        props.setCurrentMovie(response)
        console.log(response)
      }

      useEffect(() => {
        fetchMovieData();
      }, [props.searchIncrement]);

      console.log(props.currentMovie)

let renderData = () => {
    const {runtime, original_title, credits, overview, tagline, budget, poster_path, genres, title, release_date} = props.currentMovie
    return (
        <Container>
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid>{title ? title : original_title}</Grid>
            <Grid item>{poster_path ? 
                (<img src={`https://image.tmdb.org/t/p/${moviePosterSize}${poster_path}`}/>) 
                : 
                (<img src="/images/ni2x3.png" alt="" />)}
            </Grid>

        <Grid item>{`Budget: $${props.thousands_separators(budget)}`}</Grid>
        <Grid item maxWidth="50vw">{overview}</Grid>
        </Grid>
        </Container>
    );
}


if(props.currentMovie && props.currentMovie.original_title) {
    return (
        <div>
            <div>{renderData()}</div>
        </div>
    )} else {
        return (
            <div></div>
        )
    }
}


movie.getInitialProps = ({ query }) => {
    let movieId = query.movie
    return { movieId };
  };