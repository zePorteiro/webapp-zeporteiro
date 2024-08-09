import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  border-radius: 30px;
  margin-left: 6vw;
  margin-right: 4.5vw;
  overflow-y: auto;
  height: 88vh;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  widh: 100%;
`;

export const Formulario = styled.div`
  flex: 1;
  margin-left: 7vw;
`;

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1vw;
  
  img {
    max-width: 96%;
    max-height: 99%;
    object-fit: cover;
  }
`;