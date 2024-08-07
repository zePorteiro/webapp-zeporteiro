import React from "react";
import { PasswordField as StyledPasswordField, PasswordInput, EyeIcon } from "./styles";

const PasswordField = ({ id, senha, setSenha, showPassword, togglePasswordVisibility, loading }) => {
    return (
        <StyledPasswordField>
            <PasswordInput
                type={showPassword ? "text" : "password"}
                id={id}
                name="senha"
                placeholder="Digite a sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
            />
            <EyeIcon
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f93281bd2e155dc8346c0ad62b4de0485e1878ce0a3711af246595a6810b08e?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
                alt="ícone de olho para mostrar a senha"
                onClick={togglePasswordVisibility}
            />
        </StyledPasswordField>
    );
};

export default PasswordField;
