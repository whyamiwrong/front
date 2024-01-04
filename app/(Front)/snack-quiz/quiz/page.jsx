"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import QuizCard from "@/components/Card/QuizCard/QuizCard";
import Typo from "@/components/Typo/Typo";

const TitleWrapper = styled.div`
    position: relative;
    left: 0px;
    top:0px;

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: auto;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
`
const Wrapper = styled.div`
    position: relative;
    left: 0px;
    top:0px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: auto;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`

const IconWrapper = styled.div`
    position: relative;
    left: 0px;
    top:0px;

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: auto;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
`

export default function Quiz(){
    return(
        <>
            <TitleWrapper>
                <Typo size="2rem" weight= "600"> 안녕하세요 </Typo>
            </TitleWrapper>
            <Wrapper>    
             <QuizCard
             image={"/img/Logo/WhyWrongLogo.png"}
             title={"입출력과 사칙연산"}
             category={"수학"}
             category2={"Mathmatics"}
             num={13}
             />
            </Wrapper>
        </>
    )
}