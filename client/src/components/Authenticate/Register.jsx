import { useAddExpsMutation, useAuthUserMutation, useRegisterUserMutation } from "../../store/jobhunterApi.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorAlert from "../Alert/ErrorAlert/ErrorAlert.jsx";
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert.jsx";
import { setUser } from "../../store/authSlice.js";
import Spinner from "../Spinner/Spinner.jsx";

const Register = () => {
    const nav = useNavigate();
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();
    const [addExps, addExpsStatus] = useAddExpsMutation();
    const [authUser, authStatus] = useAuthUserMutation();
    const auth = useSelector(state => state.auth.auth);
    const [form, setForm] = useState({
      email: '',
      password: '',
      fullname: '',
      role: 'jobseeker'
    });
    const [experiences, setExperiences] = useState([]);
    const dispatch = useDispatch();

    const handleInput = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (event) => {
      event.preventDefault();
      if (event.target.checkValidity()) {
        registerUser(form).then(() => authUser({
          email: form.email,
          password: form.password
        }).then((e) => {
          dispatch(setUser(e));
          addExps(experiences);
        }));
        nav('/login');
      }
    }

    const handleNewExp = () => {
      setExperiences(state => [
        ...state,
        {
          company: '',
          title: '',
          interval: ''
        }
      ]);
    };

    const handleEditExp = (e, ind) => {
      setExperiences(experiences.map((exp, index) => {
        if (ind === index) {
          return {
            ...exp,
            [e.target.name]: e.target.value
          }
        }
        return exp;
      }));
    };

    const handleDeleteExp = (ind) => {
      setExperiences(experiences.filter((exp, index) => {
        return ind !== index;
      }));
    }

    if (auth?.accessToken) return <Navigate to={ "/" }/>
    return <>
      <div className="hero flex flex-col mt-20">
        <p>Regisztráció</p>
        <form onSubmit={ handleRegister } className="hero-content flex-col gap-y-1">
          <input onInput={ handleInput } required className="input input-bordered input-sm w-full" type="email"
                 name="email"
                 placeholder="Email cím"/>
          <input onInput={ handleInput } required className="input input-bordered input-sm w-full" type="password"
                 name="password"
                 placeholder="Jelszó"/>
          <input onInput={ handleInput } required className="input input-bordered input-sm w-full" type="text"
                 name="fullname"
                 placeholder="Teljes név"/>
          <select onInput={ handleInput } required name="role" defaultValue="Munkavállaló"
                  className="select select-sm select-bordered w-full">
            <option value="jobseeker">Munkavállaló</option>
            <option value="company">Munkáltató</option>
          </select>
          { form.role === 'jobseeker' &&
            <label className="font-semibold text-sm mt-2">Munkatapasztalatok:</label>
          }
          { form.role === 'jobseeker' && experiences.map((v, index) => {
            return (
              <div key={ index } className="flex flex-row items-center gap-x-3">
                <input onInput={ (e) => handleEditExp(e, index) }
                       value={ v.company } className="input input-bordered input-sm" name="company" type="text"
                       placeholder="Cég"/>
                <input onInput={ (e) => handleEditExp(e, index) }
                       value={ v.title } className="input input-bordered input-sm" name="title" type="text"
                       placeholder="Pozíció"/>
                <input onInput={ (e) => handleEditExp(e, index) }
                       value={ v.interval } className="input input-bordered input-sm" name="interval" type="text"
                       placeholder="Időtartam (tól-[ig])"/>
                <span onClick={ () => handleDeleteExp(index) }
                      className="btn btn-circle btn-xs text-lg bg-error text-error-content border-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-trash" viewBox="0 0 16 16">
  <path
    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
              </span>
              </div>
            );
          }) }
          { form.role === 'jobseeker' &&
            <span onClick={ handleNewExp } className="btn btn-circle btn-sm text-lg pb-2">+</span>
          }
          <input type="submit" className="btn btn-sm btn-secondary mt-2" value="Regisztráció"/>
        </form>
        <SuccessAlert condition={ isLoading && !error }>
          Sikeres regisztráció!
        </SuccessAlert>
        { isLoading && <Spinner/> }
        <ErrorAlert condition={ error ?? false }>
          Hiba történt.
        </ErrorAlert>
      </div>
    </>;
  }
;

export default Register;