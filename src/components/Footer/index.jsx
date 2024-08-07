import React from "react";
import {
  FooterWrapper,
  FooterContent,
  CompanyInfo,
  CompanyLogo,
  CompanyDescription,
  FooterLinks,
  FooterLinkSection,
  FooterLinkTitle,
  FooterLink,
  AppDownload,
  AppLogo,
  DownloadText,
  AppLink,
  AppLinks,
  Copyright
} from "./styles";

const footerData = [
  {
    title: "Empresa",
    links: [
      { text: "Sobre nós", href: "/sobrenos" },
      { text: "Contrate", href: "/contrate" },
    ],
  },
  {
    title: "Contato",
    links: [
      { text: "(11) 1234-5678", href: "#" },
      { text: "São Paulo, SP - Brasil", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <CompanyInfo>
          <CompanyLogo
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/43f80e6be4c5260ca05efce557ed4d48e3c14d7e0a42b874cabf5bfd0e902df8?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
            alt="Logo da Empresa Zé Porteiro"
          />
          <CompanyDescription>
            A nova era para a gestão de encomendas <br /> dos condomínios
          </CompanyDescription>
        </CompanyInfo>
        <FooterLinks>
          {footerData.map((section, index) => (
            <FooterLinkSection key={index}>
              <FooterLinkTitle>{section.title}</FooterLinkTitle>
              {section.links.map((link, linkIndex) => (
                <FooterLink key={linkIndex} href={link.href}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterLinkSection>
          ))}
        </FooterLinks>
        <AppDownload>
          <AppLogo
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eaf85ad4f466be3ef9007ef7dcb0f90829f63c905826221bd57dbfe32871041f?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
            alt="Logo do Aplicativo"
          />
          <DownloadText>Baixe o nosso aplicativo</DownloadText>
          <AppLinks>
            <AppLink
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/54ba461d84b978c5ae42c093b4c45bbc694ee56b44d203c48016d2412472ea7d?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
              alt="App Store"
            />
            <AppLink
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/090aebfeb1b390ecdb50ec7686d72c44e95d2e680f411313a0c60984e50d0cc0?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
              alt="Google Play"
            />
          </AppLinks>
        </AppDownload>
      </FooterContent>
      <Copyright>
        <span>© Copyright 2024 Zé Porteiro</span>
      </Copyright>
    </FooterWrapper>
  );
}
