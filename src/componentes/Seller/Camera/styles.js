import styled, { keyframes, css } from "styled-components";

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ maxwidth }) => maxwidth && `${maxwidth}px`};
  max-height: ${({ maxheight }) => maxheight && `${maxheight}px`};
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Video = styled.video`
  position: absolute;
  width: 100%;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  border-radius: 10px;
  width: 100%;
`;

export const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  opacity: 0;

  ${({ flash }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;

export const Preview = styled.img`
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  border-radius: 10px;
  margin: 2rem;
  width: 100%;
  height: auto;
`;
