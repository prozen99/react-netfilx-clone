import { useState,useEffect } from "react";
//custom hooks
export const useDebounce=(value,delay)=>{
   const[debounceValue,setDebounceValue]=useState(value);
//여기서 value 값은 bool 타입으로 true 나 false를 의미한다.
    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebounceValue(value);
        },delay); // delay는 예시처럼 0.5초 미룰지 , 1초 미룰지 2초 미룰지 등등의 시간

       return()=>{
        clearTimeout(handler);//뭔가 값이 들어오면 위에서 했던 일들을
        // clear 해주는거임.
       };
    },[value,delay]);//만약 value가 바뀌거나 ,delay 시간이 바뀌면
    //useEffect 함수 내부에 행동들을 다시해라 라는 의미이다.
    return debounceValue;
}

export default useDebounce;