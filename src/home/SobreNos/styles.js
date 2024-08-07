import styled from "styled-components";

export const Container = styled.div`
  padding: 20% 0;
  background-color: #789461;
  height: 880px;
`;

export const TextosContainer = styled.div`
  display: absolute;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  margin-left: 17%;
  margin-bottom: 3%;
`;

export const TextoPrincipal = styled.h1`
  font-size: 4.5rem;
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  font-weight: 700;
  background-color: var(--verde-escuro);
  -webkit-background-clip: text;
  background-clip: text;
  color: var(--verde-escuro);
  line-height: 1;
  margin-bottom: 3.5%;
  text-align: center;
`;

export const TextoEmDestaque = styled.span`
  color: #ffffff;
`;

export const Descricao = styled.p`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  line-height: 1.5;
`;