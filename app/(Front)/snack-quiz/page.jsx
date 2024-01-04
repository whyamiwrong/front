"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import Link from "next/link";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  overflow-x: hidden;
  position: relative;

  //background-color: whitesmoke;
`;


export default function Snack() {

   return (
    <>
    <MainTitle text="SNACK QUIZ"/>
    <Wrapper>
        <Link href="/snack-quiz/quiz" style={{textDecoration:"none"}}>
                <MainCard
                        // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
                        image={"https://source.unsplash.com/random"}
                        title={"입출력과 사칙연산"}
                        category={"수학"}
                        category2={"Mathmatics"}
                        num={13}
                        />
        </Link>                     
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
                />    <MainCard
                // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
                image={"https://source.unsplash.com/random"}
                title={"입출력과 사칙연산"}
                category={"수학"}
                category2={"Mathmatics"}
                num={13}
                />    <MainCard
                // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
                image={"https://source.unsplash.com/random"}
                title={"입출력과 사칙연산"}
                category={"수학"}
                category2={"Mathmatics"}
                num={13}
                />    <MainCard
                // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
                image={"https://source.unsplash.com/random"}
                title={"입출력과 사칙연산"}
                category={"수학"}
                category2={"Mathmatics"}
                num={13}
                />    <MainCard
                // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
                image={"https://source.unsplash.com/random"}
                title={"입출력과 사칙연산"}
                category={"수학"}
                category2={"Mathmatics"}
                num={13}
                />    <MainCard
                // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
                image={"https://source.unsplash.com/random"}
                title={"입출력과 사칙연산"}
                category={"수학"}
                category2={"Mathmatics"}
                num={13}
                />
    </Wrapper>

    </>
   )
}