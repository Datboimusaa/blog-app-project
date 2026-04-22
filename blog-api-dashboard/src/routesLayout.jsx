import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import Settings from "./pages/Settings";
import Details from "./pages/Details";
import { CountryProvider } from "./contexts/CountriesContext";

function RoutesLayout() {
  return (
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="explorer" element={<Explorer />} />
            <Route path="details/:cca3" element={<Details />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountryProvider>
  );
}

export default RoutesLayout