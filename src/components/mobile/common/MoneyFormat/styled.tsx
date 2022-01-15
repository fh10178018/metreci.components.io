import styled from "styled-components";
import { themeColors } from "../../constants/themeStyled";

export const RollGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
`;

export const RollItem = styled.span``;

export const ShowWindow = styled.span`
  overflow: hidden;
  position: relative;
  display: inline-block;
`;
export const Wrapper = styled.div.attrs((props: { size: string }) => ({
  size: props.size,
}))`
  display: inline-flex;
  color: ${themeColors.blackDark};
  font-family: PingFangSC-Medium;
  font-weight: 500;
  user-select: none;
  font-size: ${(props) => props.size};
`;
