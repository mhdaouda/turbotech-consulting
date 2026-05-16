#!/usr/bin/env python3
"""Generate zones-<slug>.html country landing pages for SEO."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

COUNTRIES = [
    {
        "slug": "benin",
        "name": "Bénin",
        "title": "Conseil IT & digital au Bénin | TurboTech Consulting",
        "desc": "Développement web, applications métiers, infrastructure et cybersécurité depuis Cotonou et à distance. TurboTech Consulting au Bénin.",
        "h1": "TurboTech Consulting au Bénin",
        "lead": "Nous accompagnons entreprises, ONG et administrations béninoises pour concevoir des produits numériques fiables : sites vitrines, plateformes métiers, intégrations et durcissement des systèmes.",
        "blocks": [
            (
                "Contexte digital au Bénin",
                "Le Bénin dispose d’un écosystème dynamique (télécoms, services, commerce). Les projets combinent souvent francophonie, contraintes de connectivité et besoin de solutions maintenables localement ou en cloud.",
            ),
            (
                "Offres pertinentes",
                "Applications web et mobiles, CRM et outils de gestion, automatisation (workflows, n8n), audits techniques et migrations vers des architectures plus souples. Nous adaptons les délais aux fenêtres de production et aux équipes sur le terrain.",
            ),
            (
                "Collaboration",
                "Ateliers à Cotonou ou en région lorsque nécessaire, puis livraisons itératives à distance avec créneaux alignés sur votre fuseau (UTC+1).",
            ),
        ],
        "hreflang": "fr-BJ",
    },
    {
        "slug": "togo",
        "name": "Togo",
        "title": "Conseil IT & digital au Togo | TurboTech Consulting",
        "desc": "Solutions web, mobile, infra et cybersécurité pour entreprises togolaises — Lomé et télétravail avec TurboTech Consulting.",
        "h1": "TurboTech Consulting au Togo",
        "lead": "Depuis notre ancrage régional, nous aidons les organisations togolaises à industrialiser leurs outils numériques sans sacrifier la réactivité des équipes métier.",
        "blocks": [
            (
                "Marché togolais",
                "Lomé concentre sièges et PME en croissance ; les besoins portent sur la facturation, la relation client, la logistique et la visibilité en ligne.",
            ),
            (
                "Livrables",
                "Sites et portails, applications connectées, tableaux de bord, intégration des moyens de paiement et messageries (WhatsApp Business, etc.), sécurisation des accès.",
            ),
            (
                "Mode d’intervention",
                "Missions courtes sur site pour cadrage et formation, puis pilotage agile à distance.",
            ),
        ],
        "hreflang": "fr-TG",
    },
    {
        "slug": "gabon",
        "name": "Gabon",
        "title": "Conseil IT & digital au Gabon | TurboTech Consulting",
        "desc": "Projets numériques pour le Gabon : web, mobile, cloud et cybersécurité — Libreville et accompagnement à distance.",
        "h1": "TurboTech Consulting au Gabon",
        "lead": "Nous soutenons les acteurs économiques gabonais dans la modernisation de leurs systèmes d’information, avec une attention particulière à la disponibilité et à la traçabilité.",
        "blocks": [
            (
                "Enjeux locaux",
                "Zones CEMAC, contexte XAF, secteurs porteurs (services, industrie légère, distribution) : les architectures doivent tolérer la latence et prévoir des modes dégradés intelligents.",
            ),
            (
                "Expertises",
                "Portails métiers, interconnexion des agences, sauvegardes, identité & accès, automatisation des flux administratifs.",
            ),
            (
                "Organisation",
                "Réunions de lancement à Libreville si besoin, suivi hebdomadaire en visioconférence, documentation en français.",
            ),
        ],
        "hreflang": "fr-GA",
    },
    {
        "slug": "nigeria",
        "name": "Nigeria",
        "title": "Conseil IT & digital au Nigeria | TurboTech Consulting",
        "desc": "Applications web et mobiles, API, cloud et cybersécurité pour entreprises nigérianes — Lagos, Abuja, livraison avec équipes FR/EN.",
        "h1": "TurboTech Consulting au Nigeria",
        "lead": "Nous collaborons avec des équipes nigérianes sur des produits à fort trafic : performance, résilience et clarté des responsabilités (hébergement, conformité, support) sont au centre de nos propositions. Les spécifications techniques peuvent être rédigées en anglais professionnel ; la documentation reste accessible en français si besoin.",
        "blocks": [
            (
                "Contexte",
                "Écosystème tech majeur en Afrique (fintech, logistique, marketplaces). Les projets exigent souvent une architecture scalable et des intégrations tierces (paiement, identité, notifications).",
            ),
            (
                "Services",
                "API, services backend, observabilité, applications mobiles, audits de configuration et durcissement progressif.",
            ),
            (
                "Fuseaux et coordination",
                "Créneaux chevauchés Europe/Nigeria pour limiter les blocages ; points d’étape réguliers avec vos équipes locales.",
            ),
        ],
        "hreflang": "en-NG",
    },
    {
        "slug": "france",
        "name": "France",
        "title": "Conseil IT & digital en France | TurboTech Consulting",
        "desc": "Développement web, cloud, cybersécurité et accompagnement DSI — TurboTech Consulting intervient en France à distance et sur site.",
        "h1": "TurboTech Consulting en France",
        "lead": "Nous aidons les directions des systèmes d’information et les équipes produit à livrer plus vite, en respectant le cadre RGPD et les exigences de sécurité des grands comptes comme des PME.",
        "blocks": [
            (
                "Marché français",
                "Projets souvent hybrides cloud/on-prem, intégration SI existant, exigence de traçabilité et de revue de code.",
            ),
            (
                "Offres",
                "Modernisation applicative, plateformes B2B, data pipelines légers, posture de cybersécurité (identité, durcissement, sauvegardes testées).",
            ),
            (
                "Déplacements",
                "Ateliers en Île-de-France ou grandes métropoles sur demande ; télétravail privilégié pour l’exécution.",
            ),
        ],
        "hreflang": "fr-FR",
    },
    {
        "slug": "suisse",
        "name": "Suisse",
        "title": "Conseil IT & digital en Suisse | TurboTech Consulting",
        "desc": "Projets web, cloud et sécurité pour la Suisse romande et alémanique — TurboTech Consulting, livraison structurée FR/DE/EN.",
        "h1": "TurboTech Consulting en Suisse",
        "lead": "Nous accompagnons les organisations suisses qui cherchent un partenaire capable de cadrer finement les risques, la disponibilité et la souveraineté des données.",
        "blocks": [
            (
                "Réalités locales",
                "Multilinguisme, exigence de qualité et sensibilité aux hébergeurs et cantons ; nous adaptons la documentation et les revues aux parties prenantes romandes ou alémaniques.",
            ),
            (
                "Livrables",
                "Architectures résilientes, intégrations bancaires ou métier, audits ciblés, runbooks d’exploitation.",
            ),
            (
                "Collaboration",
                "Présence ponctuelle possible en Suisse romande ; coordination agile avec vos équipes internes ou ESN locales.",
            ),
        ],
        "hreflang": "fr-CH",
    },
    {
        "slug": "belgique",
        "name": "Belgique",
        "title": "Conseil IT & digital en Belgique | TurboTech Consulting",
        "desc": "Développement web, applications et cybersécurité en Belgique — Bruxelles, Wallonie, Flandre, avec TurboTech Consulting.",
        "h1": "TurboTech Consulting en Belgique",
        "lead": "Entreprises belges francophones et néerlandophones : nous alignons nos livrables sur vos processus (RGPD UE, marchés publics ou privés) et sur vos outils existants.",
        "blocks": [
            (
                "Contexte",
                "Hub européen, forte densité d’intégrations (finance, logistique, institutions) ; besoin de clarté contractuelle et de dette technique maîtrisée.",
            ),
            (
                "Services",
                "Portails clients, extranets, API, automatisation, durcissement et supervision.",
            ),
            (
                "Mobilité",
                "Déplacements Bruxelles / grandes villes pour kick-off ; exécution majoritairement à distance.",
            ),
        ],
        "hreflang": "fr-BE",
    },
    {
        "slug": "pays-bas",
        "name": "Pays-Bas",
        "title": "Conseil IT & digital aux Pays-Bas | TurboTech Consulting",
        "desc": "Web, cloud et cybersécurité pour équipes basées aux Pays-Bas — Amsterdam, Rotterdam, livraison en anglais ou en français.",
        "h1": "TurboTech Consulting aux Pays-Bas",
        "lead": "Nous travaillons avec des équipes basées aux Pays-Bas sur des stacks modernes : anglais professionnel pour le technique, français possible pour les ateliers avec vos filiales.",
        "blocks": [
            (
                "Écosystème",
                "Cloud public mature, forte culture DevOps ; nous nous intégrons à vos pipelines CI/CD et à vos politiques de sécurité.",
            ),
            (
                "Offres",
                "Produits web performants, microservices raisonnables, observabilité, revues de sécurité.",
            ),
            (
                "Organisation",
                "Fenêtres horaires Europe/Afrique pour inclure vos filiales multi-sites.",
            ),
        ],
        "hreflang": "nl-NL",
    },
    {
        "slug": "canada",
        "name": "Canada",
        "title": "Conseil IT & digital au Canada | TurboTech Consulting",
        "desc": "Services numériques pour le Canada — Montréal, Toronto, télétravail bilingue FR/EN avec TurboTech Consulting.",
        "h1": "TurboTech Consulting au Canada",
        "lead": "Nous collaborons avec des organisations canadiennes qui coordonnent aussi des opérations en Europe ou en Afrique : même niveau d’exigence, plages horaires orchestrées.",
        "blocks": [
            (
                "Contexte",
                "Marchés provinciaux distincts, exigences de confidentialité et besoin de documentation claire en français et en anglais.",
            ),
            (
                "Expertises",
                "Produits SaaS B2B, portails, intégrations API, posture de sécurité et continuité d’activité.",
            ),
            (
                "Fuseaux",
                "Planification explicite Montréal / Toronto vs équipes Afrique-Europe pour éviter les goulets d’étranglement.",
            ),
        ],
        "hreflang": "fr-CA",
    },
]

HEAD_COMMON = """  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:wght@300;400;500;600;700;800&family=Orbitron:wght@400;500;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/styles.css" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Rajdhani', 'Exo 2', 'system-ui', 'sans-serif'],
            display: ['Orbitron', 'Audiowide', 'sans-serif'],
          },
          colors: {
            brand: { 400: '#34d399', 500: '#10b981', 600: '#059669' },
            cyber: { 400: '#22d3ee', 500: '#06b6d4' },
            dark: { 800: '#050505', 900: '#000000' },
          },
        },
      },
    };
  </script>"""

NAV = """      <nav class="flex items-center justify-between h-20" aria-label="Principale">
        <a href="index.html" class="flex items-center gap-3 group">
          <img src="assets/logo-turbotech.svg" alt="TurboTech Consulting — accueil" class="h-10 md:h-11 w-auto drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]" width="176" height="44" />
        </a>
        <ul class="hidden lg:flex items-center gap-8 text-sm font-medium">
          <li><a href="index.html#services" class="nav-link">Services</a></li>
          <li><a href="index.html#about" class="nav-link">À propos</a></li>
          <li><a href="index.html#why" class="nav-link">Pourquoi nous</a></li>
          <li><a href="index.html#projects" class="nav-link">Réalisations</a></li>
          <li><a href="index.html#team" class="nav-link">Équipe</a></li>
          <li><a href="index.html#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="flex items-center gap-4">
          <a href="index.html#contact" class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-cyber-500 hover:from-brand-400 hover:to-cyber-400 text-black text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-lg shadow-brand-500/40">Démarrer</a>
          <button id="menu-toggle" class="lg:hidden p-2 text-white" type="button" aria-label="Menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" class="hidden lg:hidden pb-6 pt-2 space-y-2">
        <a href="index.html#services" class="mobile-link">Services</a>
        <a href="index.html#about" class="mobile-link">À propos</a>
        <a href="index.html#why" class="mobile-link">Pourquoi nous</a>
        <a href="index.html#projects" class="mobile-link">Réalisations</a>
        <a href="index.html#team" class="mobile-link">Équipe</a>
        <a href="index.html#contact" class="mobile-link">Contact</a>
      </div>"""

FOOTER = """  <footer class="border-t border-white/5 py-12 mt-4">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <a href="index.html" class="text-sm text-slate-500 hover:text-brand-400">← Retour à l’accueil</a>
      <p class="text-sm text-slate-500">© <span id="year"></span> TurboTech Consulting</p>
    </div>
  </footer>
  <script src="js/main.js"></script>"""


def escape_html(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def build_page(c: dict) -> str:
    slug = c["slug"]
    url = f"https://turbotechconsulting.com/zones-{slug}.html"
    name_esc = escape_html(c["name"])
    title_esc = escape_html(c["title"])
    desc_esc = escape_html(c["desc"])
    h1_esc = escape_html(c["h1"])
    lead_esc = escape_html(c["lead"])
    hl = c["hreflang"]

    blocks_html = ""
    for h2, p in c["blocks"]:
        blocks_html += f"        <h2>{escape_html(h2)}</h2>\n        <p>{escape_html(p)}</p>\n"

    json_ld = f"""  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": "WebPage",
        "@id": "{url}#webpage",
        "url": "{url}",
        "name": "{title_esc}",
        "isPartOf": {{ "@id": "https://turbotechconsulting.com/#website" }},
        "inLanguage": "fr-FR",
        "description": "{desc_esc}"
      }},
      {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://turbotechconsulting.com/" }},
          {{ "@type": "ListItem", "position": 2, "name": "Zones d’intervention", "item": "https://turbotechconsulting.com/zones-intervention.html" }},
          {{ "@type": "ListItem", "position": 3, "name": "{name_esc}", "item": "{url}" }}
        ]
      }}
    ]
  }}
  </script>"""

    return (
        f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="{desc_esc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{url}" />
  <link rel="alternate" hreflang="{hl}" href="{url}" />
  <link rel="alternate" hreflang="fr" href="{url}" />
  <link rel="alternate" hreflang="x-default" href="https://turbotechconsulting.com/" />

  <meta property="og:title" content="{title_esc}" />
  <meta property="og:description" content="{desc_esc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{url}" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="TurboTech Consulting" />
  <meta property="og:image" content="https://turbotechconsulting.com/assets/og-turbotech-share.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title_esc}" />
  <meta name="twitter:description" content="{desc_esc}" />
  <meta name="twitter:image" content="https://turbotechconsulting.com/assets/og-turbotech-share.png" />

  <title>{title_esc}</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
"""
        + HEAD_COMMON
        + "\n"
        + json_ld
        + f"""
</head>
<body class="bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
  <header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
{NAV}
    </div>
  </header>

  <main class="relative z-10 pt-28 pb-20 lg:pt-36">
    <div class="max-w-3xl mx-auto px-6 lg:px-8">
      <nav class="text-sm text-slate-500 mb-8" aria-label="Fil d’Ariane">
        <a href="index.html" class="hover:text-brand-400 transition">Accueil</a>
        <span class="mx-2 opacity-50">/</span>
        <a href="zones-intervention.html" class="hover:text-brand-400 transition">Zones</a>
        <span class="mx-2 opacity-50">/</span>
        <span class="text-slate-400">{name_esc}</span>
      </nav>

      <article class="seo-article">
        <h1>{h1_esc}</h1>
        <p class="seo-lead">{lead_esc}</p>
{blocks_html}
        <h2>Étapes suivantes</h2>
        <p>Retrouvez nos offres <a href="developpement-web.html">développement web &amp; mobile</a> et <a href="infrastructure-cybersecurite.html">infrastructure &amp; cybersécurité</a>, la vue d’ensemble des <a href="zones-intervention.html">zones d’intervention</a>, puis <a href="index.html#contact">contactez-nous</a> en précisant votre pays et vos priorités.</p>
      </article>
    </div>
  </main>

{FOOTER}
</body>
</html>
"""
    )


def main() -> None:
    for c in COUNTRIES:
        path = ROOT / f"zones-{c['slug']}.html"
        path.write_text(build_page(c), encoding="utf-8")
        print("Wrote", path.name)


if __name__ == "__main__":
    main()
