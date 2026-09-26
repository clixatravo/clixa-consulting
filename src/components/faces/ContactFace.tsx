import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { BRAND } from '../../data/content';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  Globe
} from 'lucide-react';

interface ContactFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const ContactFace: React.FC<ContactFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  useScrollReveal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState('Intégration ERP Odoo');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "Contact us") */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Contact us
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl leading-relaxed">
            Échangez directement avec un associé pour un cadrage confidentiel de vos enjeux de gouvernance SI, d'intégration ERP Odoo ou de conformité DGI.
          </p>
        </div>

        {/* 2. MAIN 2-COLUMN CONTACT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Left Column: Hubs Casablanca & Toulouse */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Hub Casablanca */}
            <div className="p-8 bg-white border border-[#e2dcd2] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇲🇦</span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Casablanca Hub</h3>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1">
                  Siège Régional
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-600 mb-6 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Casablanca Finance City (CFC) & Twin Center, Casablanca, Maroc</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`tel:${BRAND.phoneMarocRaw}`} className="text-slate-900 font-semibold hover:text-blue-600 transition-colors">
                    {BRAND.phoneMarocDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`mailto:${BRAND.contactEmail}`} className="text-slate-900 hover:text-blue-600 transition-colors">
                    {BRAND.contactEmail}
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                Direction Générale, Ingénierie ERP Odoo & Conformité Fiscale DGI.
              </p>
            </div>

            {/* Hub Toulouse */}
            <div className="p-8 bg-white border border-[#e2dcd2] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇫🇷</span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Toulouse Hub</h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1">
                  Bureau Europe
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-600 mb-6 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Toulouse (Occitanie), France</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`tel:${BRAND.phoneFranceRaw}`} className="text-slate-900 font-semibold hover:text-blue-600 transition-colors">
                    {BRAND.phoneFranceDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`mailto:${BRAND.contactEmail}`} className="text-slate-900 hover:text-blue-600 transition-colors">
                    {BRAND.contactEmail}
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                AMOA Stratégique, Factur-X & Accompagnement des Holdings Européennes.
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contacter directement via WhatsApp</span>
            </a>

            {/* NDA Trust info */}
            <div className="p-4 bg-white border border-[#e2dcd2] text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Tous nos échanges sont couverts par un accord de stricte confidentialité (NDA systématique).</span>
            </div>

          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#e2dcd2] p-8 sm:p-12 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  Prise de Rendez-vous Exécutif
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                  Planifier un Échange Stratégique de 45 min
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Réponse garantie sous 24h ouvrées par un associé senior.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Karim Bennani"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: k.bennani@groupe.ma"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Entreprise & Fonction
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ex: Directeur Général / DAF"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Téléphone direct
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: +212 6..."
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Périmètre de la demande
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Intégration ERP Odoo">Intégration & Migration ERP Odoo</option>
                      <option value="Facturation Électronique DGI 2026">Conformité Fiscale DGI / Factur-X</option>
                      <option value="AMOA & Cadrage SI Big 4">AMOA Stratégique & Cadrage Big 4</option>
                      <option value="Audit Flash 48H">Diagnostic Flash 48H</option>
                      <option value="Autre demande executive">Autre projet confidentiel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Description synthétique de votre enjeu
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Précisez votre contexte (nombre d'utilisateurs, ERP actuel, échéance souhaitée)..."
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1f24e9] hover:bg-[#151ad0] text-white py-4 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Transmettre la demande de cadrage</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-heading">
                    Demande de consultation transmise
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Merci {name}. Un associé senior Clixa Consulting vous recontactera sous 24 heures ouvrées pour convenir du créneau de cadrage.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
