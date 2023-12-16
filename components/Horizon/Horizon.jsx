import { styled } from "styled-components";

const HorizonEach = styled.div`
  width: ${(props) => props.width};
  height: 2px;
  background-color: ${(props) =>
    props.color }; // 논리 OR 연산자, props.color 값이 없는 경우 gray 나옴
`;

const Horizon = (props) => {
  return (
    <>
      <HorizonEach width={props.width} color={props.color} />
    </>
  );
};

export default Horizon;
