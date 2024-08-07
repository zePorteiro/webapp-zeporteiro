import styled from "styled-components";

export const Container = styled.section`
  justify-content: center;
  display: flex;
  height: 700px;
  width: 100%;
`;

export const LeftContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10%;
`;

export const ImagemContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Titulo = styled.h1`
  font-size: 3.3rem;
  font-family: 'Montserrat';
  font-weight: 800;
  background: linear-gradient(to right, #294b29, #50623a, #789461, #789461);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  margin-bottom: 4%;
`;

export const Texto = styled.span`
  color: #000000;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  line-height: 1.5;
  margin-bottom: 5vh;
`;