import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formulario, ErrorPopup, Botao } from "./styles";
import { CampoInputCadastro, InputCadastro, Label } from "../../Inputs/styles";
import { useNavigate } from "react-router-dom";
import { validarCEP, validarNumero, validarPreenchido } from "../../../../../utils/formValidation";

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
        .then((response) => response.json())
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
          setError("Erro ao buscar CEP");
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
      setNumero(""); // Definir como string vazia se a entrada for inválida
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
    if (
      !validarCEP(cep) ||
      !validarNumero(numero) ||
      !validarPreenchido(logradouro) ||
      !validarPreenchido(bairro) ||
      !validarPreenchido(cidade)
    ) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      const response = await axios.post("http://10.0.0.178:8080/condominios", {
        nome,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao cadastrar condomínio:", error);
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
    </Formulario>
  );
}