import Nav from '../src/components/Nav';
import './App.css';

import Footer from './components/Footer';
import { Outlet, Routes,Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

const Layout=()=>{
  return(
    <div>
      <Nav/>

      <Outlet/>

      <Footer/>

    </div>
  )
}


function App() {
  return (
    <div className='app'>
     <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<MainPage/>}/>
        <Route path="search" element={<SearchPage/>}/>
        <Route path=":movieId3" element={<DetailPage/>}/>
        
      </Route>


     </Routes>

    </div>
    
    
  );
}

export default App;
