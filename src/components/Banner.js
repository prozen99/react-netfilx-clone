import React from 'react'
import axios from "../api/axios"; //axios의 값을 이용해주기 위함.
import { useEffect ,useState} from 'react';
import requests from "../api/request";
import "./Banner.css"
export default function Banner() {
    const[movie,setMovie]=useState([]);//빈배열 생성 useState 
    useEffect(()=>{
        fetchData(); // fetchData를 call해서 데이터를 불러옴
    },[]);

    const fetchData=async()=>{
        //현재 상영중인 영화 정보를 가져오기 ( 여러 영화)
        const request= await axios.get(requests.fetchNowPlaying);//request.js의 파일의 값을 가져오기
        console.log(request);

        //여러 영화 중 영화 하나의 ID를 가져오기 
        const movieId=request.data.results[
            Math.floor(Math.random()*request.data.results.length)
        ].id; //여러개의 영화가 잡힐텐데 , 거기서 results.안에 있는 내용을 랜덤으로[인덱스]
        //를 잡아서 .id를 잡아옴 . results 안에 id가 구성되어있으니.

        //특정 영화의 더 상세한 정보를 가져오기 ( 비디오 정보도 포함 )
        const {data:movieDetail}=await axios.get(`movie/${movieId}`,{
            params:{append_to_response:"videos"}, //result 안에 있는 movie data
            //params : << 형식  : 뒤에 내가 쓰고싶은 옵션을 가져와야함 . append_to_response 옵션의 이름 "문자열"형태가 "값"
            // 전체를 가져와서 api 서버에다가 요청 하는 거임. 
            //append_to_response는 WEB API서버에서 정해놓은 메소드를 이용하는거임.
        });
        setMovie(movieDetail);//상태를 변환시켜줌.
    }
// UI 생성하는 부분
  return (
    <header
    className="banner"
    style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
      backgroundPosition: "top center",
      backgroundSize: "cover",
    }}
  >
    <div className="banner__contents">
      <h1 className="banner__title">
        {movie.title || movie.name || movie.original_name}
      </h1>

      <div className="banner__buttons">
        <button
          className="banner__button play"
        
        >
          Play
        </button>
        <button className="banner__button info">More Information</button>
      </div>

      <h1 className="banner__description">
        
      </h1>
    </div>
    <div className="banner--fadeBottom" />
  </header>


  )


    

 
}
