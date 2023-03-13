import React, { useState } from 'react'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import Home from './Home'
import Join from './Join'
import Login from './Login'
import Mypage from './Mypage'
import Product from './Product'
import Users from './Users'

const Menu = ({history}) => {
    const [email, setEmail] = useState(sessionStorage.getItem('email'));
    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/');
    };
    const onMypage = () => {
        history.push('/mypage');
    }

    return (
        <div>
            <div className='menu'>
                <NavLink to="/" exact={true}>Home</NavLink>
                <NavLink to="/users">회원목록</NavLink>
                {email ? 
                    <NavLink to="#" onClick={onLogout}>로그아웃</NavLink> 
                    :
                    <NavLink to="/login">로그인</NavLink>
                }
                {email && <span onClick={onMypage}>{email}</span>}
            </div>

            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/login" component={Login} />
                <Route path='/join' component={Join}/>
                <Route path="/mypage" component={Mypage}/>
                <Route path="/users" component={Users}/>
                <Route render={({ location }) => <h1>{location.pathname}잘못된 패스입니다.</h1>} />
            </Switch>
        </div>
    )
}

export default withRouter(Menu)