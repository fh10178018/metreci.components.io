import styled from "styled-components";
import { themeTime } from "../constants/themeStyled";

const MaskWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MaskBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: opacity ${themeTime.ANIMATION_TIME}ms ease-in-out;
`;

export { MaskWrapper, MaskBox };
