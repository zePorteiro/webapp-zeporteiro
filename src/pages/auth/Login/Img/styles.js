import styled from "styled-components";

export const ImageWrapper = styled.div`
  width: 50%;
  height: 100vh;
  max-width: 965px;
  overflow: hidden; 
  margin: 0 auto; 
  position: fixed;
  top: 0;
  bottom: 0;
`;

export const Image = styled.img`
  max-width: 100%; 
  height: 110%;
  object-fit: cover;
`;