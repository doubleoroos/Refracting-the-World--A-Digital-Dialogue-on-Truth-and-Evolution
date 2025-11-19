import React from 'react';
import { Photographer, Section, Content, Language } from './types';

export const PHOTOGRAPHERS: Record<Language, Photographer[]> = {
  en: [
    {
      name: 'Roos van der Jagt',
      role: 'Photographer / Curator (NL)',
      bio: 'Curatorial vision focusing on the intersection of historical context and modern interpretation.',
      image: 'https://picsum.photos/id/338/400/500'
    },
    {
      name: 'Ronald Tilleman',
      role: 'Architectural / Fine Art (NL)',
      bio: 'Specializes in precise geometric compositions that challenge spatial perception and structural reality.',
      image: 'https://picsum.photos/id/101/400/500'
    },
    {
      name: 'Prakash Kumararajan',
      role: 'Documentary Photographer (Intl)',
      bio: 'Explores the raw reality of subjects, providing the "Reference Reality" for our visual experiments.',
      image: 'https://picsum.photos/id/203/400/500'
    },
    {
      name: 'Mike Pasarella',
      role: 'Conceptual / Abstract (NL)',
      bio: 'Pushes the medium towards abstraction, questioning where photography ends and digital art begins.',
      image: 'https://picsum.photos/id/244/400/500'
    }
  ],
  fr: [
    {
      name: 'Roos van der Jagt',
      role: 'Photographe / Commissaire (NL)',
      bio: 'Vision curatoriale axée sur l\'intersection du contexte historique et de l\'interprétation moderne.',
      image: 'https://picsum.photos/id/338/400/500'
    },
    {
      name: 'Ronald Tilleman',
      role: 'Architecture / Beaux-Arts (NL)',
      bio: 'Spécialisé dans les compositions géométriques précises qui défient la perception spatiale.',
      image: 'https://picsum.photos/id/101/400/500'
    },
    {
      name: 'Prakash Kumararajan',
      role: 'Photographe Documentaire (Intl)',
      bio: 'Explore la réalité brute des sujets, fournissant la "Réalité de Référence" pour nos expériences.',
      image: 'https://picsum.photos/id/203/400/500'
    },
    {
      name: 'Mike Pasarella',
      role: 'Conceptuel / Abstrait (NL)',
      bio: 'Pousse le médium vers l\'abstraction, questionnant la limite entre photographie et art numérique.',
      image: 'https://picsum.photos/id/244/400/500'
    }
  ]
};

