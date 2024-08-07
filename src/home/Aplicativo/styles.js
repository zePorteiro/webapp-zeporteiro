import styled from "styled-components";

export const MainContainer = styled.div`
  background-color: var(--background);
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
  margin-top: 15vh;
  margin-bottom: 12vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1vw;
  display: flex;
`;

export const ImgCelular = styled.div`
  width: 70%;
  height: auto;

  img {
    width: 50%;
    height: auto;
    margin-top: 10vh;
    margin-left: 16vw;
    margin-bottom: 12vh;
  }
`;

export const TextosContainer = styled.div`
  width: 80%;
  padding: 25px;
  flex-direction: column;
  margin-top: 29vh;
  margin-right: 7vw;

  h1 {
  color: #294b29;
  font: 700 46px/105% Montserrat, sans-serif;
  margin-bottom: 3vh;
  
  @media (max-width: 991px) {
    font-size: 40px;
  }

  span {
    color: #000;
    margin: 41px 0 0;
    max-width: 100%;
    
    @media (max-width: 991px) {
      margin-top: 40px;
  }
`;

export const LojaAplicativo = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;

  img {
    width: 31%;
    height: auto;
    margin-top: 2vh;
    margin-left: -0.5vw;
  }
`;