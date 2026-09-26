import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Building, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Calendar, 
  Clock, 
  MessageCircle, 
  ArrowRight,
  Check
} from 'lucide-react';
import { BRAND } from '../data/content';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialTopic }) => {
  const [mode, setMode] = useState<'form' | 'call'>('call'); // Default to smart appointment booking
  const [topic, setTopic] = useState<string>("Intégration d'ERP Odoo");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  
  // Appointment slot state
  const [selectedDay, setSelectedDay] = useState<string>('Demain');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 - 11:30');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Honeypot anti-spam
  const [website, setWebsite] = useState('');

  const topicsList = [
    "Intégration d'ERP Odoo",
    "Organisation & Modélisation des Processus (BPMN)",
    "Assistance à Maîtrise d'Ouvrage (AMOA Big 4)",
    "Facturation Électronique DGI & EDI",
    "Audit & Diagnostic Flash SI",
    "Contrôle de Gestion & Finance DAF",
    "Autre / Conseil Stratégique Global"
  ];

  const availableDays = [
    { label: "Aujourd'hui", sub: "Créneau urgent" },
    { label: "Demain", sub: "Recommandé" },
    { label: "Après-demain", sub: "Créneau standard" },
    { label: "Cette semaine", sub: "Selon calendrier" },
  ];

  const availableTimes = [
    "09:30 - 10:00",
    "11:00 - 11:30",
    "14:30 - 15:00",
    "16:00 - 16:30",
    "17:30 - 18:00"
  ];

  useEffect(() => {
    if (initialTopic) {
      const match = topicsList.find(t => t.toLowerCase().includes(initialTopic.toLowerCase())) || initialTopic;
      setTopic(match);
    }
  }, [initialTopic, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Generate automated pre-filled WhatsApp message for appointment confirmation
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Bonjour CLIXA Consulting,\n\nJe souhaite planifier un échange stratégique avec un consultant senior pour échanger sur notre projet.\n\n📅 Date souhaitée : ${selectedDay}\n⏰ Créneau horaire : ${selectedTime}\n💼 Thématique : ${topic}\n👤 Nom & Prénom : ${name || 'Non renseigné'}\n🏢 Entreprise : ${company || 'Non renseignée'}\n📞 Mon numéro : ${phone || 'À contacter sur ce numéro'}\n\nMerci de me confirmer la disponibilité dans votre planning.`
    );
    return `https://wa.me/212661344054?text=${text}`;
  };

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`[Site] ${topic} - ${name} (${company})`);
    const bodyText = encodeURIComponent(
      `Projet : ${topic}\nNom : ${name}\nEntreprise : ${company}\nEmail : ${email}\n` +
        `Telephone : ${phone || 'non renseigne'}\n\nMessage :\n${message || '-'}`
    );
    window.location.href = `mailto:${BRAND.contactEmail}?subject=${subject}&body=${bodyText}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, topic, message, website }),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      if (res.status === 404 || res.status === 503) {
        openMailtoFallback();
        setSubmitted(true);
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(
        data.error ||
          "L'envoi a échoué. Contactez-nous directement par téléphone ou WhatsApp."
      );
    } catch {
      openMailtoFallback();
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) {
      setError(
        "Veuillez renseigner votre nom et votre numéro de téléphone afin que notre équipe puisse vous recontacter."
      );
      return;
    }
    setError(null);
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setWebsite('');
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white border border-[#e2dcd2] shadow-2xl shadow-slate-900/15 overflow-hidden my-auto z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[92dvh] flex flex-col">
        
        {/* Header bar (SQLI Clean Ivory Style) */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-[#FAF7F2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading leading-tight">
                Planifier un Cadrage avec CLIXA
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-sans">
                Consultants Associés Casablanca 🇲🇦 & Toulouse 🇫🇷 • Réponse sous 24h
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector: Planifier un Appel vs Message écrit */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setMode('call')}
            className={`flex items-center justify-center gap-2 py-2.5 transition-all cursor-pointer ${
              mode === 'call'
                ? 'bg-white text-blue-700 font-bold shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Planifier un Appel Exécutif</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('form')}
            className={`flex items-center justify-center gap-2 py-2.5 transition-all cursor-pointer ${
              mode === 'form'
                ? 'bg-white text-blue-700 font-bold shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Demande de Cadrage par Email</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 bg-white flex-1 overflow-y-auto overscroll-contain">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-bold text-slate-900 font-heading">
                {mode === 'call' ? 'Créneau Enregistré !' : 'Demande Envoyée avec Succès !'}
              </h4>

              {mode === 'call' ? (
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-sans">
                  Votre créneau pour <strong className="text-blue-700">{selectedDay} ({selectedTime})</strong> a été enregistré. Un associé senior vous contactera précisément à l'heure convenue au <strong className="text-slate-900">{phone || 'votre numéro'}</strong>.
                </p>
              ) : (
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-sans">
                  Votre demande concernant <strong className="text-blue-700">{topic}</strong> a bien été transmise à nos consultants. Vous recevrez une réponse sous 24h ouvrées à l'adresse <strong className="text-slate-900">{email}</strong>.
                </p>
              )}

              <div className="p-4 bg-[#FAF7F2] border border-[#e2dcd2] max-w-sm mx-auto text-xs text-slate-600 space-y-1 font-mono">
                <div>Casablanca : <span className="text-slate-900 font-bold">{BRAND.phoneMarocDisplay}</span></div>
                <div>Toulouse : <span className="text-slate-900 font-bold">{BRAND.phoneFranceDisplay}</span></div>
                <div>Email : <span className="text-slate-900 font-bold">{BRAND.contactEmail}</span></div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-black transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : mode === 'call' ? (
            /* Mode 1: Automated Time-Slot & WhatsApp Booking */
            <form onSubmit={handleWhatsAppBooking} className="space-y-4">
              
              {/* Info banner */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs text-slate-700 font-sans">
                <MessageCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5 font-heading">Échange stratégique avec un consultant senior</strong>
                  Sélectionnez votre créneau libre. Votre demande est synchronisée directement sur WhatsApp avec confirmation automatique.
                </div>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 font-heading mb-1.5">
                  Projet Concerné
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                >
                  {topicsList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 font-heading mb-1.5">
                  1. Choisissez le Jour
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableDays.map((d) => (
                    <button
                      type="button"
                      key={d.label}
                      onClick={() => setSelectedDay(d.label)}
                      className={`p-2.5 border text-left transition-all cursor-pointer ${
                        selectedDay === d.label
                          ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{d.label}</div>
                      <div className="text-[10px] text-slate-500 font-sans">{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 font-heading mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>2. Choisissez l'Horaire Libre</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 border text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                        selectedTime === time
                          ? 'bg-[#1f24e9] text-white font-bold border-[#1f24e9] shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Votre Nom & Prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Jean Dupont"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Numéro pour vous rappeler *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6... ou +33 7..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div role="alert" className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-[#1f24e9] hover:bg-[#151ad0] transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Confirmer le créneau sur WhatsApp & Bloquer l'Appel</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-500 font-sans">
                  Notre équipe recevra l'horaire retenu et vous contactera au créneau choisi.
                </span>
              </div>

            </form>
          ) : (
            /* Mode 2: Standard Written Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Topic Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 font-heading mb-1.5">
                  Votre Projet Prioritaire
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                >
                  {topicsList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nom & Prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Jean Dupont"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Entreprise *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ex: Groupe Industriel"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email professionnel *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Téléphone (Maroc ou France)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6... ou +33 7..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Détaillez vos objectifs ou besoins</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex : Intégration Odoo V18, modélisation des processus métiers, mise en conformité fiscale DGI..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
                />
              </div>

              {/* Reassurance */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confidentialité garantie (NDA) • Réponse sous 24h ouvrées.</span>
              </div>

              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />

              {error && (
                <div role="alert" className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-[#1f24e9] hover:bg-[#151ad0] disabled:opacity-50 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Envoyer la demande écrite</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
