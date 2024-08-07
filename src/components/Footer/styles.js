import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background: linear-gradient(
    90deg,
    #789461 0%,
    #789461 0.01%,
    #50623a 47.95%,
    #294b29 99.9%
  );
  padding: 13vh 10vw 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  width: 100%;

  @media (max-width: 991px) {
    padding: 0 2vw;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 95vw;
  justify-content: space-between;
  align-items: start;
  gap: 2vw;
  margin-top: -5vh;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    max-width: 100%;
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  color: #fff;
  font-size: 1.6vh;
  font-weight: 400;
  line-height: 2.3vh;
`;

export const CompanyLogo = styled.img`
  width: 17vw;
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

export const CompanyDescription = styled.p`
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  margin-top: -1vh;
  margin-left: 1.5vh;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 5.6vw;
  color: #fff;
  font-size: 1.4vh;
  font-weight: 500;
  line-height: 100%;
  margin: auto 0;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

export const FooterLinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7vh;
`;

export const FooterLinkTitle = styled.h3`
  font: 2.1vh Montserrat, sans-serif;
  margin-bottom: 0.7vh;
`;

export const FooterLink = styled.a`
  font-family: Montserrat, sans-serif;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const AppDownload = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2vh;
`;

export const AppLogo = styled.img`
  width: 6.5vw;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
`;

export const DownloadText = styled.p`
  color: #fff;
  margin-top: 1.7vh;
  font: 500 1.5vh/154% Montserrat, sans-serif;
`;

export const AppLinks = styled.div`
  display: flex;
  gap: 0.3vh;
  margin-top: 0.8vh;
`;

export const AppLink = styled.img`
  width: 6vw;
  max-width: 100%;
  height: auto;
  margin-left: -0.3vw;
  cursor: pointer;

  &:last-child {
    width: 6vw;
    margin: auto 0;
  }
`;

export const Copyright = styled.div`
  color: #fff;
  text-align: center;
  font: 500 1vh/154% Montserrat, sans-serif;
`;