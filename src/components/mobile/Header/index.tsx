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
        {onGoBack ? (
          <PopClose onClick={() => onGoBack(false)}>
            <BackIcon />
          </PopClose>
        ) : (
          ""
        )}
        <HeadTitle>{headTitle}</HeadTitle>
        {onClose ? (
          <PopClose onClick={() => onClose(false)}>
            <CloseIcon />
          </PopClose>
        ) : (
          ""
        )}

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

const CloseIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2385"
    width="1.5em"
    height="1.5em"
  >
    <path
      d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
      fill="#444444"
      p-id="2386"
    ></path>
  </svg>
);
const BackIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3169"
    width="1.48em"
    height="1.48em"
  >
    <path
      d="M393.390114 512.023536l347.948667-336.348468c20.50808-19.85828 20.50808-51.997258 0-71.792093-20.507056-19.826558-53.778834-19.826558-74.28589 0L281.990954 476.135164c-20.476357 19.826558-20.476357 51.981908 0 71.746044l385.061936 372.236839c10.285251 9.91379 23.728424 14.869662 37.173644 14.869662 13.446243 0 26.889417-4.956895 37.112246-14.901385 20.50808-19.826558 20.50808-51.919487 0-71.746044L393.390114 512.023536"
      p-id="3170"
    ></path>
  </svg>
);

export default Header;
