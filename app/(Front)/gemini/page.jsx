"use client";

import React from 'react';
import axios from 'axios';
import {
  Backdrop,
  CircularProgress,
} from "@mui/material";

function ImageUpload() {
  const [base64String, setBase64String] = React.useState('');
  const [promtData, setPromtData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(',')[1]; // base64 부분만 추출
        setBase64String(base64);
        // 여기서 API 요청을 보낼 수 있습니다.
        // 예: sendToApi(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendToApi = async (base64) => {
    setIsLoading(true);
    // API 요청 로직 구현
    console.log('Sending base64 to API:', base64);

    const images = [
      base64,
      base64,
    ];

    const type = 'multi';
    const subject = 'Computer Science';
    const difficulty = 'easy';

    await axios.post('/api/gpt', {
      images: images,
      type: type,
      subject: subject,
      difficulty: difficulty,
    })
      .then((res) => {
        console.log(res);
        setPromtData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('API 요청에 실패했습니다.')
        setIsLoading(false);
      });
  };

  return (
    <div>
      <span>
        {promtData}
      </span>
      <button onClick={() => sendToApi(base64String)}>Send to API</button>
      <input type="file" onChange={handleFileChange} />
      {base64String && <img src={`data:image/jpeg;base64,${base64String}`} alt="Uploaded" />}


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ImageUpload;
