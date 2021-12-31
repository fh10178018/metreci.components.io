import styled from "styled-components";
import { rem } from "../constants/rem";
import { themeColors } from "../constants/themeStyled";

export const Wrapper = styled.div`
  min-width: 75vw;
  overflow: hidden;
  border-radius: ${rem("16px")};
  background-color: ${themeColors.white};
`;
