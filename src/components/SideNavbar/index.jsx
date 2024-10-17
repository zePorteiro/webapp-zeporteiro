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
        <Imagem 
          src={Logo} 
          alt="Logo do Zé Porteiro" 
          style={{ width: '170px', height: 'auto', marginBottom: '30px' }} 
        />
        <Links menuOpen={menuOpen}>
          <Link 
            onClick={() => window.location.href = '/pagina-inicial'}
            style={{ fontSize: '23px', marginBottom: '12px' }}
          >
            Página Inicial
          </Link>
          <Link 
            onClick={() => window.location.href = '/estoque'}
            style={{ fontSize: '23px', marginBottom: '12px' }}
          >
            Estoque
          </Link>
          <Link 
            onClick={() => window.location.href = '/apartamentos'}
            style={{ fontSize: '23px', marginBottom: '12px' }}
          >
            Apartamentos
          </Link>
          <Link 
            onClick={() => window.location.href = '/porteiros'}
            style={{ fontSize: '23px', marginBottom: '12px' }}
          >
            Porteiros
          </Link>
          <Link 
            onClick={() => AuthService.logout()}
            style={{ fontSize: '23px', marginBottom: '12px' }}
          >
            SAIR
          </Link>
        </Links>
      </Sidebar>
    </PageContainer>
  );   
}