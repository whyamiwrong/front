"use client";

import * as React from "react";
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

import SwipeableTabs from "./SwipeableTabs";


const MyPage = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPromptLoading, setIsPromptLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [myMessage, setMyMessage] = React.useState([]);
  const [promptMessage, setPromptMessage] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setExpanded(true);
      setTabValue(1);
      setIsLoading(false);
    }, 500);
  }, []);

  function handleFileAdd(event) {
    if (images.length >= 5) {
      alert('You can upload up to 5 images.');
      return;
    }

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
    }
  };

  function handleFileDelete(idx) {
    setImages(
      images.filter((_, index) => index !== idx)
    );
  }

  async function handleMessageSend(msg) {
    setTabValue(1);
    setIsPromptLoading(true);
    setTimeout(() => {
      document.querySelector("#footer").scrollIntoView();
    }, 1000);
    
    setMyMessage([...myMessage, msg]);

    const res = await axios.post('/api/gpt', {
      snack_id: 3,
      version: "image",
      type: "multi",
      subject: "Computer Science",
      difficulty: "medium",
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

      setIsPromptLoading(false);
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
                          promptMessage[idx] || ("오류가 발생했습니다. 다시 시도해주세요.")
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
          <Skeleton variant="rectangular" width="100%" height="300px" sx={{ bgcolor: 'white-gray', borderRadius: '16px' }}/>
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
