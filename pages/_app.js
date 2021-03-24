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
  const [showsList, setShowsList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [detailIndex, setDetailIndex] = useState(null);
  const [searchIncrement, setSearchIncrement] = useState(0)
  const [currentMovie, setCurrentMovie] = useState()
  const [currentShow, setCurrentShow] = useState()
  const [currentPerson, setCurrentPerson] = useState()
  


  const increment = () => {
    setSearchIncrement((amount) => amount + 1)
    setTimeout(() => {setSearchIncrement((amount) => amount + 1)}, 250)
  }

  const removeQuotes = (str) => {
    str = str.replace(/^"|"$/g, '')
    return str
  }

  function thousands_separators(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");

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
      showsList={showsList}
      setShowsList={setShowsList}
      detailIndex={detailIndex}
      setDetailIndex={setDetailIndex}
      searchIncrement={searchIncrement}
      previousSearch={previousSearch}
      increment={increment}
      removeQuotes={removeQuotes}
      currentMovie={currentMovie}
      setCurrentMovie={setCurrentMovie}
      thousands_separators={thousands_separators}
      currentShow={currentShow}
      setCurrentShow={setCurrentShow}
      peopleList={peopleList}
      setPeopleList={setPeopleList}
      currentPerson={currentPerson}
      setCurrentPerson={setCurrentPerson}
      />

      <Footer />
    </div>)
}

export default MyApp
