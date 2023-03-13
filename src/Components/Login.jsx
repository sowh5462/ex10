import React, { useState } from 'react'
import { app } from '../firebaseinit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom';

const Login = ({history}) => {
    const auth = getAuth(app);

    const [form, setForm] = useState({
        email:'user01@email.com',
        password:'12341234'
    });

    const {email, password} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        //로그인체크
        signInWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            alert('로그인성공');
            sessionStorage.setItem('email', email);
            history.push('/');
        })
        .catch((error)=>{
            alert('로그인실패'+error.message);
        });
    };

    return (
        <div>
            <h1>로그인</h1>
            <form className='login' onSubmit={onSubmit}>
                <input placeholder='Email' name='email' value={email} onChange={onChange} />
                <input type="password" placeholder='password' name='password' value={password} onChange={onChange} />
                <button>로그인</button>
                <Link to="/join">회원가입</Link>
            </form>
        </div>
    )
}

export default Login