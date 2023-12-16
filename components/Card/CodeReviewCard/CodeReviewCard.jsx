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
  height: 340px;
  width: 320px;
  @media (max-width: 1440px) {
    width: 320px;
  }
  border-radius: 5px;
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
  border-radius: 5px;


  height: 170px;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-bottom: 15px;
  //margin-left: 15px;
  margin-right: 15px;
  line-height: 18px;
  width: 100%;
  color:gray;
`;
const TextWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  margin-bottom: 15px;
  margin-left: 30px;
  margin-right: 15px;
  line-height: 18px;
  color:gray;

`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 90%;
  font-size: 1rem;
  font-weight: 600;
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 90%;
  font-size: 0.8rem;
  font-weight: 500;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: row;
//  align-items: start;
 // justify-content: start;
 // grid-template-columns: 1fr 2fr;
  column-gap: 60px;
  width: 90%;
  padding-left: 15px;
`;

const CodeReviewCard = ({
  image,
  title,
  main,
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
      <MainWrapper>
        {main}
      </MainWrapper>
   
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

export default CodeReviewCard;
