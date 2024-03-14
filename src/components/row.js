import React,{useEffect,useState} from 'react';
import axios from '../api/axios';
import "./Row.css";

export default function Row({title,id,fetchUrl,isLargeRow}) {
    const [movies,setMovies]=useState([]); // 상태 변화를 이용해서 사용함
    //useEffect 는 주로 필요한 정보를 가져올 때 사용함
    
    useEffect(()=>{
        console.log('fetchurl',fetchUrl);
        console.log('title',title);
        fetchMovieData();
        
    },[]); // 값이 빈배열이라는 것은 일단 1번 실행하고 종료한다
    // 만약 배열의 값이 name일 경우에는 그 값이 변경될 때마다 
    //useEffect 함수가 호출되게 된다.

    const fetchMovieData=async()=>{
        const request=await axios.get(fetchUrl);// App.js에서 props로 내려준거
         setMovies(request.data.results);//결과에 따라 setMovies 를 이용해서
        // request.data.result의 값으로 상태변화


    }
  return (
    <section className='row'>
        <h2>{title}</h2>
        <div className="slider">
            <div className='slider__arrow-left'>
                <span className="arrow" 
                onClick={()=>{
                    
                    document.getElementById(id).scrollLeft -= window.innerWidth -80;
                }}>
                    {"<"}</span>
            </div>
            <div id={id} className="row__posters">
                {movies.map(movie=>(
                    <img
                     key={movie.id}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path: movie.backdrop_path}`}   
                     alt={movie.name}

                    />


                    
                ))}
            </div>
            <div className='slider__arrow-right'>
                <span className='arrow'
                onClick={()=>{
                   document.getElementById(id).scrollLeft += window.innerWidth -80;
                }}
                >{">"}</span>

            </div>

        </div>

    </section>
    
  );
}
