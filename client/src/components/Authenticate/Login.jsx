import { useAuthUserMutation } from "../../store/jobhunterApi.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/authSlice.js";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../Alert/ErrorAlert/ErrorAlert.jsx";
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert.jsx";
import Spinner from "../Spinner/Spinner.jsx";

const Login = () => {
  const [loginUser, { isLoading, error }] = useAuthUserMutation();
  const [form, setForm] = useState({ email: '', password: '' });
  const auth = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();
  const loginBtn = useRef(null);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        loginBtn.current.click();
      }
    }

    document.addEventListener('keydown', handleEnterPress);

    return () => {
      document.removeEventListener('keydown', handleEnterPress);
    }
  }, []);

  console.log(`login error: ${ error }`);
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      loginUser(form).then(e => dispatch(setUser(e)));
    }
  };

  if (auth?.accessToken) return <Navigate to={ "/" }/>
  return <>
    <div className="hero flex flex-col mt-20">
      <p>Bejelentkezés</p>
      <form onSubmit={ handleLogin } className="hero-content flex-col gap-y-1">
        <input onInput={ handleInput } required type="email" name="email" placeholder="Email cím"/>
        <input onInput={ handleInput } required type="password" name="password" placeholder="Jelszó"/>
        <input ref={ loginBtn } type="submit" className="btn btn-sm btn-secondary mt-2" value="Bejelentkezés"/>
      </form>
      <SuccessAlert condition={ isLoading && !error }>
        Sikeres bejelentkezés!
      </SuccessAlert>
      { isLoading && <Spinner/> }
      <ErrorAlert condition={ error !== undefined }>
        Helytelen email cím vagy jelszó!
      </ErrorAlert>
    </div>
  </>;
};

export default Login;