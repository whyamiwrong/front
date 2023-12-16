//not use ThemeRegistry로 font할당완으로 이해

import { Roboto } from "next/font/google";
import styled from "styled-components";
const StyledTypo = styled.p`
  font-family: "Roboto", sans-serif;
  width: ${(props) => props.width}px;
  font-size: ${(props) => props.size || "1rem"};
  font-weight: ${(props) => props.weight || "400"};
  color: ${(props) => props.color || "black"};
  line-height: ${(props) => props.lineheight || 1};
  ${(props) => props.fontType || "Roboto" };

  white-space: pre-line;
`;
const Typo = (props) => <StyledTypo {...props}>{props.children}</StyledTypo>;

export default Typo;
