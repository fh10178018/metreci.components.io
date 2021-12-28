import styled from "styled-components";

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
  transition: translate 500ms ease-in-out, height 500ms ease-in-out;
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
  transition: height 500ms ease-in-out;
`;

const SliderWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  transition: opacity 300ms ease-in-out;
`;

const RightSliderWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  overflow: hidden;
  top: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.54);
`;

export {
  RouteBox,
  ChildrenWrapper,
  FadeWrapper,
  BgWrapper,
  SliderWrapper,
  RightSliderWrapper,
};
