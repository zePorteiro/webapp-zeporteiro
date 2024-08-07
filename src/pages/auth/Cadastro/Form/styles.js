import styled from "styled-components";

export const IconeOlho = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const Formulario = styled.div`
  margin-left: 12vw;
`;

export const Botao = styled.button`
  border-radius: 16px;
  background-color: #294b29;
  color: #fff;
  text-align: center;
  letter-spacing: -0.28px;
  padding: 16px 8px;
  font: 500 14px/100% "DM Sans", sans-serif;
  border: none;
  cursor: pointer;
  width: 29vw;

  transition: background-color 0.3s;

  &:hover {
    background-color: #123312;
  }

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;