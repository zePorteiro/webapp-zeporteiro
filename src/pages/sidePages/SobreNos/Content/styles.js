import styled from "styled-components";

export const Pagina = styled.section`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 70px;
  margin-top: 16vh;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

export const Introducao = styled.div`
  color: #000;
  letter-spacing: -1.6px;
  font: 700 29px/1.6 "Open Sans", sans-serif;
  text-align: left;
  max-width: 800px;
  margin-bottom: 40px;
  margin-right: 18vw;
`;

export const Texto = styled.div`
  color: #000;
  letter-spacing: -0.96px;
  font: 400 18px/1.7 "Open Sans", sans-serif;
  margin-top: 10vh;
  margin-left: 18vw;
  width: 100%;
`;

export const ConteudoSecao = styled.div`
  display: flex;
  gap: 6vw;
  margin-top: 15vh;
  justify-content: space-between;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

export const Titulo = styled.h2`
  color: #183c18;
  letter-spacing: -1.44px;
  font: 700 48px/72px Montserrat, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
    line-height: 67px;
  }
`;

export const Descricao = styled.p`
  color: #000;
  letter-spacing: -0.96px;
  align-self: start;
  margin-top: 12px;
  font: 400 18px/34px Open Sans, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const Destaque = styled.span`
  font-weight: 700;
  color: #183c18;
`;

export const ContainerPrincipal = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 30vh;
  margin-bottom: 25vh;
`;

export const TituloPrincipal = styled.h1`
  color: #000;
  letter-spacing: -1.68px;
  font: 700 46px/83px Montserrat, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
    line-height: 66px;
  }
`;

export const BotaoPrincipal = styled.button`
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    #789461 0%,
    #789461 0.01%,
    #50623a 47.95%,
    #294b29 99.9%
  );
  color: #fff;
  margin-top: 51px;
  padding: 10px 40px;
  font: 800 24px/197% Mulish, sans-serif;
  cursor: pointer;

  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;