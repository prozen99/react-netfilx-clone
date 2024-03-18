import axios from '../../api/axios';
import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import "./SearchPage.css";
export default function SearchPage() {
  const navigate=useNavigate();
  const[searchResults,setSearchResults]=useState([]);//상태 설정해주고
   
  const useQuery=()=>{
    return new URLSearchParams(useLocation().search);
  }

  let query=useQuery();//URL에 관한 여러 객체정보를 받아온다음에
  // 밑에 searchTerm에서는 실제로 필요한 q=? 에서 ?정보만 가져오는거라고
  //생각하면된다.
  const searchTerm=query.get("q")
  const debouncedSearchTerm= useDebounce(searchTerm,500)// get 이후에 여기서는q니까
  //q = ?  이 ?에 들어가있는 첫번쨰 value값을 가져오는 코드임.

useEffect(()=>{ // useEffect 함수는 지금 searchTerm이 존재하면 
  //여기서는 q=~~~~와 같은 input의 value 값이겠지 . 그 값이 존재하면 
  //fetchSearchMovie를 이용해서 api서버에서 데이터를 가져오는 것이다. 
  // 그리고 use Effect 뒤쪽에 두번째 매개변수 자리는 만약 [name]이면 name값이 변할때마다
  //부르라는 의미이고 빈배열일경우 일단은 한번만 실행하게 된다. 
  //지금은 일단 
  if(debouncedSearchTerm)
  {
    fetchSearchMovie(debouncedSearchTerm);
   
  }
},[debouncedSearchTerm]);
//값을 기억하고 싶을 때 =State 
// useEffect 함수 요청 , 호출 
console.log("search term",searchTerm);
const fetchSearchMovie=async(searchTerm)=>{

  try{
    const request=await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
    setSearchResults(request.data.results);//데이터를 받아와서 results
  }
  catch (error)
  {
    console.log("error",error);
  }

}
  
 
  const renderSearchResults=()=>{
    return searchResults.length> 0 ? ( // input값의 결과가 존재한다면.
      <section className="search-container">
        {searchResults.map((movie)=>{
          if(movie.backdrop_path !== null&& movie.media_type!=="person")
          {
            const movieImageUrl=
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return(
             <div className='movie' key={movie.id}>
              <div onClick={()=>navigate(`/${movie.id}`)}className="movie__column-poster">

              <img
              src={movieImageUrl}
              alt="movie"
              className='movie__poster'
              
              />

              </div>



             </div>
            );
        
          }
        })}
        
      </section>
    ) : (
      <section className='no-result'>
          <div className='no-result__text'>
        <p>
          찾고자하는 검색어  "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
        </p>
            </div>
      </section>
    )
  }
  
  return renderSearchResults();
  
}



