"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import MainQuizCard from "@/components/Card/MainQuizCard/MainQuizCard";
import Margin from "@/components/Margin/Margin";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Box, Button, Fab } from "@mui/material";

import { Edit, SouthEast } from "@mui/icons-material";

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

  async function makingSnack() {
    try {
      const title = prompt("스낵 문제의 제목을 입력해주세요.");

      const response = await axios.post(`/api/snack`, {
        title: title,
      });

      window.location.href = `/snack-quiz/making2?snack_id=${response.data.snack_id}&title=${title}`;
    } catch (error) {
      console.error("Error fetching snack data:", error);
    }
  }

  return !isLoading ? (
    <>
      <Margin height="10" />
      {/* <MainTitle text="A 알고리즘 >" /> */}

      <Wrapper>
        {problems.map((item, idx) => (
          <Link
            key={idx}
            href={`/snack-quiz/${item.snack_id}?title=${item.title}`}
            style={{ textDecoration: "none" }}
          >
            <MainQuizCard
              image={`https://source.unsplash.com/random?${idx}`}
              title={item.title}
              view={item.views}
            />
          </Link>
        ))}
      </Wrapper>

      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: "5vw",
          bottom: "5vh",
        }}
      >
        <SouthEast
          className="blinking"
          color="secondary"
          sx={{ height: "90px", width: "90px" }}
        />
        <Fab
          onClick={makingSnack}
          color="secondary"
          aria-label="add"
          size="large"
        >
          <Edit />
        </Fab>
      </Box>
    </>
  ) : (
    <div></div>
  );
}
