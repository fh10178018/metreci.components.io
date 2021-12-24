import styled, { css } from "styled-components";
import { ColorTypes, BtnTypes, SizeTypes } from ".";
import { rem } from "../constants/rem";
import { themeColors } from "../constants/themeStyled";

const L = css`
  border-radius: ${rem("12px")};
  line-height: ${rem("96px")};
  height: ${rem("96px")};
  width: ${rem("710px")};
  font-size: ${rem("34px")};
  font-weight: 500;
`;

const M = css`
  border-radius: ${rem("10px")};
  line-height: ${rem("88px")};
  height: ${rem("88px")};
  width: ${rem("300px")};
  font-size: ${rem("34px")};
  font-weight: normal;
`;
const S = css`
  border-radius: ${rem("3px")};
  line-height: ${rem("60px")};
  height: ${rem("60px")};
  width: ${rem("96px")};
  font-size: ${rem("13px")};
  font-weight: normal;
`;

const ButtonWrapper = styled.div.attrs(
  (props: {
    disabled: boolean;
    curColor: ColorTypes;
    type: BtnTypes;
    size: SizeTypes;
  }) => {
    return {
      disabled: props.disabled,
      curColor: props.curColor,
      type: props.type,
      size: props.size,
    };
  }
)`
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  user-select: none;

  ${(props) => {
    const { curColor: color, disabled } = props;
    const white = themeColors["white"];
    const gray = themeColors["gray"];
    const black = themeColors["black"];
    if (disabled) {
      return `color: ${gray};`;
    }
    if (color === "transparent") {
      return `color: ${black};`;
    }

    return `color: ${white};`;
  }}

  ${(props) => {
    if (props.size === "S") {
      return S;
    }
    if (props.size === "M") {
      return M;
    }
    return L;
  }}

  ${(props) => {
    let { curColor: color, type } = props;
    if (props.disabled) {
      color = "gray";
    }
    const bgColor = themeColors[color];
    const bgColorDark = themeColors[color + "Dark"];

    if (type === "gradient") {
      return `background: linear-gradient(90deg,${bgColorDark} 0%,${bgColor} 100%);`;
    }
    if (color === "gray") {
      return `background: ${bgColorDark};`;
    }
    return `background: ${bgColor};`;
  }}
`;

export { ButtonWrapper };
