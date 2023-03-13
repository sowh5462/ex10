import React, { useState } from 'react'
import { app } from '../firebaseinit'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const Join = ({history}) => {
    const db = getFirestore(app);

    const auth = getAuth(app);

    const [form, setForm] = useState({
        email:'user20@email.com',
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
        //회원가입
        createUserWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            alert('회원가입성공');
            history.push('/login');
            setDoc(doc(db, 'users', email), {email:email, name:'', address:'', phone:'', photo:''});
        })
        .catch((error)=>{
            alert('회원가입실패'+error.message);
        })
    }

    return (
        <div>
            <h1>회원가입</h1>
            <form className='login' onSubmit={onSubmit}>
                <input placeholder='Email' name='email' value={email} onChange={onChange} />
                <input type="password" placeholder='password' name='password' value={password} onChange={onChange} />
                <button className='regi'>회원가입</button>
            </form>
        </div>
    )
}

export default Join