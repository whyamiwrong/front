import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { adImgs } from "../../../public/img/AdCard/atom";
import { AnimatePresence, motion } from "framer-motion";
import Margin from "../../Margin/Margin";

const Wrapper = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 33vw;
  //min-height: 140px;
  max-height: 400px;
  //min-height: 180px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden; /* 넘치는 부분을 숨김 */
`;

const Items = styled(motion.div)`
  width: 100%;
`;

const Item = styled(motion.div)`
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover; /* 이미지가 부모 요소에 맞게 조절되도록 함 */
`;

const itemsVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 4, //delay 시간 
      repeat: Infinity,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    delay: 3,
  },
  exit: {
    opacity: 0,
  },
};

function AdSlider() {
  const adimgs = useRecoilValue(adImgs);

  return (
    <Wrapper>
      <AnimatePresence>
        <Items variants={itemsVariants} initial="hidden" animate="visible">
          {adimgs.map((i, index) => (
            <Item key={index} variants={itemVariants} bgimg={adimgs[index]}></Item>
          ))}
        </Items>
      </AnimatePresence>
    </Wrapper>
  );
}

export default AdSlider;
