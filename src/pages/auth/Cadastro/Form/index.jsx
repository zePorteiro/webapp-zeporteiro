import React, { useState } from "react";
import axios from "axios";
import { CampoInputCadastro, InputCadastro, Label } from "../Inputs/styles";
import { validarEmail, formatarTelefone, validarSenha } from "../../../../utils/formValidation";
import { Formulario, Botao } from "./styles";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function FormularioCadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaValida, setSenhaValida] = useState(true);
  const [nome, setNome] = useState("");
  const [nomeValido, setNomeValido] = useState(true);

  const toggleMostrarSenha = () => {
    setMostrarSenha((prevState) => !prevState);
  };

  const handleChangeEmail = (event) => {
    const novoEmail = event.target.value;
    setEmail(novoEmail);
  };

  const handleBlurEmail = () => {
    setEmailValido(validarEmail(email));
  };

  const handleChangeTelefone = (event) => {
    const novoTelefone = event.target.value;
    if (/^\d*$/.test(novoTelefone) && novoTelefone.length <= 11) {
      setTelefone(formatarTelefone(novoTelefone));
    }
  };

  const handleChangeSenha = (event) => {
    const novaSenha = event.target.value;
    setSenha(novaSenha);
    setSenhaValida(validarSenha(novaSenha));
  };

  const handleChangeNome = (event) => {
    const novoNome = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(novoNome)) {
      setNome(novoNome);
      setNomeValido(true);
    } else {
      setNomeValido(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome.trim() || !email.trim() || !telefone.trim() || !senha.trim()) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    if (!nomeValido) {
      toast.error("O nome não pode conter caracteres não alfabéticos.");
      return;
    }

    if (!validarEmail(email)) {
      setEmailValido(false);
      toast.error("Email inválido.");
      return;
    }

    if (!validarSenha(senha)) {
      setSenhaValida(false);
      toast.error("Senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/clientes",
        {
          nome,
          email,
          telefone,
          senha,
        }
      );

      if (response.status === 201) {
        const token = response.data.token;
        sessionStorage.setItem("token", token); // Armazene o token na session storage
        toast.success("Cadastro concluído com sucesso!");
        console.log("Resposta do cadastro:", JSON.stringify(response.data));
        const fkUser = response.data.userId;
        sessionStorage.setItem("fkUser", fkUser); // Armazene o id do usuário na session storage
        setTimeout(() => {
          window.location.href = "/cadastrarcondominio"; // Redireciona para a página de condomínios
        }, 2000); // Redireciona após 2 segundos
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao cadastrar usuário. Por favor, tente novamente.");
      }
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <Formulario>
      <form onSubmit={handleSubmit}>

        <CampoInputCadastro>
          <Label htmlFor="nomeInput">Nome</Label>
          <InputCadastro
            type="text"
            id="nomeInput"
            placeholder="Digite o seu nome completo"
            value={nome}
            onChange={handleChangeNome}
          />
          {!nomeValido && (
            <span style={{ color: "red" }}>Nome inválido (somente letras e espaços são permitidos)</span>
          )}
        </CampoInputCadastro>

        <CampoInputCadastro>
          <Label htmlFor="emailInput">Email</Label>
          <InputCadastro
            type="email"
            id="emailInput"
            placeholder="Digite o seu email"
            value={email}
            onChange={handleChangeEmail}
            onBlur={handleBlurEmail}
          />
          {!emailValido && (
            <span style={{ color: "red" }}>Email inválido</span>
          )}
        </CampoInputCadastro>

        <CampoInputCadastro>
          <Label htmlFor="telefoneInput">Telefone Celular</Label>
          <InputCadastro
            type="tel"
            id="telefoneInput"
            placeholder="(00) 99999-9999"
            value={telefone}
            onChange={handleChangeTelefone}
          />
        </CampoInputCadastro>

        <CampoInputCadastro>
          <Label htmlFor="senhaInput">Senha</Label>
          <div style={{ position: "relative" }}>
            <InputCadastro
              type={mostrarSenha ? "text" : "password"}
              id="senhaInput"
              placeholder="Digite a sua senha"
              value={senha}
              onChange={handleChangeSenha}
            />
            <IconButton
              onClick={toggleMostrarSenha}
            />
          </div>
          {!senhaValida && (
            <span style={{ color: "red" }}>Senha deve ter no mínimo 6 caracteres</span>
          )}
        </CampoInputCadastro>

        <Botao type="submit">
          Cadastrar
        </Botao>
      </form>
      <ToastContainer />
    </Formulario>
  );
}