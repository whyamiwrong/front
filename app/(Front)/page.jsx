"use client";
import * as React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "components/MediaCard";
import MainCard from "components/Card/MainCard/MainCard";
import Margin from "../../components/Margin/Margin";
import Image from "next/image";
import AdSlider from "../../components/Card/AdCard/AdCard";
import { RecoilRoot } from "recoil";
import Horizon from "../../components/Horizon/Horizon";
import MainTitle from "../../components/MainTitle/MainTitle";
import Typo from "@/components/Typo/Typo";
import CodeReviewCard from "../../components/Card/CodeReviewCard/CodeReviewCard"
import Link from "next/link";


//import Header from "../../components/Header/Header"; 라우팅 이해필요..

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: whitesmoke;
`;

const SliderXwrapper2 = styled.div`
  position: relative;
  overflow-x: scroll;
  overFlow-y: hidden;
  min-height: 300px;
  width: 100%;
  

  scroll-snap-type: x mandatory;
`;
const SliderXwrapper = styled.div`
  position: relative;
  overflow-x: scroll;
  min-height: 360px;
  width: 100%;
  scroll-snap-type: x mandatory;
`;

const SliderXItems = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  
  /* display: grid;
  grid-template-columns: repeat(${(props) => props.cards}, 1fr);
  gap: 20px; */
`;

export default function HomePage() {
  return (
<RecoilRoot>
        <AdSlider />
        <Margin height="10" />
        <Link href="/algorithm1" style={{textDecoration:"none"}}>
          <MainTitle text="인기있는 알고리즘 풀러 가볼까요? >" />
        </Link>
        <SliderXwrapper2>
          <SliderXItems>
         
              <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               //image={"/logo_512x512.png"}
//               image={"/img/Logo/WhyWrongLogo2.png"}
               image={"/img/Logo/WhyWrongLogo.png"}

               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
          </SliderXItems>
          </SliderXwrapper2>

          <Link href="/snack-quiz" style={{textDecoration:"none"}}>
          <MainTitle text="Snack Quiz? >" />
          </Link>
          <SliderXwrapper2>
          <SliderXItems>
         
              <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
             <MainCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"입출력과 사칙연산"}
               category={"수학"}
               category2={"Mathmatics"}
               num={13}
             />
          </SliderXItems>
          </SliderXwrapper2>

          <MainTitle text="My CodeReviews >" />
          <SliderXwrapper>
          <SliderXItems>
         
              <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             />
             <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             />
             <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             />
             <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             />
             <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             />
             <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             />
             <CodeReviewCard
              // onClick={() => navigate(`/popupInfo/?id=${item.id}`)}
               image={"https://source.unsplash.com/random"}
               title={"10살 꼬마 개발자, 판교 스타트업 대표되다"}
               main={"7살에 프로그래밍을 접했다. 그리고 2022년, 25살에 스타트업 대표가 되었다."}
               //category={"수학"}
               //category2={"Mathmatics"}
               //num={13}
             /> 
          </SliderXItems>
          </SliderXwrapper>

      <Margin height="100" />
        
      <Box sx={{ display: "flex" }}>
      

      <div>
        
        <Grid container rowSpacing={3} columnSpacing={3}>
          
          <Grid xs={6}>
            <MediaCard
              heading="HSL and HSV"
              text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="RGB"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="CIELAB"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
            />
          </Grid>
        </Grid>
      </div>
    </Box>
    </RecoilRoot>
  );
}

/*
export default function HomePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <div>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading="CMYK"
              text="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="HSL and HSV"
              text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="RGB"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="CIELAB"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
*/