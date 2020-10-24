import React from 'react'
import AuthTemplate from '../Components/auth/AuthTemplate'
import AuthForm from '../Components/auth/AuthForm'
import LoginForm from '../containers/auth/LoginForm'

const Login = () => {
    return (
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    );
}

export default Login;
