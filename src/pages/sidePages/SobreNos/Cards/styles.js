import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  max-width: 1361px;
  padding: 0 20px;
  width: 100%;
`;

export const ConteudoWrapper = styled.div`
  display: flex;
  margin-right: 3vw;
  margin-top: 40px; 
  justify-content: center;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin-top: 20px;
  }
`;

export const Coluna = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 33%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const Titulo = styled.h2`
  color: #183c18;
  font: 700 25px/1.5 Montserrat, sans-serif;
  letter-spacing: -1.2px;
  margin-top: 35px; 
  margin-left: 16vw;

  @media (max-width: 991px) {
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export const Imagem = styled.img`
  width: 74%;
  max-width: 436px;
  margin-left: 4.8vw;
  margin-right: auto;

  @media (max-width: 991px) {
    max-width: 80%;
  }
`;

export const Cartao = styled.div`
  background-color: var(--ghost-white, #f8f8ff);
  border: 1px solid rgba(194, 194, 194, 1);
  border-radius: 20px;
  color: #000;
  display: flex;
  flex-direction: column;
  padding: 40px 26px;
  width: 100%;
  align-items: center;
  justify-content: center;
  max-width: 310px; 
  height: 78%; 

  @media (max-width: 991px) {
    max-width: none;
  }
`;

export const TituloCaracteristica = styled.h3`
  font: 700 15px/1.5 Montserrat, sans-serif;
  letter-spacing: -0.66px;
  margin-top: 10px;
`;

export const DescricaoCaracteristica = styled.p`
  font: 400 13px/1.6 Montserrat, sans-serif;
  letter-spacing: -0.54px;
  margin-top: 10px;
`;

export const ConteudoCaracteristicas = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  justify-content: center;
  gap: 2vw;
  margin-top: 20px;
  padding: 0 20px;

  @media (max-width: 991px) {
    gap: 0;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;