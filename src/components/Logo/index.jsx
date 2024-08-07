import logotipo from "../../assets/imgs/LogoPadrao.svg";
import { LogoEmpresa } from "./styles";

const Logo = () => {
  return (
    <LogoEmpresa>
      <img src={logotipo}
        alt="Logo da empresa é um desenho de uma mão segurando uma caixa na cor verde escuro"
      />
    </LogoEmpresa>
  );
};

export default Logo;