import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 13px;
  margin-right: 5vw;
  gap: 1.4vw;
`;

export const CadastrarButton = styled.a`
  color: #294b29;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;

export const LoginButton = styled.a`
  font-family: Open Sans, sans-serif;
  border-radius: 6px;
  width: auto;
  background-color: #50623a;
  color: #fff;
  font-weight: 500;
  padding: 10px 17px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background-color: #40512b; 
    color: #e0e0e0; 
  }
`;