# Guide Complet : Déploiement du Bot WhatsApp Automatisé CLIXA

Ce guide détaille le fonctionnement et la mise en production du système d'automatisation WhatsApp pour **CLIXA CONSULTING**.

---

## 🎯 Ce que fait le Bot

1. **Prise de Rendez-vous depuis le Site Web** :
   - Dès qu'un dirigeant remplit le modal « Planifier un Appel » sur le site et clique sur WhatsApp, le bot analyse instantanément le jour, l'heure, le nom et le projet.
   - Il envoie une **confirmation officielle** au prospect.
   - Il envoie une **alerte prioritaire à l'administration** (`06 61 34 40 54`) pour placer l'appel.

2. **Qualification & Prise de Rendez-vous Directe sur WhatsApp** :
   - Si un prospect envoie simplement *« Bonjour »* ou *« Salam »* sur WhatsApp, le bot répond immédiatement 24h/24.
   - Il présente les 5 pôles d'expertises (ERP Odoo, Web & Digital, AMOA, Facturation, Finance).
   - Il propose les créneaux disponibles.
   - Il collecte les coordonnées et confirme le créneau.

---

## 📁 Fichiers Créés dans le Projet

- `automation/whatsapp-webhook-server.js` : Serveur Node.js natif autonome (zéro dépendance externe) recevant les webhooks Meta WhatsApp Cloud API.
- `automation/scripts-messages.json` : Modèles de tous les messages, questions et alertes en français et formats business.

---

## 🚀 2 Méthodes de Connexion au Vrai Numéro WhatsApp

### Méthode A : Connexion Officielle Meta Cloud API (100% Gratuite)
1. Rendez-vous sur [developers.facebook.com](https://developers.facebook.com) et créez une application de type **« Entreprise »**.
2. Activez le produit **WhatsApp**.
3. Dans la section *Configuration du Webhook* :
   - URL de rappel : `https://votre-serveur.com/webhook`
   - Jeton de vérification : `CLIXA_SECRET_TOKEN_2026`
   - Cochez l'événement : `messages`.
4. Ajoutez votre numéro officiel CLIXA (`+212 6 61 34 40 54`) et collez votre *Access Token* dans les variables d'environnement.

---

### Méthode B : Via Make.com (No-Code visuel en 5 minutes)
Si l'administration préfère une interface visuelle sans gérer de serveur :
1. Créez un compte gratuit sur [Make.com](https://www.make.com).
2. Créez un scénario avec 3 modules :
   - **Module 1** : `WhatsApp Business Cloud` (Watch Messages).
   - **Module 2** : `Google Calendar` (Create an Event) ➔ Bloque le créneau automatiquement dans l'agenda du Directeur.
   - **Module 3** : `WhatsApp Business Cloud` (Send a Message) ➔ Répond au client et alerte l'administration.

---

## 🧪 Tester en Local Tout de Suite
Le serveur de test tourne déjà en arrière-plan sur le port 3001. Vous pouvez simuler n'importe quel message avec la commande :
```bash
curl -X POST http://127.0.0.1:3001/test-simulate \
  -H "Content-Type: application/json" \
  -d '{"from":"00212661000000", "message":"Bonjour"}'
```
