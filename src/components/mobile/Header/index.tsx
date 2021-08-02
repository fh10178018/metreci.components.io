import React from "react";
import styled from "styled-components";

const PopHeader = styled.div``;
const PopClose = styled.span``;
const HeadTitle = styled.div``;
const PopHeaderPlaceholder = styled.div``;

interface HeaderPropTypes {
  headTitle: string;
  onClose?: (openStatus: boolean) => void;
  onGoBack: (openStatus: boolean) => void;
  customStyle?: React.CSSProperties;
  hideHeaderPlaceholder: boolean;
}

const Header: React.FC<HeaderPropTypes> = ({
  headTitle = "",
  onClose,
  onGoBack,
  customStyle,
  hideHeaderPlaceholder,
}) => {
  return (
    <>
      <PopHeader style={customStyle}>
        <PopClose onClick={() => onGoBack(false)}>←</PopClose>
        <HeadTitle>{headTitle}</HeadTitle>
        {onClose ? (
          <PopClose onClick={() => onClose(false)}>
            x
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
