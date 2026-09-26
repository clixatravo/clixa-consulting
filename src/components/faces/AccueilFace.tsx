import React, { useState } from 'react';
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
  Workflow, 
  BarChart3, 
  Check 
} from 'lucide-react';
import { BRAND, KEY_METRICS, EXPERTISES, CASE_STUDIES } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface AccueilFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const AccueilFace: React.FC<AccueilFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);

  useScrollReveal();

  const togglePlay = () => setVideoPlaying(!videoPlaying);
  const toggleMute = () => setVideoMuted(!videoMuted);

  const trustMarqueeItems = [
    { icon: Cpu, label: "Écosystème ERP Odoo 17 & 18", desc: "Intégration & Paramétrage Métier", tag: "ERP Certifié" },
    { icon: Workflow, label: "Organisation & Processus BPMN", desc: "Cartographie des flux & Optimisation", tag: "Gouvernance" },
    { icon: FileCheck2, label: "Facturation Électronique", desc: "Conformité DGI (MA) & DGFIP (FR)", tag: "Agrément Fiscal" },
    { icon: ShieldCheck, label: "Standards AMOA Big 4", desc: "Cadrage, Spécifications & Recette", tag: "Pilotage Forfait" },
    { icon: Award, label: "Double Hub Casablanca & Toulouse", desc: "Casablanca Finance City & Toulouse", tag: "Présence Directe" },
    { icon: TrendingUp, label: "Pilotage Financier & BFR", desc: "Tableaux de bord DAF & Trésorerie", tag: "Performance" },
    { icon: Globe, label: "Solutions Web & Extranets", desc: "Portails clients & Automatisation API", tag: "Digitalisation" },
    { icon: Building2, label: "Casablanca Finance City (CFC)", desc: "Statut International & Rayonnement Régional", tag: "Hub Stratégique" },
  ];

  const corePillars = [
    {
      num: "01",
      title: "Organisation & Modélisation des Processus",
      subtitle: "BPMN · Audit Organisationnel · Conduite du Changement",
      desc: "Cartographie exhaustive de vos processus existants, suppression des goulots d'étranglement, optimisation des temps de cycle et réalignement des équipes opérationnelles.",
      tag: "Processus Métiers",
      deliverables: ["Matrice des flux BPMN", "Plan de réduction des irritants", "Indicateurs de productivité"],
      route: "expertises"
    },
    {
      num: "02",
      title: "Intégration & Paramétrage ERP Odoo Enterprise",
      subtitle: "Ventes · Stocks · Achats · Comptabilité · GPAO",
      desc: "Déploiement sur-mesure d'Odoo Enterprise v17 & v18 adapté aux spécificités fiscales et comptables locales (Maroc DGI & France DGFIP) sans développements superflus.",
      tag: "Architecture ERP",
      deliverables: ["Paramétrage modules cœur", "Reprise des données sécurisée", "Formation & Recette UAT"],
      route: "expertises"
    },
    {
      num: "03",
      title: "AMOA Stratégique & Pilotage au Forfait",
      subtitle: "Cadrage Big 4 · Sélection d'Éditeurs · Gouvernance SI",
      desc: "Assistance à maîtrise d'ouvrage 100% indépendante. Rédaction de cahiers des charges opposables, contractualisation au forfait et sécurisation des engagements des prestataires.",
      tag: "Direction de Projet",
      deliverables: ["Cahier des charges fonctionnel", "Grille de scoring éditeurs", "Tableau de bord de pilotage"],
      route: "methode"
    },
    {
      num: "04",
      title: "Facturation Électronique DGI & Fiscalité SI",
      subtitle: "Réforme Fiscale Maroc 2025/2026 & Factur-X Europe",
      desc: "Mise en conformité technique intégrale de votre chaîne de facturation avec les plateformes de la DGI et de la DGFIP. Sécurisation des télédéclarations et archivage à valeur probante.",
      tag: "Conformité Fiscale",
      deliverables: ["Audit des flux de facturation", "Connecteur API certifié", "Attestation de conformité"],
      route: "expertises"
    }
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
      desc: "Analyse des dérives budgétaires courantes des intégrateurs classiques et méthodologie de sécurisation par jalons contractuels.",
      date: "Juillet 2026",
      readTime: "5 min"
    }
  ];

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans bg-[#FAF7F2]">
      
      {/* 1. HERO LIGHT STEEL BLUE WITH HIGH-TECH VIDEO TRAILER */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-40 pb-20 overflow-hidden border-b border-blue-150"
        style={{
          background: 'linear-gradient(135deg, #eaf3fb 0%, #d8ecfe 35%, #cae3fb 70%, #edf5fc 100%)'
        }}
      >
        
        {/* 🎬 LOOPING CINEMATIC VIDEO TRAILER (SQLI Standard) */}
        <div className="node-home-page__head__media">
          <div className="video-in-place video-in-place--decorative">
            {videoPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/IoMvKj3iOBA?autoplay=1&mute=${videoMuted ? '1' : '0'}&loop=1&playlist=IoMvKj3iOBA&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1`}
                title="CLIXA Technology & Consulting Trailer"
                className="w-full h-full object-cover scale-[1.08] opacity-30 transition-opacity duration-1000"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full h-full bg-blue-100/30" />
            )}
          </div>
        </div>

        {/* Soft atmospheric overlay blend keeping the blue-ciel tone perfectly crisp */}
        <div 
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: 'linear-gradient(125deg, rgba(234, 243, 251, 0.88) 0%, rgba(216, 236, 254, 0.72) 45%, rgba(237, 245, 252, 0.90) 100%)'
          }}
        />

        {/* Subtle geometric grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            backgroundImage: 'linear-gradient(rgba(31,100,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(31,100,200,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* Large soft ambient orbs */}
        <div 
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none z-1"
          style={{ background: 'radial-gradient(circle, rgba(56,152,255,0.22) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 -left-32 w-[450px] h-[450px] rounded-full pointer-events-none z-1"
          style={{ background: 'radial-gradient(circle, rgba(96,185,255,0.16) 0%, transparent 70%)' }}
        />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="max-w-4xl space-y-6 text-left">
            {/* Top Kicker Pill */}
            <div className="animation-scroll fade-in-bottom inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 border border-blue-200/80 text-xs font-semibold text-blue-900 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="font-heading tracking-wider uppercase text-[10px] text-blue-800 font-bold">
                Cabinet de Conseil en Direction Générale & Architecture SI
              </span>
            </div>

            {/* Authoritative Clean Headline */}
            <h1 className="animation-scroll fade-in-bottom delay-100 text-3xl sm:text-5xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-[#0a1628] leading-[1.08] font-heading">
              L'Excellence du Conseil Stratégique <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-sky-600 to-blue-500">
                & de l'Organisation des Processus
              </span>
            </h1>

            {/* High-Impact Editorial Subtitle */}
            <p className="animation-scroll fade-in-bottom delay-200 text-base sm:text-xl text-slate-700 max-w-3xl font-normal leading-relaxed font-sans">
              Nous accompagnons les comités de direction au Maroc et en Europe pour <strong className="text-slate-950 font-semibold">structurer et modéliser leurs processus</strong>,{' '}
              <strong className="text-slate-950 font-semibold">intégrer l'ERP Odoo sur-mesure</strong>, fiabiliser le contrôle de gestion et{' '}
              <strong className="text-slate-950 font-semibold">sécuriser 100% de conformité fiscale DGI & DGFIP</strong>.
            </p>

            {/* SQLI Signature Action Suite with 3D Forward Pop */}
            <div className="animation-scroll fade-in-bottom delay-300 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenConsultation("Cadrage Stratégique & Organisation")}
                className="face-cta-forward btn-pro-hover animate-forward-breath inline-flex items-center justify-center gap-3 px-8 py-4 rounded-none text-sm sm:text-base font-bold text-white transition-all cursor-pointer font-heading shadow-md"
                style={{ background: '#1f24e9' }}
              >
                <span>Démarrer un cadrage stratégique</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onNavigateFace('expertises')}
                className="face-cta-forward btn-pro-hover inline-flex items-center justify-center gap-2 px-7 py-4 rounded-none text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-blue-400 transition-all shadow-sm cursor-pointer"
              >
                <span>Découvrir nos Expertises</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            {/* C-Suite Trust Strip */}
            <div className="animation-scroll fade-in-bottom delay-400 pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-blue-200/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Interventions sous accord strict de confidentialité (NDA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Bureaux à Casablanca Finance City 🇲🇦 & Toulouse 🇫🇷</span>
              </div>
            </div>

          </div>

        </div>

        {/* 🎬 FLOATING VIDEO TRAILER CONTROLS (Corner Badge) */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-white/90 border border-blue-200 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md text-[11px] text-slate-700">
          <div className="flex items-center gap-1.5 font-mono text-blue-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">TRAILER 4K</span>
          </div>

          <div className="h-3 w-px bg-slate-300 mx-1" />

          <button
            onClick={togglePlay}
            className="hover:text-blue-700 transition-colors p-1 cursor-pointer flex items-center gap-1 font-medium"
            title={videoPlaying ? "Mettre en pause" : "Lancer le trailer"}
          >
            {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-blue-600" />}
            <span>{videoPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={toggleMute}
            className="hover:text-blue-700 transition-colors p-1 cursor-pointer"
            title={videoMuted ? "Activer le son" : "Couper le son"}
          >
            {videoMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
          </button>
        </div>

      </section>

      {/* 2. SQLI INFINITE CONTINUOUS MARQUEE SLIDER (Light Blue Aesthetic) */}
      <section className="border-b border-[#e2dcd2] bg-[#f0f6fc] py-9 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 font-bold">
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
                  className="inline-flex items-center gap-3.5 px-5 py-3 rounded-none bg-white border border-[#d8e4f0] hover:border-blue-400 transition-all shrink-0 shadow-sm"
                >
                  <div className="p-2 rounded-none bg-blue-50 border border-blue-150 text-blue-600 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 whitespace-nowrap font-heading">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 whitespace-nowrap font-bold">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 whitespace-nowrap font-sans">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LES 4 PILIERS MAJEURS DE CONSEIL & ORGANISATION (Clean Light Cards) */}
      <section className="py-24 sm:py-28 bg-[#FAF7F2] border-b border-[#e2dcd2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-xs font-semibold text-blue-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-heading uppercase tracking-wider text-[11px] font-bold">Organisation & Systèmes d'Information</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1628] tracking-tight leading-tight font-heading">
                Pôles de Conseil & Exécution
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                De l'audit de vos flux physiques et financiers jusqu'au déploiement complet d'Odoo Enterprise, nous éliminons les dysfonctionnements organisationnels et sécurisons votre trajectoire de croissance.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('expertises')}
                  className="face-cta-forward link-cta-sqli text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Explorer toute la matrice d'expertises</span>
                  <div className="icon-circle bg-blue-50 border-blue-200 text-blue-600">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right: 4 Core Pillars Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {corePillars.map((p) => (
                <div
                  key={p.num}
                  onClick={() => onOpenConsultation(`Mission de Conseil : ${p.title}`)}
                  className="p-7 bg-white border border-[#e2dcd2] hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 font-bold">
                        {p.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {p.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading mb-1 leading-snug">
                      {p.title}
                    </h3>

                    <div className="text-[11px] font-semibold text-blue-600 mb-3 font-sans">
                      {p.subtitle}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                      {p.desc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-4">
                      {p.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-150 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                    <span>Cadrer avec un associé</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 4. SQLI PUSH-SERVICES SPLIT 2-COLUMN SECTION */}
      <section className="py-24 bg-[#f4f9fd] border-b border-[#d8e6f3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-xs font-semibold text-blue-700 shadow-sm">
                <Workflow className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-heading uppercase tracking-wider text-[11px] font-bold">Méthodologie Éprouvée</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1628] tracking-tight leading-tight font-heading">
                Intégration Odoo & AMOA Indépendante
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Contrairement aux intégrateurs classiques qui multiplient les développements spécifiques risqués, nous privilégions la standardisation des processus, le paramétrage natif rigoureux et le transfert direct de compétences à vos équipes.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('methode')}
                  className="face-cta-forward link-cta-sqli text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Découvrir notre démarche en 4 phases</span>
                  <div className="icon-circle bg-blue-50 border-blue-200 text-blue-600">
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
                  className="p-6 bg-white border border-[#e2dcd2] hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer group flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold">
                      <span>PÔLE 0{idx + 1}</span>
                      {exp.isFlagship && <span className="text-blue-600 font-bold">• OFFRE MAJEURE</span>}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                      {exp.title}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 font-sans">
                      {exp.tagline}
                    </p>
                  </div>

                  <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#1f24e9] group-hover:text-white transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. SQLI PUSH-NEWS / INSIGHTS (Light Theme) */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#e2dcd2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-xs font-semibold text-blue-700 shadow-sm">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-heading uppercase tracking-wider text-[11px] font-bold">Veille Stratégique</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1628] tracking-tight leading-tight font-heading">
                Insights
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Retrouvez nos analyses stratégiques, décryptages réglementaires DGI et retours d'expérience pour sécuriser vos investissements SI.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('insights')}
                  className="face-cta-forward link-cta-sqli text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Accéder à tous les Insights</span>
                  <div className="icon-circle bg-blue-50 border-blue-200 text-blue-600">
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
                  className="p-7 bg-white border border-[#e2dcd2] hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 border border-blue-200">
                      {article.tag}
                    </span>
                    <span className="font-sans font-medium">{article.date} • {article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {article.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                    <span>Lire l'analyse complète</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. SQLI PUSH-USE-CASES (Light Theme) */}
      <section className="py-24 bg-[#f4f9fd] border-b border-[#d8e6f3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-xs font-semibold text-blue-700 shadow-sm">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-heading uppercase tracking-wider text-[11px] font-bold">Résultats & Impact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1628] tracking-tight leading-tight font-heading">
                Case Studies
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Nos missions de restructuration et d'intégration ERP génèrent des gains immédiats en trésorerie, en productivité et en maîtrise des marges.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('cas-clients')}
                  className="face-cta-forward btn-pro-hover link-cta-sqli text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded-md"
                >
                  <span>Voir tous les cas clients</span>
                  <div className="icon-circle bg-blue-50 border-blue-200 text-blue-600">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Case Studies Highlights with Magnetic Photos */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                onClick={() => onNavigateFace('cas-clients')}
                className="case-study-card group cursor-pointer flex flex-col bg-white border border-[#e2dcd2] p-5 transition-all duration-300"
              >
                <div className="photo-frame w-full aspect-[16/10] bg-slate-900 mb-4 relative">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85"
                    alt="Industrie & BTP Odoo 18"
                    className="photo-zoom-img w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="photo-overlay-scrim" />
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a1628]/90 text-white px-2.5 py-1 backdrop-blur-md border border-white/20">
                      Industrie & BTP
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                    <span className="text-xs font-bold text-white bg-[#1f24e9] px-2.5 py-1 shadow-md">
                      -32% Délais
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 font-bold">
                    Odoo 18 Enterprise
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Casablanca 🇲🇦</span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-blue-700 font-heading mb-1">
                  -32%
                </div>
                <div className="text-xs text-slate-700 font-bold mb-2">
                  sur les délais logistiques multi-usines
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading mb-3 line-clamp-2">
                  Refonte ERP Odoo 18 & Supply Chain : 8 sites industriels synchronisés sans rupture
                </h3>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                  <span>Consulter le dossier d'impact</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => onNavigateFace('cas-clients')}
                className="case-study-card group cursor-pointer flex flex-col bg-white border border-[#e2dcd2] p-5 transition-all duration-300"
              >
                <div className="photo-frame w-full aspect-[16/10] bg-slate-900 mb-4 relative">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85"
                    alt="Distribution & Facturation DGI"
                    className="photo-zoom-img w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="photo-overlay-scrim" />
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a1628]/90 text-white px-2.5 py-1 backdrop-blur-md border border-white/20">
                      Distribution & Négoce
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                    <span className="text-xs font-bold text-white bg-[#1f24e9] px-2.5 py-1 shadow-md">
                      100% DGI Conforme
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 font-bold">
                    Facturation DGI & EDI
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Casablanca 🇲🇦</span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-blue-700 font-heading mb-1">
                  140 000
                </div>
                <div className="text-xs text-slate-700 font-bold mb-2">
                  factures automatisées et 0 redressement
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading mb-3 line-clamp-2">
                  Conformité Fiscale DGI : Automatisation des flux et suppression des rejets
                </h3>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                  <span>Consulter le dossier d'impact</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. 4 KEY EXECUTIVE FIGURES (Clean Light Cards) */}
      <section className="py-16 bg-[#FAF7F2] border-b border-[#e2dcd2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-[#e2dcd2] text-center shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-black text-blue-700 font-heading mb-1">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mb-1 font-heading">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-600 font-sans">
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION C-LEVEL BANNER (Royal Blue Executive Accent) */}
      <section className="py-20 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="p-6 sm:p-16 border border-blue-200 text-center space-y-6 shadow-lg relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e9f3fc 0%, #d8ecfe 50%, #cae3fb 100%)'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-semibold text-blue-800 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Mobilisation sous 72h · Casablanca CFC 🇲🇦 & Toulouse 🇫🇷</span>
            </div>

            <h2 className="text-2xl sm:text-5xl font-extrabold text-[#0a1628] font-heading">
              Prêt à structurer vos processus & sécuriser votre ERP ?
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-sans max-w-xl mx-auto leading-relaxed">
              Échangez en direct avec un associé senior pour cadrer les objectifs, le budget et le planning de votre projet d'organisation ou d'intégration Odoo.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation("Cadrage Stratégique Général")}
                className="face-cta-forward btn-pro-hover animate-forward-breath w-full sm:w-auto px-8 py-4 text-sm font-bold text-white font-heading flex items-center justify-center gap-2.5 cursor-pointer shadow-md transition-all"
                style={{ background: '#1f24e9' }}
              >
                <span>Prendre un rendez-vous stratégique</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateFace('contact')}
                className="face-cta-forward btn-pro-hover w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 font-sans flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>Voir nos adresses à Casablanca & Toulouse</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
