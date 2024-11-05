import { useState } from "react";
import axios from "axios";

const useForm = () => {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://10.0.0.145:8080/clientes/login", { email, senha })
            .then(
                response => {
                    alert('qualqer')
                    console.log(response.data)
                    sessionStorage.setItem("dados", response.data)        
                }
            );
            console.log(response.data)

            if (response.status === 200) {
                window.location.href = "/cadastrar-encomenda";
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);

            if (error.response) {
                console.error("Erro de resposta da API:", error.response.data);
                console.error("Status do erro:", error.response.status);
            } else if (error.request) {
                console.error("Erro de requisição:", error.request);
            } else {
                console.error("Erro ao processar requisição:", error.message);
            }

            setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
        }

        setLoading(false);
    };

    return {
        email,
        isValidEmail,
        touchedEmail,
        senha,
        showPassword,
        error,
        loading,
        setEmail,
        setTouchedEmail,
        setSenha,
        togglePasswordVisibility,
        handleSubmit,
    };
};

export default useForm;