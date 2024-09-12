import React, { useState } from "react";
import Logo from "../../assets/imgs/LogoPadrao.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { PageContainer, Sidebar, Imagem, Links, Link, HamburgerMenu } from "./styles";
import  AuthService from "../../services/api/authService";

export default function MenuUsuario() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <PageContainer>
      <HamburgerMenu id="hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={30} color="white" /> : <FaBars size={30} color="white" />}
      </HamburgerMenu>
      <Sidebar menuOpen={menuOpen}>
        <Imagem src={Logo} alt="Logo do Zé Porteiro" />
        <Links menuOpen={menuOpen}>
          <Link onClick={() => window.location.href = '/pagina-inicial'}>
            Página Inicial
          </Link>
          <Link onClick={() => window.location.href = '/estoque'}>
            Estoque
          </Link>
          <Link onClick={() => window.location.href = '/apartamentos'}>
            Apartamentos
          </Link>
          <Link onClick={() => window.location.href = '/porteiros'}>
            Porteiros
          </Link>
          <Link onClick={() => AuthService.logout()}>
            SAIR
          </Link>
        </Links>
      </Sidebar>
    </PageContainer>
  );
}