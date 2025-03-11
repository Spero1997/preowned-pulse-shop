
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ShoppingCart, Info } from "lucide-react";
import { Car } from "@/types/car";
import { formatEuro } from "@/lib/utils";
import { toast } from "sonner";
import { cartService } from "@/lib/cartService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Cart = () => {
  const [items, setItems] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Charger les éléments du panier
  const loadCartItems = () => {
    setItems(cartService.getItems());
  };

  useEffect(() => {
    // Charger les éléments du panier
    setLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      loadCartItems();
      setLoading(false);
    }, 500);

    // Écouter les mises à jour du panier
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('cart-updated', handleCartUpdate);

    // Nettoyer l'écouteur d'événements
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const removeItem = (id: string) => {
    cartService.removeItem(id);
    loadCartItems();
  };

  const clearCart = () => {
    cartService.clearCart();
    loadCartItems();
  };

  const handleCheckout = () => {
    // Simuler une commande réussie
    toast.success("Commande effectuée avec succès !", {
      description: "Nous vous contacterons prochainement pour finaliser votre achat."
    });
    
    // Vider le panier après la commande
    clearCart();
    
    // Rediriger vers la page d'accueil
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-autoBlue">
              Accueil
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">
              Panier
            </span>
          </div>

          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
              asChild
            >
              <Link to="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuer mes achats
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre panier</h1>

          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-slate-200 h-16 w-16 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore ajouté de voitures à votre panier.
              </p>
              <Button asChild>
                <Link to="/shop">Découvrir nos voitures</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Voiture
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={item.images[0]}
                                alt={`${item.brand} ${item.model}`}
                                className="h-16 w-24 object-cover rounded mr-4"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {item.brand} {item.model}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  {item.year} | {item.mileage.toLocaleString()} km
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                            {formatEuro(item.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <Button
                              variant="ghost"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="text-red-500" 
                    onClick={clearCart}
                  >
                    Vider le panier
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border h-fit">
                <h2 className="text-xl font-bold mb-6">Résumé de la commande</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{formatEuro(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais de dossier</span>
                    <span className="font-medium">{formatEuro(300)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-autoBlue">{formatEuro(calculateTotal() + 300)}</span>
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="mb-6">
                  <AccordionItem value="payment-info">
                    <AccordionTrigger className="flex items-center text-sm">
                      <Info className="h-4 w-4 mr-2" />
                      Informations de paiement
                    </AccordionTrigger>
                    <AccordionContent className="text-sm">
                      <div className="bg-gray-100 p-4 rounded-md space-y-2">
                        <h3 className="font-semibold">Virement bancaire</h3>
                        <div className="grid grid-cols-1 gap-2">
                          <div>
                            <p className="font-medium">Bénéficiaire</p>
                            <p>Lucia Dzujkova</p>
                          </div>
                          <div>
                            <p className="font-medium">IBAN</p>
                            <p className="font-mono text-xs">LT453500010018283529</p>
                          </div>
                          <div>
                            <p className="font-medium">SWIFT/BIC</p>
                            <p className="font-mono text-xs">EVIULT2VXXX</p>
                          </div>
                          <div>
                            <p className="font-medium">Nom de banque</p>
                            <p>Paysera LT, UAB</p>
                          </div>
                          <div>
                            <p className="font-medium">Adresse de la banque</p>
                            <p className="text-xs">Pilaitės pr. 16, Vilnius, LT-04352, Lituanie</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Button 
                  className="w-full bg-autoOrange hover:bg-autoOrange/90 mb-4"
                  onClick={handleCheckout}
                >
                  Finaliser ma réservation
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Un acompte de 10% vous sera demandé pour confirmer votre réservation.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
