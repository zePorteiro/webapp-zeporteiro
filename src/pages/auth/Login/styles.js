import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 12.5vw;
`;

export const VoltarWrapper = styled.div`
  position: absolute;
  top: 7vh;
  left: 6vw;
`;

export const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const HeaderTitle = styled.h1`
  color: #183c18;
  letter-spacing: -0.72px;
  font: 700 30px/156% DM Sans, sans-serif;
`;

export const HeaderDescription = styled.p`
  color: var(--text-color, #6d7283);
  letter-spacing: -0.32px;
  margin-top: 15px;
  font: 400 14px DM Sans, sans-serif;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 4vh;
  margin-right: 8vw;
`;

export const CriarContaWrapper = styled.div`
  margin-top: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImagemWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;