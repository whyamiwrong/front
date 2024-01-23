"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import Typo from "@/components/Typo/Typo";

import {
    Grid, Typography
} from "@mui/material";

import { useSearchParams } from "next/navigation";


const Background = styled.div`
  display: flex;
  flex: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute; //내부 div들도 absolute로 두고 z-index 우선순위
  top: 0px;
  left:0px;
  background-image: url("/img/Result/result1.svg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #F7EDFD;
  border-radius: 10px;
  height: 100vh;
  width: 100vw;
`;
const BottomWrapper1 = styled.div`
    position: absolute;
    top: 85px;
    left: 96%;
    // display:flex;
    //flex: wrap;
    //flex-direction: row;
    width: 100vw;
    //justify-content: flex-end;
    //align-items: flex-end;
`
const BottomWrapper2 = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    
    // display:flex;
    //flex: wrap;
    //flex-direction: row;
    width: 100vw;
    justify-content: center;
    align-items: center;
`
const BottomWrapper3 = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;

    
    // display:flex;
    //flex: wrap;
    //flex-direction: row;
    //width: 100vw;
    justify-content: center;
    align-items: center;
`
const CloseBottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("/img/Result/close.svg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: none;
    //border-radius: 10px;
    cursor: pointer;
    height: 30px;
    width: 30px;
`;

const QuizResult = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("/img/Result/QuizResult.svg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: none;
    //border-radius: 10px;
    cursor: pointer;
    height: 150px;
    width: 285px;
`;
const Time = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("/img/Result/Time.svg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: none;
    //border-radius: 10px;
    cursor: pointer;
    // height: 182px;
    min-width: 200px;
    max-width: 410px;
`;
const Score = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("/img/Result/Score.svg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: none;
    //border-radius: 10px;
    cursor: pointer;
    // height: 182px;
    min-width: 200px;
    max-width: 410px;
`;
const RetryButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("/img/Result/RetryButton.svg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: none;
    //border-radius: 10px;
    cursor: pointer;
    height: 76px;
    width: 200px;
`;
export default function Quiz({ params }) {
    const searchParams = useSearchParams();
    const duration = searchParams.get("duration");
    const solved = searchParams.get("solved");
    const total = searchParams.get("total");


    return(
        <Background>
            <BottomWrapper1>
                <CloseBottom onClick={() => {window.location.href = "/snack-quiz"}} />
            </BottomWrapper1>
            <Margin height="50"/>
            <BottomWrapper2>
                <QuizResult/>
                <Margin height="50"/>
                <Typography variant="h4" align="center">
                    푸는데 걸린 시간<br/>
                    <strong>{duration} 초</strong>
                </Typography>
                <Margin height="20"/>
                <Typography variant="h4" align="center">
                    점수<br/>
                    <strong>{Math.round(solved / total * 100)}점({solved} / {total})</strong>
                </Typography>
                <Grid container spacing={2} rowSpacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Time/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Score/>
                    </Grid>
                </Grid>
                <Margin height="80"/>
                <RetryButton onClick={() => {window.history.back()}} />
            </BottomWrapper2>

        </Background>
    )
}