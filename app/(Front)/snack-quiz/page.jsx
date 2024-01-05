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



const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
 // margin: 0 auto;
  //overflow-x: hidden;
  //text-decoration: none;
`;



export default function Snack() {
        const [isLoading, setIsLoading] = React.useState(true);
        const [problems, setProblems] = React.useState([]);
      
        React.useEffect(() => {
          const getProblems = async () => {
            const res = await axios.get(`/api/snack`);
            setIsLoading(false);
            setProblems(res.data);
            console.log(res.data);
            if (res.status !== 200) {
              setLoadError(true);
            }
          };
      
          getProblems();
        }, []);
      
        return !isLoading ? (
          <>
            <Margin height="10" />
            {/* <MainTitle text="A 알고리즘 >" /> */}

              <Wrapper>
                {problems.map((item, idx) => (
                  <Link key={idx} href={`/snack-quiz/${item.snack_id}?title=${item.title}`} style={{textDecoration: "none"}}>
                    <MainQuizCard
                      image={`https://source.unsplash.com/random?${idx}`}
                      title={item.title}
                      view={item.views}
                    />
                  </Link>
                ))
                }
              </Wrapper>
            
                   
          </>
        ) : (
          <div></div>
        );
      }
/*export default function Snack() {
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
                <Link href={`/snack-quiz/${item.snack_id}?title=${item.title}`} key={item.snack_id} style={{ textDecoration: 'none' }}>
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