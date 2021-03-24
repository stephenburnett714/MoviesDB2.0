import Link from "next/link"
import {useEffect} from 'react'
import {getMovieAndCredits} from "../api/apihelper"
import moment from "moment"
import { Grid, Container, Table, TableHead, TableCell, TableBody,TableRow } from '@material-ui/core';
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
                (<img className="mw-third" src={`https://image.tmdb.org/t/p/${moviePosterSize}${poster_path}`}/>) 
                : 
                (<img className="mw-third" src="/images/ni2x3.png" alt="" />)}
            </Grid>

        <Grid item>{`Budget: ${budget ? props.thousands_separators(budget) : "N/A"}`}</Grid>
        <Grid>{moment(release_date).format("MMMM DD, YYYY")}</Grid>
        <Grid item>{overview}</Grid>
        </Grid>
        <Grid container direction="column" >
            <Table>
            <TableHead>
                <TableRow>
                <TableCell></TableCell>
                <TableCell>Cast</TableCell>
                <TableCell>Role</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                
                {credits.cast.map((cast) => (
                    <Link href={`/person/[person]?id=${cast.id}`} as={`/person/${cast.id}`}>
                    <TableRow>    
                        <TableCell>{cast.profile_path ? 
                    (<img  height={100} width={70} src={`https://image.tmdb.org/t/p/${moviePosterSize}${cast.profile_path}`}/>) 
                    : 
                    (<img height={150} width={75} src="/images/ni2x3.png" alt="" />)}</TableCell>
                    <TableCell  align="left" item>{cast.name}</TableCell>
                    <TableCell  align="left" item>{cast.character}</TableCell>
                    
                    </TableRow>
                    </Link>
                ))}
                </TableBody>
            </Table>
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