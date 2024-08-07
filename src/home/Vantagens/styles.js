import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--background);
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
  margin-top: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1vw;
`;

export const TextosContainer = styled.div`
  flex: 1;
  margin-top: 9vh;
`;

export const Titulo = styled.h1`
  font-size: 2.7rem;
  font-weight: 700;
  line-height: 1.2em;
  letter-spacing: -1px;
  color: var(--verde-escuro);
  font-family: "Montserrat", sans-serif;
  margin-bottom: 20px;
`;

export const Textos = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.6;
`;

export const ListaDiv = styled.div`
  margin-top: 4vh;
  margin-bottom: 16vh;
`;

export const ImagemContainer = styled.div`
  width: 55%;
  max-width: 130%;
  justify-content: flex-end;
  align-items: center;
`;