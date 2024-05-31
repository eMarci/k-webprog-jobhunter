import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import UseAuthentication from "./components/Authenticate/UseAuthentication.jsx";
import Login from "./components/Authenticate/Login.jsx";
import Register from "./components/Authenticate/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Account from "./components/Account/Account.jsx";

const App = () => {
  return <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UseAuthentication><Home/></UseAuthentication>}/>
          <Route path="/home" element={<UseAuthentication><Home/></UseAuthentication>}/>
          <Route path="/account" element={<UseAuthentication><Account/></UseAuthentication>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<Login/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  </>;
}

export default App
