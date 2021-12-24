import styled from "styled-components";

const Maskwrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MaskBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: opacity 500ms ease-in-out;
`;

export { Maskwrapper, MaskBox };
