import axios from 'axios';

const token = 'd6838493868f0bc0a4e8286ed3e3714c';
const base = 'https://api.themoviedb.org/3/';
const imageBase = 'https://image.tmdb.org/t/p/';


export const getTvMoviePerson = async (viewType, id) => {
    const res = await axios.get(`${base}${viewType}/${id}?api_key=${token}&language=en-US&append_to_response=credits`)
    return res.data
  }

export const getSearchedInfo = async (viewType, search) => {
    const res = await axios.get(`${base}search/${viewType}?api_key=${token}&query=${search}&language=en-US`)
    return res.data
  }

  export const getPoster = async (posterSize, posterLink) => {
    const res = await axios.get(`${imageBase}${posterSize}${posterLink}`)
    return res.data
  }

  export const getMovieCredits = async (id) => {
    const res = await axios.get(`${base}person/${id}/movie_credits?api_key=${token}&language=en-US`)
    return res.data
  }

export const getPersonAndCredits = async (id) => {
  const res = await axios.get(`${base}person/${id}/?api_key=${token}&append_to_response=movie_credits,tv_credits`)
  return res.data
}


export const getMovieAndCredits = async (id) => {
  const res = await axios.get(`${base}movie/${id}?api_key=${token}&language=en-US&append_to_response=credits`)
  return res.data
}


export const getShowAndCredits = async (id) => {
  const res = await axios.get(`${base}tv/${id}?api_key=${token}&language=en-US&append_to_response=credits`)
  return res.data
}

