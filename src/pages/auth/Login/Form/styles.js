import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: DM Sans, sans-serif;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 26px;
`;

export const InputLabel = styled.label`
  width: 100%;
`;

export const RequiredIndicator = styled.span`
  color: rgba(71, 114, 64, 1);
`;

export const Input = styled.input`
  width: 160%;
  margin-top: 15px;
  padding: 19px 24px;
  border-radius: 16px;
  border: 1px solid
    ${(props) => (props.$isValid ? "rgba(224, 229, 242, 1)" : "red")};
  color: var(--text-color, #6d7283);
  font-weight: 400;
  font-family: DM Sans, sans-serif;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const EmailInput = styled(Input)``;

export const PasswordField = styled.div`
  display: flex;
  align-items: center;
  width: 160%;
  margin-top: 15px;
  padding: 15px 21px;
  border-radius: 16px;
  border: 1px solid rgba(224, 229, 242, 1);
  color: var(--text-color, #6d7283);
  font-weight: 400;
  background-color: #fff;
`;

export const PasswordInput = styled.input`
  flex: 1;
  width: 100%;
  max-width: 400px;
  border: none;
  font-family: DM Sans, sans-serif;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const EyeIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
  object-fit: contain;
  cursor: pointer;
`;

export const MensagemErro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const Botao = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  background-color: #50623a;
  width: 120%;
  color: #fff;
  text-align: center;
  letter-spacing: -0.28px;
  padding: 20px 8px;
  font: 700 14px/100% DM Sans, sans-serif;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  margin-top: 5vh;
  margin-left: 3vw;

  &:hover {
    background-color: #3c4d2b;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;