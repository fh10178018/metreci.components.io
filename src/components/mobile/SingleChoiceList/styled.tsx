/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:19
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-02 19:44:22
 */
import styled, { css } from "styled-components";
import { rem } from "../constants/rem";

const Wrapper = styled.div.attrs(
  (props: { disabled: boolean; isType2: boolean }) => {
    return {
      disabled: props.disabled,
      isType2: props.isType2,
    };
  }
)`
  width: 100%;
  display: flex;
  min-height: ${(props) => rem(props.isType2 ? "146px" : "130px")};
  user-select: none;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

const Left = css`
  width: ${rem("76px")};
  display: flex;
  align-items: center;
`;

const LeftContent = styled.div`
  height: ${rem("130px")};
  ${Left}
`;

const ChineseH5CSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CenterContent = styled.div.attrs((props: { isType2: boolean }) => {
  return {
    isType2: props.isType2,
  };
})`
  flex: 1;
  ${(props) => (props.isType2 ? ChineseH5CSS : "")};
`;

const HeaderContent = styled.div.attrs((props: { isType2: boolean }) => {
  return {
    isType2: props.isType2,
  };
})`
  font-size: ${rem("32px")};
  line-height: ${rem("56px")};
  padding-top: ${(props) => rem(props.isType2 ? "0" : "40px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterContent = styled.div.attrs((props: { isType2: boolean }) => {
  return {
    isType2: props.isType2,
  };
})`
  margin: ${(props) => rem(props.isType2 ? "0" : "0 0 36px 0")};
`;

const ChildrenWrapper = styled.div`
  transition: height 500ms;
  overflow: hidden;
`;

const RightContent = styled.div`
  width: ${rem("76px")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftContent2 = styled.div`
  justify-content: center;
  ${Left}
`;

export {
  Wrapper,
  LeftContent,
  LeftContent2,
  CenterContent,
  RightContent,
  HeaderContent,
  FooterContent,
  ChildrenWrapper,
};
