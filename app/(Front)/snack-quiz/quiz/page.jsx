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
    left: -50px;
    top:-20px;

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
   
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: auto;
    justify-content: center;
    flex-direction: column;
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

const ResultBottom = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("/img/Result/result_bottom.svg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: none;
    //border-radius: 10px;
    cursor: pointer;

    height: 65px;
    width: 170px;
`;

export default function Quiz(){
    return(
        <>
            <TitleWrapper>
                <Typo size="2.5rem" weight= "800"> 피보나치 수열 quiz </Typo>
            </TitleWrapper>
            <Wrapper>    
             <QuizCard
             //image={"/img/Logo/WhyWrongLogo.png"}
             quiz_title ={"입출력과 사칙연산"}
             text={"프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."}
             b1={"트리에는 사이클(Cycle)이 포함될 수 있다."}
             b2={"노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."}
             b3={"트리는 그래프의 한 종류라고 할 수 있다."}
             b4={"트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."}
             />

            <QuizCard
             //image={"/img/Logo/WhyWrongLogo.png"}
             quiz_title ={"입출력과 사칙연산"}
             text={"프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."}
             b1={"트리에는 사이클(Cycle)이 포함될 수 있다."}
             b2={"노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."}
             b3={"트리는 그래프의 한 종류라고 할 수 있다."}
             b4={"트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."}
             />
            <QuizCard
             //image={"/img/Logo/WhyWrongLogo.png"}
             quiz_title ={"입출력과 사칙연산"}
             text={"프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."}
             b1={"트리에는 사이클(Cycle)이 포함될 수 있다."}
             b2={"노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."}
             b3={"트리는 그래프의 한 종류라고 할 수 있다."}
             b4={"트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."}
             />
            <QuizCard
             //image={"/img/Logo/WhyWrongLogo.png"}
             quiz_title ={"입출력과 사칙연산"}
             text={"프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."}
             b1={"트리에는 사이클(Cycle)이 포함될 수 있다."}
             b2={"노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."}
             b3={"트리는 그래프의 한 종류라고 할 수 있다."}
             b4={"트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."}
             />
            <QuizCard
             //image={"/img/Logo/WhyWrongLogo.png"}
             quiz_title ={"입출력과 사칙연산"}
             text={"프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."}
             b1={"트리에는 사이클(Cycle)이 포함될 수 있다."}
             b2={"노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."}
             b3={"트리는 그래프의 한 종류라고 할 수 있다."}
             b4={"트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."}
             />
            <QuizCard
             //image={"/img/Logo/WhyWrongLogo.png"}
             quiz_title ={"입출력과 사칙연산"}
             text={"프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."}
             b1={"트리에는 사이클(Cycle)이 포함될 수 있다."}
             b2={"노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."}
             b3={"트리는 그래프의 한 종류라고 할 수 있다."}
             b4={"트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."}
             />
             
             
             <ResultBottom/>
            </Wrapper>
            <Margin height="20"/>

        </>
    )
}