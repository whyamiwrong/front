import styled from "styled-components";
import Typo from "../Typo/Typo";
import Margin from "../Margin/Margin";
import Link from 'next/link'
import testimg from "../../public/img/HomeInfo/test.svg"
import Image from 'next/image'


const Wrapper = styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: #ffffff;
  position: relative;
  text-align: center;
`;
const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
`
const IconWrapper = styled.div`
 position: relative;
 flex-wrap: wrap;
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 33%;
`
const TextWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  //text-align: center;
`
const InfoImg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url("${(props) => props.image}");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: none;
  //border-radius: 360px;
  height: 20vw;
  width: 20vw;
`;

function HomeInfo() {

  return (
    <Wrapper>

        <Typo size="1.8rem" weight="800" lineheight="1">알고리즘을 배우고 테스트하고 AI를 통해 검증해보세요</Typo>
        <Typo lineheight="1">맞왜틀과 함께하면, 이론능력 20% 향상과 코드 수행력 60% 향상을 기대할 수 있습니다.</Typo>
        <Margin height="50"/>
        <InfoWrapper>
            <IconWrapper>
                <Link href="/algorithm1" style={{textDecoration:"none"}}>
                 <InfoImg image= "/img/HomeInfo/algorithm1.svg"/>
                </Link>
                <TextWrapper>
                    <Typo size="1.2rem" weight="700" lineheight="1" >Learn Algorithm</Typo>
                    <Typo size="1rem" weight="400" lineheight="1">Gemini가 맞춤형 알고리즘 문제와 풀이를 제공합니다.</Typo>
                </TextWrapper>
            </IconWrapper>
            <IconWrapper>
                <Link href="/snack-quiz" style={{textDecoration:"none"}}>
                 <InfoImg image= "/img/HomeInfo/quiz.svg"/>
                </Link>
                <TextWrapper>
                <Typo size="1.2rem" weight="700" lineheight="1" >Let's Code Quiz</Typo>
                <Typo size="1rem" weight="400" lineheight="1">LLM을 활용한 맞춤형 Quiz와 풀이를 제공합니다.</Typo>

                </TextWrapper>
            </IconWrapper><IconWrapper>
                <Link href="/ranking" style={{textDecoration:"none"}}>
                <InfoImg image= "/img/HomeInfo/codereview.svg"/>
                </Link>
                <TextWrapper>
                <Typo size="1.2rem" weight="700" lineheight="1" >AI Code Review</Typo>
                <Typo size="1rem" weight="400" lineheight="1">Gemini가 사용자 코드에 대한 맞춤형 리뷰를 제공합니다.</Typo>
                </TextWrapper>
            </IconWrapper>
        </InfoWrapper>
     </Wrapper> 
  );
}
export default HomeInfo;
