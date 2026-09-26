import React, { useEffect, useRef, useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { RobotIcon } from './RobotIcon';
import { BRAND } from '../data/content';

type Message = { role: 'user' | 'assistant'; content: string };

const CLE_STOCKAGE = 'clixa-assistant';

const SUGGESTIONS = [
  'Comment se déroule un cadrage ERP Odoo ?',
  'Quels sont vos modules d’organisation des processus ?',
  'Conformité Facturation Électronique DGI au Maroc ?',
  'Quels sont vos délais d’intervention à Casablanca et Toulouse ?',
];

const ACCUEIL: Message = {
  role: 'assistant',
  content:
    "Bonjour 👋 Je suis l'assistant IA exécutif de **CLIXA Consulting**. Posez-moi vos questions sur nos **missions de conseil**, l'**organisation de vos processus**, l'**intégration ERP Odoo Enterprise** ou la **conformité fiscale DGI & DGFIP**.",
};

const lireHistorique = (): Message[] => {
  try {
    const brut = sessionStorage.getItem(CLE_STOCKAGE);
    const lu = brut ? (JSON.parse(brut) as Message[]) : [];
    return Array.isArray(lu) ? lu : [];
  } catch {
    return [];
  }
};

/* ── Rendu du texte ──────────────────────────────────────────────────────────
   Le modèle écrit un markdown minimal (gras, listes, liens). On le transforme
   en éléments React, sans jamais injecter de HTML : une réponse ne peut pas
   glisser de balise dans la page. */
const MOTIF = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s)\]]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

const enLigne = (texte: string, cle: string): React.ReactNode[] =>
  texte.split(MOTIF).map((part, i) => {
    const k = `${cle}-${i}`;
    const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (md) {
      // Lien écrit en markdown [libellé](url) : si le libellé est l'URL elle-même, on l'abrège.
      const libelle = /^https?:\/\//.test(md[1]) ? md[1].replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : md[1];
      return (
        <a key={k} href={md[2]} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline underline-offset-2 hover:text-sky-300 break-words">
          {libelle.replace(/^\*\*|\*\*$/g, '')}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={k} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,;:!?]+$/, '');
      const reste = part.slice(url.length);
      const libelle = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
      return (
        <React.Fragment key={k}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline underline-offset-2 hover:text-sky-300 break-words">
            {libelle}
          </a>
          {reste}
        </React.Fragment>
      );
    }
    if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part)) {
      return <a key={k} href={`mailto:${part}`} className="text-sky-400 underline underline-offset-2">{part}</a>;
    }
    return part;
  });

const Texte: React.FC<{ contenu: string }> = ({ contenu }) => {
  const blocs: React.ReactNode[] = [];
  let liste: string[] = [];
  const viderListe = (cle: string) => {
    if (!liste.length) return;
    blocs.push(
      <ul key={cle} className="my-1.5 space-y-1 pl-4 list-disc marker:text-sky-400">
        {liste.map((l, i) => <li key={i}>{enLigne(l, `${cle}-${i}`)}</li>)}
      </ul>,
    );
    liste = [];
  };
  contenu.split('\n').forEach((ligne, i) => {
    const puce = ligne.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (puce) {
      liste.push(puce[1]);
      return;
    }
    viderListe(`ul-${i}`);
    if (ligne.trim()) blocs.push(<p key={`p-${i}`} className="my-1">{enLigne(ligne, `p-${i}`)}</p>);
  });
  viderListe('ul-fin');
  return <>{blocs}</>;
};

