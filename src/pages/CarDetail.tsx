
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cog, 
  DoorOpen,
  Car as CarIcon,
  Check,
  ShoppingCart,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Car } from "@/types/car";
import { cars } from "@/data/cars";
import { formatEuro } from "@/lib/utils";
import { toast } from "sonner";

// État global simplifié pour le panier (dans une application réelle, utilisez un gestionnaire d'état comme Redux ou Context)
let cartItems: Car[] = [];

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler un chargement de données
    setLoading(true);
    setTimeout(() => {
      const foundCar = cars.find(c => c.id === id);
      if (foundCar) {
        setCar(foundCar);
        setActiveImage(foundCar.images[0]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleReservation = () => {
    if (car) {
      // Ajouter la voiture au panier
      cartItems.push(car);
      
      // Afficher une notification
      toast.success(`Voiture ajoutée au panier !`, {
        description: `${car.brand} ${car.model} (${car.year}) a été ajouté à votre panier`,
        action: {
          label: "Voir le panier",
          onClick: () => navigate("/cart")
        },
      });
      
      // Mettre à jour le compteur du panier dans le header (dans une vraie application)
      const cartCounter = document.querySelector('.cart-counter');
      if (cartCounter) {
        cartCounter.textContent = cartItems.length.toString();
      }
    }
  };

  const handleAddToFavorite = () => {
    if (car) {
      toast.success(`Ajouté aux favoris`, {
        description: `${car.brand} ${car.model} a été ajouté à vos favoris`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8 container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-16 w-16 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8 container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Voiture non trouvée</h1>
            <p className="mb-6">Nous n'avons pas trouvé la voiture que vous recherchez.</p>
            <Button asChild>
              <Link to="/shop">Retour au catalogue</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Fil d'Ariane */}
          <div className="flex items-center mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-autoBlue">
              Accueil
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-autoBlue">
              Voitures
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">
              {car.brand} {car.model}
            </span>
          </div>

          {/* Bouton de retour */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
              asChild
            >
              <Link to="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au catalogue
              </Link>
            </Button>
          </div>

          {/* En-tête de la voiture */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model} {car.year}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{car.type}</Badge>
                <Badge variant="secondary">{car.fuel}</Badge>
                <Badge variant="secondary">{car.transmission}</Badge>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              {car.discount ? (
                <div>
                  <span className="text-gray-500 line-through text-lg">
                    {formatEuro(car.price + car.discount)}
                  </span>
                  <span className="text-3xl font-bold text-autoBlue ml-2 block md:inline">
                    {formatEuro(car.price)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-autoBlue">
                  {formatEuro(car.price)}
                </span>
              )}
            </div>
          </div>

          {/* Galerie d'images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={activeImage} 
                  alt={`${car.brand} ${car.model}`} 
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <div className="flex overflow-x-auto mt-2 gap-2 pb-2">
                {car.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      activeImage === image ? 'border-autoBlue' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${car.brand} ${car.model} - vue ${index + 1}`}
                      className="w-24 h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Caractéristiques principales */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Année</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Kilométrage</p>
                    <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Carburant</p>
                    <p className="font-medium">{car.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Cog className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CarIcon className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Puissance</p>
                    <p className="font-medium">{car.power} ch</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DoorOpen className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Portes</p>
                    <p className="font-medium">{car.doors}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-autoOrange hover:bg-autoOrange/90"
                  onClick={handleReservation}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={handleAddToFavorite}>
                    <Heart className="h-4 w-4 mr-2" />
                    Favoris
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `${car.brand} ${car.model} - Service Auto Adi`,
                          text: `Découvrez cette ${car.brand} ${car.model} (${car.year}) chez Service Auto Adi !`,
                          url: window.location.href,
                        })
                      } else {
                        // Fallback - copy to clipboard
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Lien copié !", {
                          description: "L'URL a été copiée dans le presse-papier"
                        });
                      }
                    }}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets d'information */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Équipements</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 border rounded-b-lg">
              <h3 className="text-xl font-bold mb-4">À propos de cette voiture</h3>
              <p className="text-gray-700 mb-4">{car.description}</p>
              <p className="text-gray-700">
                Ce véhicule est disponible immédiatement pour un essai routier. Contactez-nous pour plus d'informations ou pour planifier une visite à notre concession.
              </p>
            </TabsContent>
            <TabsContent value="features" className="p-6 border rounded-b-lg">
              <h3 className="text-xl font-bold mb-4">Équipements et options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-autoBlue mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="contact" className="p-6 border rounded-b-lg">
              <h3 className="text-xl font-bold mb-4">Demander plus d'informations</h3>
              <p className="text-gray-700 mb-4">
                Si vous êtes intéressé par ce véhicule ou si vous avez des questions, n'hésitez pas à nous contacter.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Téléphone</p>
                    <p className="font-medium">+39 376 175 3341</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium">info@serviceautoadi.it</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-autoBlue mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Adresse</p>
                    <p className="font-medium">Borgo Ognissanti, 142r 50123 Firenze FI Italie</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarDetail;
