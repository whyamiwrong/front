"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import Typo from "@/components/Typo/Typo";


const Background = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute; //내부 div들도 absolute로 두고 z-index 우선순위
  top: 0px;
  left:0px;

  background-image: url("/img/Result/result1.svg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: none;
  border-radius: 10px;


  height: 100vh;
  width: 100vw;
`;

export default function Quiz(){
    return(
        <Background>
            <Typo>안녕하세요</Typo>
        </Background>

    )
}