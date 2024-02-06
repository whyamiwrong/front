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
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  //top: 85px;
  //left: 96%;
`;

const BottomWrapper2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const BottomWrapper3 = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: right;
  width: 95%;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 200px;
  max-width: 410px;
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const CloseBottom = styled(IconContainer)`
  background-image: url("/img/Result/close.svg");
  background-size: cover;
  background-position: center center;
  height: 20px;
  min-width: 20px;
`;

const QuizResult = styled(IconContainer)`
  background-image: url("/img/Result/QuizResult.svg");
  background-size: cover;
  background-position: center center;
  min-height: 108px;
  min-width: 205px;
  height: 11vw;
  width: 21vw;
`;

const Time = styled(IconContainer)`
  background-image: url("/img/Result/Time3.svg");
  background-size: cover;
  background-position: center center;
  min-height: 132px;
  min-width: 300px;
  height: auto;
  width: auto;
  margin: 20px;

`;

const Score = styled(IconContainer)`
  background-image: url("/img/Result/Score3.svg");
  background-size: cover;
  background-position: center center;
  min-height: 132px;
  min-width: 300px;
  height: auto;
  width: auto;
  margin: 20px;
  
`;

const RetryButton = styled(IconContainer)`
  background-image: url("/img/Result/RetryButton.svg");
  height: 76px;
  width: 200px;
`;

export default function Quiz({ params }) {
  const searchParams = useSearchParams();
  const duration = searchParams.get("duration");
  const solved = searchParams.get("solved");
  const total = searchParams.get("total");

  return (
    <Background>
      <BottomWrapper3>
        <CloseBottom onClick={() => { window.location.href = "/snack-quiz" }} />
      </BottomWrapper3>
      <Margin height="50" />
      <BottomWrapper2>
        <QuizResult />
        <Margin height="50" />
        
  
        
        <BottomWrapper1>
            <Time>
                <Typography variant="h4" align="center">
                    <strong>{duration}</strong>
                </Typography>
            </Time>
            

            <Score>  
                <Typography variant="h4" align="center">
                    <strong> {Math.round((solved / total) * 100)}점 ({solved} / {total}) </strong>
                </Typography>
            </Score>
        </BottomWrapper1>
        <Margin height="80" />
        <RetryButton onClick={() => { window.location.href = `/snack-quiz/${params.snack_id}` }} />

      </BottomWrapper2>
    </Background>
  );
}
