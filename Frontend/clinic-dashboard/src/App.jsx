import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { Toaster } from "sonner";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
