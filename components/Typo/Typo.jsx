//not use ThemeRegistry로 font할당완으로 이해

import styled from "styled-components";
const StyledTypo = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  width: ${(props) => props.width}px;
  font-size: ${(props) => props.size || "1rem"};
  font-weight: ${(props) => props.weight || "400"};
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  line-height: ${(props) => props.lineheight || 1};
  ${(props) => props.fontType && props.theme.font[props.fontType]};

  white-space: pre-line;
`;
const Typo = (props) => <StyledTypo {...props}>{props.children}</StyledTypo>;

export default Typo;
