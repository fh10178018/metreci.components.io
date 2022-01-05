import styled from "styled-components";
import { rem } from "../../constants/rem";
import { themeColors } from "../../constants/themeStyled";

export const ModalWrapper = styled.div`
  width: 75vw;
  border-radius: ${rem("16px")};
  background-color: ${themeColors.white};
  padding: ${rem("48px 32px")};
`;

export const Header = styled.div.attrs(
  (props: { hasInductionStyle: boolean }) => ({
    hasInductionStyle: props.hasInductionStyle,
  })
)`
  margin: ${(props) => (props.hasInductionStyle ? 0 : rem("0 0 32px 0"))};
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
  font-size: ${rem("34px")};
  font-weight: 600;
  word-wrap: break-word;
  height: ${rem("46px")};
  line-height: ${rem("46px")};
  font-family: PingFangSC-Medium;
  user-select: none;
`;

export const Content = styled.div.attrs(
  (props: { hasInductionStyle: boolean }) => ({
    hasInductionStyle: props.hasInductionStyle,
  })
)`
  flex: 1;
  line-height: ${rem("40px")};
  font-family: PingFangSC-Regular;
  font-size: ${rem("28px")};
  color: ${themeColors.blackDark};
  position: relative;
  :before {
    display: ${(props) => (props.hasInductionStyle ? "block" : "none")};
    background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0));
    content: "";
    height: ${rem("50px")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  :after {
    display: ${(props) => (props.hasInductionStyle ? "block" : "none")};
    background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
    content: "";
    height: ${rem("50px")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
`;

export const Box = styled.div.attrs(
  (props: { hasInductionStyle: boolean }) => ({
    hasInductionStyle: props.hasInductionStyle,
  })
)`
  max-height: ${rem("700px")};
  padding: ${(props) =>
    props.hasInductionStyle ? rem("50px 0") : rem("0 0 48px 0")};
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: ${rem("8px")};
    background-color: #dadfe6;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${themeColors.blue};
  }
`;

export const Footer = styled.div`
  height: ${rem("72px")};
  line-height: ${rem("72px")};
  display: flex;
  margin: ${rem("0 -12px")};
  & > div {
    text-align: center;
    flex: 1;
    margin: ${rem("0 12px")};
    border-radius: ${rem("8px")};
    font-family: PingFangSC-Regular;
    font-size: ${rem("30px")};
    font-weight: normal;
    user-select: none;
  }
`;

export const CancelButton = styled.div`
  color: ${themeColors.blue};
  border: ${rem("2px solid ") + themeColors.blue};
`;

export const OkButton = styled.div`
  background-color: ${themeColors.blue};
  color: ${themeColors.white};
`;
