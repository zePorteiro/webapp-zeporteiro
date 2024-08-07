import styled from "styled-components";

export const Section = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 13vh;
  margin-bottom: 20vh;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Content = styled.section`
  width: 50%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;