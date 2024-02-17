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
  Modal
  
} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import IconButton from '@mui/material/IconButton';
import HighlightIcon from '@mui/icons-material/Highlight';
import Image from 'next/image';
import LoadError from "./load_error";
import Margin from "components/Margin/Margin";
import CloseIcon from '@mui/icons-material/Close';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

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
async function requestHint(title, code) {
  try {
    const response = await axios.post('/api/hint', {
      algorithm: title,
      code: code
    });
    console.log('힌트 요청 결과:', response.data);
    return response.data; // 힌트 요청 결과 반환
  } catch (error) {
    console.error('힌트 요청 중 오류 발생:', error);
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

  const handleOpenModal = () => {
    setOpenModal(true);
    sendCodeAndRequestHint();
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleReviewCode = () => {
    setReviewModalOpen(true);
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
    sendCodeAndRequestHint(problem_data.title); // problem_data가 설정된 후에 힌트 요청을 보냅니다.
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
    
    const isCorrect = res.data.correct === 1; // 정답 여부 확인

    setSubmitResult([{ time: new Date().toLocaleString(), correct: res.data.correct}, ...submitResult]);
  }

 // sendCodeAndRequestHint 함수를 수정하여 title을 직접 인자로 받도록 변경합니다.
  async function sendCodeAndRequestHint(title) {
    setLoadingHint(true); // 로딩 상태를 true로 설정
    const code = editorRef.current.getValue(); // 사용자의 코드 가져오기
    
    try {
      // 힌트 요청 함수를 사용하여 서버로 요청을 보냅니다.
      const hintResponse = await requestHint(title, code);
      // 요청 결과를 처리합니다.
     // console.log('힌트 요청 결과:', hintResponse);

      // 힌트 응답이 있는지 확인하고 화면에 표시합니다.
      if (hintResponse.length > 0 && hintResponse[0].text) {
        setHintText(hintResponse[0].text); // 힌트 텍스트를 상태에 저장합니다.
      } else { 
        setHintText("힌트를 받아오지 못했습니다."); // 힌트 응답이 없는 경우 힌트가 없음을 상태에 저장합니다.
      }
    } catch (error) {
      console.error('힌트 요청 중 오류 발생:', error);
      setHintText("힌트를 받아오는 중 오류가 발생했습니다."); // 오류가 발생한 경우 오류 메시지를 힌트로 출력합니다.
    } finally {
      setLoadingHint(false); // 로딩 상태를 false로 설정
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
        
        <Box sx={{
          position: 'absolute',
          width: '80vw',
          maxWidth: '600px',
          height: '80vh',
          maxHeight: '600px',
          bgcolor: 'background.paper',
          border: 'none',
          borderRadius: '20px',
          boxShadow: 24,
          p: 2,
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflowY: 'auto', // 스크롤 추가
        }}>
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0, // 하단 여백 추가
      }}
    >
      <Box>
        <Image src="/img/Logo/WhyWrongLogo2.png" width={150} height={60} />
      </Box>
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    {/* AI CODE HINT */}
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#6B308F', mb: 2 }}>
      AI CODE HINT
    </Typography>
    <Margin height='20'/>
          {/* 여기에 원하는 텍스트 추가  여기에 코드가 들어가면 제대로 출력이 되는지 모르겠음 연결해봐야 할듯*/}
          <Typography variant="body1" sx={{ fontSize: "16px", lineHeight: "1.6" }}>
            {hintText}
          </Typography>
          
          
        </Box>
    </Modal> 

    <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          width: '80vw',
          maxWidth: '600px',
          height: '80vh',
          maxHeight: '600px',
          bgcolor: 'background.paper',
          border: 'none',
          borderRadius: '20px',
          boxShadow: 24,
          p: 2,
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflowY: 'auto', // 스크롤 추가
        }}>
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0, // 하단 여백 추가
      }}
    >
      <Box>
        <Image src="/img/Logo/WhyWrongLogo2.png" width={150} height={60} />
      </Box>
      <IconButton
        aria-label="close"
        onClick={() => setReviewModalOpen(false)}
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    {/* AI CODE HINT */}
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#6B308F', mb: 2 }}>
      AI CODE Review
    </Typography>
    <Margin height='20'/>
          {/* 여기에 원하는 텍스트 추가  여기에 코드가 들어가면 제대로 출력이 되는지 모르겠음 연결해봐야 할듯*/}
          <Typography variant="body1" sx={{ fontSize: "16px", lineHeight: "1.6" }}>
            {/* 첫 번째 문장 */}
            원하는 내용을 여기에 추가하세요. 이노베이션 아카데미(Innovation Academy)는 혁신과 창의성을 중심으로 하는 교육기관으로, 학생들에게 미래 사회에서 필요한 역량과 지식을 제공하는 핵심적인 역할을 합니다. 

            <br />
            {/* 두 번째 문장 */}
            이 아카데미는 전통적인 교육 방식을 벗어나 새로운 접근법과 학습 경험을 제공하여 학생들이 문제를 해결하고 혁신적인 아이디어를 발전시킬 수 있도록 돕습니다.
            <br />
            {/* 세 번째 문장 */}
            이노베이션 아카데미는 학생 중심의 학습 환경을 조성하여, 학생들이 자신의 관심과 역량을 발휘할 수 있는 기회를 제공합니다. 학생들은 실제 문제 해결에 대한 프로젝트를 수행하고, 팀원들과 협력하여 창의적인 솔루션을 찾아냅니다. 

          </Typography>
        </Box>
    </Modal> 


      <Typography variant="h4">
        <span className="basic-gray">{`#${params.prob_id}`}</span> {problem_data.title}
        <IconButton onClick={handleOpenModal} size="large">
          <TipsAndUpdatesIcon color="warning" sx={ {fontSize: 28}}/>
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
              {submitResult.length > 0 && submitResult[0].correct === 1 && (
                <Button variant="contained" color="secondary" onClick={() => handleReviewCode()}>
                  코드 리뷰보기
                </Button>
              )}
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
  const isCorrect = correct === 1 ? true : false;

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
        {isCorrect ? "맞았습니다!" : "틀렸습니다"}
      </Typography>
    </Box>
  )
}

