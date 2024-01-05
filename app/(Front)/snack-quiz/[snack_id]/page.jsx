"use client";
import * as React from "react";
import styled from "styled-components";
import MainTitle from "@/components/MainTitle/MainTitle";
import MainCard from "@/components/Card/MainCard/MainCard";
import Margin from "@/components/Margin/Margin";
import QuizCard from "@/components/Card/QuizCard/QuizCard";
import Typo from "@/components/Typo/Typo";

import { Typography, Box, LinearProgress } from "@mui/material";

import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const TitleWrapper = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`;
const Wrapper = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  left: 0px;
  top: 0px;

  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`;

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

export default function Quiz({ params }) {
  const [snackQuizData, setSnackQuizData] = React.useState([]);
  const [selectedButtons, setSelectedButtons] = React.useState({}); // 각 퀴즈별 선택된 버튼 상태
  const [progress, setProgress] = React.useState(0);
  const searchParams = useSearchParams();
  const [solved, setSolved] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const title = searchParams.get("title");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/snack/${params.snack_id}`);
        // 초기에 각 퀴즈의 선택 상태를 빈 객체로 설정
        const initialSelectedButtons = response.data.reduce(
          (acc, quiz) => ({ ...acc, [quiz.snack_quiz_id]: null }),
          {},
        );
        setSelectedButtons(initialSelectedButtons);
        console.log(selectedButtons);

        setSnackQuizData(response.data);
        console.log(response.data);

        setStartTime(new Date());
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const solved = Object.values(selectedButtons).filter((button) => button !== null).length;
    setSolved(solved);
    const total = Object.values(selectedButtons).length;
    setTotal(total);

    setProgress((solved / total) * 100);
  }, [selectedButtons]);

  const handleButtonClick = (quizId, buttonNumber) => {
    // 기존의 선택된 버튼이면 해제, 아니면 선택
    setSelectedButtons((prevSelected) => {
      return {
        ...prevSelected,
        [quizId]: prevSelected[quizId] === buttonNumber ? null : buttonNumber,
      }
    });
    console.log(selectedButtons);
  };

  async function handleSubmission() {
    try {
      if (progress < 99) {
        alert("모든 문제를 풀어주세요.");
        return;
      }
      const response = await axios.post(`/api/snack/${params.snack_id}/submission`, {
        ...selectedButtons,
      });
      setEndTime(new Date());
      console.log(response.data);
      const correct = response.data.ans_count;
      const total_ = response.data.tot_count;
      window.location.href = `/snack-quiz/${params.snack_id}/result?title=${title}&duration=${Math.floor((new Date() - startTime) / 1000)}&solved=${correct}&total=${total_}`;
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
      alert("제출 중 오류가 발생했습니다.");
    }
  }

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Typography variant="h3">
            <strong>
              {title}
            </strong>
          </Typography>
        </TitleWrapper>
        {snackQuizData.map((quiz) => (
          <QuizCard
            key={quiz.snack_quiz_id}
            quizId={quiz.snack_quiz_id} // 퀴즈 아이디 추가
            quiz_title={quiz.title}
            text={quiz.description}
            b1={quiz.selections["1"]}
            b2={quiz.selections["2"]}
            b3={quiz.selections["3"]}
            b4={quiz.selections["4"]}
            selectedButton={selectedButtons[quiz.snack_quiz_id]} // 각 퀴즈에 대한 선택된 버튼 상태
            onButtonClick={handleButtonClick} // 버튼 클릭 핸들러
          />
        ))}
        <ResultBottom onClick={() => handleSubmission()} />
      </Wrapper>
      <Margin height="50" />
      <Box sx={{ width:"100%", position: "fixed", bottom: "0px", left: "0" }}>
        <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ height: "8px", }} />
      </Box>
    </>
  );
}

/*export default function Quiz( { params } ){
    const 
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

           
             
             <Link href="/snack-quiz/quiz/result" style={{textDecoration:"none"}}>
              <ResultBottom/>
            </Link>
            </Wrapper>
            <Margin height="20"/>

        </>
    )
}*/
