import styled from "styled-components";

export const Formulario = styled.div`
  margin-left: 12vw;
`;

export const ErrorPopup = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: #ff4d4f;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

export const Botao = styled.button`
  border-radius: 16px;
  background-color: ${({ disabled }) => (disabled ? "#708470" : "#123312")};
  color: #fff;
  text-align: center;
  letter-spacing: -0.28px;
  padding: 16px 8px;
  font: 500 14px/100% "DM Sans", sans-serif;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 29vw;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#708470" : "#123312")};
  }

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;