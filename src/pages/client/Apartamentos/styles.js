import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Content = styled.div`
  flex-grow: 1;
  border-radius: 30px;
  margin-left: 6vw;
  margin-right: 4.5vw;
  overflow-y: auto;
  height: 88vh;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;

export const List = styled.div`
  padding: 40px;
`;