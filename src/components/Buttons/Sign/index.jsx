import { HeaderContainer, CadastrarButton, LoginButton } from "./styles";

export default function Header() {
  return (
    <HeaderContainer>
      <CadastrarButton href="/cadastrar">Cadastrar</CadastrarButton>
      <LoginButton href="/login">Fazer Login</LoginButton>
    </HeaderContainer>
  );
}