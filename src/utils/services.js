// ============================================
// NESSA PEARLS - LOCAL BACKEND SERVICE
// Toutes les données sont stockées en localStorage
// ============================================

// Helper pour générer des IDs uniques
const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);

// Helper pour générer un code de suivi
const generateTrackingCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'NP-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// ============================================
// DONNÉES INITIALES - NESSA PEARLS CATALOGUE
// ============================================
const initializeFripDripData = () => {
  const categories = [
    { id: 1, nom: "Bijoux (Colliers & Bagues)" },
    { id: 2, nom: "Montres" },
    { id: 3, nom: "Bracelets" },
    { id: 4, nom: "Coffrets & Ensembles" },
    { id: 5, nom: "Accessoires" }
  ];

  const articles = [
    // Catégorie 1: Bijoux (Colliers & Bagues)
    { id: 101, nom: "Collier prénom 😍🦋💕", prix: 3500, caracteristique: "Délai : 72h. Personnalisation incluse.", categorieId: 1, stock: 50 },
    { id: 102, nom: "Collier de couple ou d'amitié", prix: 2500, caracteristique: "Duo de colliers assortis.", categorieId: 1, stock: 30 },
    { id: 103, nom: "Collier personnalisé (Standard)", prix: 6000, caracteristique: "6k (1 face) / 7k (2 faces).", categorieId: 1, stock: 40 },
    { id: 104, nom: "Collier personnalisable (Luxe)", prix: 8000, caracteristique: "Finition premium. Délai : 72h.", categorieId: 1, stock: 20 },
    { id: 105, nom: "Collier message caché", prix: 6500, caracteristique: "Message secret gravé. Délai : 72h.", categorieId: 1, stock: 15 },
    { id: 106, nom: "Collier photo 🤩", prix: 15000, caracteristique: "Gravure photo haute précision.", categorieId: 1, stock: 10 },
    { id: 107, nom: "Collier qr code (H/F)", prix: 9000, caracteristique: "9k (court) / 10k (long). Scan fonctionnel.", categorieId: 1, stock: 12 },
    { id: 108, nom: "Collier barre (H/F)", prix: 5000, caracteristique: "5k (1 face) / 6k (2 faces).", categorieId: 1, stock: 25 },
    { id: 109, nom: "Collier Rond 😍", prix: 5000, caracteristique: "5k (1 face) / 6k (2 faces).", categorieId: 1, stock: 25 },
    { id: 110, nom: "Collier croix (H/F)", prix: 6000, caracteristique: "6k (1 face) / 7k (2 faces).", categorieId: 1, stock: 18 },
    { id: 111, nom: "Collier Dame 💕", prix: 5000, caracteristique: "5k (1 face) / 6k (2 faces).", categorieId: 1, stock: 22 },
    { id: 112, nom: "Collier homme / enfant", prix: 5000, caracteristique: "5k (1 face) / 6k (2 faces).", categorieId: 1, stock: 22 },
    { id: 113, nom: "Collier 2 en 1", prix: 6500, caracteristique: "Double rang. Délai : 72h.", categorieId: 1, stock: 14 },
    { id: 114, nom: "Bague personnalisée (femme)", prix: 5000, caracteristique: "Or, argent, noir. Délai : 72h.", categorieId: 1, stock: 30 },
    { id: 115, nom: "Bijoux dame (divers)", prix: 3000, caracteristique: "Modèles variés 3k/4k.", categorieId: 1, stock: 50 },
    { id: 116, nom: "Monoboucle cauris", prix: 2000, caracteristique: "Style ethnique chic.", categorieId: 1, stock: 100 },

    // Catégorie 2: Montres
    { id: 201, nom: "Casio personnalisable (H/F)", prix: 12000, caracteristique: "Gravure offerte. Délai : 4 jours.", categorieId: 2, stock: 15 },
    { id: 202, nom: "Montre Casio classique", prix: 13000, caracteristique: "Modèle intemporel.", categorieId: 2, stock: 10 },
    { id: 203, nom: "Rolex (femme) personnalisable", prix: 13000, caracteristique: "Délai : 4 jours. Elégance assurée.", categorieId: 2, stock: 8 },
    { id: 204, nom: "Rolex homme", prix: 13000, caracteristique: "Délai : 4 jours. Style classique.", categorieId: 2, stock: 8 },
    { id: 205, nom: "Montre Poedagar (femme)", prix: 14000, caracteristique: "Luxe et précision. Délai : 4 jours.", categorieId: 2, stock: 12 },
    { id: 206, nom: "Montre Poedagar personnalisable", prix: 16000, caracteristique: "Modèle exclusif. Délai : 4 jours.", categorieId: 2, stock: 5 },
    { id: 207, nom: "Montre Hublot personnalisable", prix: 13000, caracteristique: "Délai : 4 jours. Design sportif.", categorieId: 2, stock: 7 },
    { id: 208, nom: "Montre personnalisable (Standard)", prix: 12000, caracteristique: "Plusieurs coloris disponibles.", categorieId: 2, stock: 20 },
    { id: 209, nom: "Montre personnalisable (Dorée)", prix: 13000, caracteristique: "Finition or. Délai : 4 jours.", categorieId: 2, stock: 10 },

    // Catégorie 3: Bracelets
    { id: 301, nom: "Bracelet inox (Adulte/enfant)", prix: 5000, caracteristique: "5k (1 face) / 6k (2 faces).", categorieId: 3, stock: 40 },
    { id: 302, nom: "Bracelet inox plus pierres", prix: 6500, caracteristique: "6.5k (1 face) / 7.5k (2 faces).", categorieId: 3, stock: 25 },
    { id: 303, nom: "Bracelet Rolex (H/F)", prix: 7000, caracteristique: "7k (1 face) / 8k (2 faces).", categorieId: 3, stock: 30 },
    { id: 304, nom: "Bracelet Rolex avec code Qr", prix: 9000, caracteristique: "Message digital inclus.", categorieId: 3, stock: 15 },
    { id: 305, nom: "Bracelet cuir personnalisé", prix: 6000, caracteristique: "Cuir véritable. Délai : 72h.", categorieId: 3, stock: 20 },
    { id: 306, nom: "Bracelet à corde 😍", prix: 6000, caracteristique: "Ajustable. Délai : 72h.", categorieId: 3, stock: 50 },
    { id: 307, nom: "Bracelet jonc (H/F)", prix: 7000, caracteristique: "Or, argent, noir.", categorieId: 3, stock: 35 },
    { id: 308, nom: "Bracelet de couple / amitié ❤️", prix: 8000, caracteristique: "Le duo inséparable.", categorieId: 3, stock: 25 },
    { id: 309, nom: "Bracelet avec regard gravé", prix: 12000, caracteristique: "Gravure regard. Délai : 4 jours.", categorieId: 3, stock: 10 },
    { id: 310, nom: "Bracelet bronze plus pierres", prix: 5500, caracteristique: "Style vintage. 5.5k à 7k.", categorieId: 3, stock: 20 },
    { id: 311, nom: "Bracelet chaîne 🔗", prix: 5000, caracteristique: "5k (1 face) / 6k (2 faces).", categorieId: 3, stock: 40 },
    { id: 312, nom: "Bracelet Acrylique 🤍", prix: 2500, caracteristique: "Moderne et léger.", categorieId: 3, stock: 60 },
    { id: 313, nom: "Bracelet Dame (divers)", prix: 2000, caracteristique: "Modèles variés 2k/6k.", categorieId: 3, stock: 100 },

    // Catégorie 4: Coffrets & Ensembles
    { id: 401, nom: "Coffret Homme 🧔", prix: 28000, caracteristique: "Le cadeau complet pour lui.", categorieId: 4, stock: 5 },
    { id: 402, nom: "Coffret Homme (Casio + Rolex)", prix: 20000, caracteristique: "Montre Casio + bracelet Rolex.", categorieId: 4, stock: 10 },
    { id: 403, nom: "Pack Princess 👑💕", prix: 12000, caracteristique: "Parfum, brume, bijoux.", categorieId: 4, stock: 15 },
    { id: 404, nom: "Coffret Dame (Montre + Bracelet)", prix: 15000, caracteristique: "Plusieurs gammes 15k/20k.", categorieId: 4, stock: 12 },
    { id: 405, nom: "Ensemble Collier + Bracelet", prix: 7500, caracteristique: "Plusieurs modèles disponibles.", categorieId: 4, stock: 20 },
    { id: 406, nom: "Ensemble Bracelet Rolex + Collier", prix: 12000, caracteristique: "L'élégance coordonnée.", categorieId: 4, stock: 8 },
    { id: 407, nom: "Ensemble Porte-clé + Bracelet + Stylo", prix: 14500, caracteristique: "Délai : 4 jours.", categorieId: 4, stock: 10 },
    { id: 408, nom: "Ensemble Porte-clé + Bracelet inox", prix: 10500, caracteristique: "Délai : 4 jours.", categorieId: 4, stock: 10 },
    { id: 409, nom: "Ensemble Dame (Vêtements)", prix: 5000, caracteristique: "Ensemble stylé 5k/8k.", categorieId: 4, stock: 15 },

    // Catégorie 5: Accessoires & Personnalisation
    { id: 501, nom: "Gourde thermique bois", prix: 10000, caracteristique: "Personnalisée avec nom/logo.", categorieId: 5, stock: 25 },
    { id: 502, nom: "Gourde inox", prix: 9000, caracteristique: "Gravure incluse. Délai : 72h.", categorieId: 5, stock: 30 },
    { id: 503, nom: "Carnet de note + Stylo bois", prix: 13000, caracteristique: "Coffret écriture. Délai : 4 jours.", categorieId: 5, stock: 15 },
    { id: 504, nom: "Stylo personnalisé", prix: 4000, caracteristique: "Gravure nom. Délai : 72h.", categorieId: 5, stock: 50 },
    { id: 505, nom: "Porte-monnaie homme", prix: 7000, caracteristique: "Noir, café. Cuir synthétique.", categorieId: 5, stock: 20 },
    { id: 506, nom: "Porte-clé 🔑", prix: 4000, caracteristique: "Personnalisé. Délai : 72h.", categorieId: 5, stock: 100 },
    { id: 507, nom: "Faux Piercings (Nez/Septum)", prix: 1000, caracteristique: "L'unité. Sans perçage.", categorieId: 5, stock: 200 },
    { id: 508, nom: "Faux Tatouage", prix: 1500, caracteristique: "Le paquet. Motifs variés.", categorieId: 5, stock: 150 },
  ];

  // Nettoyage et initialisation forcée
  localStorage.setItem('flipdrip_categories', JSON.stringify(categories));
  
  // Séparer les articles par localStorage pour respecter la structure existante du backend local
  for(let i=1; i<=5; i++) {
    const categoryArticles = articles.filter(a => a.categorieId === i);
    localStorage.setItem(`flipdrip_articles_${i}`, JSON.stringify(categoryArticles));
  }

  // Utilisateurs par défaut
  if (!localStorage.getItem('flipdrip_users')) {
    const users = [
      { id: 1, firstName: "Admin", lastName: "Nessa", email: "admin@nessapearls.com", password: "NessaPearls2026!", role: "Admin" },
      { id: 3, firstName: "Client", lastName: "Demo", email: "client@demo.com", password: "client123", role: "Client" },
    ];
    localStorage.setItem('flipdrip_users', JSON.stringify(users));
  }

  // Initialisation des autres clés si vides
  if (!localStorage.getItem('flipdrip_orders')) localStorage.setItem('flipdrip_orders', JSON.stringify([]));
  if (!localStorage.getItem('flipdrip_tontines')) localStorage.setItem('flipdrip_tontines', JSON.stringify([]));
};

