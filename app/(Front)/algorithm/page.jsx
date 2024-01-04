"use client";

import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import Link from "next/link";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  overflow-x: hidden;
  text-decoration: none;
`;
const SliderXwrapper2 = styled.div`
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 300px;
  width: 100%;
  scroll-snap-type: x mandatory;
`;
const SliderXwrapper = styled.div`
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
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

export default function Algorithm() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [problems, setProblems] = React.useState([]);

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

  return !isLoading ? (
    <>
      <Margin height="10" />
      {/* <MainTitle text="A 알고리즘 >" /> */}
        <Wrapper>
          {problems.map((problem, idx) => (
            <Link key={idx} href={`/algorithm/${problem.problem_id}`} style={{textDecoration: "none"}}>
              <MainCard
                image={`https://source.unsplash.com/random?${idx}`}
                title={problem.problems?.title}
                category={problem.problems?.algorithm_category}
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
