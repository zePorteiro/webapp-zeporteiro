import Links from "../LinksNavbar/index";
import LoginCadastro from "../btnSignInSignUp/index";
import LogoEmpresa from "../Logo/index";
import { Container } from "./styles";

export default function Navigation() {
  return (
    <Container>
      <LogoEmpresa />
        <Links />
        <LoginCadastro />
    </Container>
  );
}