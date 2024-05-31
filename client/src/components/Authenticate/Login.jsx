import { useAuthUserMutation } from "../../store/jobhunterApi.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/authSlice.js";
import { Navigate } from "react-router-dom";

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

  console.log(`error: ${ error }`);
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
      { isLoading && !error && <div role="alert" className="alert alert-success w-[20%] p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Sikeres bejelentkezés!</span>
      </div> }
      { isLoading && <span className="loading loading-spinner loading-lg"></span> }
      { error && <div role="alert" className="alert alert-error w-[25%] p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Helytelen email cím vagy jelszó!</span>
      </div> }
    </div>
  </>;
};

export default Login;