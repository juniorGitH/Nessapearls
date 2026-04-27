import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../utils/services";

const APropos = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await contentService.getContent();
      setContent(data?.aPropos);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold mb-4 uppercase tracking-widest">
            ✨ NOTRE HÉRITAGE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            L'UNIVERS DE <span className="text-indigo-600">NESSA PEARLS</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed">
            L'éclat intemporel des perles de culture pour sublimer votre beauté naturelle avec élégance et distinction.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
            <div className="h-96 bg-stone-100 rounded-3xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-stone-100 rounded w-3/4"></div>
              <div className="h-4 bg-stone-100 rounded w-full"></div>
              <div className="h-4 bg-stone-100 rounded w-5/6"></div>
              <div className="h-4 bg-stone-100 rounded w-full"></div>
              <div className="h-4 bg-stone-100 rounded w-4/5"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <img
                src="https://images.unsplash.com/photo-1611085583191-a3b13ef24fd2?w=800&q=80"
                alt="Nessa Pearls Jewelry"
                className="relative w-full h-[500px] object-cover rounded-3xl border border-stone-100 shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-6 shadow-lg">
                  <p className="text-indigo-700 font-bold uppercase tracking-widest text-xs mb-1">NESSA PEARLS</p>
                  <p className="text-slate-900 font-black text-lg">L'excellence de la perle au Togo</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                Une passion pour la <span className="text-indigo-600">pureté</span> et l'artisanat
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed space-y-6">
                <p>
                  <span className="text-indigo-600 font-bold">Nessa Pearls</span> est née d'un amour profond pour la perle, ce trésor organique aux reflets mystérieux. Nous croyons que chaque perle raconte une histoire unique de patience, de résilience et de beauté.
                </p>
                <p>
                  Basés à <span className="text-slate-900 font-bold uppercase">Lomé, Togo</span>, nous sélectionnons avec une rigueur absolue les plus belles perles de culture du monde : la pureté des perles d'Akoya, le mystère des perles noires de Tahiti et la douceur des perles d'eau douce.
                </p>
                <p>
                  Notre mission ? Offrir des bijoux d'exception qui traversent le temps. Grâce à notre concept innovant de <span className="text-indigo-600 font-bold italic">Tontine Bijoux</span>, nous rendons l'élégance accessible à tous, sans compromis sur la qualité.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-4 bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600">
                    <span className="text-2xl">🐚</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Perles Certifiées</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">Origine Garantie</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Fait Main</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">Design Exclusif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 mb-2 tracking-tighter">100%</div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Naturel</p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 mb-2 tracking-tighter">228</div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Fierté Locale</p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 mb-2 tracking-tighter">Art</div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Fait Main</p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 mb-2 tracking-tighter">Gold</div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Service Client</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/20 blur-[100px] -ml-32 -mb-32"></div>
          
          <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">
            RÉVÉLEZ VOTRE <span className="text-indigo-400">ÉCLAT</span> AUJOURD'HUI
          </h3>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto font-medium text-lg relative z-10">
            Découvrez nos dernières collections et trouvez la perle qui saura raconter votre histoire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/bagues"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:scale-105 uppercase text-xs tracking-widest"
            >
              Voir les Bagues
            </Link>
            <Link
              to="/colliers"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white/30 text-white font-black rounded-xl hover:border-white hover:bg-white/5 transition-all uppercase text-xs tracking-widest"
            >
              Voir les Colliers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APropos;
