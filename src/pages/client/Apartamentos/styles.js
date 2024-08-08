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

export const TitleDiv = styled.div`
  background-color: none;
  padding: 20px;
  margin: 0px 0px 0px 0px;

  h2 {
    color: #333; 
    font-size: 24px; 
    margin: 0; 
  }
`;

export const List = styled.div`
  padding: 20px;
  margin-top: -3vh;
`;