import React, {useState,useEffect} from 'react'
import "./Nav.css"// 이파일에서 css 파일의 서식을 이용하기 위해서 가져오는거임
import { useNavigate,  } from 'react-router-dom';
export default function Nav() {
    const [show,setShow] = useState(false);
    const [searchValue,setSearchValue]=useState("");//처음에는 빈 string으로 넣어줌
    const navigate=useNavigate();// 네비 게이트 생성
    //경로 이동해주는 부분임
    useEffect(()=>{
        window.addEventListener("scroll",()=>{ //scroll 이벤트일때  window 객체의
            console.log('window.scrollY',window.scrollY);
            if(window.scrollY >50) // scrollY는 스크롤을 y축으로 내릴떄 값인데 이값이 넘어가면 
            {
                setShow(true);// 상태를 바꿔주고 
            }else {
                setShow(false);// 값이 넘지 않으면 값을 변경하지 않는다 
            }
        })
        return ()=>{
            window.removeEventListener("scroll",()=>{}); // 이함수를 종료시킬떄는 스크롤을 제거시킨다.
        };
    })

    const handleChange=(e)=>{ // 클릭해서 변하는 부분 말하는거임.
        setSearchValue(e.target.value);// target의 value로 값을 바꿔주고
        //여기서는 클릭한 영화의 id가 되게 할거임.
        navigate(`/search?q=${e.target.value}`)
    };
  return (
    <nav className={`nav ${show&&"nav__black"}`}>
        <img
        alt='Netfilx logo'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className='nav-logo'
        onClick={()=>window.location.reload()}
        />

        <input value={searchValue} 
        onChange={handleChange} 
        className='nav__input' 
        type="text" 
        placeholder='영화를 검색해주세요'
        />

        <img
         alt="User logged"
         src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
         className='nav__avatar'

        />
    </nav>
  )
}
