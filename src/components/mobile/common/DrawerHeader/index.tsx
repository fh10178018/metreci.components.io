import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { themeColors } from "../../constants/themeStyled";
import { rem } from "../../constants/rem";
import { useDebounce } from "../../../utils/common";
import { LeftArrowIcon, CloseIcon } from "../ActionIcon";

const PopHeader = styled.div.attrs((props: { headerNoBorder: boolean }) => {
  return {
    headerNoBorder: props.headerNoBorder,
  };
})`
  padding: ${rem("0 38px")};
  width: 100%;
  height: ${rem("96px")};
  ${(props) =>
    !props.headerNoBorder
      ? `border-bottom: ${rem("1px")} solid ${themeColors.border};`
      : ""}
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PopClose = styled.span`
  z-index: 1;
  display: flex;
  vertical-align: middle;
  height: ${rem("48px")};
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;
const HeadTitle = styled.div`
  width: 100%;
  position: absolute;
  display: table-cell;
  font-size: ${rem("34px")};
  color: ${themeColors.blackDark};
  text-align: center;
  font-family: "PingFang SC";
  font-weight: 500;
  letter-spacing: 0;
  left: 0;
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
          style={{
            display: onGoBack && showBackIcon ? "flex" : "none",
            transform: `translateX(${rem("-10px")})`,
          }}
          onClick={useDebounce(() => onGoBack && onGoBack(), 1000, true)}
        >
          <LeftArrowIcon color="#666666" />
        </PopClose>
        <HeadTitle>{headTitle}</HeadTitle>

        <PopClose
          style={{
            display: onClose && showCloseIcon ? "flex" : "none",
          }}
          onClick={useDebounce(() => onClose && onClose(), 1000, true)}
        >
          <CloseIcon color="#666666" />
        </PopClose>
      </PopHeader>
      {!hideHeaderPlaceholder && (
        <PopHeaderPlaceholder>&nbsp;</PopHeaderPlaceholder>
      )}
    </>
  );
};

export default Header;
