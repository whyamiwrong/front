"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import { RecoilRoot } from "recoil";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  overflow-x: hidden;
  //background-color: whitesmoke;
`;
const SliderXwrapper2 = styled.div`
  position: relative;
  overflow-x: scroll;
  min-height: 300px;
  width: 100%;
  scroll-snap-type: x mandatory;
`;
const SliderXwrapper = styled.div`
  position: relative;
  overflow-x: scroll;
  min-height: 360px;
  width: 100%;
  scroll-snap-type: x mandatory;
`;

const SliderXItems = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  /* display: grid;
  grid-template-columns: repeat(${(props) => props.cards}, 1fr);
  gap: 20px; */
`;

export default function Snack() {

   return (
    
    <RecoilRoot>

        <Margin height="10" />
        <MainTitle text="A 알고리즘 >" />
        <SliderXwrapper2>
          <SliderXItems>
         
              <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               //image={"/logo_512x512.png"}
//               image={"/img/Logo/WhyWrongLogo2.png"}
               image={"/img/Logo/WhyWrongLogo.png"}

               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
          </SliderXItems>
          </SliderXwrapper2>
          <Margin height="10" />
        <MainTitle text="B 알고리즘 >" />
        <SliderXwrapper2>
          <SliderXItems>
         
              <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               //image={"/logo_512x512.png"}
//               image={"/img/Logo/WhyWrongLogo2.png"}
               image={"/img/Logo/WhyWrongLogo.png"}

               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
          </SliderXItems>
          </SliderXwrapper2>
          <Margin height="10" />
        <MainTitle text="C 알고리즘 >" />
        <SliderXwrapper2>
          <SliderXItems>
         
              <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               //image={"/logo_512x512.png"}
//               image={"/img/Logo/WhyWrongLogo2.png"}
               image={"/img/Logo/WhyWrongLogo.png"}

               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
          </SliderXItems>
          </SliderXwrapper2>
          <Margin height="10" />
        <MainTitle text="D 알고리즘 >" />
        <SliderXwrapper2>
          <SliderXItems>
         
              <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               //image={"/logo_512x512.png"}
//               image={"/img/Logo/WhyWrongLogo2.png"}
               image={"/img/Logo/WhyWrongLogo.png"}

               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
          </SliderXItems>
          </SliderXwrapper2>


          
    </RecoilRoot>


    
   )
}