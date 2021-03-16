import SearchBar from './SearchBar'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <SearchBar />
      <Component {...pageProps} />
    </div>)
}

export default MyApp
