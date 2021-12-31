import styled from "styled-components";

const Wrapper = styled.div.attrs((props: { animationTime: number }) => ({
  animationTime: props.animationTime,
}))`
  transition: ${(props) => `height ${props.animationTime}ms ease-in-out`};
  overflow: hidden;
`;

export { Wrapper };
