import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 26px;
  font-family: DM Sans, sans-serif;
`;

export const InputLabel = styled.label`
  width: 100%;
`;

export const RequiredIndicator = styled.span`
  color: rgba(71, 114, 64, 1);
`;

export const EmailInput = styled.input`
  width: 100%;
  margin-top: 15px;
  padding: 19px 24px;
  border-radius: 16px;
  border: 1px solid ${(props) => (props.isValid ? "rgba(224, 229, 242, 1)" : "red")};
  color: var(--text-color, #6d7283);
  font-weight: 400;
  font-family: DM Sans, sans-serif;

  @media (max-width: 768px) {
    max-width: 100%; 
  }
`;

export const MensagemErro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;