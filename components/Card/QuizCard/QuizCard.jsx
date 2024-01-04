import React from "react";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";
//import Typo from "../../assets/Typo";
import Margin from "@/components/Margin/Margin";
import Horizon from "@/components/Horizon/Horizon";
import Typo from "@/components/Typo/Typo";



const CardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`; // page에서 사용

const CardEach = styled.div`
  display: flex;
  flex: wrap;
  flex-direction: column;
  background-color: #FCF7FF;
  align-items: center;
  box-sizing: border-box;
  width: 85%;

  //height: 700px;
  @media (max-width: 1020px) {
    width: 85%;
  }
  border-radius: 10px;
  //cursor: pointer;
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 150px;
  //padding-top:10px;
  padding-bottom: 50px;
  //box-shadow: 8px 8px 8px 5px rgba(67, 0, 209, 0.05);
  scroll-snap-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 5px;
  width: 98%;
  font-size: 1.7rem;
  font-weight: 700;
`;
const Thumbnail = styled.div` //여기에 highlight div
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: url(" ${(props) => props.image} ");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: none;
  border-radius: 10px;


  height: 200px;
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
  color:black;
`;
const TextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 60px;
  width: 90%;
  padding-left: 15px;
`;

const TextBox1 = styled.div`
  display: flex;
  flex: wrap;
  flex-direction: row;
  column-gap: 60px;
  width: 100%;
  padding-left: 15px;

`;
const Highlight = styled.div`
    
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

/*const Botton = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: row;
  background-color: #6B308F;
  align-items: start;
  box-sizing: border-box;
  flex: wrap;
  //height: 50px;
  width: 97%;
  @media (max-width: 1020px) {
    width: 97%;
  }
  border-radius: 5px;
  cursor: pointer;
  margin: 9px;

  //box-shadow: 8px 8px 8px 5px rgba(67, 0, 209, 0.05);
  //scroll-snap-align: center;  
`;*/
const Botton = styled.div`
    display: flex;
    padding-left: 10px;
    flex-direction: row;
    background-color: ${({ selected }) => (selected ? "#6B308F" : "#F7EDFD")}; // 선택된 버튼에 따라 배경색 변경
    align-items: start;
    box-sizing: border-box;
    flex: wrap;
    width: 97%;
    border-radius: 5px;
    cursor: pointer;
    margin: 9px;
    transition: background-color 0.3s, border 0.3s; // 애니메이션 효과 추가

    &:hover {
        background-color: ${({ selected }) => (selected ? "#6B308F" : "#ffffff")};
    }
`;
const BottonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //line-height: 18px;
  width: 100%;

`;
const QuizCard = ({
    quizId, // 퀴즈 아이디 추가
    image,
    quiz_title,
    text,
    b1,
    b2,
    b3,
    b4,
    selectedButton,
    onButtonClick,
    onClick,
}) => {

    return (
        <CardEach onClick={onClick}>
            <TitleWrapper>{quiz_title}</TitleWrapper>
            <Horizon width="99%" color="gray" />
            <Margin height="20" />

            <TextBox1>
                <TextWrapper>{text}</TextWrapper>
            </TextBox1>
            <Margin height="10" />
            <BottonWrapper>
                {b1 && (
                    <Botton
                        selected={selectedButton === 1}
                        onClick={() => onButtonClick(quizId, 1)} // 퀴즈 아이디 전달
                    >
                        <Typo color={selectedButton === 1 ? "white" : "black"}>{b1}</Typo>
                    </Botton>
                )}
                {b2 && (
                    <Botton
                        selected={selectedButton === 2}
                        onClick={() => onButtonClick(quizId, 2)}
                    >
                        <Typo color={selectedButton === 2 ? "white" : "black"}>{b2}</Typo>
                    </Botton>
                )}
                {b3 && (
                    <Botton
                        selected={selectedButton === 3}
                        onClick={() => onButtonClick(quizId, 3)}
                    >
                        <Typo color={selectedButton === 3 ? "white" : "black"}>{b3}</Typo>
                    </Botton>
                )}
                {b4 && (
                    <Botton
                        selected={selectedButton === 4}
                        onClick={() => onButtonClick(quizId, 4)}
                    >
                        <Typo color={selectedButton === 4 ? "white" : "black"}>{b4}</Typo>
                    </Botton>
                )}
            </BottonWrapper>
        </CardEach>
    );
};


export default QuizCard;
/*const QuizCard = ({
    image,
    quiz_title,
    text,
    code,
    b1,
    b2,
    b3,
    b4,
    category,
    category2,
    num,
    onClick,
  }) => {
    // const navigate = useNavigate();
  
    return (
      <CardEach onClick={onClick}>
        <TitleWrapper>{quiz_title}</TitleWrapper>
        <Horizon width="99%" color="gray" />
        <Margin height="20" />
  
        <TextBox1>
          <TextWrapper>{text}</TextWrapper>
        </TextBox1>
        <Margin height="10" />
        <BottonWrapper>
          {b1 && (
            <Botton>
              <Typo color="white">{b1}</Typo>
            </Botton>
          )}
          {b2 && (
            <Botton>
              <Typo color="white">{b2}</Typo>
            </Botton>
          )}
          {b3 && (
            <Botton>
              <Typo color="white">{b3}</Typo>
            </Botton>
          )}
          {b4 && (
            <Botton>
              <Typo color="white">{b4}</Typo>
            </Botton>
          )}
        </BottonWrapper>
      </CardEach>
    );
  };
  
  export default QuizCard;
/*const QuizCard = ({
  image,
  quiz_title,
  text,
  code,
  b1,
  b2,
  b3,
  b4,
  category,
  category2,
  num,
  onClick,
}) => {
 // const navigate = useNavigate();
  return (
    <CardEach onClick={onClick}>
      
      <TitleWrapper>
        {quiz_title}
      </TitleWrapper>

      <Horizon width="99%" color="gray"/>

      <Margin height= "20"/> 

      <TextBox1>
        <TextWrapper>
            {text}
        </TextWrapper>
      </TextBox1> 
      <Margin height="10"/>
      <BottonWrapper>
        <Botton>

           <Typo color="white"> {b1} </Typo> 
        </Botton>
        <Botton>
           <Typo color="white"> {b2} </Typo> 
        </Botton>
        <Botton>
           <Typo color="white"> {b3} </Typo> 
        </Botton>
        <Botton>
           <Typo color="white"> {b4} </Typo> 
        </Botton>
      </BottonWrapper>
    </CardEach>
  );
};

export default QuizCard;


/*
<TextBox>
        <TextWrapper>
          <Margin height="6" />
          {category}
          <Margin height="5" />
          {category2}
        </TextWrapper>

        <TextWrapper2>
          <Margin height="6" />
          {num}
          <Margin height="5" />
          
        </TextWrapper2>
      </TextBox>

      <Thumbnail image = {image}/>

*/