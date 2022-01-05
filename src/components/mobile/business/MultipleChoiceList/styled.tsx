import styled from "styled-components";
import { rem } from "../../constants/rem";

const Wrapper = styled.div.attrs((props: { disabled: boolean }) => {
  return {
    disabled: props.disabled,
  };
})`
  width: 100%;
  display: flex;
  min-height: ${rem("120px")};
  user-select: none;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

const LeftContent = styled.div`
  display: flex;
  min-height: ${rem("120px")};
  align-items: center;
`;
const RightContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  max-width: ${rem("250px")};
  overflow: hidden;
`;

const ChildrenWrapper = styled.div`
  overflow: hidden;
  flex: 1;
`;

export { Wrapper, LeftContent, RightContent, FooterContent, ChildrenWrapper };
