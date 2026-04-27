import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash, faMinus, faPlus, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "🛒 *Nouvelle Commande Nessa Pearls*\n\n";
    cartItems.forEach((item) => {
      message += `• ${item.nom} (x${item.quantity}) - ${item.prix * item.quantity} FCFA\n`;
    });
    message += `\n💰 *Total: ${cartTotal} FCFA*`;
    message += "\n\nJe souhaite valider cette commande. Merci !";

    window.open(`https://wa.me/22871080878?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faShoppingBag} className="text-indigo-600" />
              VOTRE PANIER
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto px-6 py-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-3xl">
                  <FontAwesomeIcon icon={faShoppingBag} />
                </div>
                <p className="text-slate-500 font-medium">Votre panier est vide</p>
                <button onClick={onClose} className="text-indigo-600 font-bold hover:underline">Continuer mes achats</button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.photo || item.image} alt={item.nom} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{item.nom}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors ml-2">
                          <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        </button>
                      </div>
                      <p className="text-indigo-600 font-black text-sm mt-1">{item.prix.toLocaleString()} FCFA</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-slate-100 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faMinus} className="text-[10px]" />
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="px-6 py-8 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 font-medium">Sous-total</span>
                <span className="text-2xl font-black text-slate-900">{cartTotal.toLocaleString()} FCFA</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center">Livraison calculée lors de la confirmation sur WhatsApp</p>
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 uppercase tracking-widest text-xs"
              >
                Commander sur WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
