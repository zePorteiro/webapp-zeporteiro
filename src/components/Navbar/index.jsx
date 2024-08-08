import Links from "./Links/index";
import LoginCadastro from "../Buttons/Sign/index";
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