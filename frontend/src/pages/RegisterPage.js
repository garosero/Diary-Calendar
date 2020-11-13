import React from 'react'
import AuthTemplate from '../Components/auth/AuthTemplate';
import SignupForm from "../Components/auth/SignupForm";


const RegisterPage = () => {
    return (
        <AuthTemplate>
            <SignupForm />
        </AuthTemplate>
    )
}

export default RegisterPage
