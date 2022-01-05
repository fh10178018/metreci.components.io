import styled from "styled-components";
import { themeTime } from "../../constants/themeStyled";

const RouteBox = styled.div`
  width: 100vw;
  flex-direction: column;
  display: flex;
  height: 100%;
`;

const FadeWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ChildrenWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const BgWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  overflow: hidden;
  display: flex;
  transition: height ${themeTime.DRAWER_ENTRY_TIME}ms ease-in-out;
`;

const SliderWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  transition: opacity ${themeTime.ANIMATION_TIME}ms ease-in-out;
`;

const RightSliderWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  overflow: hidden;
  top: 0;
`;

export {
  RouteBox,
  ChildrenWrapper,
  FadeWrapper,
  BgWrapper,
  SliderWrapper,
  RightSliderWrapper,
};
