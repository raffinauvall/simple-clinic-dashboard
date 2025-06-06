import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { Toaster } from "sonner";
import Patient from "./pages/Patient";

function App() {
  return (
    <BrowserRouter>
      
      <Toaster richColors position="top-right" />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/patients"
          element={
            <Layout>
            <Patient />
            </Layout>
          }
        />
         <Route
          path="/doctors"
          element={
            <Layout>
            <Patient />
            </Layout>
          }
        />
        <Route
          path="/appointments"
          element={
            <Layout>
            <Patient />
            </Layout>
          }
        />
        <Route
          path="/payments"
          element={
            <Layout>
            <Patient />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
