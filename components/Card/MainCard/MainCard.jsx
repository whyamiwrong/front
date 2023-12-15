import React from "react";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";
//import Typo from "../../assets/Typo";
import Margin from "@/components/Margin/Margin";




const CardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`; // page에서 사용

const CardEach = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  box-sizing: border-box;
  height: 300px;
  width: 400px;
  @media (max-width: 768px) {
    width: 370px;
  }
  border-radius: 16px;
  cursor: pointer;
  margin: 9px;
  box-shadow: 8px 8px 8px 5px rgba(67, 0, 209, 0.05);
  scroll-snap-align: center;
`;
const Thumbnail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: url(" ${(props) => props.image} ");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: none;
  border-radius: 16px;


  height: 200px;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
  line-height: 18px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 80%;
`;
const TextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 40px;
  width: 85%;
  padding-left: 15px;
`;

const MainCard = ({
  image,
  title,
  category,
  category2,
  num,
  onClick,
}) => {
 // const navigate = useNavigate();
  return (
    <CardEach onClick={onClick}>
      <Thumbnail image={image} />
      <TitleWrapper>
        {title}
      </TitleWrapper>
      <TextBox>
        <TextWrapper>
          <Margin height="6" />
          {category}
          <Margin height="5" />
          {category2}
        </TextWrapper>

        <TextWrapper>
          <Margin height="6" />
          {num}
          <Margin height="5" />
          
        </TextWrapper>
      </TextBox>
    </CardEach>
  );
};

export default MainCard;
