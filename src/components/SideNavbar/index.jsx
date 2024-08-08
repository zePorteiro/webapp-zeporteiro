import React, { useState } from "react";

import Logo from "../../components/Logo/index";
import { FaBars, FaTimes } from "react-icons/fa";

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
        <Imagem src={Logo} alt="Logo da empresa Zé Porteiro" />
        <Links menuOpen={menuOpen}>
          <Link onClick={() => window.location.href = '/pagina-inicial'}>
            Página Inicial
          </Link>
          <Link onClick={() => window.location.href = '/cadastrar-encomenda'}>
            Cadastrar Encomendas
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
          <Link onClick={() => window.location.href = '/login'}>
            SAIR
          </Link>
        </Links>
      </Sidebar>
    </PageContainer>
  );
}