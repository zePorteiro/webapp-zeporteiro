import styled from "styled-components";

export const Container = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  margin-left: 16%;
  margin-top: 2.8%;
`;

export const Links = styled.ul`
  display: flex;
  font-family: "Montserrat", Arial, Helvetica;
  font-weight: 600;
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 1.3vh;
  gap: 5vw;
`;

export const ListItem = styled.li`
  cursor: pointer;

  &.verde {
    color: #294b29;
  }

  &.preto {
    color: black;
  }
`;

export const LinkText = styled.p`
  margin: 0;
`;