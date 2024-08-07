import React from "react";
import { EmailInput } from "./styles";

const EmailField = ({ id, email, setEmail, setTouchedEmail, isValidEmail, loading }) => {
    const handleChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handleBlur = () => {
        setTouchedEmail(true);
    };

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(value, regex.test(value));
    };

    return (
        <EmailInput
            type="email"
            id={id}
            name="email"
            placeholder="Digite o seu email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            $isValid={isValidEmail}
            autoComplete="email"
            disabled={loading}
        />
    );
};

export default EmailField;
