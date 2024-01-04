import styled from "styled-components";
import Typo from "../Typo/Typo";
import { MdArrowForwardIos } from "react-icons/md";
import Horizon from "../Horizon/Horizon";
import Margin from "../Margin/Margin";
import Link from 'next/link'


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 20px;
  background-color: #FCF7FF;
  position: relative;
  bottom: -60px;


`;
const Wrapper2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 10px;
`;

function MainTitle({ text, bottomgap, isarrow, onClick }) {

  return (
    <Wrapper>
    <Margin height="30"/>
    
      <Wrapper2  onClick={onClick}>
        <Typo size="1.5rem" weight="700" lineheight="0.1">{text}</Typo>
        {isarrow && (
          <MdArrowForwardIos
            style={{ fontSize: 16, marginTop: 2, marginLeft: 3 }}
          />
        )}
        
      </Wrapper2> 
  
     <Horizon width={"100%"} color={"darkgray"}/>
     <Margin height="60"/>
     </Wrapper>
  );
}
export default MainTitle;
