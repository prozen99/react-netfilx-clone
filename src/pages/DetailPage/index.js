import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';
export default function DetailPage() {
  const {movieId}=useParams(); // useParams 는 react-router-dom 에서 제공하는
  //hooks 중 하나로 파라미터를 값을 전달한 URL의 값을 통해서 
  // 직접 받아오는 거임 파라미터 정보 활용 하고 싶으면 쓰면됨
  const[movie,setMovie]=useState({});
  //request의 정보들을 전부 movie state 에 넣어준다. 
  
//값을 기억하고 싶을 때 =State 
// useEffect 함수 요청 , 호출 

  useEffect(()=>{
    async function fetchData(){
      const request=await axios.get(`/movie/${movieId}`); // baseurl의 값이 있기 때문에 그 이후 내가 연결하고 싶은
        // 경로 부분만 추가적으로 연결해주면 된다.
      setMovie(request.data); //movie의 정보를 받은 값을 이용해서 request의 data를 받고
      // 그 데이터를 이용해 화면의 상태를 변경시켜준다. 

    }
    fetchData();// 데이터를 받아온 함수를 호출한다 
  },[movieId]); // movie id가 변할때마다 

  if(!movie) return <div>...loading</div>;


  return (
    <section>
  
    <img
    className='modal__poster-img'
    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
    alt="modal__poster-img"
    />

    
  
  </section>
  );
}
