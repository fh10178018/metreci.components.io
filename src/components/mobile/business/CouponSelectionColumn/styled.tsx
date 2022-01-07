import styled from "styled-components";
import { rem } from "../../constants/rem";
import { themeColors } from "../../constants/themeStyled";

export const Content = styled.div`
  width: 100%;
  height: ${rem("182px")};
  margin-bottom: ${rem("20px")};
  user-select: none;
  border-radius: ${rem("16px")};
  background: ${themeColors.white};
  box-shadow: ${rem("0px 4px 16px 1px")} ${themeColors.boxShadow};
  display: flex;
  overflow: hidden;
`;

export const NoCouponContent = styled.div`
  width: 100%;
  height: ${rem("80px")};
  line-height: ${rem("80px")};
  display: flex;
  font-size: ${rem("24px")};
  color: ${themeColors.black};
  user-select: none;
  border-radius: ${rem("16px")};
  background: ${themeColors.white};
  box-shadow: ${rem("0px 4px 16px 1px")} ${themeColors.boxShadow};
  overflow: hidden;
  margin-bottom: ${rem("20px")};
`;

export const Box = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${themeColors.black};
  padding: ${rem("0 20px")};
  font-size: ${rem("24px")};
`;

export const CommonBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${themeColors.black};
  font-size: ${rem("34px")};
  padding: ${rem("24px 18px")};
`;
export const CommonContent = styled.div.attrs(
  (props: { disabled: boolean }) => {
    return {
      disabled: props.disabled,
    };
  }
)`
  width: 100%;
  min-height: ${rem("146px")};
  user-select: none;
  display: flex;
  overflow: hidden;
`;

export const RadioWrapper = styled.div`
  width: ${rem("54px")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const PrefixBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    -45.67deg,
    ${themeColors.red} 0%,
    ${themeColors.redDark} 100%
  );
  color: ${themeColors.white};
  width: ${rem("200px")};
  font-size: ${rem("24px")};
`;
