"use client";

import React, { useState } from "react";
import {
  styled,
  Container,
  Typography,
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
} from "@mui/material";
import {
  AddAPhoto,
  AddPhotoAlternate,
  PictureAsPdf,
  Send,
} from "@mui/icons-material";

import SwipeableTabs from "./SwipeableTabs";


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

  return (
    <>
      <SwipeableTabs value={tabValue} setValue={setTabValue} />
    </>
  );
};

const Wrapper = styled("div")({
  width: "100%",
  position: "absolute",
  bottom: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "36px",
});

export default MyPage;
