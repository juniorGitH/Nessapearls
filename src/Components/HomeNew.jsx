import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contentService, articleService } from "../utils/services";
import { getFallbackImage } from "../utils/productImages";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Récupérer une sélection de produits de différentes catégories pour l'accueil
      const allArticles = await articleService.getAll();
      // On prend par exemple les 8 premiers pour les nouveaux arrivages
      setNewArrivals(allArticles.slice(0, 12));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleWhatsAppOrder = (product) => {
    const message = `Bonjour, je souhaite commander : ${product.nom} au prix de ${product.prix} CFA.`;
    window.open(`https://wa.me/22871080878?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* New Arrivals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter">Nouveaux Arrivages</h2>
              <p className="text-slate-500 mt-2">Découvrez nos dernières créations et sélections</p>
            </div>
            <Link to="/bijoux" className="text-indigo-600 font-bold hover:underline">Voir plus</Link>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <div key={product.id} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={product.photo}
                      alt={product.nom}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = getFallbackImage(product.categorieId); }}
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-red-500 shadow-sm transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{product.nom}</h3>
                    <p className="text-indigo-600 font-black text-xl mb-3">{formatPrice(product.prix)} CFA</p>
                    
                    <div className="mt-auto space-y-3">
                      <p className="text-[10px] text-slate-500 italic mb-2 line-clamp-2">{product.caracteristique}</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleWhatsAppOrder(product)}
                          className="flex-grow py-2.5 px-4 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          Commander
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100"
                          title="Ajouter au panier"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-bold text-slate-900">Authenticité</h3>
              <p className="text-xs text-slate-500">Qualité premium garantie</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900">Livraison Rapide</h3>
              <p className="text-xs text-slate-500">Expédition sous 24h/48h</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900">Paiement Sécurisé</h3>
              <p className="text-xs text-slate-500">T-Money & Flooz acceptés</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900">Support 7j/7</h3>
              <p className="text-xs text-slate-500">Conseils sur WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
