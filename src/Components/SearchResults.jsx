import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { articleService } from "../utils/services";
import { getFallbackImage } from "../utils/productImages";
import { useCart } from "../context/CartContext";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { addToCart } = useCart();
  
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const allArticles = await articleService.getAll();
      const filtered = allArticles.filter(article => 
        article.nom.toLowerCase().includes(query.toLowerCase()) || 
        article.caracteristique.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    };
    fetchResults();
  }, [query]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const handleWhatsAppOrder = (product) => {
    const message = `Bonjour, je souhaite commander : ${product.nom} au prix de ${product.prix} CFA.`;
    window.open(`https://wa.me/22871080878?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase">Résultats pour : "{query}"</h1>
        <p className="text-slate-500 mb-12">{results.length} produit(s) trouvé(s)</p>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <p className="text-xl text-slate-400">Désolé, aucun produit ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={product.photo}
                    alt={product.nom}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = getFallbackImage(product.categorieId); }}
                  />
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{product.nom}</h3>
                  <p className="text-indigo-600 font-black text-xl mb-3">{formatPrice(product.prix)} CFA</p>
                  
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="flex-grow py-2.5 px-4 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Commander
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100"
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

export default SearchResults;
