import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { themeColors } from "../constants/themeStyled";
import { rem } from "../constants/rem";
import { useDebounce } from "../../utils/common";
import { LeftArrowIcon } from "../ActionIcon";

const PopHeader = styled.div.attrs((props: { headerNoBorder: boolean }) => {
  return {
    headerNoBorder: props.headerNoBorder,
  };
})`
  position: relative;
  width: 100%;
  height: ${rem("96px")};
  ${(props) =>
    !props.headerNoBorder
      ? `border-bottom: ${rem("2px")} solid ${themeColors.border};`
      : ""}
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PopClose = styled.span`
  z-index: 1;
  display: table-cell;
  vertical-align: middle;
  width: ${rem("96px")};
  height: ${rem("48px")};
  cursor: pointer;
  text-align: center;
`;
const HeadTitle = styled.div`
  position: absolute;
  width: 100%;
  display: table-cell;
  font-size: ${rem("34px")};
  color: ${themeColors.blackDark};
  text-align: center;
  font-family: "PingFang SC";
  font-weight: 500;
  letter-spacing: 0;
`;
const PopHeaderPlaceholder = styled.div`
  width: 100%;
  height: ${rem("96px")};
`;

type WhiteFuncTypes = () => void;
type PromiseFuncTypes = () => void;

interface HeaderPropTypes {
  headTitle: string | ReactNode;
  onClose?: WhiteFuncTypes | PromiseFuncTypes;
  onGoBack?: WhiteFuncTypes | PromiseFuncTypes;
  customStyle?: React.CSSProperties;
  hideHeaderPlaceholder?: boolean;
  headerNoBorder?: boolean;
  showCloseIcon?: boolean;
  showBackIcon?: boolean;
}
const Header: React.FC<HeaderPropTypes> = ({
  headTitle = "",
  onClose,
  onGoBack,
  customStyle,
  hideHeaderPlaceholder = true,
  headerNoBorder = false,
  showCloseIcon = true,
  showBackIcon = true,
}) => {
  return (
    <>
      <PopHeader style={customStyle} headerNoBorder={headerNoBorder}>
        <PopClose
          style={{ display: onGoBack && showBackIcon ? "block" : "none" }}
          onClick={useDebounce(() => onGoBack && onGoBack(), 1000, true)}
        >
          <BackIcon />
        </PopClose>
        <HeadTitle>{headTitle}</HeadTitle>

        <PopClose
          style={{ display: onClose && showCloseIcon ? "block" : "none" }}
          onClick={useDebounce(() => onClose && onClose(), 1000, true)}
        >
          <CloseIcon />
        </PopClose>
      </PopHeader>
      {!hideHeaderPlaceholder && (
        <PopHeaderPlaceholder>&nbsp;</PopHeaderPlaceholder>
      )}
    </>
  );
};

const CloseIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2385"
    width="1.4em"
    height="1.4em"
  >
    <path
      d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
      fill={themeColors.blackDark}
      p-id="2386"
    ></path>
  </svg>
);
const BackIcon = () => <LeftArrowIcon />;

export default Header;
