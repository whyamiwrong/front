"use client";
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Margin from '@/components/Margin/Margin';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 20px;
  background-color: #F7EDFD;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #673AB7;
  font-size: 32px;
`;

const TableStyled = styled(Table)`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const TableHeadStyled = styled(TableHead)`
  background-color: #512DA8;
  color: #fff;
  border-bottom: 2px solid #311B92;
`;

const TableCellHeadStyled = styled(TableCell)`
  text-align: center;
  font-weight: bold;
  color: #ffffff;
`;

const TableCellStyled = styled(TableCell)`
  text-align: center;
  background-color: #fff;
  color: #512DA8;
`;

const UserRankingPage = () => {
  const [userData, setUserData] = useState([]); 
  useEffect(() => {
    // Axios를 사용하여 API에서 데이터 가져오기
    axios.get('/api/ranking')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // 빈 배열은 페이지가 처음 로드될 때만 실행되도록 보장합니다.

  return (
    <Wrapper>
      
      <Title>RANKING CHART</Title>
      <Margin height="10" />
      <TableContainer component={Paper}>
        <TableStyled>
          <TableHeadStyled>
            <TableRow>
              <TableCellHeadStyled>Rank</TableCellHeadStyled>
              <TableCellHeadStyled>Username</TableCellHeadStyled>
              <TableCellHeadStyled>Solved</TableCellHeadStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
                <TableCellStyled>{user.rank}</TableCellStyled>
                <TableCellStyled>{user.username}</TableCellStyled>
                <TableCellStyled>{user.solved}</TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainer>
    </Wrapper>
  );
}

export default UserRankingPage;
