import Footer from './Footer'
import Header from './Header'
import SearchBar from './SearchBar'
import {useState} from "react"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const [selectedEntry, setSelectedEntry] = useState("movies");
  const [search, setSearch] = useState("")
  const [previousSearch, setPreviousSearch] = useState()
  const [moviesList, setMoviesList] = useState([]);
  const [detailIndex, setDetailIndex] = useState(null);
  const [searchIncrement, setSearchIncrement] = useState(0)


  const increment = () => {
    setSearchIncrement((amount) => amount + 1)
    setTimeout(() => {setSearchIncrement((amount) => amount + 1)}, 250)
  }

  

  return (
    <div>
      <Header />

      <SearchBar 
      selectedEntry={selectedEntry}
      setSelectedEntry={setSelectedEntry}
      search={search}
      setSearch={setSearch}
      increment={increment}
      setPreviousSearch={setPreviousSearch}
      />


      <Component {...pageProps} 
      selectedEntry={selectedEntry}
      setSelectedEntry={setSelectedEntry}
      search={search}
      setSearch={setSearch}
      moviesList={moviesList}
      setMoviesList={setMoviesList}
      detailIndex={detailIndex}
      setDetailIndex={setDetailIndex}
      searchIncrement={searchIncrement}
      previousSearch={previousSearch}
      increment={increment}
      />

      <Footer />
    </div>)
}

export default MyApp
