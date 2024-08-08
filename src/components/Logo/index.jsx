import logotipo from "../../assets/imgs/LogoPadrao.svg";
import { LogoEmpresa } from "./styles";

const Logo = () => {
  return (
    <LogoEmpresa>
      <img src={logotipo}
        alt="Logo do Zé Porteiro"
      />
    </LogoEmpresa>
  );
};

export default Logo;