import styled from "styled-components";

export const Main = styled.main`
  display: flex;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 50vw;
`;

export const BotaoVoltarHome = styled.div`
  margin-right: 16vw;
  margin-bottom: 9vh;
  margin-top: -10vh;
`;

export const Header = styled.div`
  text-align: left;
  margin-left: 9vw;
  margin-bottom: 6.5vh;
`;

export const Titulo = styled.h1`
  color: #252525;
  letter-spacing: -0.72px;
  max-width: 239px;
  font: 700 32px/156% "DM Sans", sans-serif;
`;

export const Subtitulo = styled.h2`
  color: var(--text-color, #6d7283);
  font: 400 14px/16px "DM Sans", sans-serif;
  letter-spacing: -0.32px;
`;

export const ImagemContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;
