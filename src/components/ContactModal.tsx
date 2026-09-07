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
  // Honeypot anti-spam : invisible pour l'utilisateur, rempli par les bots.
  const [website, setWebsite] = useState('');

  const topicsList = [
    "Intégration d'ERP Odoo",
    "Développement de site web & Communication Digitale",
    "Assistance à Maîtrise d'Ouvrage (AMOA)",
    "Facturation Électronique & Flux",
    "Performance & Finance",
    "Process & Transformation",
    "Autre / Conseil global"
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

  // Empêche le scroll de l'arrière-plan tant que la modale est ouverte.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate automated pre-filled WhatsApp message for appointment confirmation
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Bonjour CLIXA Consulting,\n\nJe souhaite planifier un appel téléphonique avec l'administration pour échanger sur un projet.\n\n📅 Date souhaitée : ${selectedDay}\n⏰ Créneau horaire : ${selectedTime}\n💼 Thématique : ${topic}\n👤 Nom & Prénom : ${name || 'Non renseigné'}\n🏢 Entreprise : ${company || 'Non renseignée'}\n📞 Mon numéro : ${phone || 'À contacter sur ce numéro'}\n\nMerci de me confirmer ce rendez-vous dans le planning de l'administration.`
    );
    return `https://wa.me/212661344054?text=${text}`;
  };

  // Repli garanti : ouvre le client mail du visiteur avec la demande
  // pré-remplie si l'API d'envoi n'est pas disponible.
  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`[Site CLIXA] ${topic} - ${name} (${company})`);
    const bodyText = encodeURIComponent(
      `Projet : ${topic}\nNom : ${name}\nEntreprise : ${company}\nEmail : ${email}\nTelephone : ${phone || 'non renseigne'}\n\nMessage :\n${message || '-'}`
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

      // API absente (dev local) ou non configuree : on bascule sur mailto.
      if (res.status === 404 || res.status === 503) {
        openMailtoFallback();
        setSubmitted(true);
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error || "L'envoi a echoue. Contactez-nous directement par telephone ou WhatsApp.");
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
      setError("Veuillez renseigner votre nom et votre numéro de téléphone afin que l'administration puisse vous rappeler.");
      return;
    }
    setError(null);
    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clixa-modal-title"
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-4 sm:my-8 z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header bar */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="clixa-modal-title" className="text-lg font-bold text-white leading-tight">
                Planifier un Échange avec CLIXA
              </h3>
              <p className="text-xs text-slate-400">
                Administration Maroc & France • Confirmation et rappel téléphonique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector: Planifier un Appel vs Message écrit */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950/90 border-b border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('call')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'call'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Planifier un Appel (Automatique)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('form')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'form'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Demande de Devis par Email</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-bold text-white">
                {mode === 'call' ? 'Créneau Enregistré !' : 'Demande Envoyée !'}
              </h4>

              {mode === 'call' ? (
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Votre créneau pour <strong className="text-sky-400">{selectedDay} ({selectedTime})</strong> a été transmis à l'administration. Un consultant vous contactera précisément à l'heure convenue au <strong className="text-white">{phone || 'votre numéro'}</strong>.
                </p>
              ) : (
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Votre demande concernant <strong className="text-sky-400">{topic}</strong> a bien été transmise à nos consultants. Vous recevrez une réponse à l'adresse <strong className="text-white">{email}</strong> sous 24h ouvrées.
                </p>
              )}

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-sm mx-auto text-xs text-slate-400 space-y-1">
                <div>Maroc : <span className="text-white">{BRAND.phoneMarocDisplay}</span></div>
                <div>France : <span className="text-white">{BRAND.phoneFranceDisplay}</span></div>
                <div>Email : <span className="text-white">{BRAND.contactEmail}</span></div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : mode === 'call' ? (
            /* Mode 1: Automated Time-Slot & WhatsApp Booking */
            <form onSubmit={handleWhatsAppBooking} className="space-y-4">
              
              {/* Info banner */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex items-start gap-3 text-xs text-emerald-300">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Rappel téléphonique par l'administration</strong>
                  Sélectionnez votre créneau libre. Votre demande est synchronisée directement sur WhatsApp avec confirmation automatique.
                </div>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Projet Concerné
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  1. Choisissez le Jour
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableDays.map((d) => (
                    <button
                      type="button"
                      key={d.label}
                      onClick={() => setSelectedDay(d.label)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedDay === d.label
                          ? 'bg-sky-500/15 border-sky-500 text-white shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{d.label}</div>
                      <div className="text-[10px] text-slate-400">{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>2. Choisissez l'Horaire Libre</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                        selectedTime === time
                          ? 'bg-sky-500 text-white font-bold border-sky-400 shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Votre Nom & Prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Jean Dupont"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Numéro pour vous rappeler *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6... ou +33 7..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div role="alert" className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300">
                  {error}
                </div>
              )}

              {/* WhatsApp Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-slate-950" />
                  <span>Confirmer le créneau sur WhatsApp & Bloquer l'Appel</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  L'administration recevra l'horaire retenu et vous contactera au créneau choisi.
                </span>
              </div>

            </form>
          ) : (
            /* Mode 2: Standard Written Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Topic Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Votre Projet Prioritaire
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nom & Prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Jean Dupont"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Entreprise *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ex: Société / Groupe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email professionnel *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Téléphone (Maroc ou France)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6... ou +33 7..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Détaillez vos objectifs ou besoins</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex : Intégration Odoo V17, refonte de site web vitrine, AMOA pour cadrer le nouveau SI..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                />
              </div>

              {/* Reassurance */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Confidentialité garantie • Réponse sous 24h ouvrées.</span>
              </div>

              {/* Honeypot anti-spam : masqué aux humains, piège à bots */}
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
                <div role="alert" className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
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
