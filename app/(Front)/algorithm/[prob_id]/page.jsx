"use client";

import axios from "axios";

import * as React from "react";
import Editor from "@monaco-editor/react";
import {
  Box,
  Grid,
  Backdrop,
  CircularProgress,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import LoadError from "./load_error";

const problem_data = {
  description: "문제 설명",
  time_limit: 1000,
  memory_limit: 512,
  input: "첫째 줄에 N이 주어진다. (1 <= N <= 10^8)",
  output: "두번째 줄에 피보나치 수열의 N번째 항을 출력한다.",
  example: [
    {
      input: "5",
      output: "5",
    },
    {
      input: "6",
      output: "6",
    },
  ],
  algorithm: ["배열", "다이나믹 프로그래밍"],
};

export default function Algorithm({ params }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    const getProblem = async () => {
      const res = await axios.get(`/api/problem/${params.prob_id}`);
      console.log(res.data);
    };

    setIsLoading(false);
    // setLoadError(true);
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleSendCode() {
    const code = editorRef.current.getValue();
    console.log(code);
  }

  return !isLoading ? (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "42px",
      }}
    >
      <Typography variant="h4">
        <span className="basic-gray">{`#${params.prob_id}`}</span> title
      </Typography>
      {/* <button onClick={() => handleSendCode()}>code</button> */}

      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Box>
              <Typography variant="h6">문제</Typography>
              <Divider />
              <Typography variant="body2">
                {problem_data.description}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">시간 제한</Typography>
              <Divider />
              <Typography variant="body2">
                {problem_data.time_limit}ms
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">메모리 제한</Typography>
              <Divider />
              <Typography variant="body2">
                {problem_data.memory_limit}mb
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">입력</Typography>
              <Divider />
              <Typography variant="body2">{problem_data.input}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">출력</Typography>
              <Divider />
              <Typography variant="body2">{problem_data.output}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">예제 입력</Typography>
              <Divider />
              {problem_data.example.map((io, index) => (
                <Box key={index} sx={{ marginLeft: "8px" }}>
                  <Typography variant="body2">
                    <strong>입력</strong>
                  </Typography>
                  <Typography variant="body2">{io?.input}</Typography>

                  <Typography variant="body2">
                    <strong>출력</strong>
                  </Typography>
                  <Typography variant="body2">{io?.output}</Typography>
                </Box>
              ))}
            </Box>
            <Box>
              <Typography variant="h6">알고리즘 분류</Typography>
              <Divider />
              {problem_data.algorithm.map((algo, index) => (
                <Typography key={index} variant="body2">
                  ⏺ {algo}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              inlineSuggest: true,
              fontSize: "16px",
              formatOnType: true,
              autoClosingBrackets: true,
              // minimap: { scale: 10 },
              minimap: { enabled: false },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
      <Box sx={{ position: "fixed" }}>{loadError && <LoadError />}</Box>
    </Backdrop>
  );
}
