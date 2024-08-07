import styled from "styled-components";

export const CampoInputCadastro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 29vw;
`;

export const InputCadastro = styled.input`
  font-family: DM Sans, sans-serif;
  border-radius: 16px;
  border: 1px solid rgba(109, 114, 131, 1);
  width: 100%;
  padding: 13px 24px;

  ${({ cepPreenchido }) =>
    cepPreenchido &&
    `
    background-color: #f0f0f4;
  `}

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

export const Label = styled.label`
  color: #252525;
  letter-spacing: -0.28px;
  font: 500 14px/100% "DM Sans", sans-serif;
  margin-bottom: 8px;
`;