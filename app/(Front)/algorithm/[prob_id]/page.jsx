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
  Button,
  Modal,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import LoadError from "./load_error";
import Margin from "components/Margin/Margin";
import CloseIcon from "@mui/icons-material/Close";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

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

async function requestHint(title, code) {
  try {
    const response = await axios.post("/api/hint", {
      algorithm: title,
      code: code,
    });
    console.log("힌트 요청 결과 (requestHint):", response.data);
    return response; // 힌트 요청 결과 반환
  } catch (error) {
    console.error("힌트 요청 중 오류 발생:", error);
    throw error; // 오류를 호출자에게 다시 던집니다.
  }
}

async function requestReview(title, code) {
  try {
    const response = await axios.post("/api/review", {
      algorithm: title,
      code: code,
    });
    console.log("리뷰 요청 결과 (requestReview):", response.data);
    return response; // 리뷰 요청 결과 반환
  } catch (error) {
    console.error("리뷰 요청 중 오류 발생:", error);
    throw error; // 오류를 호출자에게 다시 던집니다.
  }
}

export default function Algorithm({ params }) {
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("cpp");
  const [isLoading, setIsLoading] = React.useState(true);
  const [submitResult, setSubmitResult] = React.useState([]);
  const [loadError, setLoadError] = React.useState(false);
  const [problem_data, setProblemData] = React.useState(null);
  const editorRef = React.useRef(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);
  const [hintText, setHintText] = React.useState(""); // 힌트 텍스트를 저장할 상태 추가
  const [loadingHint, setLoadingHint] = React.useState(false); // 힌트 로딩 상태를 저장할 상태 추가
  const [reviewText, setReviewText] = React.useState(""); // 리뷰 텍스트를 저장할 상태 추가
  const [loadingReview, setLoadingReview] = React.useState(false); // 리뷰 로딩 상태를 저장할 상태 추가

  const handleOpenModal = () => {
    setOpenModal(true);
    sendCodeAndRequestHint();
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleReviewCode = () => {
    setReviewModalOpen(true);
    sendCodeAndRequestReview();
  };

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

    };

    getProblem();
    setCode(languages[0].init);
  }, [params.prob_id]);

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

  function convertNewlineToBR(text) {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  function renderTextWithCodeBlocks(text) {
    const lines = text.split('\n');
  
    let output = [];
    let inCodeBlock = false;
    let codeBlock = '';
  
    for (let line of lines) {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // 코드 블록 종료
          output.push(
            <Editor
              key={output.length}
              height="100%"
              language={language}
              value={code}
              theme="vs-dark"
              options={{
                inlineSuggest: true,
                fontSize: "16px",
                formatOnType: true,
                autoClosingBrackets: true,
                minimap: { enabled: true },
              }}
            />
          );
          inCodeBlock = false; // 코드 블록 상태 변경
          codeBlock = ''; // 코드 블록 초기화
        } else {
          // 코드 블록 시작
          const lang = line.trim().replace('```', '');
          if (lang) {
            // 언어가 명시된 경우에만 코드 블록으로 처리
            inCodeBlock = true;
          }
        }
      } else {
        if (inCodeBlock) {
          // 코드 블록 내부
          codeBlock += line + '\n';
        } else {
          // 코드 블록 외부
          output.push(
            <React.Fragment key={output.length}>
              {convertNewlineToBR(line)}
            </React.Fragment>
          );
        }
      }
    }
    // 마지막 코드 블록 처리
    if (inCodeBlock && codeBlock) {
      output.push(
        <Editor
          key={output.length}
          height="100%"
          language={language}
          value={codeBlock}
          options={{
            readOnly: true,
            fontSize: 16,
          }}
        />
      );
    }
    return output;
  }
  

  async function handleSendCode() {
    const code = editorRef.current.getValue();
    const res = await axios.post(`/api/problems/${params.prob_id}`, {
      code: code,
      language: language,
    });

    const isCorrect = res.data.correct === 1; // 정답 여부 확인

    setSubmitResult([
      { time: new Date().toLocaleString(), correct: res.data.correct },
      ...submitResult,
    ]);
  }

  // sendCodeAndRequestHint 함수를 수정하여 title을 직접 인자로 받도록 변경합니다.
  async function sendCodeAndRequestHint() {
    setLoadingHint(true); // 로딩 상태를 true로 설정
    const code = editorRef.current.getValue(); // 사용자의 코드 가져오기

    try {
      const title = problem_data.title;
      // 힌트 요청 함수를 사용하여 서버로 요청을 보냅니다.
      const { data: hintRes, status: hintResStatus } = await requestHint(title, code);
      // 요청 결과를 처리합니다.
      console.log('힌트 요청 결과 (sendCodeRequestHint):', hintResStatus);

      // 힌트 응답이 있는지 확인하고 화면에 표시합니다.
      if (hintRes.length > 0 && hintResStatus === 200) {
        setHintText(hintRes, hintResStatus); // 힌트 텍스트를 상태에 저장합니다.
      } else {
        setHintText("힌트를 받아오지 못했습니다."); // 힌트 응답이 없는 경우 힌트가 없음을 상태에 저장합니다.
      }
    } catch (error) {
      console.error("힌트 요청 중 오류 발생:", error);
      setHintText("힌트를 받아오는 중 오류가 발생했습니다."); // 오류가 발생한 경우 오류 메시지를 힌트로 출력합니다.
    } finally {
      setLoadingHint(false); // 로딩 상태를 false로 설정
    }
  }


  async function sendCodeAndRequestReview() {
    setLoadingReview(true); // 로딩 상태를 true로 설정
    const code = editorRef.current.getValue(); // 사용자의 코드 가져오기

    try {
      const title = problem_data.title;
      // 힌트 요청 함수를 사용하여 서버로 요청을 보냅니다.
      const { data: reviewRes, status: reviewResStatus } = await requestReview(title, code);
      // 요청 결과를 처리합니다.
      console.log('리뷰 요청 결과 (sendCodeRequestReview):', reviewResStatus);

      // 힌트 응답이 있는지 확인하고 화면에 표시합니다.
      if (reviewRes.length > 0 && reviewResStatus === 200) {
        setReviewText(reviewRes, reviewResStatus); // 리뷰 텍스트를 상태에 저장합니다.
      } else {
        setReviewText("리뷰를 받아오지 못했습니다."); // 리뷰 응답이 없는 경우 리뷰가 없음을 상태에 저장합니다.
      }
    } catch (error) {
      console.error("리뷰 요청 중 오류 발생:", error);
      setReviewText("리뷰를 받아오는 중 오류가 발생했습니다."); // 오류가 발생한 경우 오류 메시지를 리뷰로 출력합니다.
    } finally {
      setLoadingReview(false); // 로딩 상태를 false로 설정
    }
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: "80vw",
            maxWidth: "800px",
            height: "80vh",
            maxHeight: "600px",
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "20px",
            boxShadow: 24,
            p: 2,
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "auto", // 스크롤 추가
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0, // 하단 여백 추가
            }}
          >
            <Box>
              <Image
                src="/img/Logo/WhyWrongLogo2.png"
                width={150}
                height={60}
                alt="logo"
              />
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {/* AI CODE HINT */}
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#6B308F", mb: 2 }}
          >
            AI CODE HINT
          </Typography>
          <Margin height="20" />
          {/* 여기에 원하는 텍스트 추가  여기에 코드가 들어가면 제대로 출력이 되는지 모르겠음 연결해봐야 할듯*/}
          {loadingHint ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%"}}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ height: '300px' }}>
                {renderTextWithCodeBlocks(hintText)}
              </Box>
            )
            }
        </Box>
      </Modal>

      <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: "80vw",
            maxWidth: "800px",
            height: "80vh",
            maxHeight: "600px",
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "20px",
            boxShadow: 24,
            p: 2,
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "auto", // 스크롤 추가
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0, // 하단 여백 추가
            }}
          >
            <Box>
              <Image
                src="/img/Logo/WhyWrongLogo2.png"
                width={150}
                height={60}
                alt="logo"
              />
            </Box>
            <IconButton
              aria-label="close"
              onClick={() => setReviewModalOpen(false)}
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {/* AI CODE HINT */}
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#6B308F", mb: 2 }}
          >
            AI CODE Review
          </Typography>
          <Margin height="20" />
          {/* 여기에 원하는 텍스트 추가  여기에 코드가 들어가면 제대로 출력이 되는지 모르겠음 연결해봐야 할듯*/}
          {loadingReview ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%"}}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ height: '300px' }}>
                {renderTextWithCodeBlocks(reviewText)}
              </Box>
            )
            }
        </Box>
      </Modal>

      <Typography variant="h4">
        <span className="basic-gray">{`#${params.prob_id}`}</span>{" "}
        {problem_data.title}
        <IconButton onClick={handleOpenModal} size="large">
          <TipsAndUpdatesIcon color="warning" sx={{ fontSize: 28 }} />
        </IconButton>
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
                <Box
                  key={index}
                  sx={{
                    marginLeft: "8px",
                    backgroundColor: "#f4f4f4",
                    padding: "8px",
                    borderRadius: "8px",
                    marginTop: "8px",
                    marginRight: "16px",
                  }}
                >
                  <Typography variant="body2">
                    <strong>입력</strong>
                  </Typography>
                  <Typography variant="body2">
                    {io?.input.split("\\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Typography>

                  <Typography variant="body2">
                    <strong>출력</strong>
                  </Typography>
                  <Typography variant="body2">
                    {io?.output.split("\\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Typography>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                borderRadius: "8px",
                padding: "8px",
                backgroundColor: "#f4f4f4",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSendCode()}
              >
                제출
              </Button>
              {submitResult.length > 0 && submitResult[0].correct === 1 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReviewCode()}
                >
                  코드 리뷰보기
                </Button>
              )}
              {/* <button onClick={() => {
                handleSendCode()
              }}>제출</button> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  height: "200px",
                  overflowY: "scroll",
                }}
              >
                {submitResult.map((result, index) => (
                  <SubmitRecord
                    key={index}
                    time={result.time}
                    correct={result.correct}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxHeight: "100vh",
            }}
          >
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
  const isCorrect = correct === 1 ? true : false;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: "8px",
        padding: "4px",
        backgroundColor: isCorrect ? "#ebffeb" : "#fdebeb",
        border: "1px solid #f4f4f4",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">{time}</Typography>
      <Typography variant="body2" sx={{ color: isCorrect ? "green" : "gray" }}>
        {isCorrect ? "맞았습니다!" : "틀렸습니다"}
      </Typography>
    </Box>
  );
};
