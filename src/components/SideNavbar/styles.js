import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  padding: 20px;
  width: 200px;
  position: fixed;
  top: 0;
  left: ${({ menuOpen }) => (menuOpen ? '0' : '-220px')};
  height: 100vh;
  background-color: #50623A;
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  @media (min-width: 768px) {
    position: static;
    width: 200px;
    margin-left: 6vw;
    height: auto;
    background-color: transparent;
    left: 0;
    transition: none;
  }

  ${({ menuOpen }) =>
    menuOpen &&
    `
    & > ${Links} {
      margin-top: 15vh;
    }
    & > ${Imagem} {
      margin-top: 15vh;
    }
  `}
`;

export const Imagem = styled.img`
  width: 160px;
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  font-weight: 600;
`;

export const Link = styled.div`
  font-family: Poppins, sans-serif;
  margin-top: 10px;
  font-size: 19px;
  line-height: 40px;
  cursor: pointer;
`;

export const HamburgerMenu = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;