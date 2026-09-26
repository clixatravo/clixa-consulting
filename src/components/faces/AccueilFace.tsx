import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  Globe, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  Award,
  Clock,
  Building2,
  FileCheck2,
  Cpu,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  GraduationCap,
  Bot
} from 'lucide-react';
import { BRAND, KEY_METRICS, EXPERTISES, CASE_STUDIES } from '../../data/content';
import { FORMATIONS_CATALOGUE } from '../../data/formations';
import { RobotIcon } from '../RobotIcon';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface AccueilFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const AccueilFace: React.FC<AccueilFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useScrollReveal();

  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  const togglePlay = () => setVideoPlaying(!videoPlaying);
  const toggleMute = () => setVideoMuted(!videoMuted);

  const openAiAssistant = (prompt?: string) => {
    window.dispatchEvent(new CustomEvent('clixa:open-chat', { detail: { prompt } }));
  };

  const trustMarqueeItems = [
    { icon: Cpu, label: "Écosystème ERP Odoo 17 & 18", desc: "Intégration & Paramétrage Métier", tag: "ERP Certifié" },
    { icon: FileCheck2, label: "Facturation Électronique", desc: "Conformité DGI (MA) & DGFIP (FR)", tag: "Agrément Fiscal" },
    { icon: ShieldCheck, label: "Standards AMOA Big 4", desc: "Cadrage, Spécifications & Recette", tag: "Gouvernance SI" },
    { icon: GraduationCap, label: "CLIXA Institute (clixa.africa)", desc: "12 Formations Exécutives & PMP®", tag: "Certifications" },
    { icon: Award, label: "Double Hub Casablanca & Paris", desc: "Casablanca Finance City & Paris", tag: "Présence Directe" },
    { icon: TrendingUp, label: "Pilotage Financier & BFR", desc: "Tableaux de bord DAF & Trésorerie", tag: "Performance" },
    { icon: Globe, label: "Solutions Web & Extranets", desc: "Portails clients & Automatisation API", tag: "Digitalisation" },
    { icon: Building2, label: "Casablanca Finance City (CFC)", desc: "Statut International & Rayonnement Régional", tag: "Hub Stratégique" },
  ];

  const insightsArticles = [
    {
      tag: "Intelligence Artificielle & ERP",
      title: "L'impact des agents IA autonomes sur le pilotage des processus ERP en 2026",
      desc: "Comment l'orchestration par IA transforme la saisie comptable, la réconciliation bancaire et la planification des stocks.",
      date: "Septembre 2026",
      readTime: "4 min"
    },
    {
      tag: "Réglementation Fiscale DGI",
      title: "Réforme de la Facturation Électronique au Maroc : Guide stratégique pour Comités de Direction",
      desc: "Anticiper les obligations légales DGI 2025/2026, fiabiliser les télédéclarations et sécuriser les interfaçages API.",
      date: "Août 2026",
      readTime: "6 min"
    },
    {
      tag: "Gouvernance & AMOA",
      title: "Pourquoi 70% des projets ERP échouent et comment le cadrage Big 4 garantit le succès",
      desc: "Analyse des dérives budgétaires courantes des SSII classiques et méthodologie de sécurisation par jalons contractuels.",
      date: "Juillet 2026",
      readTime: "5 min"
    }
  ];

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans">
      
      {/* 1. HERO LIGHT STEEL BLUE (SQLI-style professional bright hero) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-40 pb-20 overflow-hidden border-b border-slate-200"
        style={{ background: 'linear-gradient(135deg, #e8f4fd 0%, #dbeeff 30%, #c7e3ff 60%, #f0f7ff 100%)' }}
      >

        {/* Subtle geometric grid overlay */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(31,100,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(31,100,200,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* Large soft blue orb background accent */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(56,152,255,0.18) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(96,185,255,0.12) 0%, transparent 70%)' }}
        />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="max-w-4xl space-y-6 text-left">
            {/* Top Kicker Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-blue-200 text-xs font-semibold text-blue-800 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="font-heading tracking-wider uppercase text-[10px] text-blue-700 font-bold">
                Cabinet de Conseil en Direction Générale & Architecture SI
              </span>
            </div>

            {/* Authoritative Clean Headline — dark on light bg */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-[#0a1628] leading-[1.06] font-heading">
              L'Excellence du Conseil Stratégique <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400">
                & de la Transformation Digitale
              </span>
            </h1>

            {/* High-Impact Editorial Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl font-normal leading-relaxed font-sans">
              Nous accompagnons les comités de direction au Maroc et en Europe pour <strong className="text-slate-900 font-semibold">structurer leurs processus</strong>,{' '}
              <strong className="text-slate-900 font-semibold">intégrer l'ERP Odoo sur-mesure</strong>, former leurs cadres via <strong className="text-slate-900 font-semibold">CLIXA Institute</strong> et{' '}
              <strong className="text-slate-900 font-semibold">sécuriser 100% de conformité fiscale DGI & DGFIP</strong>.
            </p>

            {/* SQLI Signature Action Suite */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenConsultation("Cadrage Stratégique Général")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] cursor-pointer font-heading shadow-lg shadow-blue-300/40"
                style={{ background: 'linear-gradient(135deg, #1d6cf5 0%, #0ea5e9 100%)' }}
              >
                <span>Démarrer un cadrage stratégique</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onNavigateFace('formations')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-800 bg-white/90 hover:bg-white border border-slate-200 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Formations Exécutives Institute</span>
              </button>
            </div>

            {/* C-Suite Trust Strip */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-blue-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Interventions sous accord strict de confidentialité (NDA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />

                <span>Bureaux à Casablanca Finance City 🇲🇦 & Paris 🇫🇷</span>
              </div>
            </div>

          </div>

        </div>

        {/* 🎬 FLOATING VIDEO TRAILER CONTROLS (Corner Badge) */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-slate-950/80 border border-white/[0.1] px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-2xl text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 font-mono text-sky-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">TRAILER 4K</span>
          </div>

          <div className="h-3 w-px bg-white/[0.1] mx-1" />

          <button
            onClick={togglePlay}
            className="hover:text-white transition-colors p-1 cursor-pointer flex items-center gap-1"
            title={videoPlaying ? "Mettre en pause" : "Lancer le trailer"}
          >
            {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-sky-400" />}
            <span>{videoPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={toggleMute}
            className="hover:text-white transition-colors p-1 cursor-pointer"
            title={videoMuted ? "Activer le son" : "Couper le son"}
          >
            {videoMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
          </button>
        </div>

      </section>

      {/* 2. SQLI INFINITE CONTINUOUS MARQUEE SLIDER */}
      <section className="border-b border-white/[0.08] bg-[#070b16] py-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Écosystèmes Technologiques & Standards Réglementaires Reconnus
          </span>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-infinite gap-4 sm:gap-6">
            {trustMarqueeItems.concat(trustMarqueeItems).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-slate-900/50 border border-white/[0.06] hover:border-sky-500/30 transition-colors shrink-0 backdrop-blur-md"
                >
                  <div className="p-2 rounded-xl bg-slate-950 border border-white/[0.08] text-sky-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white whitespace-nowrap font-heading">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 whitespace-nowrap">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 whitespace-nowrap font-sans">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 🔥 DEDICATED CLIXA INSTITUTE FORMATIONS SECTION ON HOME */}
      <section className="py-24 bg-[#0a0f1d] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-sky-400 mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>CLIXA Institute (www.clixa.africa)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
                Nos 12 Formations Exécutives & Certifiantes
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Parcours certifiants 100% en ligne en classes virtuelles en direct. Conçus pour les cadres dirigeants et certifiés par nos comités d'experts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateFace('formations')}
                className="px-6 py-3 bg-[#1f24e9] hover:bg-[#151ad0] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Catalogue des 12 formations</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {FORMATIONS_CATALOGUE.slice(0, 4).map((f) => (
              <div 
                key={f.id}
                onClick={() => onNavigateFace('formations')}
                className="p-6 bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-sky-400 uppercase font-semibold mb-2">
                    {f.specialisation}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors font-heading mb-2">
                    {f.titre}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans line-clamp-2 mb-4">
                    {f.positionnement}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-sm font-bold text-white font-mono">
                    {f.prixComptant} {f.devise}
                  </span>
                  <span className="text-xs text-sky-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Détails <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive AI Briefing Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-slate-950 border border-sky-500/30 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                <RobotIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                  Une question sur les dates, tarifs ou sessions live de nos formations ?
                </h4>
                <p className="text-xs text-slate-300">
                  Notre Assistant IA connaît en temps réel les places disponibles, les programmes détaillés et les échéances de paiement.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => openAiAssistant("Prochaine session et prix de la formation DAF ?")}
                className="px-3.5 py-2 bg-slate-900 border border-white/[0.1] hover:border-sky-400 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Session DAF ?
              </button>
              <button
                onClick={() => openAiAssistant("Comment se déroule la préparation PMP® ?")}
                className="px-3.5 py-2 bg-slate-900 border border-white/[0.1] hover:border-sky-400 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Certification PMP® ?
              </button>
              <button
                onClick={() => openAiAssistant()}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Ouvrir l'Assistant IA
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SQLI PUSH-SERVICES SPLIT 2-COLUMN SECTION (push-services) */}
      <section className="py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-heading uppercase tracking-wider text-[11px]">Pôles d'Excellence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Expertise
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Nous combinons stratégie, technologie, données et créativité pour bâtir des actifs digitaux pérennes, optimiser l'efficacité opérationnelle et accélérer une croissance durable.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('expertises')}
                  className="link-cta-sqli cursor-pointer text-base"
                >
                  <span>Explorer toutes nos expertises</span>
                  <div className="icon-circle">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Capability Cards */}
            <div className="lg:col-span-7 space-y-4">
              {EXPERTISES.map((exp, idx) => (
                <div
                  key={exp.id}
                  onClick={() => onNavigateFace('expertises')}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer group flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-2">
                      <span>PÔLE 0{idx + 1}</span>
                      {exp.isFlagship && <span className="text-sky-400 font-bold">• OFFRE MAJEURE</span>}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-heading">
                      {exp.title}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                      {exp.tagline}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-slate-950 border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. SQLI PUSH-NEWS / INSIGHTS (push-news) */}
      <section className="py-24 bg-[#060913] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-heading uppercase tracking-wider text-[11px]">Veille Stratégique</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Insights
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                L'inspiration est partout. Retrouvez nos réflexions, benchmarks et analyses stratégiques pour éclairer vos décisions technologiques et managériales.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('insights')}
                  className="link-cta-sqli cursor-pointer text-base"
                >
                  <span>Accéder à tous les Insights</span>
                  <div className="icon-circle">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Insights Editorial Cards */}
            <div className="lg:col-span-7 space-y-5">
              {insightsArticles.map((article, idx) => (
                <article
                  key={idx}
                  onClick={() => onNavigateFace('insights')}
                  className="p-7 rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/40 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[10px] font-mono font-semibold uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20">
                      {article.tag}
                    </span>
                    <span>{article.date} • {article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-heading leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {article.desc}
                  </p>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-white transition-colors">
                    <span>Lire l'analyse complète</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. SQLI PUSH-USE-CASES */}
      <section className="py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-heading uppercase tracking-wider text-[11px]">Résultats & Impact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Case Studies
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Nous sommes fiers de collaborer avec des entreprises d'envergure, en transformant durablement leurs opérations et leur rentabilité.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('cas-clients')}
                  className="link-cta-sqli cursor-pointer text-base"
                >
                  <span>Voir tous les cas clients</span>
                  <div className="icon-circle">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Case Studies Highlights */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CASE_STUDIES.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateFace('cas-clients')}
                  className="p-7 rounded-3xl bg-slate-900/70 border border-white/[0.08] hover:border-sky-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono uppercase text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-400">{item.location}</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-black text-white font-heading mb-1 text-sky-300">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-300 font-semibold mb-3">
                      {item.metricLabel}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors font-heading mb-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-white transition-colors">
                    <span>Consulter le dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 7. 4 KEY EXECUTIVE FIGURES */}
      <section className="py-16 bg-[#060913] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-white/[0.06] text-center"
              >
                <div className="text-3xl sm:text-4xl font-black text-white font-heading mb-1 text-sky-300">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1 font-heading">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION C-LEVEL BANNER */}
      <section className="py-24 bg-gradient-to-b from-[#050811] to-[#03060d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/[0.1] text-xs font-semibold text-sky-400">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Mobilisation sous 72h · Casablanca CFC 🇲🇦 & Paris 🇫🇷</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Prêt à accélérer votre transformation ?
          </h2>

          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Échangez en direct avec un associé senior pour cadrer les objectifs, le budget et le planning de votre projet.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation("Cadrage Stratégique")}
              className="executive-btn-primary px-8 py-4 rounded-xl text-sm font-bold text-white font-heading flex items-center gap-2.5 cursor-pointer"
            >
              <span>Prendre un rendez-vous stratégique</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateFace('contact')}
              className="executive-btn-secondary px-7 py-4 rounded-xl text-sm font-semibold text-slate-200 font-sans flex items-center gap-2 cursor-pointer"
            >
              <span>Voir nos adresses & hubs</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
