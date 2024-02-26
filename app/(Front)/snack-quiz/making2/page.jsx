"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  styled,
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardActions,
  Fab,
  Grid,
  Skeleton,
} from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import {
  AddAPhoto,
  AddPhotoAlternate,
  PictureAsPdf,
  CloudUploadRounded,
  DeleteForeverRounded,
  Send,
} from "@mui/icons-material";
import Image from "next/image";
import axios from "axios";
import Loading from "@/components/loading";
import QuizCard from "@/components/Card/QuizCard/QuizCard";
import SwipeableTabs from "./SwipeableTabs";


const MyPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const snack_id = searchParams.get("snack_id");
  const [snackQuizData, setSnackQuizData] = React.useState([]);
  const [selectedButtons, setSelectedButtons] = React.useState({}); // 각 퀴즈별 선택된 버튼 상태

  const [tabValue, setTabValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPromptLoading, setIsPromptLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [myMessage, setMyMessage] = React.useState([]);
  const [promptMessage, setPromptMessage] = React.useState([]);

  const [typeOption, setTypeOption] = React.useState("multi"); // multi, ox
  const [difficultyOption, setDifficultyOption] = React.useState("medium"); // easy, medium, hard
  const [versionOption, setVersionOption] = React.useState("text"); // image, text

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

      setIsLoading(false);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setExpanded(true);
      setTabValue(1);
      fetchData();
    }, 500);
  }, []);

  function handleFileAdd(event) {
    if (images.length >= 5) {
      alert('You can upload up to 5 images.');
      return;
    }

    setVersionOption("image");

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(',')[1]; // base64 부분만 추출
        setImages([...images, base64]);
        // 여기서 API 요청을 보낼 수 있습니다.
        // 예: sendToApi(base64);
      };
      reader.readAsDataURL(file);
      setExpanded(true);
    }
  };

  function handleFileDelete(idx) {
    setImages(
      images.filter((_, index) => index !== idx)
    );
  }

  async function handleMessageSend(msg) {
    if (msg === "") {
      alert("지시문을 입력해주세요.");
      return;
    }

    if (versionOption === "image" && images.length === 0) {
      alert("이미지로 문제를 만들기 위해서 이미지를 업로드해주세요.");
      return;
    }

    setTabValue(1);
    setIsPromptLoading(true);
    setExpanded(false);
    setTimeout(() => {
      document.querySelector("#footer").scrollIntoView();
    }, 1000);
    
    setMyMessage([...myMessage, msg]);

    try {
      const res = await axios.post('/api/gpt', {
        snack_id: Number(snack_id),
        version: versionOption,
        type: typeOption,
        subject: myMessage[myMessage.length - 1],
        difficulty: difficultyOption,
        images: images,
      })

      if (res.status != 200) {
        setIsPromptLoading(false);
        setPromptMessage([...promptMessage, "오류가 발생했습니다. 다시 시도해주세요."]);
        return;
      } else {
        console.log(res);
        const title = res.data.title;
        const description = res.data.description;
        let msg = <><strong>제목: </strong>{title}<br/><strong>설명</strong>{description}</>;
        setPromptMessage([...promptMessage, msg]);
        console.log(promptMessage);
        await fetchData();

        setIsPromptLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setPromptMessage([...promptMessage, "오류가 발생했습니다. 다시 시도해주세요."]);
    }
    setIsPromptLoading(false);
  }

  const ImageTab = () => {
    return (
      <Box sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 12}}>
          {images.map((img, idx) => (
            <Grid item xs={2} sm={2} md={4} key={idx}>
              <Card>
                <CardMedia
                  image={`data:image/jpeg;base64,${img}`}
                  sx={{ display: 'flex', height: '140px', alignItems: 'center', justifyContent: 'center' }}
                >
                </CardMedia>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handleFileDelete(idx)} component="label" variant="contained" color="error">
                    <DeleteForeverRounded />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={2} sm={2} md={4}>
            <Card>
              <CardMedia
                sx={{ display: 'flex', height: '140px', alignItems: 'center', justifyContent: 'center' }}
              >
                <Fab component="label" color="primary" aria-label="add">
                  <CloudUploadRounded />
                  <VisuallyHiddenInput type="file" onChange={handleFileAdd} />
                </Fab>
              </CardMedia>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const MakingTab = () => {
    return (
      <Box sx={{ flexGrow: 1, justifyContent: 'center', pb: 8 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap:'16px' }}>
          { // My Message
            myMessage.map((msg, idx) => (
              <span key={idx}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box sx={{ bgcolor: 'purple', color: 'white', p: 1.5, borderRadius: '16px', borderBottomRightRadius: '0px', maxWidth: 'calc(100vw - 130px)', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>
                    {msg}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}> */}
                      <Image src="/icon/gemini_icon.svg" width={344/5} height={127/5} alt="gemini" />
                    {/* </Box> */}
                    <Box sx={{ bgcolor: 'Highlight', p: 1.5, borderRadius: '16px', borderBottomLeftRadius: '0px', maxWidth: 'calc(100vw - 130px)', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>
                      { isPromptLoading && idx === Number(myMessage.length - 1) ?
                        [0,0,0,0].map((v, i) => <Skeleton key={i} variant="text" width={200} sx={{ bgcolor: 'white-gray' }}/> ) : (
                          // <>Computer Science</>
                          (
                            <>
                              { promptMessage[idx] }
                            </>
                          ) || ("오류가 발생했습니다. 다시 시도해주세요.")
                        )
                      }
                    </Box>
                  </Box>
                </Box>
              </span>
            ))
          }

          <br/><br/><br/><br/><br/><br/><br/><br/>
          <span id="footer"></span>
        </Box>
      </Box>
    );
  }

  const ProblemTab = () => {
    return (
      // <MakingTab></MakingTab>
      <>
        <Container>
          { (isPromptLoading || isLoading) ?
            <Skeleton variant="rectangular" width="100%" height="300px" sx={{ bgcolor: 'white-gray', borderRadius: '16px' }}/> :
            <Box>
              <TransitionGroup>
                {snackQuizData.map((quiz, idx) => (
                  <Collapse key={idx} unmountOnExit>
                    <QuizCard
                      // key={quiz.snack_quiz_id}
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
                  </Collapse>
                ))}
            </TransitionGroup>
          </Box>
          }
        </Container>
      </>
    );
  }


  return (
    <>
      {isLoading && <Loading />}
      <SwipeableTabs
        value={tabValue}
        setValue={setTabValue}
        expanded={expanded}
        setExpanded={setExpanded}

        typeOption={typeOption}
        setTypeOption={setTypeOption}
        difficultyOption={difficultyOption}
        setDifficultyOption={setDifficultyOption}
        versionOption={versionOption}
        setVersionOption={setVersionOption}

        ImageTab={ImageTab}
        MakingTab={MakingTab}
        ProblemTab={ProblemTab}

        handleFileAdd={handleFileAdd}
        handleMessageSend={handleMessageSend}
        isPromptLoading={isPromptLoading}
      />
    </>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default MyPage;
