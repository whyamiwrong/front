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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import LoadError from "./load_error";

// const problem_data = {
//   description: "문제 설명",
//   time_limit: 1000,
//   memory_limit: 512,
//   input: "첫째 줄에 N이 주어진다. (1 <= N <= 10^8)",
//   output: "두번째 줄에 피보나치 수열의 N번째 항을 출력한다.",
//   example: [
//     {
//       input: "5",
//       output: "5",
//     },
//     {
//       input: "6",
//       output: "6",
//     },
//   ],
//   algorithm: ["배열", "다이나믹 프로그래밍"],
// };

const languages = [
  {
    value: "cpp",
    label: "C++17",
    valid: true,
    init: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!";\n\treturn 0;\n}`,
  },
  {
    value: "java",
    label: "Java 11",
    valid: false,
    init: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`,
  },
  {
    value: "python",
    label: "Python 3",
    valid: false,
    init: `print("Hello, World!")`,
  },
];

export default function Algorithm({ params }) {
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("cpp");
  const [isLoading, setIsLoading] = React.useState(true);
  const [submitResult, setSubmitResult] = React.useState([]);
  const [loadError, setLoadError] = React.useState(false);

  const [problem_data, setProblemData] = React.useState(null);
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    const getProblem = async () => {
      const res = await axios.get(`/api/problems/${params.prob_id}`);
      console.log(res.data);
      const problem_data = res.data;
      setProblemData(problem_data);
      if (res.status !== 200) {
        setLoadError(true);
      }

    setIsLoading(false);
    }

    getProblem();
    setCode(languages[0].init);
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
    const lang = languages.find((lang) => lang.value === event.target.value);
    setCode(lang.init);
  }

  function handleEditorChange(value, event) {
    console.log(value);
    setCode(value);
  }

  async function handleSendCode() {
    const code = editorRef.current.getValue();
    const res = await axios.post(`/api/problems/${params.prob_id}`, {
      code: code,
      language: language,
    });
    
    setSubmitResult([{ time: new Date().toLocaleString(), correct: res.data.correct }, ...submitResult]);
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
        <span className="basic-gray">{`#${params.prob_id}`}</span> {problem_data.title}
      </Typography>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12} sm={6}>
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
                {problem_data.time_limit * 1000}ms
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
              <Typography variant="h6">예제 입출력</Typography>
              <Divider />
              {problem_data.examples.map((io, index) => (
                <Box key={index} sx={{ marginLeft: "8px", backgroundColor: "#f4f4f4", padding: "8px", borderRadius: "8px", marginTop: "8px", marginRight: "16px" }}>
                  <Typography variant="body2">
                    <strong>입력</strong>
                  </Typography>
                  <Typography variant="body2">{
                  io?.input.split('\\n').map((line, index) => (
                    <span key={index}>{line}<br /></span>
                  ))
                  }</Typography>

                  <Typography variant="body2">
                    <strong>출력</strong>
                  </Typography>
                  <Typography variant="body2">{
                  io?.output.split('\\n').map((line, index) => (
                    <span key={index}>{line}<br /></span>
                  ))
                  }</Typography>
                </Box>
              ))}
            </Box>
            <Box>
              <Typography variant="h6">알고리즘 분류</Typography>
              <Divider />
              {/* {problem_data.algorithm.map((algo, index) => ( */}
                <Typography variant="body2">
                  ⏺ {problem_data.algorithm_category}
                  {/* ⏺ {algo} */}
                </Typography>
              {/* ))} */}
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              borderRadius: "8px",
              padding: "8px",
              backgroundColor: "#f4f4f4",
            }}>
              <Button variant="contained" color="success" onClick={() => handleSendCode()}>
                제출
              </Button>
              {/* <button onClick={() => {
                handleSendCode()
              }}>제출</button> */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", height: "200px", overflowY: "scroll"}}>
                {submitResult.map((result, index) => (
                  <SubmitRecord key={index} time={result.time} correct={result.correct} />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: "100vh" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">언어</InputLabel>
              <Select
                labelId="language-select-small-label"
                id="language-select-small"
                value={language}
                label="language"
                onChange={handleLanguageChange}
              >
                {languages.map((lang, index) => (
                  <MenuItem key={index} value={lang.value}>
                    <FiberManualRecordIcon
                      sx={{
                        color: lang.valid ? "success.main" : "error.main",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    />
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Editor
              height="100%"
              language={language}
              value={code}
              theme="vs-dark"
              // onChange={handleEditorChange}
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
          </Box>
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


const SubmitRecord = ({ time, correct }) => {
  const isCorrect = correct == 1 ? true : false;

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      borderRadius: "8px",
      padding: "4px",
      backgroundColor: isCorrect ? "#ebffeb" : "#fdebeb",
      border: "1px solid #f4f4f4",
      justifyContent: "space-between",
    }}>
      <Typography variant="body2">
        {time}
      </Typography>
      <Typography variant="body2" sx={{color: isCorrect ? "green" : "gray"}}>
        {isCorrect ? "맞았습니다!!!" : "틀렸습니다"}
      </Typography>
    </Box>
  )
}