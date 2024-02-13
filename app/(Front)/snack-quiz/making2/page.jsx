"use client";
import React, { useState } from 'react';
import { styled, Container, Typography, Tabs, Tab, IconButton, Select, MenuItem, TextField, Button, FormControl, InputLabel } from '@mui/material';
import { AddAPhoto, AddPhotoAlternate, PictureAsPdf, Send } from '@mui/icons-material';

const MyPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const Content = ({ children, tabValue }) => {
    switch (tabValue) {
      case 0:
        return children[0];
      case 1:
        return children[1];
      case 2:
        return children[2];
      default:
        return null;
    }
  };

  const Wrapper = styled('div')({
    width: '100%',
    position: 'absolute',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px',
  });

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '' }}>
      <Wrapper>
        {/* 각 탭에 대한 내용 */}
        <Content tabValue={tabValue}>
          {['안녕', '나는', '성준'].map((content, index) => (
            <Typography key={index} variant="h4" style={{ display: tabValue === index ? 'block' : 'none', marginBottom: '20px' }}>
              {content}
            </Typography>
          ))}
        </Content>

        {/* 탭 */}
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs" centered>
          <Tab label="이미지" />
          <Tab label="문제" />
          <Tab label="출제문제들" />
        </Tabs>

        {/* 아이콘 및 선택 컴포넌트 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IconButton>
            <AddAPhoto fontSize="large" />
          </IconButton>
          <IconButton>
            <AddPhotoAlternate fontSize="large" />
          </IconButton>
          <IconButton>
            <PictureAsPdf fontSize="large" />
          </IconButton>
          <FormControl variant="outlined" size='small' style={{ marginTop: '0', marginLeft: '20px', width: '110px' }}>
            <InputLabel id="option-label">옵션 선택</InputLabel>
            <Select
              labelId="option-label"
              defaultValue=""
              label="문제 양식"
            >
              <MenuItem value={10}> 객관식 </MenuItem>
              <MenuItem value={20}> 양자택일 </MenuItem>
              <MenuItem value={30}> O/X </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* 텍스트 필드와 버튼 */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', width: '70%' }}>
          <TextField label="내용을 입력하세요" variant="outlined" fullWidth />
          <Button variant="contained" endIcon={<Send />} style={{ marginLeft: '10px', minHeight: '50px', minWidth: '50px' }}/>
        </div>
      </Wrapper>
    </Container>
  );
}

export default MyPage;
