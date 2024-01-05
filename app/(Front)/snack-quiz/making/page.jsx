"use client"

import {
  Typography,
  Box,
  TextField,
  LinearProgress,
  Button,
  ButtonGroup,
} from "@mui/material";

import * as React from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import QuizCard from "@/components/Card/QuizCard/QuizCard";

export default function Making({ params }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const snack_id = searchParams.get("snack_id");
  const [snackQuizData, setSnackQuizData] = React.useState([]);
  const [selectedButtons, setSelectedButtons] = React.useState({}); // 각 퀴즈별 선택된 버튼 상태
  const [command, setCommand] = React.useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/snack/${snack_id}`);
      // 초기에 각 퀴즈의 선택 상태를 빈 객체로 설정
      const initialSelectedButtons = response.data.reduce(
        (acc, quiz) => ({ ...acc, [quiz.snack_quiz_id]: null }),
        {},
      );
      setSelectedButtons(initialSelectedButtons);
      console.log(selectedButtons);

      setSnackQuizData(response.data.sort((a, b) => b.snack_quiz_id - a.snack_quiz_id));
      console.log(response.data);

      setStartTime(new Date());
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };

  React.useEffect(() => {

    fetchData();
  }, []);

  const handleCommand = (e) => {
    setCommand(e.target.value);
    console.log(command)
  }

  const handleSubmit = async () => {
    if (command.length <= 1) {
      alert("너무 짧습니다");
      return;
    }
    const res = await axios.post(`/api/gpt`, {
      snack_id: Number(snack_id),
      title: command,
    });
    console.log(res.data);
    fetchData();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "" }}>
        <img src="data:image/png;base64,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"
          height={"30px"}  width={"30px"}/>
        <Typography variant="h3" sx={{ marginX: "16px" }}>
          <span className="basic-gray">#1</span> { title ? title: "스낵 문제 제작"}
        </Typography>
        <span className="basic-gray">Beta</span>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", }}>
        <TextField fullWidth label="원하는 객관식 문제의 주제를 작성해 주세요" onChange={handleCommand} />
        <Button onClick={handleSubmit} variant="contained" color="success" sx={{ width:"200px", boxShadow: "none" }}>출제하기</Button>
      </Box>
      <Box>
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
            // onButtonClick={handleButtonClick} // 버튼 클릭 핸들러
          />
        ))}
      </Box>
    </Box>
  )
}