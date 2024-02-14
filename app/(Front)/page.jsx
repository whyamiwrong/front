"use client";
import * as React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "components/MediaCard";
import MainCard from "components/Card/MainCard/MainCard";
import Margin from "../../components/Margin/Margin";
import Image from "next/image";
import AdSlider from "../../components/Card/AdCard/AdCard";
import { RecoilRoot } from "recoil";
import Horizon from "../../components/Horizon/Horizon";
import MainTitle from "../../components/MainTitle/MainTitle";
import Typo from "@/components/Typo/Typo";
import CodeReviewCard from "../../components/Card/CodeReviewCard/CodeReviewCard"
import Link from "next/link";
import MainQuizCard from "@/components/Card/MainQuizCard/MainQuizCard"
import axios from "axios";
import HomeInfo from "@/components/HomeInfo/HomeInfo"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: whitesmoke;
`;

const SliderXwrapper2 = styled.div`
  position: relative;
  overflow-x: scroll;
  overFlow-y: hidden;
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
`;

export default function HomePage() {
        const [isLoading, setIsLoading] = React.useState(true);
        const [problems, setProblems] = React.useState([]);
        const [snacks, setSnacks] = React.useState([]);

        React.useEffect(() => {
          const getSnack = async () => {
            const res = await axios.get(`/api/snack`);
            setIsLoading(false);
            setSnacks(res.data);
            console.log(res.data);
            if (res.status !== 200) {
              setLoadError(true);
            }
          };
          
          getSnack();
        }, []);

        React.useEffect(() => {
          const getProblems = async () => {
            const res = await axios.get(`/api/problems`);
            setIsLoading(false);
            setProblems(res.data);
            console.log(res.data);
            if (res.status !== 200) {
              setLoadError(true);
            }
          };
      
          getProblems();
        }, []);


  return !isLoading ?(
<RecoilRoot>
        <AdSlider />
        <Margin height="30" />
        <HomeInfo/>
        <Margin height="30"/>
        <Link href="/algorithm1" style={{textDecoration:"none"}}>
          <MainTitle text="인기있는 알고리즘 풀러 가볼까요? >" />
        </Link>
        <SliderXwrapper2>
          <SliderXItems>
          {problems.map((problem, idx) => (
            <Link key={idx} href={`/algorithm/${problem.problem_id}`} style={{textDecoration: "none"}}>
              <MainCard
                image={`https://source.unsplash.com/random/?programming,algorithm,math?${idx}`}
                title={problem?.title}
                category={problem?.algorithm_category}
              />
            </Link>
          ))
          }
          </SliderXItems>
          </SliderXwrapper2>

          <Link href="/snack-quiz" style={{textDecoration:"none"}}>
          <MainTitle text="Snack Quiz? >" />
          </Link>
          <SliderXwrapper2>
          <SliderXItems>
          
                {snacks.map((item, idx) => (
                  <Link key={idx} href={`/snack-quiz/${item.snack_id}?title=${item.title}`} style={{textDecoration: "none"}}>
                    <MainQuizCard
                      image={`https://source.unsplash.com/random/?programming,quiz${idx}`}
                      title={item.title}
                      view={item.views}
                    />
                  </Link>
                ))
              }
          </SliderXItems>
          </SliderXwrapper2>

          
    </RecoilRoot>
    ) : (
      <div></div>
  );
}