import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";

const App = () => {
  return <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route/>
        </Routes>
      </Layout>
    </BrowserRouter>
  </>;
}

export default App
