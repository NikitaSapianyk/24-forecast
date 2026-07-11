import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { CitiesProvider } from "./context/CitiesContext";
import HomePage from "./pages/HomePage";
import CityDetailsPage from "./pages/CityDetailsPage";
import Header from "./components/Header";

export default function App() {
  return (
    <UserProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/city/:cityName"
              element={
                <>
                  <Header />
                  <CityDetailsPage />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </CitiesProvider>
    </UserProvider>
  );
}
