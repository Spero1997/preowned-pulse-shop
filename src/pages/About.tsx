
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, History, Award, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-autoBlue/80 z-10" />
          <div 
            className="relative h-[300px] bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1374&auto=format&fit=crop')" 
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center relative z-20">
              <div className="max-w-2xl text-white">
                <div className="flex items-center mb-6 text-sm">
                  <Link to="/" className="text-white/80 hover:text-white">
                    Accueil
                  </Link>
                  <span className="mx-2 text-white/60">/</span>
                  <span className="text-white font-medium">
                    À propos
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Notre histoire et nos valeurs
                </h1>
                <p className="text-lg">
                  Découvrez Service Auto Adi, votre partenaire de confiance pour l'achat de votre prochaine voiture en Italie.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Qui sommes-nous ?
                </h2>
                <p className="text-gray-600 mb-4">
                  Service Auto Adi est une entreprise familiale fondée en 2010 à Florence, en Italie. Depuis plus de 13 ans, nous nous sommes spécialisés dans la vente de voitures d'occasion de qualité supérieure.
                </p>
                <p className="text-gray-600 mb-4">
                  Notre fondateur, Adi, passionné d'automobile depuis son plus jeune âge, a créé cette entreprise avec une vision claire : offrir des véhicules d'occasion fiables à des prix transparents et compétitifs.
                </p>
                <p className="text-gray-600 mb-6">
                  Aujourd'hui, nous sommes fiers de compter parmi les concessionnaires les plus réputés de la région, grâce à notre engagement envers la qualité et la satisfaction client.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-autoOrange mr-3 mt-1" />
                    <p>Plus de 1000 clients satisfaits</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-autoOrange mr-3 mt-1" />
                    <p>Garantie sur tous nos véhicules</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-autoOrange mr-3 mt-1" />
                    <p>Service après-vente personnalisé</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1528&auto=format&fit=crop" 
                  alt="Notre équipe" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 -rotate-6 bg-white p-4 rounded shadow-lg w-40 h-40 flex items-center justify-center text-center">
                  <div>
                    <p className="font-bold text-3xl text-autoBlue">+13</p>
                    <p className="text-gray-600">ans d'expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos valeurs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chez Service Auto Adi, nos valeurs guident chacune de nos actions et interactions avec nos clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border transition-transform hover:scale-105">
                <Users className="h-12 w-12 text-autoBlue mb-4" />
                <h3 className="text-xl font-bold mb-3">Confiance et transparence</h3>
                <p className="text-gray-600">
                  Nous croyons en l'établissement de relations de confiance avec nos clients. Nous sommes transparents sur l'état de nos véhicules et nos prix.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg border transition-transform hover:scale-105">
                <Award className="h-12 w-12 text-autoBlue mb-4" />
                <h3 className="text-xl font-bold mb-3">Qualité et fiabilité</h3>
                <p className="text-gray-600">
                  Chaque véhicule que nous proposons est minutieusement inspecté et préparé pour garantir sa fiabilité et sa qualité.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg border transition-transform hover:scale-105">
                <History className="h-12 w-12 text-autoBlue mb-4" />
                <h3 className="text-xl font-bold mb-3">Service personnalisé</h3>
                <p className="text-gray-600">
                  Nous prenons le temps de comprendre vos besoins et de vous proposer des solutions adaptées à votre situation et à votre budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-autoBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à trouver votre prochaine voiture ?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Parcourez notre sélection de véhicules d'occasion de qualité ou contactez-nous directement pour discuter de vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-autoOrange hover:bg-autoOrange/90"
                asChild
              >
                <Link to="/shop" className="flex items-center">
                  Voir nos voitures
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
