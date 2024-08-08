import Links from "./Links/index";
import LoginCadastro from "../Buttons/Sign/index";
import LogoZePorteiro from "../Logo/index";
import { Container } from "./styles";

export default function Navigation() {
  return (
    <Container>
      <LogoZePorteiro />
        <Links />
        <LoginCadastro />
    </Container>
  );
}