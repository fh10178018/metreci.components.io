import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";

const PopHeader = styled.div`
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 3px #ccc;
  border-bottom: 1px solid #ccc;
  padding: 4px 0 4px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PopClose = styled.span`
  z-index: 1;
  display: table-cell;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
`;
const HeadTitle = styled.div`
  width: 100%;
  position: absolute;
  display: table-cell;
  font-size: 17px;
  color: #333;
  text-align: center;
  font-family: "PingFang SC";
  font-weight: 500;
  letter-spacing: 0px;
`;
const PopHeaderPlaceholder = styled.div`
  width: 100%;
  height: 48px;
`;

interface HeaderPropTypes {
  headTitle: string | ReactNode;
  onClose?: (openStatus: boolean) => void;
  onGoBack?: (openStatus: boolean) => void;
  customStyle?: React.CSSProperties;
  hideHeaderPlaceholder?: boolean;
}

const Header: React.FC<HeaderPropTypes> = ({
  headTitle = "",
  onClose,
  onGoBack,
  customStyle,
  hideHeaderPlaceholder = true,
}) => {
  return (
    <>
      <PopHeader style={customStyle}>
        {onGoBack ? <PopClose onClick={() => onGoBack(false)}>←</PopClose> : ""}
        <HeadTitle>{headTitle}</HeadTitle>
        {onClose ? <PopClose onClick={() => onClose(false)}>x</PopClose> : ""}

        {/* <span className={classes.headTitle}>{headTitle}</span> */}
      </PopHeader>
      {hideHeaderPlaceholder ? (
        ""
      ) : (
        <PopHeaderPlaceholder>&nbsp;</PopHeaderPlaceholder>
      )}
    </>
  );
};

export default Header;
