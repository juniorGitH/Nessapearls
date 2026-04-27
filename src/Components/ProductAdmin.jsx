import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { articleService } from "../utils/services";
import { assignImagesToArticles, getFallbackImage } from "../utils/productImages";

// Check if admin is logged in
const isAdminLoggedIn = () => {
  const admin = localStorage.getItem("fripdrip_admin");
  if (!admin) return false;
  try {
    const parsed = JSON.parse(admin);
    return parsed.role === "Admin";
  } catch {
    return false;
  }
};

const ProductAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form state
  const [nom, setNom] = useState("");
  const [marque, setMarque] = useState("");
  const [caracteristique, setCaracteristique] = useState("");
  const [prix, setPrix] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    // Check authentication
    if (!isAdminLoggedIn()) {
      navigate("/admin");
      return;
    }
    loadArticles();
  }, [activeTab, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("fripdrip_admin");
    navigate("/admin");
  };

  const loadArticles = async () => {
    setIsLoading(true);
    const data = await articleService.getByCategory(activeTab);
    const articlesWithImages = assignImagesToArticles(data, activeTab);
    setArticles(articlesWithImages);
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const resetForm = () => {
    setNom("");
    setMarque("");
    setCaracteristique("");
    setPrix("");
    setPhoto("");
    setEditingArticle(null);
    setShowForm(false);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setNom(article.nom);
    setMarque(article.marque);
    setCaracteristique(article.caracteristique);
    setPrix(article.prix.toString());
    setPhoto(article.photo || "");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const articleData = {
      nom,
      marque,
      caracteristique,
      prix: parseFloat(prix),
      photo,
      categorieId: activeTab,
    };

    let result;
    if (editingArticle) {
      result = await articleService.update(editingArticle.id, articleData);
    } else {
      result = await articleService.create(articleData);
    }

    if (result.success) {
      setMessage({ type: "success", text: editingArticle ? "Bijou mis à jour !" : "Bijou créé !" });
      resetForm();
      loadArticles();
    } else {
      setMessage({ type: "error", text: result.error });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce bijou ?")) return;

    const result = await articleService.delete(id);
    if (result.success) {
      setMessage({ type: "success", text: "Bijou supprimé !" });
      loadArticles();
    } else {
      setMessage({ type: "error", text: result.error });
    }
  };

  const tabConfig = {
    1: { name: "Bagues", color: "orange", icon: "💍", placeholder: { nom: "Bague Perle Blanche", marque: "Collection Orient", carac: "Or 18 carats, Perle d'eau douce 8mm, Pavé diamants" } },
    2: { name: "Colliers", color: "pink", icon: "📿", placeholder: { nom: "Sautoir Akoya", marque: "Luxe Intemporel", carac: "Perles de culture Akoya, Fermoir or, Longueur 45cm" } },
    3: { name: "Bracelets", color: "purple", icon: "✨", placeholder: { nom: "Bracelet Tahiti", marque: "Perles Noires", carac: "Perle noire de Tahiti, Cordon soie, Ajustable" } },
  };

  const currentTab = tabConfig[activeTab];

  const getColorClasses = (color) => {
    const colors = {
      orange: {
        bg: "bg-amber-600",
        bgLight: "bg-amber-50",
        bgHover: "hover:bg-amber-700",
        text: "text-amber-700",
        border: "border-amber-600",
        focus: "focus:border-amber-600",
      },
      pink: {
        bg: "bg-yellow-600",
        bgLight: "bg-yellow-50",
        bgHover: "hover:bg-yellow-700",
        text: "text-yellow-700",
        border: "border-yellow-600",
        focus: "focus:border-yellow-600",
      },
      purple: {
        bg: "bg-stone-800",
        bgLight: "bg-stone-100",
        bgHover: "hover:bg-stone-900",
        text: "text-stone-900",
        border: "border-stone-800",
        focus: "focus:border-stone-800",
      },
    };
    return colors[color];
  };

  const colorClasses = getColorClasses(currentTab.color);

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">🐚 Gestion Nessa Pearls</h1>
            <p className="text-stone-500 text-sm sm:text-base">Gérez votre catalogue de bijoux en perles d'exception</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-4 sm:px-6 py-3 font-semibold rounded-xl transition-colors text-sm sm:text-base shadow-sm ${
                showForm
                  ? "bg-stone-200 text-stone-700"
                  : `${colorClasses.bg} text-white ${colorClasses.bgHover}`
              }`}
            >
              {showForm ? "✕ Annuler" : `+ Ajouter un bijou`}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 sm:px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-100 hover:bg-red-100 transition-colors text-sm sm:text-base"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>

        {/* Messages */}
        {message.text && (
          <div className={`mb-6 rounded-xl p-4 shadow-sm ${
            message.type === "success" 
              ? "bg-green-50 border border-green-100" 
              : "bg-red-50 border border-red-100"
          }`}>
            <p className={message.type === "success" ? "text-green-700" : "text-red-700"}>
              {message.type === "success" ? "✅" : "⚠️"} {message.text}
            </p>
          </div>
        )}

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl overflow-hidden mb-6 shadow-sm border border-stone-100">
          <nav className="flex">
            {Object.entries(tabConfig).map(([id, config]) => {
              const isActive = activeTab === parseInt(id);
              const tabColors = getColorClasses(config.color);
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(parseInt(id));
                    resetForm();
                  }}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                    isActive
                      ? `${tabColors.bg} text-white`
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  <span className="text-xl mr-2">{config.icon}</span>
                  {config.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-6 mb-8 border border-stone-100 shadow-lg">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">{currentTab.icon}</span>
              {editingArticle ? "Modifier le bijou" : `Nouveau bijou - ${currentTab.name}`}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Nom du bijou</label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className={`w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-900 ${colorClasses.focus} focus:outline-none`}
                    placeholder={currentTab.placeholder.nom}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Collection</label>
                  <input
                    type="text"
                    value={marque}
                    onChange={(e) => setMarque(e.target.value)}
                    required
                    className={`w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-900 ${colorClasses.focus} focus:outline-none`}
                    placeholder={currentTab.placeholder.marque}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Description / Caractéristiques</label>
                <textarea
                  value={caracteristique}
                  onChange={(e) => setCaracteristique(e.target.value)}
                  required
                  rows={3}
                  className={`w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-900 ${colorClasses.focus} focus:outline-none resize-none`}
                  placeholder={currentTab.placeholder.carac}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Prix (FCFA)</label>
                  <input
                    type="number"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    required
                    min="0"
                    className={`w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-900 ${colorClasses.focus} focus:outline-none`}
                    placeholder="150000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">URL de l'image (optionnel)</label>
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className={`w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-900 ${colorClasses.focus} focus:outline-none`}
                    placeholder="https://exemple.com/perle.jpg"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className={`flex-1 py-3 ${colorClasses.bg} text-white font-semibold rounded-xl ${colorClasses.bgHover} transition-colors shadow-md`}
                >
                  {editingArticle ? "💾 Enregistrer les modifications" : "✨ Ajouter au catalogue"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-stone-100 text-stone-600 font-semibold rounded-xl hover:bg-stone-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
            {currentTab.icon} {currentTab.name} 
            <span className="text-sm font-normal text-stone-400">({articles.length} bijoux)</span>
          </h3>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${colorClasses.border}`}></div>
              <p className="mt-2 text-stone-500">Chargement...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <div className="text-6xl mb-4">{currentTab.icon}</div>
              <p className="text-xl">Aucun bijou {currentTab.name} pour le moment</p>
              <button
                onClick={() => setShowForm(true)}
                className={`mt-4 px-6 py-2 ${colorClasses.bg} text-white rounded-xl font-semibold ${colorClasses.bgHover} transition-colors shadow-sm`}
              >
                + Ajouter le premier bijou
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white border border-stone-100 rounded-xl overflow-hidden hover:border-amber-200 transition-all shadow-sm hover:shadow-md">
                  <div className="relative aspect-square bg-stone-50">
                    <img
                      src={article.photo}
                      alt={article.nom}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = getFallbackImage(activeTab);
                      }}
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 ${colorClasses.bg} text-white text-xs font-bold rounded-lg shadow-sm`}>
                      {currentTab.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={`text-sm ${colorClasses.text} font-semibold mb-1`}>{article.marque}</p>
                    <h3 className="font-bold text-stone-900 mb-2">{article.nom}</h3>
                    <p className="text-sm text-stone-500 mb-3 line-clamp-2">{article.caracteristique}</p>
                    <p className="text-xl font-black text-amber-700 mb-4">{formatPrice(article.prix)} <span className="text-sm text-stone-400 font-normal">FCFA</span></p>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="flex-1 py-2 bg-amber-50 text-amber-700 font-semibold rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="flex-1 py-2 bg-red-50 text-red-600 font-semibold rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white text-stone-600 border border-stone-200 font-semibold rounded-xl hover:bg-stone-50 transition-all shadow-sm"
          >
            ← Retour à la boutique
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
