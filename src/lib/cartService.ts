
import { Car } from "@/types/car";
import { toast } from "sonner";

// Clé pour le stockage local
const CART_STORAGE_KEY = 'service-auto-adi-cart';
const COUPON_STORAGE_KEY = 'service-auto-adi-coupon';

// Interface pour notre service de panier
interface CartService {
  getItems: () => Car[];
  addItem: (car: Car) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCount: () => number;
  saveCoupon: (code: string) => void;
  getCoupon: () => string | null;
  removeCoupon: () => void;
}

// Interface pour les coupons
interface Coupon {
  code: string;
}

// Récupérer les éléments du panier depuis le stockage local
const getCartFromStorage = (): Car[] => {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  if (cartJson) {
    try {
      return JSON.parse(cartJson);
    } catch (e) {
      console.error('Erreur lors de la récupération du panier:', e);
      return [];
    }
  }
  return [];
};

// Sauvegarder les éléments du panier dans le stockage local
const saveCartToStorage = (items: Car[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

// Récupérer le coupon depuis le stockage local
const getCouponFromStorage = (): string | null => {
  const couponJson = localStorage.getItem(COUPON_STORAGE_KEY);
  if (couponJson) {
    try {
      const coupon = JSON.parse(couponJson);
      return coupon.code;
    } catch (e) {
      console.error('Erreur lors de la récupération du coupon:', e);
      return null;
    }
  }
  return null;
};

// Sauvegarder le coupon dans le stockage local
const saveCouponToStorage = (code: string) => {
  const coupon: Coupon = { code };
  localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
};

// Supprimer le coupon du stockage local
const removeCouponFromStorage = () => {
  localStorage.removeItem(COUPON_STORAGE_KEY);
};

// Créer le service de panier
const createCartService = (): CartService => {
  // Récupérer les éléments existants au démarrage
  let cartItems = getCartFromStorage();

  // Créer un événement personnalisé pour les mises à jour du panier
  const createCartUpdateEvent = () => {
    const event = new CustomEvent('cart-updated', { detail: { count: cartItems.length } });
    window.dispatchEvent(event);
  };

  return {
    // Récupérer tous les éléments du panier
    getItems: () => {
      // Toujours récupérer la dernière version depuis le stockage
      cartItems = getCartFromStorage();
      return cartItems;
    },

    // Ajouter un élément au panier
    addItem: (car: Car) => {
      // Vérifier si la voiture est déjà dans le panier
      const existingIndex = cartItems.findIndex(item => item.id === car.id);
      
      if (existingIndex === -1) {
        cartItems.push(car);
        saveCartToStorage(cartItems);
        createCartUpdateEvent();
        
        // Afficher une notification de succès
        toast.success(`Voiture ajoutée au panier !`, {
          description: `${car.brand} ${car.model} (${car.year}) a été ajouté à votre panier`,
        });
      } else {
        // La voiture est déjà dans le panier
        toast.info(`Cette voiture est déjà dans votre panier.`);
      }
    },

    // Supprimer un élément du panier
    removeItem: (id: string) => {
      const initialCount = cartItems.length;
      cartItems = cartItems.filter(item => item.id !== id);
      
      if (initialCount !== cartItems.length) {
        saveCartToStorage(cartItems);
        createCartUpdateEvent();
        toast.success("Article supprimé du panier");
      }
    },

    // Vider le panier
    clearCart: () => {
      cartItems = [];
      saveCartToStorage(cartItems);
      createCartUpdateEvent();
      toast.success("Panier vidé");
    },

    // Obtenir le nombre d'éléments dans le panier
    getCount: () => cartItems.length,

    // Sauvegarder le coupon
    saveCoupon: (code: string) => {
      saveCouponToStorage(code);
      const event = new CustomEvent('coupon-updated', { detail: { code } });
      window.dispatchEvent(event);
    },

    // Récupérer le coupon
    getCoupon: () => {
      return getCouponFromStorage();
    },

    // Supprimer le coupon
    removeCoupon: () => {
      removeCouponFromStorage();
      const event = new CustomEvent('coupon-updated', { detail: { code: null } });
      window.dispatchEvent(event);
    }
  };
};

// Exporter le service de panier
export const cartService = createCartService();
