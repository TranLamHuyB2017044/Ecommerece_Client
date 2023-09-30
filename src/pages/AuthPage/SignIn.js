import styles from "./auth.module.scss";
import Header from "../../components/HeaderComponent/Header";
import NavBar from "../../components/NavBarComponent/NavBar";
import Footer from "../../components/FooterComponent/Footer";
import Announcement from "../../components/AnnouncementComponent/Announcement";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {Login} from '../../redux/userRedux'
import {publicRequest} from '../../request'
import { useForm } from "react-hook-form";
import {imgLogin} from '../../data'
import MyAlert from "../../components/AlertComponent/Alert";  
function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();

  const onLogin = async () =>{
    try {
      const user = await publicRequest.post('/auth/login', {username, password})
      dispatch(Login(user))
      if(user){
        window.localStorage.setItem('access_token', user.data.accessToken)
        MyAlert.Alert(
          'success', 'Login successfully'
        )
        navigate('/')
      }
    } catch (error) {
      MyAlert.Alert('error', error.response.data);
    }
    
  }
  const enterLogin = async (e) => {
    if(e.key === 'enter'){
      onLogin()
    }
  }
  return (
     <div className={styles.SignIn_container}>
      <Header />
      <NavBar />
      <Announcement />
      <div className={styles.wrapper}>
        <div className={styles.img}>
          <img
            src={imgLogin}
            alt="Rollover"
          />
        </div>
        <div className={styles.auth_form} style={{alignItems: 'center'}}>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className={styles.change_form}>
                <Link className={styles.text} to='/login' >Sign In |</Link>
                <Link className={styles.text} to='/register' > Register</Link>
            </div>
            <div className={styles.input_group}>
                <label htmlFor="UserName" >UserName</label>
                <input id="UserName" {...register("UserName")} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className={styles.input_group}>
                <label htmlFor="Password" >Password</label>
                <input id="Password" {...register("Password")} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input onKeyDown={enterLogin} className={styles.submit} type="submit" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
