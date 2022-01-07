import styled, { css } from "styled-components";
import { rem } from "../../constants/rem";
import { themeColors } from "../../constants/themeStyled";

export const Content = styled.div.attrs((props: { disabled: boolean }) => {
  return {
    disabled: props.disabled,
  };
})`
  width: 100%;
  min-height: ${rem("146px")};
  user-select: none;
  display: flex;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  padding-top: ${rem("22px")};
`;

const CommonBoxCSS = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${themeColors.black};
  font-size: ${rem("34px")};
`;

export const Box = styled.div`
  padding: ${rem("24px 18px")};
  ${CommonBoxCSS};
`;

export const HomeBox = styled.div`
  ${CommonBoxCSS};
`;

const CommonRadioWrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const RadioWrapper = styled.div`
  width: ${rem("54px")};
  ${CommonRadioWrapper};
`;

export const HomeRadioWrapper = styled.div`
  ${CommonRadioWrapper};
`;

export const PrefixBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
