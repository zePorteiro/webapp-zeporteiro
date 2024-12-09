import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formulario, ErrorPopup, Botao } from "./styles";
import { CampoInputCadastro, InputCadastro, Label } from "../../Inputs/styles";
import { useNavigate } from "react-router-dom";
import { validarCEP, validarNumero, validarPreenchido } from "../../../../../utils/formValidation";
import { toast, ToastContainer } from "react-toastify";

export default function PaginaCondominio() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleCepChange = (event) => {
    const formattedCep = event.target.value.replace(/\D/g, "");

    if (validarCEP(formattedCep)) {
    fetch(`https://viacep.com.br/ws/${formattedCep}/json/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na resposta: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        if (!data.erro) {
          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setIsFormVisible(true);
          setError("");
        } else {
          setError("CEP não encontrado");
          setLogradouro("");
          setBairro("");
          setCidade("");
          setIsFormVisible(false);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
        setError("Erro ao buscar CEP. Tente novamente mais tarde.");
        setLogradouro("");
        setBairro("");
        setCidade("");
        setIsFormVisible(false);
      });
  } else {
    setError("CEP inválido");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setIsFormVisible(false);
  }

  setCep(formattedCep);
};

  const handleNumeroChange = (event) => {
    const numeroInput = event.target.value;
    if (!validarNumero(numeroInput)) {
      setError("Apenas números são permitidos");
      setNumero(""); 
    } else {
      setError("");
      setNumero(numeroInput);
    }
  };

  const handleNomeChange = (event) => {
    const nomeInput = event.target.value;
    if (!/^[\w\s\u00C0-\u00FF]+$/.test(nomeInput)) {
      setError("Apenas caracteres alfanuméricos e acentuações padrões são permitidos");
      setNome("");
    } else {
      setError("");
      setNome(nomeInput);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validação dos campos
    if (
      !validarCEP(cep) ||
      !validarNumero(numero) ||
      !validarPreenchido(logradouro) ||
      !validarPreenchido(bairro) ||
      !validarPreenchido(cidade) ||
      !validarPreenchido(nome)
    ) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }
  
    try {
      const dadosCondominio = {
        nome,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        fkCliente: sessionStorage.getItem("fkUser"), 
      };
  
      // Fazendo a requisição para a API
      const response = await axios.post(
        "http://localhost:8080/condominios",
        dadosCondominio,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
          },
        }
      );
  
      console.log("Resposta do servidor:", response);
  
      if (response.status === 201) {
        toast.success("Condomínio cadastrado com sucesso!");
        const condominioId = response.data.id; 
        sessionStorage.setItem("condominioId", condominioId); 
  
        navigate("/login");
      } else {
        toast.error("Erro inesperado ao cadastrar condomínio, contate o suporte.");
        setError("Erro inesperado ao cadastrar condomínio.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro ao cadastrar condomínio:", error.response.data);
        if (error.response.status === 401) {
          setError("Acesso não autorizado. Verifique suas credenciais.");
        } else {
          setError(`Erro ao cadastrar condomínio: ${error.response.data.message || error.response.data}`);
        }
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
        setError("Não foi possível se conectar ao servidor. Tente novamente mais tarde.");
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
        setError("Erro ao configurar a requisição. Por favor, tente novamente.");
      }
    }
  };  
  

  const isFormValid =
    validarCEP(cep) &&
    validarNumero(numero) &&
    validarPreenchido(logradouro) &&
    validarPreenchido(bairro) &&
    validarPreenchido(cidade);

  return (
    <Formulario>
      <form onSubmit={handleSubmit}>
        <CampoInputCadastro>
          <Label htmlFor="nomeInput">Nome do Condomínio</Label>
          <InputCadastro
            type="text"
            id="nomeInput"
            placeholder="Digite o nome do condomínio"
            value={nome}
            onChange={handleNomeChange}
            disabled={loading}
          />
        </CampoInputCadastro>

        <CampoInputCadastro>
          <Label htmlFor="cepInput">CEP*</Label>
          <InputCadastro
            type="text"
            id="cepInput"
            placeholder="Digite o CEP"
            value={cep}
            onChange={handleCepChange}
            maxLength="9"
            disabled={loading}
          />
          <ErrorPopup show={error !== ""}>{error}</ErrorPopup>
        </CampoInputCadastro>

        {isFormVisible && (
          <>
            <CampoInputCadastro>
              <Label>Logradouro</Label>
              <InputCadastro
                type="text"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                placeholder="Logradouro"
                disabled={loading}
              />
            </CampoInputCadastro>

            <CampoInputCadastro>
              <Label>Número*</Label>
              <InputCadastro
                type="text"
                value={numero}
                onChange={handleNumeroChange}
                placeholder="Número"
                disabled={loading}
              />
            </CampoInputCadastro>

            <CampoInputCadastro>
              <Label>Bairro</Label>
              <InputCadastro
                type="text"
                value={bairro}
                readOnly
                placeholder="Bairro"
                disabled={loading}
              />
            </CampoInputCadastro>

            <CampoInputCadastro>
              <Label>Cidade</Label>
              <InputCadastro
                type="text"
                value={cidade}
                readOnly
                placeholder="Cidade"
                disabled={loading}
              />
            </CampoInputCadastro>
          </>
        )}

        <Botao type="submit" disabled={!isFormValid || loading}>
          Cadastrar Condomínio
        </Botao>
      </form>
      <ToastContainer /> {/* Certifique-se de que este componente está importado */}
    </Formulario>
  );
}