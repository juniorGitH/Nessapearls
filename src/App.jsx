/**
 * Nessa Pearls - Application React
 * Boutique de bijoux et accessoires personnalisés - Commande via WhatsApp
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Components
import NavMenu from "./Components/NavMenu";
import Footer from "./Components/FooterNew";
import Home from "./Components/HomeNew";
import Bijoux from "./Components/Bijoux";
import Montres from "./Components/Montres";
import Bracelets from "./Components/Bracelets";
import Coffrets from "./Components/Coffrets";
import Accessoires from "./Components/Accessoires";
import APropos from "./Components/APropos";
import AdminLogin from "./Components/AdminLogin";
import ProductAdmin from "./Components/ProductAdmin";

// Legal Pages
import MentionsLegales from "./Components/MentionsLegales";
import ConditionsGeneralesUtilisation from "./Components/ConditionsGeneralesUtilisation";
import PolitiqueProtectionDonneesPersonnelles from "./Components/PolitiqueProtectionDonneesPersonnelles";
import PolitiqueCookies from "./Components/PolitiqueCookies";
import DeclarationAccessibilite from "./Components/DeclarationAccessibilite";
import Securite from "./Components/Securite";

// Styles
import "./index.css";

// Layout principal avec NavMenu et Footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavMenu />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// Layout sans NavMenu/Footer pour pages admin
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50">
      {children}
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          
          {/* Catalogues produits */}
          <Route path="/bijoux" element={<Layout><Bijoux /></Layout>} />
          <Route path="/montres" element={<Layout><Montres /></Layout>} />
          <Route path="/bracelets" element={<Layout><Bracelets /></Layout>} />
          <Route path="/coffrets" element={<Layout><Coffrets /></Layout>} />
          <Route path="/accessoires" element={<Layout><Accessoires /></Layout>} />
          
          {/* À Propos */}
          <Route path="/apropos" element={<Layout><APropos /></Layout>} />
          
          {/* Administration */}
          <Route path="/admin" element={<AdminLayout><AdminLogin /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<Layout><ProductAdmin /></Layout>} />
          
          {/* Pages légales */}
          <Route path="/mentions-legales" element={<Layout><MentionsLegales /></Layout>} />
          <Route path="/conditions-generales" element={<Layout><ConditionsGeneralesUtilisation /></Layout>} />
          <Route path="/politique-confidentialite" element={<Layout><PolitiqueProtectionDonneesPersonnelles /></Layout>} />
          <Route path="/politique-cookies" element={<Layout><PolitiqueCookies /></Layout>} />
          <Route path="/accessibilite" element={<Layout><DeclarationAccessibilite /></Layout>} />
          <Route path="/securite" element={<Layout><Securite /></Layout>} />
          
          {/* Route de fallback */}
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;