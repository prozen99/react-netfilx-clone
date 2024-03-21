import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); // 상태 변화를 이용해서 사용함
  //useEffect 는 주로 필요한 정보를 가져올 때 사용함
  const [modalOpen, setModalOpen] = useState(false); //초기 상태를 false로 지정해주고
  // 만약 영화 포스터를 클릭하게 된다면 그때 상태를 바꿔줘서 이벤트 처리를 하게 해주는 부분임.

  const [movieSelected, setMovieSelected] = useState({});
  useEffect(() => {
    console.log("fetchurl", fetchUrl);
    console.log("title", title);
    fetchMovieData();
  }, []); // 값이 빈배열이라는 것은 일단 1번 실행하고 종료한다
  // 만약 배열의 값이 name일 경우에는 그 값이 변경될 때마다
  //useEffect 함수가 호출되게 된다.

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl); // App.js에서 props로 내려준거
    setMovies(request.data.results); //결과에 따라 setMovies 를 이용해서
    // request.data.result의 값으로 상태변화
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie); // 영화 정보를 받아줌.
  };
  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            // 화면 px의 값.
            slidesPerview: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 그룹으로 묶을 개수가 몇개인지
            // 코드해석 : view 가 1378 px 일때 , 영화 이미지가 6개씩 한그룹으로
            // 정해져있고 다음 화살표를 누르게 되면 또 6개가 한그룹으로 보이게 됨.
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
