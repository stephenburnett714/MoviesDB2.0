import Link from "next/link";
import { useEffect } from "react";
import { getPersonAndCredits } from "../api/apihelper";
import moment from "moment";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Container,
  Table,
  Typography,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MovieSharp } from "@material-ui/icons";

export default function person(props) {
  const moviePosterSize = "w400";

  async function fetchPersonData() {
    let response = await getPersonAndCredits(props.personId);
    props.setCurrentPerson(response);
    console.log(response);
  }

  useEffect(() => {
    fetchPersonData();
  }, [props.searchIncrement]);

  let renderData = () => {
    const {
      biography,
      birthday,
      deathday,
      id,
      name,
      homepage,
      profile_path,
      movie_credits,
      tv_credits,
    } = props.currentPerson;
    return (
      <Container>
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid container direction="column" xs={12} md={6} justify="center" alignItems="center">
          <Grid item>{name}</Grid>
          <Grid item>
            {profile_path ? (
              <img
                className="mw-third"
                src={`https://image.tmdb.org/t/p/${moviePosterSize}${profile_path}`}
              />
            ) : (
              <img className="mw-third" src="/images/ni2x3.png" alt="" />
            )}
          </Grid>

          
          </Grid>
          <Grid container direction="column" xs={12} md={6} justify="center" alignItems="center">
          <Grid item>{`Born On: ${moment(birthday).format(
            "MMMM DD, YYYY"
          )}`}</Grid>
          <Grid item>{deathday ? `Died On: ${moment(deathday).format(
            "MMMM DD, YYYY"
          )}` : ""}</Grid>
          <Grid item>{biography}</Grid>
          </Grid>

        </Grid>
        <div style={{ paddingTop: 20}}>
        <Grid container direction="column">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>View Movies ({movie_credits.cast.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                    <Link
                      href={`/movie/[movie]?id=${movie.id}`}
                      as={`/movie/${movie.id}`}
                    >
                      <TableRow>
                        <TableCell>
                          {movie.poster_path ? (
                            <img
                              height={100}
                              width={70}
                              src={`https://image.tmdb.org/t/p/${moviePosterSize}${movie.poster_path}`}
                            />
                          ) : (
                            <img
                              height={150}
                              width={75}
                              src="/images/ni2x3.png"
                              alt=""
                            />
                          )}
                        </TableCell>
                        <TableCell align="left" item>
                          {movie.title}
                        </TableCell>
                        <TableCell align="left" item>
                          {movie.character ? movie.character : "N/A"}
                        </TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Grid>
        </div>

        <div >
        <Grid container direction="column">
            
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>View Shows ({tv_credits.cast.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Show</TableCell>
                    <TableCell>Character</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
              {tv_credits.cast.map((show) => (
                <Link
                  href={`/show/[show]?id=${show.id}`}
                  as={`/show/${show.id}`}
                >
                  <TableRow>
                    <TableCell>
                      {show.poster_path ? (
                        <img
                          height={100}
                          width={70}
                          src={`https://image.tmdb.org/t/p/${moviePosterSize}${show.poster_path}`}
                        />
                      ) : (
                        <img
                          height={150}
                          width={75}
                          src="/images/ni2x3.png"
                          alt=""
                        />
                      )}
                    </TableCell>
                    <TableCell align="left" item>
                      {show.name}
                    </TableCell>
                    <TableCell align="left" item>
                      {show.character ? show.character : "N/A"}
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
              </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          
        </Grid>
        </div>
      </Container>
    );
  };

  if (props.currentPerson && props.currentPerson.name) {
    return (
      <div>
        <div>{renderData()}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

person.getInitialProps = ({ query }) => {
  let personId = query.person;
  return { personId };
};