export const CONTENT: Record<Language, Content> = {
  en: {
    nav: [
      { label: 'Project Identity', id: Section.HERO },
      { label: 'Pillar A: Perception', id: Section.PILLAR_1 },
      { label: 'Pillar B: Process', id: Section.PILLAR_2 },
      { label: 'Pillar C: Education', id: Section.LEARNING },
      { label: 'The Consortium', id: Section.TEAM },
      { label: 'Strategy', id: Section.MANIFESTO },
    ],
    hero: {
      tag: 'Project Proposal · Bicentennial of Photography',
      dates: 'Sept 1, 2026 – Sept 1, 2027',
      title: 'Refracting the World',
      subtitle: 'A Digital Dialogue on Truth and Evolution',
      intro: React.createElement(React.Fragment, null, 
        "Submitted by ", React.createElement("strong", null, "Earth Rising Foundation"), ".", React.createElement("br"), React.createElement("br"), "In the age of AI and deep-fakes, the \"Utopia of Accuracy\" is fractured. We invite you to deconstruct 200 years of seeing."
      ),
      cta: 'Start the Dialogue'
    },
    pillarA: {
      tag: 'Pillar A: Perception Slider',
      title: 'Reality vs. Distortion',
      description: React.createElement(React.Fragment, null,
        React.createElement("p", null, "As stated in the Bicentennial Manifesto, Niépce’s invention was born from a desire to \"capture reality.\" For two centuries, we believed the photograph was an objective record."),
        React.createElement("p", null, React.createElement("strong", null, "The \"Utopia of Accuracy\" is fractured.")),
        React.createElement("p", null, "This interactive feature juxtaposes the \"Reference Reality\" (documentary shot) with the \"Artistic Truth\" (interpretive work). Move the slider to see how framing, lens choice, and post-processing alter the narrative.")
      ),
      labels: {
        raw: 'Reference Reality',
        processed: 'Artistic Truth',
        aiButton: 'Interrogate the Medium',
        aiButtonActive: 'Analysis Complete',
        aiPrompt: 'Ask AI: Does the lens capture reality, or create it?'
      }
    },
    pillarB: {
      tag: 'Pillar B: The Process Layer',
      title: 'Ongoing Invention',
      description: 'Demystifying the "black box" of modern photography. Click to "explode" the image into its constituent layers, tracing the journey from Niépce to AI.',
      layers: {
        output: { label: 'Output', desc: 'The final work. A subjective interpretation of the world.' },
        darkroom: { label: 'Digital Darkroom', desc: 'Chemistry & Software. Where the "act of seeing" becomes the "act of creating".' },
        physics: { label: 'Physics / Light', desc: 'The raw sensor data. Light hitting the silicon. The only "objective" moment.' }
      }
    },
    pillarC: {
      tag: 'Pillar C: Visual Education',
      title: 'The Educational Hub',
      description: React.createElement(React.Fragment, null, "Deliverables: Downloadable \"Bicentennial Kits\" for schools. ", React.createElement("br"), "Empowering children and adolescents to actively participate in the comprehension of images."),
      curriculumTitle: 'Bicentennial Curriculum',
      topics: [
        "History of Optics: The Camera Obscura",
        "Media Literacy: How to 'read' images",
        "The Ethics of Digital Manipulation",
        "From Niépce to AI: Ongoing Invention"
      ],
      note: '* Available in French and English via PDF download.',
      preview: 'Preview Content',
      loading: 'Accessing Knowledge Base...'
    },
    team: {
      tag: 'The Consortium',
      title: 'Collaborative Vision',
      desc: 'A unique collaboration between Dutch non-profit Earth Rising and international artistic talent.'
    },
    manifesto: {
      tag: 'Strategic Alignment & Roadmap',
      title: React.createElement(React.Fragment, null, "A framework for ", React.createElement("span", { className: "italic text-accent" }, "impact & viability"), "."),
      cards: {
        pool: { title: 'Resource Pooling', desc: 'Consolidating efforts of independent artists into one high-impact platform to minimize administrative overhead.' },
        eco: { title: 'Eco-Responsibility', desc: '"Zero Waste" by design. Green hosting. A carbon-neutral alternative to physical festivals.' },
        access: { title: 'Accessibility (WCAG 2.1)', desc: 'Audited for high-contrast modes and screen readers. Free global access.' },
        fair: { title: 'Fair Remuneration', desc: 'Adhering to the "Fair Practice Code". Budgeted fees for artist copyright and curation.' }
      },
      carousel: {
        title: 'Curated Key Works',
        items: [
          {
            image: 'https://picsum.photos/id/56/1200/800',
            caption: 'Geometric Silence',
            artist: 'Ronald Tilleman'
          },
          {
             image: 'https://picsum.photos/id/122/1200/800',
             caption: 'Urban Distortion',
             artist: 'Mike Pasarella'
          },
          {
            image: 'https://picsum.photos/id/203/1200/800',
            caption: 'The Human Condition',
            artist: 'Prakash Kumararajan'
          },
          {
            image: 'https://picsum.photos/id/338/1200/800',
            caption: 'Echoes of History',
            artist: 'Roos van der Jagt'
          }
        ]
      },
      timeline: {
        title: 'Operational Timeline',
        phases: [
          { phase: "Phase 1", dates: "Jan 2026 – March 2026", title: "Curation & Agreements", desc: "Selection of final 20 'Key Works' & Partner agreements." },
          { phase: "Phase 2", dates: "April 2026 – July 2026", title: "Development & Design", desc: "UX/UI design, WCAG audit, Educational copy (FR/EN)." },
          { phase: "Phase 3", dates: "August 2026", title: "Testing & Pre-launch", desc: "Beta testing with educators & Green Hosting setup." },
          { phase: "Phase 4", dates: "September 2026", title: "Official Launch", desc: "Go-live to coincide with Bicentennial start.", current: true },
          { phase: "Phase 5", dates: "Sept 2026 – Sept 2027", title: "Dissemination", desc: "Monthly artist features & social media campaign." },
        ]
      },
      budget: {
        title: 'Budgetary Framework',
        allocationTitle: 'Allocation of Resources',
        items: [
          "Artistic Production (Fees & Copyright)",
          "Technical Development (Web Arch & Accessibility)",
          "Editorial & Education (Translation & PDF Kits)",
          "Project Management (Earth Rising)",
          "Marketing (Digital Promotion)"
        ],
        incomeTitle: 'Income Sources',
        income: [
          "Own Contributions: Earth Rising Foundation",
          "Grants: Dutch Cultural Funds",
          "In-Kind: Technical partnerships"
        ]
      }
    },
    footer: {
      submission: 'Commission #1 Submission'
    }
  },
  fr: {
    nav: [
      { label: 'Identité du Projet', id: Section.HERO },
      { label: 'Pilier A : Perception', id: Section.PILLAR_1 },
      { label: 'Pilier B : Processus', id: Section.PILLAR_2 },
      { label: 'Pilier C : Éducation', id: Section.LEARNING },
      { label: 'Le Consortium', id: Section.TEAM },
      { label: 'Stratégie', id: Section.MANIFESTO },
    ],
    hero: {
      tag: 'Proposition de Projet · Bicentenaire de la Photographie',
      dates: '1 Sept 2026 – 1 Sept 2027',
      title: 'Réfracter le Monde',
      subtitle: 'Un Dialogue Numérique sur la Vérité et l\'Évolution',
      intro: React.createElement(React.Fragment, null, 
        "Soumis par la ", React.createElement("strong", null, "Fondation Earth Rising"), ".", React.createElement("br"), React.createElement("br"), "À l'ère de l'IA et des deep-fakes, \"l'Utopie de l'Exactitude\" est fracturée. Nous vous invitons à déconstruire 200 ans de vision."
      ),
      cta: 'Lancer le Dialogue'
    },
    pillarA: {
      tag: 'Pilier A : Curseur de Perception',
      title: 'Réalité vs Distorsion',
      description: React.createElement(React.Fragment, null,
        React.createElement("p", null, "Comme indiqué dans le Manifeste du Bicentenaire, l'invention de Niépce est née d'un désir de \"capturer la réalité\". Pendant deux siècles, nous avons cru que la photographie était un enregistrement objectif."),
        React.createElement("p", null, React.createElement("strong", null, "\"L'Utopie de l'Exactitude\" est fracturée.")),
        React.createElement("p", null, "Cette fonctionnalité interactive juxtapose la \"Réalité de Référence\" (documentaire) à la \"Vérité Artistique\" (œuvre d'interprétation). Déplacez le curseur pour voir comment le cadrage et le post-traitement modifient le récit.")
      ),
      labels: {
        raw: 'Réalité de Référence',
        processed: 'Vérité Artistique',
        aiButton: 'Interroger le Médium',
        aiButtonActive: 'Analyse Terminée',
        aiPrompt: 'IA: L\'objectif capture-t-il la réalité ou la crée-t-il ?'
      }
    },
    pillarB: {
      tag: 'Pilier B : La Couche Processus',
      title: 'Invention Continue',
      description: 'Démystifier la "boîte noire" de la photographie moderne. Cliquez pour "exploser" l\'image en ses couches constitutives, retraçant le voyage de Niépce à l\'IA.',
      layers: {
        output: { label: 'Sortie', desc: 'L\'œuvre finale. Une interprétation subjective du monde.' },
        darkroom: { label: 'Chambre Noire Numérique', desc: 'Chimie et Logiciel. Où "l\'acte de voir" devient "l\'acte de créer".' },
        physics: { label: 'Physique / Lumière', desc: 'Données brutes du capteur. La lumière frappant le silicium. Le seul moment "objectif".' }
      }
    },
    pillarC: {
      tag: 'Pilier C : Éducation Visuelle',
      title: 'Le Hub Éducatif',
      description: React.createElement(React.Fragment, null, "Livrables : \"Kits du Bicentenaire\" téléchargeables pour les écoles. ", React.createElement("br"), "Donner aux enfants et aux adolescents les moyens de participer activement à la compréhension des images."),
      curriculumTitle: 'Curriculum du Bicentenaire',
      topics: [
        "Histoire de l'Optique : La Camera Obscura",
        "Éducation aux Médias : Apprendre à 'lire' les images",
        "L'Éthique de la Manipulation Numérique",
        "De Niépce à l'IA : Invention Continue"
      ],
      note: '* Disponible en français et en anglais via téléchargement PDF.',
      preview: 'Aperçu du Contenu',
      loading: 'Accès à la Base de Connaissances...'
    },
    team: {
      tag: 'Le Consortium',
      title: 'Vision Collaborative',
      desc: 'Une collaboration unique entre l\'association néerlandaise Earth Rising et des talents artistiques internationaux.'
    },
    manifesto: {
      tag: 'Alignement Stratégique et Feuille de Route',
      title: React.createElement(React.Fragment, null, "Un cadre pour ", React.createElement("span", { className: "italic text-accent" }, "l'impact et la viabilité"), "."),
      cards: {
        pool: { title: 'Mutualisation', desc: 'Consolider les efforts d\'artistes indépendants en une plateforme à fort impact pour minimiser les frais administratifs.' },
        eco: { title: 'Éco-Responsabilité', desc: '"Zéro Déchet" par conception. Hébergement vert. Une alternative neutre en carbone aux festivals physiques.' },
        access: { title: 'Accessibilité (WCAG 2.1)', desc: 'Audité pour les modes à contraste élevé et les lecteurs d\'écran. Accès mondial gratuit.' },
        fair: { title: 'Rémunération Équitable', desc: 'Respect du "Fair Practice Code". Frais budgétés pour les droits d\'auteur et le commissariat.' }
      },
      carousel: {
        title: 'Œuvres Clés Sélectionnées',
        items: [
          {
            image: 'https://picsum.photos/id/56/1200/800',
            caption: 'Silence Géométrique',
            artist: 'Ronald Tilleman'
          },
          {
             image: 'https://picsum.photos/id/122/1200/800',
             caption: 'Distorsion Urbaine',
             artist: 'Mike Pasarella'
          },
          {
            image: 'https://picsum.photos/id/203/1200/800',
            caption: 'La Condition Humaine',
            artist: 'Prakash Kumararajan'
          },
          {
            image: 'https://picsum.photos/id/338/1200/800',
            caption: 'Échos de l\'Histoire',
            artist: 'Roos van der Jagt'
          }
        ]
      },
      timeline: {
        title: 'Calendrier Opérationnel',
        phases: [
          { phase: "Phase 1", dates: "Jan 2026 – Mars 2026", title: "Curation & Accords", desc: "Sélection des 20 'Œuvres Clés' & Accords partenaires." },
          { phase: "Phase 2", dates: "Avril 2026 – Juil 2026", title: "Développement & Design", desc: "Design UX/UI, Audit WCAG, Rédaction éducative (FR/EN)." },
          { phase: "Phase 3", dates: "Août 2026", title: "Tests & Pré-lancement", desc: "Bêta-tests avec éducateurs & Configuration Hébergement Vert." },
          { phase: "Phase 4", dates: "Septembre 2026", title: "Lancement Officiel", desc: "Mise en ligne pour coïncider avec le début du Bicentenaire.", current: true },
          { phase: "Phase 5", dates: "Sept 2026 – Sept 2027", title: "Dissémination", desc: "Fonctionnalités mensuelles & campagne réseaux sociaux." },
        ]
      },
      budget: {
        title: 'Cadre Budgétaire',
        allocationTitle: 'Allocation des Ressources',
        items: [
          "Production Artistique (Frais & Droits)",
          "Développement Technique (Web & Accessibilité)",
          "Éditorial & Éducation (Traduction & Kits PDF)",
          "Gestion de Projet (Earth Rising)",
          "Marketing (Promotion Numérique)"
        ],
        incomeTitle: 'Sources de Revenus',
        income: [
          "Contributions Propres : Fondation Earth Rising",
          "Subventions : Fonds Culturels Néerlandais",
          "En Nature : Partenariats Techniques"
        ]
      }
    },
    footer: {
      submission: 'Soumission Commission n°1'
    }
  }
};