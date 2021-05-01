import Link from "next/link"
import {useEffect} from 'react'
import {getShowAndCredits} from "../api/apihelper"
import moment from "moment"
import { Accordion, AccordionSummary, AccordionDetails, Grid, Container, Table, Typography, TableHead, TableCell, TableBody,TableRow } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function show(props) {

    const moviePosterSize = "w400"

    async function fetchShowData() {
        let response = await getShowAndCredits(props.showId)
        props.setCurrentShow(response)
        console.log(response)
      }

      useEffect(() => {
        fetchShowData();
      }, [props.searchIncrement]);


    let renderData = () => {
        const {seasons, name, credits, overview, tagline, poster_path, genres, first_air_date} = props.currentShow
        return (
            <Container>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid>{name}</Grid>
                <Grid item>{poster_path ? 
                    (<img className="mw-third" src={`https://image.tmdb.org/t/p/${moviePosterSize}${poster_path}`}/>) 
                    : 
                    (<img className="mw-third" src="/images/ni2x3.png" alt="" />)}
                </Grid>
    
            <Grid>{moment(first_air_date).format("MMMM DD, YYYY")}</Grid>
            <Grid item>{overview}</Grid>
            </Grid>
            <Grid container direction="column" >
            <Accordion>
            <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>
            <Typography >Show Cast</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
                </Accordion>
            </Grid>
            </Container>
        );
    }

    if(props.currentShow && props.currentShow.name) {
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


show.getInitialProps = ({ query }) => {
    let showId = query.show
    return { showId };
  };