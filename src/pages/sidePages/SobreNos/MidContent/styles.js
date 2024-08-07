import styled from "styled-components";

export const Container = styled.section`
  background-color: #789461;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  justify-content: center;
  padding: 80px 70px;
  margin-top: -16vh;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

export const MidContent = styled.div`
  display: flex;
  margin-top: 151px;
  max-width: 100%;
  flex-direction: column;
  z-index: 0;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export const Title = styled.h1`
  color: #294b29;
  letter-spacing: -1.12px;
  font: 800 48px/1.3 Montserrat, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 57px;
  }
`;

export const Description = styled.p`
  color: #fff;
  letter-spacing: -0.45px;
  align-self: center;
  margin-top: 56px;
  font: 400 18px/1.7 Open Sans, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;