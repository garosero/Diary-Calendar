import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm} from '../../modules/auth';
import AuthForm from '../../Components/auth/AuthForm';


//useDispatch와 useSelector 함수를 사용하여 컴포넌트를 리덕스와 연동시킴
//connect 함수 대신 hooks 사용.
const LoginForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({auth}) => ({
        form : auth.login
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form : 'login',
                key : name,
                value
            })
        )
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        //구현 예정
    }

    //컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(()=>{
        dispatch(initializeForm('login'))
    },[dispatch]);

    //useEffect를 사용하여 맨 처음 렌더링 후 initializeFrom 액션 생성 함수 호출
    //이 작업을 하지 않으면, 로그인 페이지에서 값을 입력한 뒤 다른 페이지로 
    //이동했다가 다시 돌아왔을 때 값이 유지된 상태로 보이게 됨. 

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
        );

}

export default LoginForm;