import React, { useState, useEffect } from "react";
import { articleService } from "../utils/services";
import { assignImagesToArticles, getFallbackImage } from "../utils/productImages";
import { useCart } from "../context/CartContext";

const CATEGORY_ID = 1; // Bijoux (Colliers & Bagues)
const WHATSAPP_NUMBER = "22893733150";

const Bijoux = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Tout");
  const { addToCart } = useCart();

  const filters = ["Tout", "Collier", "Bague", "Personnalisé", "Luxe"];

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles(activeFilter);
  }, [articles, activeFilter]);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await articleService.getByCategory(CATEGORY_ID);
      const articlesWithImages = assignImagesToArticles(data, CATEGORY_ID);
      setArticles(articlesWithImages);
      if (data.length === 0) {
        setErrorMessage("Aucun bijou trouvé.");
      }
    } catch (error) {
      setErrorMessage(`Erreur de connexion: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const filterArticles = (filter) => {
    if (filter === "Tout") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((article) => {
        const nom = article.nom?.toLowerCase() || "";
        const carac = article.caracteristique?.toLowerCase() || "";
        const searchText = `${nom} ${carac}`;
        
        switch (filter) {
          case "Collier": return searchText.includes("collier");
          case "Bague": return searchText.includes("bague");
          case "Personnalisé": return searchText.includes("personnalisé") || searchText.includes("prénom");
          case "Luxe": return searchText.includes("luxe");
          default: return true;
        }
      });
      setFilteredArticles(filtered);
    }
  };

  const handleBuyWhatsApp = (article) => {
    const message = `🛒 *Commande Nessa Pearls*\n\n` +
      `💍 Bijou: ${article.nom}\n` +
      `💰 Prix: ${formatPrice(article.prix)} FCFA\n` +
      `📝 Détails: ${article.caracteristique}\n\n` +
      `Je souhaite commander ce bijou. Merci de me confirmer les modalités de personnalisation.`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold mb-4 uppercase tracking-widest">
            ✨ COLLECTIONS PRÉCIEUSES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            BIJOUX <span className="text-indigo-600">(COLLIERS & BAGUES)</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Exprimez votre identité avec nos bijoux personnalisés, gravés avec soin pour durer toute une vie.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-slate-900 text-white shadow-xl"
                  : "bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-slate-500">Chargement de la collection...</p>
          </div>
        ) : errorMessage ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
            <p className="text-red-500">❌ {errorMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                  <img
                    src={article.photo}
                    alt={article.nom}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = getFallbackImage(CATEGORY_ID); }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                      Personnalisable
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-slate-900 font-bold text-lg mb-2 line-clamp-1">{article.nom}</h3>
                  <p className="text-slate-500 text-xs mb-4 h-12 line-clamp-3">{article.caracteristique}</p>
                  
                  <div className="flex items-center gap-1 mb-6">
                    <p className="text-2xl font-black text-slate-900">{formatPrice(article.prix)}</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase">FCFA</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuyWhatsApp(article)}
                      className="flex-grow bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-lg"
                    >
                      Commander
                    </button>
                    <button
                      onClick={() => addToCart(article)}
                      className="p-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-md"
                      title="Ajouter au panier"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bijoux;
