import styled from "styled-components";
import { Option } from "../../common/SelectList";
import { rem } from "../../constants/rem";
import { themeColors } from "../../constants/themeStyled";

export const GongGeOption = styled(Option)``;

export const Content = styled.div.attrs((props: { tip: string }) => {
  return {
    tip: props.tip,
  };
})`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
  padding-bottom: 37.3%;
  border-radius: ${rem("8px")};
  font-size: ${rem("26px")};
  font-family: SFProText-Regular;
  font-weight: normal;
  &:before {
    content: ${(props) => props.tip && `"${props.tip}"`};
    border-radius: ${rem("0px 8px 0px 8px")};
    height: ${rem("28px")};
    line-height: ${rem("28px")};
    font-weight: normal;
    background: ${themeColors.orange};
    font-size: ${rem("20px")};
    color: ${themeColors.white};
    font-family: PingFangSC-Regular;
    position: absolute;
    right: 0;
    top: ${rem("-14px")};
  }
`;

export const Box = styled.div`
  position: absolute;
  top: 0;
  left: ${rem("20px")};
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
`;

export const RadioWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: ${rem("8px 0px 8px 0px")};
  overflow: hidden;
  display: flex;
`;
export const SelectWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: ${rem("16px")};
  grid-column-gap: ${rem("16px")};
`;
