import React,{useEffect} from 'react'

export default function useOnClickOutside(ref,handler) {

    useEffect(()=>{
        const listener=(event)=>{
            if(!ref.current ||ref.current.contains(event.target)) // ref =dom 인데
            //내가 클릭하거나 현재 잡은 dom 객체가 없거나 , 만약 현재 dom 객체가 event.target을 포함
            //왜냐면 내가 여기서는 ref=modal 인데 modal을 제대로 집었다면 그냥 화면을 보여주면되니까.
            {
                return;
            }
            handler(); // 만약 모달창 외부일경우에는 handler를
        };
        document.addEventListener("mousedown",listener) // listener 라는 콜백함수 직접 만들고 생성해줌
        // 마우스 다운 이벤트가 발생 할때를 말함
        //document.addEventListener("touchstart",listener)
            

            return()=>{
                document.addEventListener("mousedown",listener)
                //document.addEventListener("touchstart",listener)
            };
    },[]);
    
}
