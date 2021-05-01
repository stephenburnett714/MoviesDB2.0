import {Grid, Card, CardMedia, CardActionArea, Typography} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { useEffect } from "react";
import { getSearchedInfo } from "./api/apihelper";
import moment from 'moment'
import Link from "next/link"


export default function people(props) {

    const posterSize = "w200";
    console.log(props);
  
    async function fetchPeopleData() {
      try {
      const peopleData = await getSearchedInfo("person", props.searchQueary)
      props.setPeopleList(peopleData)
      } catch (e) {
        return 'error';
      }
    }

  
    useEffect(() => {
      fetchPeopleData();
    }, [props.searchIncrement]);


const renderData = () => {
    return (
        <div>
        <Typography className="capital" style={{ paddingTop: 20 }} align="center">Search Results for {props.searchQueary}</Typography>
        <Typography align="center" variant="subtitle2">Total Results: {props.peopleList.total_results}</Typography>
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Grid py={4} container direction="row" spacing="2" justify="center">
            {props.peopleList.results.map((person, index) => (
             
              <Grid
              container
                direction="column"
                item
                xs={12}
                sm={4}
                md={3}
                xl={2}
                key={index}
                alignItems="center"
                justify="center"
              >
                 <Link href={`/person/[person]?id=${person.id}`} as={`/person/${person.id}`}>
                <Card >
                  <Grid style={{ marginLeft: "auto", marginRight: "auto" }}>
                    
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/${posterSize}${person.profile_path}`}
                      alt=""
                    />
                  ) : (
                    <img src="/images/ni2x3.png" alt="" />
                  )}
                </Grid>

                <Typography align="center">{person.name}</Typography>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Pagination count={Math.ceil(props.peopleList.total_results/20)} />
          </div>
          </div>
    )
    
}

    if(props.peopleList && props.peopleList.results) {
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


export async function getServerSideProps({ query }) {
    let searchQuery = query.data;
    return { props: { searchQueary: searchQuery } };
  }