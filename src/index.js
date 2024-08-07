import React from "react";
import ReactDOM from "react-dom/client";
import App from "./home/index";
import GlobalStyle from "./assets/GlobalStyle";
import Login from "./pages/Login/index";
import SobreNos from "./pages/SobreNos/index";
import Cadastrar from "./pages/Cadastro/index";
import CadastrarCondominio from "./pages/Cadastro/Condominio/index"
import ContrateNos from "./pages/Contrate/index";
import CadastroEncomendaCliente from "./pages/client/CadastroEncomenda/index"
import PaginaInicial from "./pages/client/PaginaInicial/index"
import Estoque from "./pages/client/Estoque/index"
import Apartamentos from "./pages/client/Apartamentos/index";
import Porteiro from "./pages/client/Porteiro/index"
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sobrenos" element={<SobreNos />} />
        <Route path="/contrate" element={<ContrateNos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/cadastrarcondominio" element={<CadastrarCondominio />} />
        <Route path="/pagina-inicial" element={<PaginaInicial />} />
        <Route path="/cadastrar-encomenda" element={<CadastroEncomendaCliente />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/apartamentos" element={<Apartamentos />} />
        <Route path="/porteiros" element={<Porteiro />} />
        <Route path="/teste" element={<TelaDeTestes />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
