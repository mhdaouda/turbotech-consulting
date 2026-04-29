# TurboTech Consulting — Site web officiel

**TurboTech Consulting** — Société béninoise de services numériques basée à Cotonou.

Site vitrine moderne, sombre et premium, inspiré du design [Hexahub](https://www.hexahub.fr/), construit en HTML/CSS/JS avec **Tailwind CSS** (via CDN) — aucun build, aucune dépendance Node.js.

---

## Aperçu

- Design **sombre élégant** avec dégradés bleu/cyan
- Sections one-page : Hero, Services, À propos, Pourquoi nous, Réalisations, Témoignages, Équipe, Contact
- **Animations au scroll** (AOS)
- **100% responsive** (mobile, tablette, desktop)
- **SEO-ready** (meta tags, Open Graph)
- Formulaire de contact (à connecter à un backend ou Formspree)

---

## Lancer le site en local

Le site est purement statique. Trois manières simples :

### 1. Double-clic
Ouvrez `index.html` dans votre navigateur.

### 2. Serveur local Python (recommandé)
```bash
cd /Users/daouda/doc/Desktop/Workspace/TurboTech
python3 -m http.server 8000
```
Puis ouvrez : http://localhost:8000

### 3. VS Code Live Server
Installez l'extension "Live Server" et clic droit sur `index.html` → *Open with Live Server*.

---

## Personnaliser le contenu

Tout est dans `index.html`. Voici ce qu'il faut remplacer pour faire vivre votre site :

### Texte & contenu
| Quoi | Où chercher dans `index.html` |
|------|-------------------------------|
| Téléphone | `+229 00 00 00 00` |
| Email | `contact@turbotechconsulting.com` |
| Statistiques (hero) | `50+`, `30+`, `5+`, `24/7` |
| Logos clients | `CLIENT 1` à `CLIENT 5` |
| Projets | sections `<div class="project-card">` |
| Témoignages | sections `<div class="testimonial">` |
| Membres équipe | sections `<div class="team-card">` |

### Images
- Logos clients : ajoutez vos PNG/SVG dans `assets/clients/` et remplacez le texte par des `<img>`.
- Photos équipe : remplacez les `<div class="team-photo">` par `<img class="team-photo" src="assets/team/membre1.jpg" />`.
- Captures projets : pareil pour `<div class="project-img">`.

### Couleurs
Modifiez la palette dans `index.html` (script de config Tailwind, section `tailwind.config`) :
```js
brand: { 500: '#3b82f6', ... }, // bleu principal
cyber: { 500: '#06b6d4', ... }, // cyan accent
```

---

## Connecter le formulaire de contact

Le formulaire actuel affiche juste une `alert()`. Pour recevoir réellement les messages :

### Option A — Formspree (le plus simple, gratuit jusqu'à 50 msg/mois)
1. Créez un compte sur [https://formspree.io](https://formspree.io)
2. Récupérez votre endpoint (ex: `https://formspree.io/f/xyzabc123`)
3. Dans `index.html`, remplacez :
```html
<form ... onsubmit="event.preventDefault(); alert('...');">
```
par :
```html
<form action="https://formspree.io/f/xyzabc123" method="POST">
```

### Option B — EmailJS, Web3Forms, ou votre propre backend PHP/Node.

---

## Déployer en production

### 🟢 Vercel (recommandé, gratuit)
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez le CLI : `npm i -g vercel`
3. Dans le dossier du projet : `vercel`
4. Suivez les étapes. Votre site est en ligne en 30 secondes.
5. Connectez votre domaine `turbotechconsulting.com` dans le tableau de bord Vercel.

### 🟢 Netlify (alternative, gratuit)
1. [netlify.com](https://netlify.com) → glissez-déposez le dossier sur le tableau de bord.
2. Votre site est en ligne immédiatement.

### 🟢 GitHub Pages
1. Poussez le code sur GitHub.
2. Settings → Pages → Source = main branch.
3. URL : `https://<user>.github.io/<repo>`

### 🟢 Hébergeur béninois classique (cPanel, FTP)
1. Compressez le dossier du projet en `.zip`.
2. Uploadez via cPanel ou FileZilla dans le dossier `public_html/`.
3. Décompressez. Le site fonctionne immédiatement (aucun PHP/Node requis).

---

## Domaines à enregistrer

Tests DNS effectués sur les 3 extensions (`.bj`, `.fr`, `.com`) pour 12 candidats. Voici ce qui est disponible **sur les 3 extensions simultanément** :

### Top 3 recommandés (3/3 disponibles)

| Rang | Nom | `.bj` | `.fr` | `.com` |
|------|-----|-------|-------|--------|
| 🥇 | **`turbotech-benin`** | ✅ | ✅ | ✅ |
| 🥈 | **`turbotechbenin`** | ✅ | ✅ | ✅ |
| 🥉 | **`turbotechconsulting`** | ✅ | ✅ | ✅ |

### Autres options 3/3

`turbotechbj`, `turbotech-bj`, `turbotechafrica`, `turbotechservice`, `turbotech-tech`, `turbotech-africa`, `turbotech-benin`

### À NE PAS chercher (pris)

- ❌ `turbotech.com` (probablement pris)
- ❌ `turbotech.fr` (probablement pris)

### Où acheter

| Extension | Registrar | Coût annuel |
|-----------|-----------|-------------|
| `.bj` | [nic.bj](https://nic.bj) ou Yelloweb.bj | ~15-25 000 FCFA |
| `.fr` | [OVH](https://ovh.com) ou [Gandi](https://gandi.net) | ~7-10 € |
| `.com` | [Namecheap](https://namecheap.com), [OVH](https://ovh.com) | ~10-15 € |

> 💡 **Avant d'acheter**, faites une dernière vérification WHOIS officielle :
> - `.fr` → [afnic.fr/whois](https://www.afnic.fr/noms-de-domaine-et-support/tout-savoir-sur-le-nom-de-domaine/trouver-un-nom-de-domaine-ou-un-titulaire-grace-au-whois/)
> - `.bj` → [nic.bj](https://nic.bj)

---

## Structure du projet

```
TurboTech/
├── index.html          # Page principale (toutes les sections)
├── css/
│   └── styles.css      # Styles personnalisés (compléments Tailwind)
├── js/
│   └── main.js         # Interactions (header, menu, scroll, AOS)
├── assets/
│   └── favicon.svg     # Icône onglet navigateur
└── README.md           # Ce fichier
```

---

## Stack technique

- **HTML5** sémantique
- **Tailwind CSS** via CDN (pas de build)
- **AOS** (Animate On Scroll) via CDN
- **Font Awesome 6** via CDN (icônes)
- **Google Fonts** : Orbitron + Audiowide + Rajdhani + Exo 2 (style sci-fi/tech)
- **JavaScript vanilla** (pas de framework)

## Style visuel

Inspiré directement de [Hexahub.fr](https://www.hexahub.fr/) :

- Fond **noir pur** (`#000000`)
- Couleur principale : **vert émeraude** (`#10b981`) + **cyan** (`#22d3ee`)
- Polices futuristes : **Orbitron** (titres), **Audiowide** (logo/accents), **Rajdhani** (texte)
- Effets : blur orbs vert/cyan, ping animation autour du logo, dégradés, glow
- Style général : **cyberpunk / sci-fi / tech**

---

## Prochaines étapes suggérées

- [ ] Acheter `turbotechconsulting.bj` (ou `turbotech.bj`) + `turbotechconsulting.com` (déjà acheté)
- [ ] Remplacer les contenus placeholder (téléphone, email, projets, équipe)
- [ ] Ajouter les vrais logos clients
- [ ] Connecter le formulaire à Formspree ou EmailJS
- [ ] Ajouter une page `/mentions-legales.html`
- [ ] Ajouter Google Analytics ou Plausible
- [ ] Soumettre le site à Google Search Console
- [ ] Créer les profils LinkedIn / Facebook / WhatsApp Business

---

© TurboTech Consulting. Cotonou, Bénin.
