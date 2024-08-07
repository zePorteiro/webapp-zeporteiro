import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  gap: 8px;
  font-size: 14px;
  letter-spacing: -0.28px;
  line-height: 143%;
  padding: 0 20px;
`;

export const Text = styled.p`
  color: #2b3674;
  font-family: DM Sans, sans-serif;
  font-weight: 400;
  flex-grow: 1;
`;

export const Link = styled.a`
  color: #477240;
  text-align: right;
  font-family: DM Sans, sans-serif;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none; /* Removido o sublinhado */
`;