import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
              <Layout>
                <Dashboard />
              </Layout>  
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
