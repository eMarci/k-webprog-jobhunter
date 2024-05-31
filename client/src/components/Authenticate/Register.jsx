import { useRegisterUserMutation } from "../../store/jobhunterApi.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorAlert from "../Alert/ErrorAlert/ErrorAlert.jsx";
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert.jsx";

const Register = () => {
  const nav = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const auth = useSelector(state => state.auth.auth);
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: '',
    role: 'jobseeker',
    // experiences: ''
  });

  console.log(`register error: ${ error }`);
  const processExp = () => {

  }

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      registerUser(form);
      nav('/login');
    }
  }

  if (auth?.accessToken) return <Navigate to={ "/" }/>
  return <>
    <div className="hero flex flex-col mt-20">
      <p>Regisztráció</p>
      <form onSubmit={ handleRegister } className="hero-content flex-col gap-y-1">
        <input onInput={ handleInput } required className="w-full" type="email" name="email" placeholder="Email cím"/>
        <input onInput={ handleInput } required className="w-full" type="password" name="password"
               placeholder="Jelszó"/>
        <input onInput={ handleInput } required className="w-full" type="text" name="fullname"
               placeholder="Teljes név"/>
        <select onInput={ handleInput } required name="role" defaultValue="Munkavállaló"
                className="select select-sm select-bordered w-full">
          <option value="jobseeker">Munkavállaló</option>
          <option value="company">Munkáltató</option>
        </select>
        {/*{ form.role === 'jobseeker' &&*/}
        {/*  <textarea onInput={ handleInput } name="experiences" cols="30" rows="2"*/}
        {/*            placeholder="Munkahely;Pozíció;Tól-[Ig]"></textarea>*/}
        {/*}*/}
        <input type="submit" className="btn btn-sm btn-secondary mt-2" value="Regisztráció"/>
      </form>
      <SuccessAlert condition={ isLoading && !error }>
        Sikeres regisztráció!
      </SuccessAlert>
      { isLoading && <span className="loading loading-spinner loading-lg"></span> }
      <ErrorAlert condition={ error ?? false }>
        Hiba történt.
      </ErrorAlert>
    </div>
  </>;
};

export default Register;