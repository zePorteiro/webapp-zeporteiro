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

export const LabelText = styled.span`
  color: rgba(107, 107, 107, 1);
`;

export const PasswordField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  padding: 15px 21px;
  border-radius: 16px;
  border: 1px solid rgba(224, 229, 242, 1);
  color: var(--text-color, #6d7283);
  font-weight: 400;
  background-color: #fff; /* Adicionado */
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