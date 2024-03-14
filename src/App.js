import Nav from '../src/components/Nav';
import './App.css';
import Banner from './components/Banner';
import requests from './api/request';
import Row from './components/Row';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
    <Nav /> 
    <Banner 
    />
    
    <Row
    title="NETFLIX ORIGINAL"
    id="NO"
    fetchUrl={requests.fetchNetflixOriginals}
    
    isLargeRow
    
    /> 

    <Row 
    title="Trending Now" 
    id="TN" 
    fetchUrl={requests.fetchTrending} />
    <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
    <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}/>
    <Row title="Comedy Movies" id="Cm" fetchUrl={requests.fetchComedyMovies}/>  
    <Footer></Footer>
    </div>
  );
}

export default App;
