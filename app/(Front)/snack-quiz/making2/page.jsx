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
import Loading from "@/components/loading";

import SwipeableTabs from "./SwipeableTabs";


const MyPage = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [myMessage, setMyMessage] = React.useState([]);

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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ bgcolor: 'purple', color: 'white', p: 1.5, borderRadius: '16px', borderBottomRightRadius: '0px' }}>
              문제 만들어줘
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}> */}
                <Image src="/icon/gemini_icon.svg" width={344/5} height={127/5} alt="gemini" />
              {/* </Box> */}
              <Box sx={{ bgcolor: 'Highlight', p: 1.5, borderRadius: '16px', borderBottomLeftRadius: '0px' }}>
              물론입니다! 아무 말이나 길게 이야기해 드리겠습니다.

우리는 현재 2024년 2월입니다. 세상은 빠르게 변화하고 있으며, 기술과 과학의 발전으로 많은 혁신과 변화가 일어나고 있습니다. 인공지능 기술도 그 중 하나로, 저와 같은 AI 언어 모델이 여러 분야에서 도움을 주고 있습니다.

인공지능은 컴퓨터 시스템이 인간과 유사한 지능을 가지게 하는 기술입니다. 이를 통해 우리는 자동화, 예측, 패턴 인식 등 다양한 일들을 수행할 수 있게 되었습니다. 예를 들면, 음성 인식 기술을 통해 음성 명령에 반응하고, 이미지 인식 기술을 통해 사물이나 얼굴을 인식할 수 있습니다.

또한, 인공지능은 의료, 금융, 교육, 자동차, 로봇 등 다양한 분야에서 활용되고 있습니다. 의료 분야에서는 질병 진단이나 약물 개발에 활용되어 더 빠르고 정확한 결과를 얻을 수 있게 되었습니다. 금융 분야에서는 사기 탐지와 자산 관리에 도움을 주고, 교육 분야에서는 맞춤형 학습 프로그램을 개발하여 학생들의 학습 효과를 극대화시킬 수 있습니다.

하지만 인공지능이 가져오는 변화와 혜택 뿐만 아니라, 일자리의 변화와 개인정보 보호 등의 문제도 제기되고 있습니다. 따라서 우리는 인공지능의 발전과 도입에 대한 적극적인 토론과 규제가 필요합니다.

마지막으로, 저는 여러분의 질문과 궁금증에 최대한 정확하고 유익한 답변을 제공하기 위해 노력하고 있습니다. 어떤 주제에 대해 더 알고 싶으신가요? 추가적인 질문이 있으시다면 언제든지 말씀해주세요!
              물론입니다! 아무 말이나 길게 이야기해 드리겠습니다.

우리는 현재 2024년 2월입니다. 세상은 빠르게 변화하고 있으며, 기술과 과학의 발전으로 많은 혁신과 변화가 일어나고 있습니다. 인공지능 기술도 그 중 하나로, 저와 같은 AI 언어 모델이 여러 분야에서 도움을 주고 있습니다.

인공지능은 컴퓨터 시스템이 인간과 유사한 지능을 가지게 하는 기술입니다. 이를 통해 우리는 자동화, 예측, 패턴 인식 등 다양한 일들을 수행할 수 있게 되었습니다. 예를 들면, 음성 인식 기술을 통해 음성 명령에 반응하고, 이미지 인식 기술을 통해 사물이나 얼굴을 인식할 수 있습니다.

또한, 인공지능은 의료, 금융, 교육, 자동차, 로봇 등 다양한 분야에서 활용되고 있습니다. 의료 분야에서는 질병 진단이나 약물 개발에 활용되어 더 빠르고 정확한 결과를 얻을 수 있게 되었습니다. 금융 분야에서는 사기 탐지와 자산 관리에 도움을 주고, 교육 분야에서는 맞춤형 학습 프로그램을 개발하여 학생들의 학습 효과를 극대화시킬 수 있습니다.

하지만 인공지능이 가져오는 변화와 혜택 뿐만 아니라, 일자리의 변화와 개인정보 보호 등의 문제도 제기되고 있습니다. 따라서 우리는 인공지능의 발전과 도입에 대한 적극적인 토론과 규제가 필요합니다.

마지막으로, 저는 여러분의 질문과 궁금증에 최대한 정확하고 유익한 답변을 제공하기 위해 노력하고 있습니다. 어떤 주제에 대해 더 알고 싶으신가요? 추가적인 질문이 있으시다면 언제든지 말씀해주세요!
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  const ProblemTab = () => {
    return (
      <MakingTab></MakingTab>
      // <>
      //   <Container>
      //     <Typography variant="h6">Problem</Typography>
      //     <TextField label="Title" />
      //     <TextField label="Content" />
      //     <Button>
      //       <Send />
      //     </Button>
      //   </Container>
      // </>
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
