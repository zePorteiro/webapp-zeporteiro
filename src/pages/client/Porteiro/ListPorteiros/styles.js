import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #FFFFFF;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  border-radius: 30px;
  margin-left: 5vw;
  margin-right: 5vw;
  overflow-y: auto;
  height: 98vh;
  max-width: 85%;
  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const Container = styled.div`
  align-self: stretch;
  border: 1px solid rgba(227, 228, 232);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  width: 100%;
  overflow: hidden;
  margin-top: 21vh;
  background-color: var(--ghost-white, #f8f8ff);
`;

export const CabecalhoContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;

export const TituloContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 19px;
  color: var(--dark-green, #294b29);
  font-weight: 600;
  white-space: nowrap;
  text-align: left;
  letter-spacing: 0.12px;
  line-height: 63%;
  justify-content: center;
  flex: 1;
  margin: auto 0;
  font-family: Inter, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

export const Titulo = styled.div`
  justify-content: center;
  border-radius: 8px;
  padding: 2px 8px;
  font-family: Inter, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

// export const AdicionarButton = styled.button`
//   color: var(--Black-Black-500, #727a90);
//   letter-spacing: 0.07px;
//   font: 400 12px/143% Inter, sans-serif;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// export const AdicionarCsvButton = styled.button`
//   color: var(--Black-Black-500, #727a90);
//   letter-spacing: 0.07px;
//   font: 400 12px/143% Inter, sans-serif;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 8px;
  background-color: #50623a;
  border-radius: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.img`
  width: 16px;
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
`;

export const AddButton = styled.div`
  font: 600 16px "Inter", sans-serif;
  letter-spacing: 0.08px;
  color: var(--White, var(--ghost-white, #f8f8ff));
  cursor: pointer;
`;

export const AddCsvButton = styled.div`
  font: 600 16px "Inter", sans-serif;
  letter-spacing: 0.08px;
  color: var(--White, var(--ghost-white, #f8f8ff));
  cursor: pointer;
`;

export const DadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  margin-top: 2vh;
  height: 43vh;
  overflow-y: auto;
`;

export const LinhaCabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: bold;
  width: 100%; 
  border: 1px solid rgba(227, 228, 232);
`;

export const ColunaCabecalho = styled.div`
  flex: 1;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #727a90;
  font-weight: 600;
`;

export const Linha = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 0;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  background-color: ${(props) =>
    props.selecionada ? "#f5f5f7" : "transparent"};
  cursor: pointer;
  border: 1px solid rgba(227, 228, 232);
  width: 100%; 
`;

export const Coluna = styled.div`
  flex: 1;
  text-align: center;
`;

export const PaginacaoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid rgba(227, 228, 232);
  padding: 10px 0;
  margin-top: -4.6vh;
`;

export const NumeroPagina = styled.div`
  margin: 0 2px;
  justify-content: center;
  border-radius: 10px;
  border-color: rgba(220, 222, 227, 1);
  border-style: solid;
  border-width: 1px;
  width: 4%;
  color: ${(props) => (props.ativo ? "#ffffff" : "#727a90")};
  background-color: ${(props) => (props.ativo ? "#294b29" : "transparent")};
  white-space: nowrap;
  text-align: center;
  letter-spacing: 0.07px;
  padding: 6px;
  font: 600 11px/143% Inter, sans-serif;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

export const BotaoSkip = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;