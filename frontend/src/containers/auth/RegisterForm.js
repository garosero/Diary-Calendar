import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../Components/auth/AuthForm';

//useDispatch와 useSelector 함수를 사용하여 컴포넌트를 리덕스와 연동시킴


const RegisterForm = () => {
    const dispatch = useDispatch();
    const {form, auth, authError} = useSelector(({auth}) => ({
        form : auth.register,
        auth : auth.auth,
        authError : auth.authError
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form : 'register', //register로 state를 변경하는 액션함수를 dispatch
                key:name,
                value
            })
        )
    };

    //ㅠㅗㅁ 등록 이벤트 핸들러
    const onSubmit = e=> {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if ( password !== passwordConfirm){
            //todo : 오류 처리
            return;
        }
        dispatch(register({ username,password}));
    }

    //컴포넌트가 처음 렌더링될 때 form을 초기화
    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);

    //회원가입 성공/실패 처리
    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(auth);
        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
        }
    }, [auth, authError])

    return (
        <AuthForm 
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default RegisterForm