export const ChatPanel: React.FC<{ ouvert: boolean; onFermer: () => void }> = ({ ouvert, onFermer }) => {
  const [messages, setMessages] = useState<Message[]>(lireHistorique);
  const [saisie, setSaisie] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const fil = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(CLE_STOCKAGE, JSON.stringify(messages.slice(-30)));
    } catch {
      /* navigation privée : l'historique ne survivra pas au rechargement */
    }
  }, [messages]);

  useEffect(() => {
    fil.current?.scrollTo({ top: fil.current.scrollHeight });
  }, [messages, enCours, ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    const surEchap = (e: KeyboardEvent) => e.key === 'Escape' && onFermer();
    window.addEventListener('keydown', surEchap);
    // Pas de focus automatique sur mobile : le clavier recouvrirait la réponse.
    if (window.matchMedia('(min-width: 640px)').matches) champ.current?.focus();
    return () => window.removeEventListener('keydown', surEchap);
  }, [ouvert, onFermer]);

  const envoyer = async (texte: string) => {
    const question = texte.trim().slice(0, 1500);
    if (!question || enCours) return;
    setErreur(null);
    setSaisie('');
    const historique: Message[] = [...messages, { role: 'user', content: question }];
    setMessages([...historique, { role: 'assistant', content: '' }]);
    setEnCours(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historique.slice(-16) }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.code === 'NOT_CONFIGURED'
            ? "L'assistant est en cours de mise en service. Écrivez-nous sur WhatsApp en attendant."
            : data.error || "L'assistant ne répond pas pour le moment.",
        );
      }

      const lecteur = res.body.getReader();
      const decodeur = new TextDecoder();
      let reponse = '';
      for (;;) {
        const { done, value } = await lecteur.read();
        if (done) break;
        reponse += decodeur.decode(value, { stream: true });
        setMessages([...historique, { role: 'assistant', content: reponse }]);
      }
      if (!reponse.trim()) throw new Error("L'assistant n'a pas répondu. Reformulez votre question.");
    } catch (e) {
      setMessages(historique);
      setErreur(e instanceof Error && e.message !== 'Failed to fetch' ? e.message : 'Connexion impossible. Vérifiez votre réseau.');
    } finally {
      setEnCours(false);
    }
  };

  const reinitialiser = () => {
    setMessages([]);
    setErreur(null);
  };

  const affiches = [ACCUEIL, ...messages];

  return (
    <section
      role="dialog"
      aria-label="Assistant IA CLIXA"
      hidden={!ouvert}
      className="fixed z-50 inset-x-0 bottom-0 h-[85dvh] sm:inset-x-auto sm:right-5 sm:bottom-[10.5rem] sm:h-[min(600px,calc(100dvh-12rem))] sm:w-[390px] flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl shadow-black/60"
    >
      {/* En-tête */}
      <header className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 text-white">
            <RobotIcon className="h-6 w-6" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Assistant IA CLIXA</p>
            <p className="text-[11px] text-slate-400">Conseil Stratégique · ERP Odoo & AMOA</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button type="button" onClick={reinitialiser} className="rounded-lg px-2 py-1 text-[11px] text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer">
              Nouvelle discussion
            </button>
          )}
          <button type="button" onClick={onFermer} aria-label="Fermer" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Fil de discussion */}
      <div ref={fil} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
        {affiches.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-sky-600 px-3.5 py-2 text-sm text-white">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="max-w-[90%] break-words rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm leading-relaxed text-slate-200">
                {m.content ? (
                  <Texte contenu={m.content} />
                ) : (
                  <span className="flex gap-1 py-1.5" aria-label="L'assistant écrit">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400" />
                  </span>
                )}
              </div>
            </div>
          ),
        )}

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => envoyer(s)}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-left text-xs text-slate-300 hover:border-sky-500/60 hover:text-white cursor-pointer transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {erreur && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            {erreur}{' '}
            <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-emerald-400 underline">
              <MessageCircle className="h-3 w-3" /> WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Saisie */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          envoyer(saisie);
        }}
        className="border-t border-slate-800 bg-slate-900/60 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={champ}
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                envoyer(saisie);
              }
            }}
            rows={1}
            maxLength={1500}
            placeholder="Posez votre question…"
            aria-label="Votre question"
            className="max-h-28 min-h-[42px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-base sm:text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={enCours || !saisie.trim()}
            aria-label="Envoyer"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-500">
          Assistant IA : il peut se tromper. Pour un devis ou une inscription, contactez l'équipe.
        </p>
      </form>
    </section>
  );
};
