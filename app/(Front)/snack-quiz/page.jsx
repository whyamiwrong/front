"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import MainQuizCard from "@/components/Card/MainQuizCard/MainQuizCard"
import Margin from "@/components/Margin/Margin";
import Link from "next/link";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Wrapper1 = styled.div`
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

const Wrapper2 = styled.div`
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
        const [snackData, setSnackData] = useState([]);
      
        useEffect(() => {
          async function fetchData() {
            try {
              const response = await axios.get(`/api/snack`);
              setSnackData(response.data);
            } catch (error) {
              console.error('Error fetching snack data:', error);
              setSnackData([]); // 에러 발생 시 빈 배열로 초기화
            }
          }
      
          fetchData();
        }, []);
      
        return (
          <>
            <MainTitle text="SNACK QUIZ" />
            <Wrapper1>
              {snackData.map((item) => (
                <Link href={`/snack-quiz/${item.snack_id}?title=${item.title}`} key={item.snack_id} style={{ textDecoration: 'none' , textDecorationColor: 'none'}}>
                  <MainQuizCard
                    image={`https://source.unsplash.com/random?${item.snack_id}`}
                    title={item.title}
                    view={item.views}
                  />
                </Link>
              ))}
            </Wrapper1>
          </>
        );
      }
/*export default function Snack() {

   return (
    <>
    <MainTitle text="SNACK QUIZ"/>
    <Wrapper1>
        <Link href="/snack-quiz/quiz" style={{textDecoration:"none"}}>
                <MainQuizCard

                        image={"https://source.unsplash.com/random"}
                        title={"입출력과 사칙연산"}
                        view={13}
                        />
        </Link>                     
    </Wrapper1>

    </>
   )
}*/