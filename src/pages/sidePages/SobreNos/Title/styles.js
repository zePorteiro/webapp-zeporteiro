import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  margin-top: 45px;
  width: 536px;
  max-width: 100%;
  flex-direction: column;
  text-align: center;
  padding: 0 20px;
  align-items: center; /* Centraliza horizontalmente */

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export const TituloPrincipal = styled.h1`
  background: linear-gradient(to left, #294b29, #50623a, #789461, #789461);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 378px;
  font: 800 48px/87.5% Montserrat, sans-serif;
  text-align: center;
`;

export const Descricao = styled.div`
  color: #000;
  letter-spacing: -0.6px;
  margin-top: 16px;
  font: 500 14px/2.1 Mulish, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const TextoDescricao = styled.span`
  font-family: Open Sans, sans-serif;
  font-weight: 400;
`;