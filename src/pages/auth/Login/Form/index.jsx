import { Form, InputWrapper, InputLabel, RequiredIndicator, MensagemErro, Botao } from "./styles";
import EmailField from "../InputEmail/index";
import PasswordField from "../InputSenha/index";
import useForm from "../hooks/useForm";

const LoginForm = () => {
    const { email, isValidEmail, touchedEmail, senha, showPassword, error, loading, setEmail, setTouchedEmail, setSenha, togglePasswordVisibility, handleSubmit } = useForm();

    return (
        <Form onSubmit={handleSubmit}>
            <InputWrapper>
                <InputLabel htmlFor="email">
                    Email<RequiredIndicator>*</RequiredIndicator>
                </InputLabel>
                <EmailField
                    id="email"
                    email={email}
                    setEmail={setEmail}
                    setTouchedEmail={setTouchedEmail}
                    isValidEmail={isValidEmail}
                    touchedEmail={touchedEmail}
                    loading={loading}
                />
                {(!isValidEmail && touchedEmail) && <MensagemErro>Email inválido</MensagemErro>}
            </InputWrapper>

            <InputWrapper>
                <InputLabel htmlFor="senha">
                    Senha<RequiredIndicator>*</RequiredIndicator>
                </InputLabel>
                <PasswordField
                    id="senha"
                    senha={senha}
                    setSenha={setSenha}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    loading={loading}
                />
            </InputWrapper>

            {error && <MensagemErro>{error}</MensagemErro>}
            <Botao type="submit" disabled={loading}>Login</Botao>
        </Form>
    );
};

export default LoginForm;