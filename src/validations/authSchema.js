import { object, string, ref } from "yup"

export const signupSchema = object().shape({

    email: string()
        .required('Email es obligatorio')
        .email('Email ingresado no válido'),
    password: string()
        .required('Password es obligatorio')
        .min(6, 'Password debe tener como mínimo, 6 caracteres'),
    confirmPassword: string()
        .oneOf([ref('password'), null], 'Los password deben coincidir')
        .required(),


})