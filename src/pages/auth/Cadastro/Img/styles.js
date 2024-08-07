import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  max-width: 963px;
  justify-content: center;
  padding: 80px 60px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

export const Image = styled.img`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh; /* Ocupa toda a altura da tela */
  width: auto;
`;