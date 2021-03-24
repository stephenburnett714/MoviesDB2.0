import Link from "next/link"
import {useEffect} from 'react'
import {getPersonAndCredits} from "../api/apihelper"
import moment from "moment"
import { Grid, Container, Table, TableHead, TableCell, TableBody,TableRow } from '@material-ui/core';

export default function person(props) {
  const moviePosterSize = "w400";


  async function fetchPersonData() {
    let response = await getPersonAndCredits(props.personId);
    props.setCurrentPerson(response);
    console.log(response)
  }

 

  useEffect(() => {
    fetchPersonData();
  }, [props.searchIncrement]);


  let renderData = () => {
    const {biography, birthday, deathday, id, name, homepage, profile_path, movie_credits, tv_credits} = props.currentPerson
    return (
        <Container>
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid>{name}</Grid>
            <Grid item>{profile_path ? 
                (<img className="mw-third" src={`https://image.tmdb.org/t/p/${moviePosterSize}${profile_path}`}/>) 
                : 
                (<img className="mw-third" src="/images/ni2x3.png" alt="" />)}
            </Grid>

        <Grid>{`Birth date: ${moment(birthday).format("MMMM DD, YYYY")}`}</Grid>
        <Grid>{`${deathday} ? Death date: ${moment(deathday).format("MMMM DD, YYYY")} : ""`}</Grid>
        <Grid item>{biography}</Grid>
        </Grid>
        <Grid container direction="column" >
        <Table>
        <TableHead>
            <TableRow>
            <TableCell></TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>Character</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {movie_credits.cast.map((movie) => (
                <Link href={`/movie/[movie]?id=${movie.id}`} as={`/movie/${movie.id}`}>
                <TableRow>    
                    <TableCell>{movie.poster_path ? 
                (<img  height={100} width={70} src={`https://image.tmdb.org/t/p/${moviePosterSize}${movie.poster_path}`}/>) 
                : 
                (<img height={150} width={75} src="/images/ni2x3.png" alt="" />)}</TableCell>
                <TableCell  align="left" item>{movie.title}</TableCell>
                <TableCell  align="left" item>{movie.character}</TableCell>
                
                </TableRow>
                </Link>
            ))}
            </TableBody>
        </Table>
        </Grid>
        </Container>);
  };




  if(props.currentPerson && props.currentPerson.name) {
      
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

person.getInitialProps = ({ query }) => {
  let personId = query.person;
  return { personId };
};
