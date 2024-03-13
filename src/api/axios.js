import axios from "axios";


const instance=axios.create({
    baseURL:"http://api.themoviedb.org/3", // URL 뒤에다가 ? api_key가 붙고 = ~~~~~&
    params:{
        api_key:"b18e798ff377ef49f1c335283e7c43d6",
        language:"ko-KR",

    },
});


export default instance; // 외부의 파일들에서도
// 이 instance를 이용할 수 있게 내보내줌.