// Initialiser
initializeFripDripData();

// ============================================
// SERVICES (Le reste du code reste identique)
// ============================================

class AuthService {
  constructor() { this.currentUser = null; this.token = null; this.listeners = []; }
  async initialize() {
    initializeFripDripData();
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("currentUser");
    if (token && userStr) { this.token = token; this.currentUser = JSON.parse(userStr); }
  }
  subscribe(callback) { this.listeners.push(callback); return () => { this.listeners = this.listeners.filter((l) => l !== callback); }; }
  notifyListeners() { this.listeners.forEach((callback) => callback(this.currentUser)); }
  generateToken(user) { return btoa(JSON.stringify({ userId: user.id, email: user.email, role: user.role, exp: Date.now() + 86400000 })); }
  async login(email, password) {
    const users = JSON.parse(localStorage.getItem('flipdrip_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.token = this.generateToken(user);
      this.currentUser = { id: user.id, username: user.email, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role };
      localStorage.setItem("authToken", this.token);
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      this.notifyListeners();
      return { success: true, user: this.currentUser };
    }
    return { success: false, error: "Email ou mot de passe incorrect" };
  }
  logout() { this.token = null; this.currentUser = null; localStorage.removeItem("authToken"); localStorage.removeItem("currentUser"); this.notifyListeners(); }
  isAuthenticated() { return !!this.token && !!this.currentUser; }
}

export const authService = new AuthService();

class ArticleService {
  async getByCategory(categoryId) { return JSON.parse(localStorage.getItem(`flipdrip_articles_${categoryId}`) || '[]'); }
  async getAll() {
    let all = [];
    for (let cat = 1; cat <= 5; cat++) {
      all = [...all, ...JSON.parse(localStorage.getItem(`flipdrip_articles_${cat}`) || '[]')];
    }
    return all;
  }
  async create(article) {
    const catId = article.categorieId || 1;
    const articles = JSON.parse(localStorage.getItem(`flipdrip_articles_${catId}`) || '[]');
    const newArticle = { ...article, id: Date.now() };
    articles.push(newArticle);
    localStorage.setItem(`flipdrip_articles_${catId}`, JSON.stringify(articles));
    return { success: true, article: newArticle };
  }
  async update(id, article) {
    const catId = article.categorieId || 1;
    const articles = JSON.parse(localStorage.getItem(`flipdrip_articles_${catId}`) || '[]');
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) { articles[index] = { ...articles[index], ...article }; localStorage.setItem(`flipdrip_articles_${catId}`, JSON.stringify(articles)); return { success: true }; }
    return { success: false, error: "Article non trouvé" };
  }
  async delete(id) {
    for (let cat = 1; cat <= 5; cat++) {
      const articles = JSON.parse(localStorage.getItem(`flipdrip_articles_${cat}`) || '[]');
      const filtered = articles.filter(a => a.id !== id);
      if (filtered.length !== articles.length) { localStorage.setItem(`flipdrip_articles_${cat}`, JSON.stringify(filtered)); return { success: true }; }
    }
    return { success: false, error: "Article non trouvé" };
  }
}

export const articleService = new ArticleService();

class ContentService {
  async getContent() {
    return {
      home: { title: "NESSA PEARLS", subtitle: "L'éclat intemporel", description: "Bijoux personnalisés, montres et coffrets d'exception." },
      aPropos: { title: "À Propos", content: "Nessa Pearls célèbre l'élégance à travers la personnalisation." },
      contact: { phone: "+228 93 73 31 50", email: "contact@nessapearls.com", whatsapp: "22893733150" },
    };
  }
}

export const contentService = new ContentService();
