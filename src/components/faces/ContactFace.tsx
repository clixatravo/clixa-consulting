import React, { useState } from 'react';
import { BRAND } from '../../data/content';
import { 
  PhoneCall, 
  Mail, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Globe, 
  Building2,
  Calendar,
  Send
} from 'lucide-react';

interface ContactFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const ContactFace: React.FC<ContactFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState('Intégration ERP Odoo');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans pt-28 pb-20">
      
      {/* 1. FACE HEADER & BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <button onClick={() => onNavigateFace('accueil')} className="hover:text-white transition-colors cursor-pointer">
            Accueil
          </button>
          <span>/</span>
          <span className="text-sky-400 font-bold">Contact & Cadrage Exécutif</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Échange Confidentiel C-Level</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Votre Transformation Commence par un Cadrage Stratégique
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mt-4">
            Vous préparez l'intégration d'un ERP Odoo, la refonte de vos outils web ou l'optimisation financière de vos processus ? Échangez directement avec un associé CLIXA pour valider votre feuille de route.
          </p>
        </div>
      </div>

      {/* 2. DUAL HUBS & DIRECT FORM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Phone & Hubs Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hub Maroc */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇲🇦</span>
                  <div>
                    <h3 className="font-bold text-white text-base font-heading">Siège Social & Pôle Odoo</h3>
                    <span className="text-xs text-slate-400 font-mono">Casablanca, Maroc</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">CFC & Twin</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                Direction Générale, Chefs de Projets Odoo Certifiés et Équipes de Déploiement Local.
              </p>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <a href={`tel:${BRAND.phoneMarocRaw}`} className="font-mono text-sm font-bold text-sky-400 hover:text-white transition-colors">
                  {BRAND.phoneMarocDisplay}
                </a>
                <a href={`tel:${BRAND.phoneMarocRaw}`} className="p-2 rounded-xl bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-all">
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hub Europe */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇫🇷</span>
                  <div>
                    <h3 className="font-bold text-white text-base font-heading">Bureau Europe & AMOA</h3>
                    <span className="text-xs text-slate-400 font-mono">Paris, France</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">8ème Arr.</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                Conseil Stratégique de Direction, Cadrage AMOA et Conformité Fiscale Factur-X Europe.
              </p>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <a href={`tel:${BRAND.phoneFranceRaw}`} className="font-mono text-sm font-bold text-sky-400 hover:text-white transition-colors">
                  {BRAND.phoneFranceDisplay}
                </a>
                <a href={`tel:${BRAND.phoneFranceRaw}`} className="p-2 rounded-xl bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-all">
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Line Card */}
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 hover:border-emerald-600 transition-all flex items-center justify-between shadow-xl group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-emerald-400">Échange Instantané</div>
                  <div className="text-sm font-bold text-white font-heading">Ligne Directe WhatsApp</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Commitments Box */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/[0.06] text-xs text-slate-300 space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Confidentiel sous accord NDA systématique</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Réponse garantie par un associé sous 24h ouvrées</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Booking Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/[0.09] shadow-2xl relative backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500" />

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Demande de Cadrage Stratégique
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                Remplissez ce formulaire confidentiel pour organiser un premier échange avec un directeur de mission.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Nom complet & Titre *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Yassine Berrada, Directeur Général"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Email professionnel *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="y.berrada@entreprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Téléphone / Mobile</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+212 6... ou +33 6..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Société & Effectif</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Groupe Industriel (80 sal.)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Sujet principal de cadrage</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                  >
                    <option value="Intégration ERP Odoo">Intégration ERP Odoo 17 / 18</option>
                    <option value="Pack Diagnostic Flash 48H">Pack Diagnostic Flash 48H</option>
                    <option value="AMOA & Direction de Projets">AMOA & Direction de Projets</option>
                    <option value="Conformité Fiscale DGI / DGFIP">Conformité Fiscale DGI / DGFIP</option>
                    <option value="Solutions Web Métier">Solutions Web Métier & Extranets</option>
                    <option value="Autre Cadrage Stratégique">Autre Cadrage Stratégique</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="executive-btn-primary w-full py-4 rounded-xl text-sm font-bold text-white font-heading flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-sky-500/20"
                  >
                    <span>Envoyer la demande de cadrage</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-700/50 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Demande de Cadrage Reçue
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto">
                  Merci {name}. Un associé senior de CLIXA Consulting prendra contact avec vous dans un délai maximal de 24h ouvrées pour préparer votre cadrage.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-sky-400 hover:text-white underline cursor-pointer"
                >
                  Envoyer une autre demande
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 3. TRANSITION TO ACCUEIL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/[0.08] flex items-center justify-between">
        <button
          onClick={() => onNavigateFace('methode')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Retour à la Méthodologie
        </button>

        <button
          onClick={() => onNavigateFace('accueil')}
          className="link-cta-sqli text-sm font-bold cursor-pointer"
        >
          <span>Revenir à l'Accueil</span>
          <div className="icon-circle">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </div>
  );
};
