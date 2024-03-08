const requests={
    fetchNowPlaying:"movie/now_playing",
    fetchNetflixOriginals:"discover/tv?with_networks=213",
    fetchTrending:"/trending/all/week",
    fetchTopRated:"/movie/top_rated",
    fetchActionMovies:"/discover/movie?with_genres=28",
    fetchComedyMovies:"/discover/movie?with_genres=35",
    fetchHorrorMovies:"/discover/movie?with_genres=27",
    fetchRomanceMovies:"/discover/movie?with_genres=10749",
    fetchDocumentariesMovies:"/discover/movie?with_genres=99",
    

}

export default requests; //이렇게 내보내주면 이 파일뿐만아니라
// 다른 파일에서도 사용할 수 있게 해줌.