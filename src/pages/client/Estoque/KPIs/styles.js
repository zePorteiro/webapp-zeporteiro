import styled from "styled-components";

export const Container = styled.div`
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  max-width: 800px;
  align-items: center;
  gap: 4vw;
  justify-content: center;
  padding: 20px 40px;
  margin: 0 auto;
  margin-top: 3vh;
  background-color: #FFFFFF;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    padding: 32px 20px;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Imagem = styled.img`
  aspect-ratio: 0.98;
  object-fit: auto;
  object-position: center;
  width: 65px;
`;

export const Conteudo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Titulo = styled.div`
  color: #acacac;
  letter-spacing: -0.14px;
  font: 400 12px Poppins, sans-serif;
`;

export const Numero = styled.div`
  color: #333;
  letter-spacing: -0.32px;
  margin-top: 5px;
  font: 600 24px/100% Poppins, sans-serif;
  
  @media (max-width: 991px) {
    font-size: 24px;
  }
`;