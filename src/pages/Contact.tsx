
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = {
        name,
        email,
        subject,
        message,
        to: "infos@autoadi.com"
      };
      
      const mailtoLink = `mailto:infos@autoadi.com?subject=${encodeURIComponent(
        `Contact form: ${subject}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;
      
      window.open(mailtoLink, "_blank");
      
      toast.success(t("contact.messageSent") || "Message envoyé avec succès !", {
        description: t("contact.messageResponse") || "Nous vous répondrons dans les plus brefs délais."
      });
      
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error(t("contact.errorSending") || "Erreur lors de l'envoi du message", {
        description: t("contact.tryAgain") || "Veuillez réessayer plus tard."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6 text-sm">
            <a href="/" className="text-gray-500 hover:text-autoBlue">
              {t("navbar.home")}
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">
              {t("navbar.contact")}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("navbar.contact")}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-8">
                Vous avez des questions sur nos véhicules ou nos services ? N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour vous fournir toutes les informations dont vous avez besoin.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-autoBlue mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Adresse</h3>
                    <p className="text-gray-600">{t("whyChooseUs.address")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageCircle className="h-6 w-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">WhatsApp/Téléphone</h3>
                    <a 
                      href="https://wa.me/393761753341" 
                      className="text-gray-600 hover:text-autoBlue"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("whyChooseUs.phone")}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-autoBlue mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <a href="mailto:infos@autoadi.com" className="text-gray-600 hover:text-autoBlue">infos@autoadi.com</a>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.7785578758027!2d11.24514!3d43.77209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a56a92e3472a5%3A0xa865def576a80faf!2sBorgo%20Ognissanti%2C%20142R%2C%2050123%20Firenze%20FI%2C%20Italy!5e0!3m2!1sen!2sus!4v1717261115971!5m2!1sen!2sus" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Auto Adi - Localisation"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Votre email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <Input 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Votre message"
                    rows={6}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-autoBlue hover:bg-autoBlue/90"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Nos horaires d'ouverture</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-6 text-center">
                <h3 className="font-bold mb-2">Lundi - Vendredi</h3>
                <p className="text-gray-600">9h00 - 18h30</p>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <h3 className="font-bold mb-2">Samedi</h3>
                <p className="text-gray-600">9h00 - 17h00</p>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <h3 className="font-bold mb-2">Dimanche</h3>
                <p className="text-gray-600">Fermé</p>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <h3 className="font-bold mb-2">Jours fériés</h3>
                <p className="text-gray-600">Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
