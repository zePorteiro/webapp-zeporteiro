import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MenuLateral from "../../../components/SideNavbar/index";
import InfoDoCondominio from "./ProfileCondominio/index";
import InfoDoSindico from "./ProfileSindico/index";
import { Principal, Container, Cabecalho, Imagem, Conteudo, Colunas, Coluna } from "./styles";
import Breadcrumb from "../../../components/Breadcrumb";

const Bread = () => {
  const breadcrumbItems = [
    { label: 'Página inicial', href: '#', active: active }
  ];
}

const PaginaPrincipal = () => (

<Principal>
  <MenuLateral />
  <Container>
    <Cabecalho>
    <Breadcrumb items={breadcrumbItems} divider=">" />
    </Cabecalho>
    <Imagem srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/115d262c-fa31-4ee5-a20e-9bd9efdb76ff?apiKey=47f1cd04243243c1a2a2819ee899bf9a&" />
    <Conteudo>
      <Style />
      <Colunas>
        <Coluna>
          <InfoDoCondominio />
        </Coluna>
        <Coluna>
          <InfoDoSindico />
        </Coluna>
      </Colunas>
    </Conteudo>
  </Container>
</Principal>
);

export default PaginaPrincipal;
