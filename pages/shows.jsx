import {Grid, Card, CardMedia, CardActionArea, Typography} from "@material-ui/core";
import { useEffect } from "react";
import { getSearchedInfo } from "./api/apihelper";
import moment from 'moment'
import Link from "next/link"

export default function shows(props) {
  const posterSize = "w200";
  console.log(props);

  async function fetchShowsData() {
    try {
    const showsData = await getSearchedInfo("tv", props.searchQueary)
    props.setShowsList(showsData)
    } catch (e) {
      return 'error';
    }
  }

  useEffect(() => {
    fetchShowsData();
  }, [props.searchIncrement]);

  return (
    <div>
      <Typography className="capital" style={{ paddingTop: 20 }} align="center">Search Results for {props.removeQuotes(props.searchQueary)}</Typography>
      {props.showsList && props.showsList.results ? (
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Grid py={4} container direction="row" spacing="2" justify="center">
            {props.showsList && props.showsList.results.map((show, index) => (
             
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
                 <Link href={`/show/[show]?id=${show.id}`} as={`/show/${show.id}`}>
                <Card >
                  <Grid style={{ marginLeft: "auto", marginRight: "auto" }}>
                    
                  {show.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/${posterSize}${show.poster_path}`}
                      alt=""
                    />
                  ) : (
                    <img src="/images/ni2x3.png" alt="" />
                  )}
                </Grid>

                <Typography align="center">{show.name}</Typography>
                <Typography align="center">{show.first_air_date ? `First Aired: ${moment(show.first_air_date).format('YYYY')}` : "First Aired: Unknown"}</Typography>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          
          
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  let searchQuery = query.data;
  return { props: { searchQueary: searchQuery } };
}