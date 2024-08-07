import styled from "styled-components";

export const ListaUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListaContent = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  margin-top: 1.5vh;
  margin-right: 13px;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  border: 1px solid #acabab;
  border-radius: 10%;
  padding: 8px;
  width: 50px;
  height: 47px;

  img {
    width: auto;
    height: 30px;
  }
`;

export const ContentWrapper = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;