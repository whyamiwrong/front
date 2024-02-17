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

  return (
    <>
      <SwipeableTabs value={tabValue} setValue={setTabValue} />
    </>
  );
};

export default MyPage;
