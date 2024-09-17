import React from "react";
import ReactDOM from "react-dom/client";
import App from "./home/index";
import GlobalStyle from "./assets/GlobalStyle";
import Login from "./pages/auth/Login/index";
import SobreNos from "./pages/sidePages/SobreNos/index";
import Cadastrar from "./pages/auth/Cadastro/index";
import CadastrarCondominio from "./pages/auth/Cadastro/Condominio/index"
import ContrateNos from "./pages/sidePages/Contrate/index";
import PaginaInicial from "./pages/client/PaginaInicial/index"
import Estoque from "./pages/client/Estoque/index"
import Apartamentos from "./pages/client/Apartamentos/index";
import Porteiro from "./pages/client/Porteiro/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/apartamentos" element={<Apartamentos />} />
        <Route path="/porteiros" element={<Porteiro />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
